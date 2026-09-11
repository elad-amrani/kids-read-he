# kids-read-he · אָלֶף־בֵּית בְּכֵיף

A Hebrew alef-bet learning app for kids, built with spaced repetition.
Sibling of the English [kids-read](https://elad-amrani.github.io/kids-read/).

Teaches the **22 Hebrew letters** — both the letter **name** (spoken) and its
reading **sound** (shown) — in two quiz modes:

- **letter → name** — see the letter, pick/hear its name
- **name → letter** — hear the name, pick the letter

Progress is stored locally with a simplified SM-2 spaced-repetition schedule, so
letters come back for review right before they'd be forgotten.

## Audio

Letter-name audio is pre-fetched from the web (Google TTS via `gTTS`) and shipped
as MP3s in `sounds/`, so playback is instant and identical on every device.

Regenerate with:

```bash
pip install gtts
python3 generate_letters.py
```
