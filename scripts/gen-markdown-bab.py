#!/usr/bin/env python3
"""
Generate/update markdown download files for Bab 1-4 with citation system.
Uses manual approach to avoid regex issues with escaped quotes.
"""

import os

download_dir = '/home/z/my-project/download'

# ─────────────────────────────────────────────────
# BAB 1 — Jazirah Arab Sebelum Islam
# ─────────────────────────────────────────────────
bab1_refs = """¹ Ibnu Hisyam, *As-Sirah An-Nabawiyah*, Jilid 1, Bab: Dhikr asl al-'Arab wa amr 'Amr ibn 'Amir wa Amr al-Fil, Hal. 1–70, Dar al-Ma'rifah, Beirut, tahqiq Musthafa as-Saqqa dkk.

² Ibnu Ishaq, *Sirah Rasulullah*, riwayat Ibnu Hisyam, dalam: *As-Sirah An-Nabawiyah*, Jilid 1, Hal. 1–70, Dar al-Ma'rifah, Beirut

³ Al-Baladzuri, *Futuh al-Buldan*, Hal. 67 (perdagangan pra-Islam), Dar al-Kutub al-'Ilmiyyah, Beirut, 1419 H, tahqiq Radwan Muhammad Radwan

⁴ Al-Mas'udi, *Muruj adz-Dzahab wa Ma'adin al-Jawahir*, Jilid 2, Bab: Dhikr Makkah wa akhbariha wa bina' al-Bayt, Hal. 275–310, Dar al-Hijrah, Qom, 1409 H, tahqiq As'ad Daghir

⁵ Yaqut al-Hamawi, *Mu'jam al-Buldan*, Jilid 5, Entri: Makkah, Hal. 286–297, Dar Shadir, Beirut, 1397 H / 1977 M"""

bab1_story = None  # Will read from content.ts

# ─────────────────────────────────────────────────
# BAB 2 — Makkah: Kota di Lembah Gersang
# ─────────────────────────────────────────────────
bab2_refs = """¹ Ibnu Hisyam, *As-Sirah An-Nabawiyah*, Jilid 1, Bab: Dhikr asl al-'Arab wa amr 'Amr ibn 'Amir, Hal. 1–70, Dar al-Ma'rifah, Beirut

² Al-Azraqi, *Akhbar Makkah wa-ma Ja'a fiha min al-Athar*, Juz' 1, Bab: Dhikr Bina' Quraisy al-Ka'bah fi al-Jahiliyyah, Hal. 157–174, Dar al-Andalus, Beirut, 1403 H / 1983 M, tahqiq Rushdi as-Salih Malhas

³ Al-Azraqi, *Akhbar Makkah wa-ma Ja'a fiha min al-Athar*, Juz' 2, Bab: Ma Ja'a fi Ikhraj Jibril Zamzam li-Umm Isma'il, Hal. 39–61, Dar al-Andalus, Beirut, 1403 H / 1983 M, tahqiq Rushdi as-Salih Malhas

⁴ Al-Fasi, *Shifa' al-Gharam bi-Akhbar al-Balad al-Haram*, Jilid 1, al-Bab al-Awwal: fi Dhikr Asma' al-Madinah wa-Awwal Man Sakaniha, Dar al-Kitab al-'Arabi, Beirut, 1405 H / 1985 M, tahqiq Umar Abd as-Salam Tadmuri

⁵ Al-Fasi, *Shifa' al-Gharam bi-Akhbar al-Balad al-Haram*, Jilid 2, al-Bab al-'Ishrun: fi Dhikr Hafr Bi'r Zamzam wa-'Ilajiha, Dar al-Kitab al-'Arabi, Beirut, 1405 H / 1985 M, tahqiq Umar Abd as-Salam Tadmuri

⁶ Yaqut al-Hamawi, *Mu'jam al-Buldan*, Jilid 5, Entri: Makkah, Hal. 286–297, Dar Shadir, Beirut, 1397 H / 1977 M"""

# ─────────────────────────────────────────────────
# BAB 3 — Ka'bah: Bangunan Tua yang Dimuliakan
# ─────────────────────────────────────────────────
bab3_refs = """¹ QS Ibrahim: 35-41

² QS Al-Baqarah: 125-127

³ QS Al-Hajj: 26-30

⁴ Ibnu Hisyam, *As-Sirah An-Nabawiyah*, Jilid 1, Bab: Dhikr Bina' Ibrahim al-Bayt, Hal. 42-55, Dar al-Ma'rifah, Beirut

⁵ Al-Azraqi, *Akhbar Makkah*, Juz' 1, Bab: Dhikr Bina' Ibrahim al-Ka'bah, Hal. 30-45, Dar al-Andalus, Beirut

⁶ Ath-Thabari, *Tarikh ar-Rusul wa al-Muluk*, Jilid 1, Hal. 267-276, Dar al-Kutub al-'Ilmiyyah, Beirut"""

