#!/usr/bin/env python3
"""
Backport citation system to Bab 1-4.
Adds inline superscript citations to story text in content.ts.

Citation Rule: number = unique source, NOT order of appearance.
Same source always = same number throughout the chapter.
"""

import re

# Read the file
with open('/home/z/my-project/src/data/content.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# ─────────────────────────────────────────────────
# BAB 1 — Jazirah Arab Sebelum Islam
# ─────────────────────────────────────────────────
# ¹ = Ibnu Hisyam, As-Sirah An-Nabawiyah, Jilid 1
# ² = Ibnu Ishaq, Sirah Rasulullah
# ³ = Al-Baladzuri, Futuh al-Buldan
# ⁴ = Al-Mas'udi, Muruj adz-Dzahab
# ⁵ = Yaqut al-Hamawi, Mu'jam al-Buldan

bab1_replacements = [
    # Kafilah/perdagangan
    ("Mereka adalah kafilah dagang.\n\nUrat nadi yang menghidupkan Jazirah Arab.",
     "Mereka adalah kafilah dagang.¹²\n\nUrat nadi yang menghidupkan Jazirah Arab."),
    
    # Jalur perdagangan Yaman-Syam
    ("Dari Yaman di selatan.\n\nMenuju Syam di utara.",
     "Dari Yaman di selatan.³\n\nMenuju Syam di utara."),
    
    # Jazirah Arab di tengah jalur
    ("Dan Jazirah Arab berada tepat di tengah jalur itu.",
     "Dan Jazilah Arab berada tepat di tengah jalur itu.³"),
    
    # Suku system
    ("Dan bagi orang Arab saat itu, suku adalah segalanya.",
     "Dan bagi orang Arab saat itu, suku adalah segalanya.¹²"),
    
    # Perang Al-Basus
    ("Perang Al-Basus adalah salah satunya.",
     "Perang Al-Basus adalah salah satunya.¹⁴"),
    
    # Syair dan budaya
    ("Mereka juga mencintai syair.",
     "Mereka juga mencintai syair.¹⁴"),
    
    # Berhala
    ("Berhala-berhala mulai memenuhi kehidupan mereka.",
     "Berhala-berhala mulai memenuhi kehidupan mereka.¹²"),
    
    # Ka'bah built by Ibrahim
    ("Menurut riwayat yang diwariskan turun-temurun, Ka'bah dibangun oleh Nabi Ibrahim عليه السلام dan putranya, Nabi Ismail عليه السلام.",
     "Menurut riwayat yang diwariskan turun-temurun, Ka'bah dibangun oleh Nabi Ibrahim عليه السلام dan putranya, Nabi Ismail عليه السلام.⁴⁵"),
    
    # Kaum Hanif
    ("Mereka dikenal sebagai kaum Hanif.",
     "Mereka dikenal sebagai kaum Hanif.¹²"),
    
    # Kaum Hanif mencari agama Ibrahim
    ("Tetapi mereka tetap mencari agama Nabi Ibrahim عليه السلام.",
     "Tetapi mereka tetap mencari agama Nabi Ibrahim عليه السلام.¹"),
]

# ─────────────────────────────────────────────────
# BAB 2 — Makkah: Kota di Lembah Gersang
# ─────────────────────────────────────────────────
# ¹ = Ibnu Hisyam, As-Sirah An-Nabawiyah, Jilid 1
# ² = Al-Azraqi, Akhbar Makkah, Juz' 1
# ³ = Al-Azraqi, Akhbar Makkah, Juz' 2 (Zamzam)
# ⁴ = Al-Fasi, Shifa' al-Gharam, Jilid 1
# ⁵ = Al-Fasi, Shifa' al-Gharam, Jilid 2 (Zamzam)
# ⁶ = Yaqut al-Hamawi, Mu'jam al-Buldan

bab2_replacements = [
    # Lembah Makkah geography
    ("Lembah itu bernama Makkah.",
     "Lembah itu bernama Makkah.⁴⁶"),
    
    # Tidak ada sungai, tanah kering
    ("Sebuah lembah yang seharusnya tidak ada alasan untuk ditinggali.",
     "Sebuah lembah yang seharusnya tidak ada alasan untuk ditinggali.⁶"),
    
    # Zamzam well
    ("Sumur yang disebut Zamzam.",
     "Sumur yang disebut Zamzam.³⁵"),
    
    # Zamzam = alasan Makkah ada
    ("Zamzam adalah alasan Makkah ada.",
     "Zamzam adalah alasan Makkah ada.³⁵"),
    
    # Hajar story
    ("Hajar رضي الله عنها.\n\nIbu dari Nabi Ismail عليه السلام.",
     "Hajar رضي الله عنها.³\n\nIbu dari Nabi Ismail عليه السلام."),
    
    # Air datang dari bawah tanah
    ("Atas izin Allah ﷻ.\n\nAir yang tidak habis.",
     "Atas izin Allah ﷻ.³⁵\n\nAir yang tidak habis."),
    
    # Jalur perdagangan
    ("Setiap kafilah yang melintas di jalur perdagangan utara-selatan harus berhenti di sini.",
     "Setiap kafilah yang melintas di jalur perdagangan utara-selatan harus berhenti di sini.¹⁶"),
    
    # Makkah = titik di tengah jalan
    ("Makkah adalah titik di tengah jalan.",
     "Makkah adalah titik di tengah jalan.²⁶"),
    
    # Ka'bah built by Ibrahim/Ismail
    ("Menurut riwayat, bangunan ini dibangun oleh Nabi Ibrahim عليه السلام dan putranya, Nabi Ismail عليه السلام.",
     "Menurut riwayat, bangunan ini dibangun oleh Nabi Ibrahim عليه السلام dan putranya, Nabi Ismail عليه السلام.²"),
    
    # Quraisy penjaga Ka'bah
    ("Suku Quraisy yang memegang amanah itu.",
     "Suku Quraisy yang memegang amanah itu.²"),
    
    # Kedudukan Quraisy
    ("Menjaga Ka'bah berarti memikul amanah yang dihormati oleh seluruh suku.",
     "Menjaga Ka'bah berarti memikul amanah yang dihormati oleh seluruh suku.²⁴"),
]

# ─────────────────────────────────────────────────
# BAB 3 — Ka'bah: Bangunan Tua yang Dimuliakan
# ─────────────────────────────────────────────────
# ¹ = QS Ibrahim: 35-41
# ² = QS Al-Baqarah: 125-127
# ³ = QS Al-Hajj: 26-30
# ⁴ = Ibnu Hisyam, As-Sirah An-Nabawiyah, Jilid 1
# ⁵ = Al-Azraqi, Akhbar Makkah, Juz' 1
# ⁶ = Ath-Thabari, Tarikh ar-Rusul wa al-Muluk

bab3_replacements = [
    # Ka'bah = bangunan kubus
    ("Bangunan itu bernama Ka'bah.",
     "Bangunan itu bernama Ka'bah.⁵⁶"),
    
    # Ibrahim built Ka'bah
    ("Riwayat yang diwariskan turun-temurun menyebutkan bahwa bangunan ini pertama kali dibangun oleh Nabi Ibrahim عليه السلام.",
     "Riwayat yang diwariskan turun-temurun menyebutkan bahwa bangunan ini pertama kali dibangun oleh Nabi Ibrahim عليه السلام.⁴⁵⁶"),
    
    # Ibrahim bukan untuk berhala
    ("Ibrahim tidak membangun Ka'bah untuk dirinya sendiri.\n\nIa membangunnya karena diperintahkan.",
     "Ibrahim tidak membangun Ka'bah untuk dirinya sendiri.²\n\nIa membangunnya karena diperintahkan."),
    
    # Ismail membantu pembangunan
    ("Putranya menemani pembangunan itu.\n\nIsmail.",
     "Putranya menemani pembangunan itu.⁴⁵\n\nIsmail."),
    
    # Mereka membangun rumah Allah di atas tanah
    ("Mereka membangun rumah Allah ﷻ di atas tanah yang sudah disaksikan oleh doa.",
     "Mereka membangun rumah Allah ﷻ di atas tanah yang sudah disaksikan oleh doa.²³"),
    
    # Ibrahim berdoa — QS Ibrahim
    ("Al-Qur'an mengabadikan sebagian doanya dalam Al-Qur'an:",
     "Al-Qur'an mengabadikan sebagian doanya dalam Al-Qur'an:¹"),
    
    # Doa itu terdengar
    ("Dan Allah ﷻ mengabulkannya.\n\nBerabad-abad kemudian.",
     "Dan Allah ﷻ mengabulkannya.¹\n\nBerabad-abad kemudian."),
    
    # Berhala masuk Ka'bah
    ("Hingga ratusan.\n\nKa'bah yang dibangun untuk mengesakan Allah ﷻ, kini dipenuhi oleh benda-benda yang manusia buat sendiri.",
     "Hingga ratusan.⁴⁵⁶\n\nKa'bah yang dibangun untuk mengesakan Allah ﷻ, kini dipenuhi oleh benda-benda yang manusia buat sendiri."),
    
    # Masih ada yang ingat kisah Ibrahim
    ("Masih ada yang menceritakan kisah Ibrahim.",
     "Masih ada yang menceritakan kisah Ibrahim.⁴⁶"),
    
    # Ka'bah menunggu
    ("Menunggu seseorang yang akan mengembalikan rumah ini kepada Allah ﷻ yang memintanya dibangun.",
     "Menunggu seseorang yang akan mengembalikan rumah ini kepada Allah ﷻ yang memintanya dibangun.¹²³"),
]

# ─────────────────────────────────────────────────
# BAB 4 — Suku Quraisy
# ─────────────────────────────────────────────────
# ¹ = QS Quraisy: 1-4
# ² = Ibnu Hisyam, As-Sirah An-Nabawiyah, Jilid 1
# ³ = Ath-Thabari, Tarikh ar-Rusul wa al-Muluk
# ⁴ = Al-Azraqi, Akhbar Makkah, Juz' 1
# ⁵ = Ibnu Sa'd, Ath-Thabaqat al-Kubra

bab4_replacements = [
    # Quraisy - kehormatan dari Ka'bah
    ("Itulah sumber segala kehormatan Quraisy.\n\nBukan kekuatan militer.",
     "Itulah sumber segala kehormatan Quraisy.²⁴\n\nBukan kekuatan militer."),
    
    # Qusay bin Kilab
    ("Qusay bin Kilab.\n\nLelaki yang menyatukan Quraisy dan membawa mereka ke dalam lembah Makkah.",
     "Qusay bin Kilab.²³⁵\n\nLelaki yang menyatukan Quraisy dan membawa mereka ke dalam lembah Makkah."),
    
    # Khuza'ah
    ("Khuza'ah.\n\nMereka masuk ketika keturunan Ismail عليه السلام mulai tersebar dan melemah.",
     "Khuza'ah.²⁴\n\nMereka masuk ketika keturunan Ismail عليه السلام mulai tersebar dan melemah."),
    
    # Qusay mengambil kembali Makkah
    ("Dengan kecerdikan dan keberanian, ia mengambil kembali Makkah.",
     "Dengan kecerdikan dan keberanian, ia mengambil kembali Makkah.²³"),
    
    # Hijabah, Siqayah, Rifadah, Liwa', Dar an-Nadwah
    ("Untuk pertama kalinya, Quraisy memiliki pembagian peran yang jelas.",
     "Untuk pertama kalinya, Quraisy memiliki pembagian peran yang jelas.²⁴"),
    
    # Dar an-Nadwah
    ("Qusay membangun Dar an-Nadwah — rumah musyawarah.\n\nBangunan itu menjadi pusat segala keputusan.",
     "Qusay membangun Dar an-Nadwah — rumah musyawarah.⁴\n\nBangunan itu menjadi pusat segala keputusan."),
    
    # Hashim
    ("Hashim.\n\nKakek Nabi Muhammad ﷺ.",
     "Hashim.²³\n\nKakek Nabi Muhammad ﷺ."),
    
    # Hashim memulai perjalanan dagang
    ("Maka ia memulai perjalanan dagang ke Syam di musim panas.\n\nDan ke Yaman di musim dingin.",
     "Maka ia memulai perjalanan dagang ke Syam di musim panas.²³\n\nDan ke Yaman di musim dingin."),
    
    # QS Quraisy — already has verse block, add citation to context
    ("Al-Qur'an sendiri menyebut nikmat ini:",
     "Al-Qur'an sendiri menyebut nikmat ini:¹"),
    
    # Abdul Muthalib
    ("Lelaki yang menemukan kembali sumur Zamzam setelah bertahun-tahun terkubur.",
     "Lelaki yang menemukan kembali sumur Zamzam setelah bertahun-tahun terkubur.²⁴⁵"),
    
    # Abdul Muthalib bukan raja
    ("Abdul Muthalib bukan raja.\n\nTapi pengaruhnya lebih besar dari raja.",
     "Abdul Muthalib bukan raja.²⁵\n\nTapi pengaruhnya lebih besar dari raja."),
]

# Apply all replacements
all_replacements = bab1_replacements + bab2_replacements + bab3_replacements + bab4_replacements

changes = 0
for old, new in all_replacements:
    if old in content:
        content = content.replace(old, new, 1)
        changes += 1
        print(f"✅ Applied: {old[:50]}...")
    else:
        print(f"❌ NOT FOUND: {old[:60]}...")

print(f"\n{changes}/{len(all_replacements)} replacements applied")

# Write back
with open('/home/z/my-project/src/data/content.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done! content.ts updated.")
