#!/usr/bin/env python3
"""
Generate spoken Hebrew letter-NAME audio as MP3s using gTTS.
Pulls real Hebrew voice audio from the web, saves to ./sounds/.
Will NOT overwrite the feedback files (correct.mp3 / incorrect.mp3).
"""

from gtts import gTTS
import os, time

SOUNDS_DIR = os.path.join(os.path.dirname(__file__), 'sounds')

# (audio_filename, hebrew_name_with_nikud)
# nikud is included so the web voice pronounces the name clearly.
LETTERS = [
    ('alef',   'אָלֶף'),
    ('bet',    'בֵּית'),
    ('gimel',  'גִּימֶל'),
    ('dalet',  'דָּלֶת'),
    ('he',     'הֵא'),
    ('vav',    'וָו'),
    ('zayin',  'זַיִן'),
    ('chet',   'חֵית'),
    ('tet',    'טֵית'),
    ('yod',    'יוֹד'),
    ('kaf',    'כַּף'),
    ('lamed',  'לָמֶד'),
    ('mem',    'מֵם'),
    ('nun',    'נוּן'),
    ('samech', 'סָמֶךְ'),
    ('ayin',   'עַיִן'),
    ('pe',     'פֵּא'),
    ('tsadi',  'צָדִי'),
    ('kuf',    'קוֹף'),
    ('resh',   'רֵישׁ'),
    ('shin',   'שִׁין'),
    ('tav',    'תָּו'),
]

# (audio_filename, sound_syllable)
# Each is the letter voiced with a patach (…a) — the standard way Hebrew
# letter SOUNDS are demonstrated to kids (בַּ = "ba", שַׁ = "sha" …).
# Files are prefixed snd_ so they never clash with the name files.
SOUNDS = [
    ('snd_alef',   'אַ'),
    ('snd_bet',    'בַּ'),
    ('snd_gimel',  'גַּ'),
    ('snd_dalet',  'דַּ'),
    ('snd_he',     'הַ'),
    ('snd_vav',    'וַ'),
    ('snd_zayin',  'זַ'),
    ('snd_chet',   'חַ'),
    ('snd_tet',    'טַ'),
    ('snd_yod',    'יַ'),
    ('snd_kaf',    'כַּ'),
    ('snd_lamed',  'לַ'),
    ('snd_mem',    'מַ'),
    ('snd_nun',    'נַ'),
    ('snd_samech', 'סַ'),
    ('snd_ayin',   'עַ'),
    ('snd_pe',     'פַּ'),
    ('snd_tsadi',  'צַ'),
    ('snd_kuf',    'קַ'),
    ('snd_resh',   'רַ'),
    ('snd_shin',   'שַׁ'),
    ('snd_tav',    'תַּ'),
]

PROTECTED = {'correct', 'incorrect'}

generated, errors = [], []

for filename, text in LETTERS + SOUNDS:
    if filename in PROTECTED:
        continue
    out_path = os.path.join(SOUNDS_DIR, f'{filename}.mp3')
    print(f'  {filename}.mp3  ("{text}")', end='', flush=True)
    try:
        # lang 'iw' is Google's legacy code for Hebrew (works reliably in gTTS)
        tts = gTTS(text=text, lang='iw', slow=True)
        tts.save(out_path)
        generated.append(filename)
        print(' ✓')
        time.sleep(0.3)   # be polite to the server
    except Exception as e:
        errors.append((filename, str(e)))
        print(f' ✗ {e}')

print(f'\nDone. Generated: {len(generated)}  Errors: {len(errors)}')
for f, e in errors:
    print(f'  ERROR {f}: {e}')