# ─────────────────────────────────────────────────
# BAB 4 — Suku Quraisy
# ─────────────────────────────────────────────────
bab4_refs = """¹ QS Quraisy: 1-4

² Ibnu Hisyam, *As-Sirah An-Nabawiyah*, Jilid 1, Bab: Dhikr Qusay bin Kilab wa Fadl Quraysy, Hal. 55-70, Dar al-Ma'rifah, Beirut

³ Ath-Thabari, *Tarikh ar-Rusul wa al-Muluk*, Jilid 2, Hal. 210-230, Dar al-Kutub al-'Ilmiyyah, Beirut

⁴ Al-Azraqi, *Akhbar Makkah*, Juz' 1, Bab: Dhikr Qusay wa Bina'ih Dar an-Nadwah, Hal. 68-85, Dar al-Andalus, Beirut

⁵ Ibnu Sa'd, *Ath-Thabaqat al-Kubra*, Jilid 1, Hal. 40-52, Dar Shadir, Beirut"""

# ─────────────────────────────────────────────────
# Extract story texts from content.ts using line-based approach
# ─────────────────────────────────────────────────
def extract_story_between(content, start_marker, end_marker):
    """Extract text between two markers."""
    start = content.find(start_marker)
    if start == -1:
        return None
    start += len(start_marker)
    end = content.find(end_marker, start)
    if end == -1:
        return None
    return content[start:end].strip()

with open('/home/z/my-project/src/data/content.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract stories using unique line markers
stories = {}
for bab_num in range(1, 5):
    # Find story for each bab
    start_pattern = f"story: `"
    # Find the nth occurrence (for bab-n)
    pos = 0
    for i in range(bab_num):
        pos = content.find(start_pattern, pos)
        if pos == -1:
            break
        pos += len(start_pattern)
    
    if pos == -1:
        print(f"❌ Could not find story for bab-{bab_num}")
        continue
    
    # Find the closing backtick
    end_pos = content.find("`,\n", pos)
    if end_pos == -1:
        end_pos = content.find("`,\n    ", pos)
    
    if end_pos == -1:
        print(f"❌ Could not find end of story for bab-{bab_num}")
        continue
    
    story = content[pos:end_pos]
    stories[bab_num] = story

def story_to_md(story_text):
    """Convert story markers to markdown equivalents."""
    # Replace » "text"\n— ref with blockquote
    import re
    story_text = re.sub(
        r'» "(.+?)"\n— (.+)',
        r'> *"\1"*\n> — \2',
        story_text
    )
    # Replace ⟩ with italic
    story_text = re.sub(r'^⟩ (.+)$', r'*\1*', story_text, flags=re.MULTILINE)
    return story_text

# Generate files
bab_configs = [
    (1, 'Jazirah Arab Sebelum Islam', 'Sebelum Cahaya Menyinari Dunia', bab1_refs, 'bab-1-jazirah-arab-sebelum-islam.md'),
    (2, 'Makkah: Kota di Lembah Gersang', 'Lembah Gersang yang Menyimpan Sejarah Besar', bab2_refs, 'bab-2-makkah-kota-di-lembah-gersang.md'),
    (3, "Ka'bah: Bangunan Tua yang Dimuliakan", "Dari tangan Nabi Ibrahim عليه السلام ke tangan Quraisy", bab3_refs, 'bab-3-kabah-bangunan-tua-yang-dimuliakan.md'),
    (4, 'Suku Quraisy', "Penjaga Ka'bah dan penguasa Makkah", bab4_refs, 'bab-4-suku-quraisy.md'),
]

for num, title, subtitle, refs, filename in bab_configs:
    if num not in stories:
        print(f"❌ No story for bab {num}")
        continue
    
    story_md = story_to_md(stories[num])
    
    md = f"""# Bab {num}
## {title}
*{subtitle}*

---

{story_md}

---

**Referensi:**

{refs}
"""
    
    filepath = os.path.join(download_dir, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(md)
    
    print(f"✅ Generated {filename}")

print("\nDone!")
