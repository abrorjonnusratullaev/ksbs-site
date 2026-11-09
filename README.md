# ksbs.uz — maktab sayti

Oddiy statik sayt (HTML/CSS/JS). Server, ma'lumotlar bazasi yoki pullik xizmat kerak emas.

## Hosting: GitHub Pages (bepul, cheklovsiz muddat)

GitHub Pages ochiq (public) repozitoriy uchun **butunlay bepul**, sinov muddati yo'q, karta so'ramaydi.
Firebase'dagi kabi "1 yildan keyin pul to'lash" holati bo'lmaydi. HTTPS (SSL) ham bepul.
Yagona xarajat — domenni (ksbs.uz) har yili uzaytirish, u ahost.uz'da qoladi.

### 1. Repozitoriy yaratish
1. https://github.com da ro'yxatdan o'ting (bepul).
2. **New repository** → nomi masalan `karshiimi-site`, **Public** belgilang.
3. Shu papkadagi barcha fayllarni repozitoriyga yuklang (yoki Claude'ga repo nomini ayting — o'zi yuklaydi).

### 2. Pages'ni yoqish
1. Repo → **Settings → Pages**.
2. *Source*: **Deploy from a branch**, branch: `main`, papka: `/ (root)` → **Save**.
3. *Custom domain*: `ksbs.uz` → **Save**.
4. DNS ishlagandan so'ng **Enforce HTTPS** ni belgilang.

### 3. ahost.uz'da DNS sozlash
ahost panel → domenlar → ksbs.uz → DNS boshqaruvi. Eski sayt (Firebase) yozuvlarini o'chiring va quyidagilarni qo'shing:

| Turi  | Nomi (Host) | Qiymati                    |
|-------|-------------|----------------------------|
| A     | @           | 185.199.108.153            |
| A     | @           | 185.199.109.153            |
| A     | @           | 185.199.110.153            |
| A     | @           | 185.199.111.153            |
| CNAME | www         | `<github-login>.github.io` |

DNS o'zgarishi bir necha daqiqadan 24 soatgacha davom etadi.

> Eslatma: agar domen ahost'ning DNS serverlarida emas (masalan Firebase/Cloudflare NS ga o'zgartirilgan bo'lsa), avval NS ni ahost'nikiga qaytaring.

### 4. Firebase'ni o'chirish
DNS GitHub'ga o'tib, sayt ochilgandan keyin Firebase konsolda **Hosting → domenni olib tashlash**, so'ng loyihani o'chirish mumkin. Billing'ga ulangan karta bo'lsa, uni ham uzib qo'ying.

## Telegram yangiliklari qanday ishlaydi
- `.github/workflows/telegram-news.yml` har 30 daqiqada GitHub serverida ishga tushadi (bepul).
- U `https://t.me/s/<kanal>` ochiq sahifasidan so'nggi postlarni olib, `data/news.json` ga yozadi.
- Har bir yangi post avtomatik ingliz tiliga tarjima qilinadi (bepul Google Translate, u ishlamasa MyMemory). Rus tilidagi postlar o'zbekchaga ham o'giriladi. Tarjima faqat bir marta qilinadi va `news.json` ichida saqlanadi. Tarjima vaqtincha ishlamasa, inglizcha sahifada o'zbekcha matn chiqadi va keyingi safar yana urinib ko'riladi.
- Sayt shu fayldan yangiliklarni ko'rsatadi. Kanalga post qo'yish kifoya, saytga hech narsa qilish shart emas.
- **Talab:** kanal ochiq (public) bo'lishi va `@username`ga ega bo'lishi kerak.
- Darhol yangilash: repo → **Actions → Telegram yangiliklarini yangilash → Run workflow**.

## Ma'lumotlarni o'zgartirish
Hammasi bitta faylda: `data/school.json` (o'zbek va ingliz matnlari yonma-yon). Bo'sh qoldirilgan maydon (`""`) saytda ko'rsatilmaydi.
- `phone`, `email` — rasmiy telefon va pochta.
- `map_coords` — xaritada aniq nuqta uchun koordinata, masalan `"65.7890,38.8600"` (uzunlik,kenglik).
- `teachers` — o'qituvchilar ro'yxati. Har biri quyidagicha:
  ```json
  {"name": "Familiya Ism", "photo": "assets/teachers/ism.jpg",
   "uz": {"subject": "Matematika", "info": "Oliy toifa, 12 yillik tajriba"},
   "en": {"subject": "Mathematics", "info": "Highest category, 12 years of experience"}}
  ```
  Rasmni `assets/teachers/` papkaga yuklang (kichik hajmda, 600px atrofida).

## SAT sahifasi (yashirin)
`sat.html` tayyor, lekin menyuda ko'rinmaydi va qidiruv tizimlariga yopiq. Ochish uchun `data/school.json` da `"show_sat": true` qiling.

## Maktab pochtasi (bepul)
Domen olingach, `info@domen.uz` kabi manzil uchun bepul variant: **Zoho Mail** (bepul tarif). Pochta faqat MX/TXT yozuvlarini qo'shadi va saytga xalal bermaydi.
