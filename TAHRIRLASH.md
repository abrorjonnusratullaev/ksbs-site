# Saytni tahrirlash bo'yicha qo'llanma

Barcha o'zgartirishlar GitHub saytida, brauzerda qilinadi. Saqlangandan keyin 1–2 daqiqada ksbs.uz da ko'rinadi.

## Fayllar qayerda

| Nima | Fayl |
|---|---|
| Rahbariyat | `data/rahbariyat.json` |
| O'qituvchilar | `data/oqituvchilar.json` |
| Telefon, manzil, pochta, qabul ma'lumotlari | `data/school.json` |
| Odamlar rasmlari | `assets/odamlar/` papkasi |

## Faylni ochish va saqlash

1. github.com/abrorjonnusratullaev/ksbs-site ga kiring.
2. `data` papkasini, keyin kerakli faylni bosing (masalan `oqituvchilar.json`).
3. O'ng tepadagi **qalam** belgisini bosing.
4. O'zgartiring.
5. O'ng tepadagi yashil **Commit changes...** tugmasini, keyin yana **Commit changes** ni bosing.

## Bir kishi bloki

Har bir kishi shu ko'rinishdagi bitta blok:

```
  {
    "rasm": "",
    "uz": {"ism": "Familiya Ism", "lavozim": "Fizika o'qituvchisi", "malumot": "Qarshi davlat universiteti"},
    "en": {"ism": "Familiya Ism", "lavozim": "Physics Teacher", "malumot": "Karshi State University"}
  },
```

- **Qo'shish:** mavjud bir blokni nusxalab, kerakli joyga qo'ying va matnni almashtiring. Saytda tartib fayldagi tartib bilan bir xil.
- **O'zgartirish:** faqat qo'shtirnoq ichidagi matnni o'zgartiring.
- **O'chirish:** `{` dan `},` gacha butun blokni o'chiring.

## Rasm qo'shish

1. `assets/odamlar` papkasiga kiring → **Add file** → **Upload files** → rasmni tashlang → **Commit changes**.
   Fayl nomi lotincha va bo'sh joysiz bo'lsin, masalan `achilov-elbek.jpg`.
2. O'sha kishining blokida yozing: `"rasm": "achilov-elbek.jpg",`

Kvadrat (yoki yuz markazda bo'lgan) rasm eng yaxshi chiqadi. Rasm yo'q bo'lsa, ism bosh harflari chiqadi.

## Xato qilmaslik uchun 3 qoida

1. Bloklar orasida vergul bo'ladi, **ro'yxatdagi oxirgi blokdan keyin vergul bo'lmaydi** (`}` dan keyin `]` keladi).
2. Matn ichida qo'shtirnoq `"` ishlatmang. O'zbekcha `'` (o'qituvchi, g'olib) mumkin.
3. Xato qilinsa, faqat o'sha bo'lim saytda yashirinadi va GitHub sizga xat yuboradi.
   Tuzatish uchun faylni qayta ochib, oxirgi o'zgarishni tekshiring yoki menga yozing.
