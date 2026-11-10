"""Telegram kanalining ochiq sahifasidan (t.me/s/<kanal>) yangiliklarni olib data/news.json ga yozadi.
Faqat Python standart kutubxonasi ishlatiladi. Kanal OCHIQ (public) bo'lishi kerak.
Ishlatish: python scripts/fetch_telegram.py <kanal_nomi>
"""
import html
import json
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "data" / "news.json"
IMG_DIR = ROOT / "assets" / "news"   # rasmlar saytning o'zida saqlanadi (Telegram havolalari vaqt o'tib eskiradi)
KEEP_IMAGES = 12                     # faqat oxirgi 12 ta post rasmi saqlanadi (joy tejash uchun)
LIMIT = 30
SKIP_FORWARDS = True  # boshqa kanallardan forward qilingan postlarni saytga chiqarmaslik
CUT_MARKERS = ["Ijtimoiy tarmoqlarda bizni kuzating", "Ijtimoiy tarmoqlarimizga obuna"]


def tidy(text: str) -> str:
    for m in CUT_MARKERS:
        i = text.find(m)
        if i != -1:
            text = text[:i]
    lines = [l for l in text.split("\n") if not re.fullmatch(r"\s*(#\w+\s*)+", l)]  # faqat heshteglardan iborat qatorlar
    text = "\n".join(lines)
    return re.sub(r"\n{3,}", "\n\n", text).strip()


def clean(fragment: str) -> str:
    fragment = re.sub(r"<br\s*/?>", "\n", fragment)
    fragment = re.sub(r"<[^>]+>", "", fragment)
    return html.unescape(fragment).strip()


UA = {"User-Agent": "Mozilla/5.0 (school-site news bot)"}


def _google(chunk: str, tl: str):
    data = urllib.parse.urlencode({"q": chunk}).encode()
    url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl={tl}&dt=t"
    res = json.loads(urllib.request.urlopen(urllib.request.Request(url, data=data, headers=UA), timeout=30).read())
    return "".join(part[0] for part in res[0] if part and part[0]), res[2]


def _mymemory(chunk: str, tl: str):
    q = urllib.parse.urlencode({"q": chunk[:480], "langpair": f"uz|{tl}"})
    res = json.loads(urllib.request.urlopen(urllib.request.Request("https://api.mymemory.translated.net/get?" + q, headers=UA), timeout=30).read())
    if res.get("responseStatus") != 200:
        raise RuntimeError(res.get("responseDetails"))
    return res["responseData"]["translatedText"], "uz"


def translate(text: str, tl: str):
    """Matnni bepul xizmat orqali tarjima qiladi. (tarjima, aniqlangan_til) yoki xato bo'lsa None qaytaradi."""
    if not text.strip():
        return "", ""
    chunks, cur = [], ""
    for para in text.split("\n"):
        if len(cur) + len(para) > 1500 and cur:
            chunks.append(cur); cur = ""
        cur += para + "\n"
    chunks.append(cur)
    for engine in (_google, _mymemory):
        try:
            out, src = [], ""
            for c in chunks:
                t, src = engine(c.rstrip("\n"), tl)
                out.append(t)
            return "\n".join(out).strip(), src
        except Exception as e:  # keyingi xizmatni sinab ko'ramiz
            print(f"tarjima xatosi ({engine.__name__}): {e}")
    return None


def add_translations(posts):
    """Har bir postga text_uz va text_en qo'shadi. Faqat yangi yoki o'zgargan postlar tarjima qilinadi."""
    for p in posts:
        if p.get("src") == p["text"] and p.get("text_en") is not None:
            continue  # avval tarjima qilingan
        en = translate(p["text"], "en")
        if en is None:
            continue  # keyingi ishga tushishda qayta urinadi; sayt o'zbekchasini ko'rsatadi
        p["text_en"], lang = en
        if lang and lang != "uz":  # post rus yoki boshqa tilda bo'lsa, o'zbekchaga ham o'giramiz
            uz = translate(p["text"], "uz")
            p["text_uz"] = uz[0] if uz else p["text"]
        else:
            p["text_uz"] = p["text"]
        p["src"] = p["text"]


def parse(page: str, channel: str):
    posts = []
    blocks = re.split(r'(?=<div class="tgme_widget_message_wrap)', page)
    for b in blocks:
        m = re.search(r'data-post="([^"]+)"', b)
        if not m:
            continue
        post_id = m.group(1)
        if SKIP_FORWARDS and "tgme_widget_message_forwarded_from" in b:
            continue
        t = re.search(r'<div class="tgme_widget_message_text[^"]*"[^>]*>(.*?)</div>', b, re.S)
        text = tidy(clean(t.group(1))) if t else ""
        d = re.search(r'<time[^>]*datetime="([^"]+)"', b)
        img = re.search(r"tgme_widget_message_(?:photo_wrap|video_thumb)[^>]*background-image:url\('([^']+)'\)", b)
        if not text:  # matnsiz (faqat rasm/video) postlar saytga chiqmaydi
            continue
        posts.append({
            "id": post_id,
            "link": f"https://t.me/{post_id}",
            "date": d.group(1) if d else "",
            "text": text,
            "image": img.group(1) if img else "",
        })
    return posts


def save_images(posts):
    """Post rasmlarini assets/news/ ga yuklab oladi va post["photo"] ga mahalliy yo'lni yozadi."""
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    keep = set()
    for p in posts[:KEEP_IMAGES]:
        url = p.get("image", "")
        if not url:
            continue
        name = re.sub(r"\W", "_", p["id"].split("/")[-1]) + ".jpg"
        path = IMG_DIR / name
        if not path.exists():
            try:
                data = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30).read()
                if len(data) > 1000:
                    path.write_bytes(data)
            except Exception as e:  # rasm yuklanmasa, keyingi safar yana urinib ko'riladi
                print("Rasm yuklanmadi:", p["id"], e)
        if path.exists():
            p["photo"] = f"assets/news/{name}"
            keep.add(name)
    for f in IMG_DIR.glob("*.jpg"):  # eski rasmlarni o'chirish
        if f.name not in keep:
            f.unlink()
    for p in posts[KEEP_IMAGES:]:
        p.pop("photo", None)


def main():
    channel = sys.argv[1].lstrip("@") if len(sys.argv) > 1 else ""
    if not channel or channel == "MAKTAB_KANALI":
        print("Kanal nomi ko'rsatilmagan, o'tkazib yuborildi.")
        return
    req = urllib.request.Request(f"https://t.me/s/{channel}", headers=UA)
    page = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "replace")
    fresh = parse(page, channel)

    old = []
    if OUT.exists():
        try:
            old = json.loads(OUT.read_text(encoding="utf-8"))
        except ValueError:
            old = []
    merged = {p["id"]: p for p in old}
    for p in fresh:  # yangi ma'lumot ustun, lekin oldingi tarjimalar saqlanadi
        merged[p["id"]] = {**merged.get(p["id"], {}), **p}
    result = sorted((p for p in merged.values() if p.get("text")),
                    key=lambda p: p["date"], reverse=True)[:LIMIT]
    add_translations(result)
    save_images(result)

    OUT.write_text(json.dumps(result, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"{len(fresh)} ta post olindi, jami {len(result)} ta saqlandi.")


if __name__ == "__main__":
    main()
