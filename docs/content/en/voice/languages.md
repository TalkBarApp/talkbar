---
title: Supported languages
description: Which languages TalkBar's interface, speech models, dictation, live translation and AI support, and which speech model to choose for your language.
navigation:
  icon: i-heroicons-globe-alt
---

TalkBar uses languages in several separate places, and each has its own list. The interface being available in a language doesn't mean TalkBar can transcribe that language with every speech model.

| What | Languages | Where to set it |
| --- | --- | --- |
| [Interface](#interface-languages) | 15 | **Settings → General → Application UI Language** |
| [Transcription](#transcription-languages) | Depends on the speech model | **Settings → Voice → Transcription** |
| [Dictation](#dictation) | Same as the speech model you use for dictation | **Settings → Voice → Dictation** |
| [Live translation](#live-translation) | 5 language pairs | **Settings → Voice → Speakers** |
| [Summaries and chats](#summaries-chats-and-notes) | 16, or your own for AI answers | New session, session details, **Settings → AI Providers → Advanced** |

## Interface languages

TalkBar's menus and screens are available in English, Español, Deutsch, Français, Italiano, Русский, Українська, Polski, Türkçe, Português (Brasil), Português (Portugal), 简体中文, 繁體中文, 日本語 and 한국어.

- Choosing an interface language changes the menus, screens, dates and numbers. It doesn't change the speech model or what TalkBar can transcribe.
- Some regional licenses include only certain interface languages. See [Plans and license](/data/plans-and-license).
- You can change any phrase for your language, and send your wording to the TalkBar team. See [Custom translations](/settings/general#custom-translations).

## Transcription languages

The speech model decides which spoken languages TalkBar can transcribe. All speech models run on your computer, and each is a separate download. Sizes and notes are in [Speech models](/voice/recording-and-transcription#speech-models).

| Speech model | Spoken languages | Choosing the language |
| --- | --- | --- |
| **Whisper Turbo** | 100 | **Auto-detect**, or pick from 16 |
| **Whisper Small** | 99: the same as Whisper Turbo, without Cantonese | **Auto-detect**, or pick from 16 |
| **Parakeet V3**, **Orukeet INT8** | 25 | Detects the language itself. You can't pick one. |
| **Canary 1B v2** | 25 | Pick from 10 |
| **Canary 180M Flash** | 4 | Pick from 4 |
| **GigaAM v3** | 1 | Russian only, so there is nothing to pick |

### Languages by speech model

This table lists every language you can pick, and every language Parakeet V3 and Canary 1B v2 cover. ● means you can pick the language in **Transcription language**. ○ means the model works with this language but you can't pick it. A dash means the model doesn't support it.

| Spoken language | Parakeet V3, Orukeet INT8 | Whisper Small, Whisper Turbo | Canary 1B v2 | Canary 180M Flash | GigaAM v3 |
| --- | --- | --- | --- | --- | --- |
| Arabic | — | ● | — | — | — |
| Bulgarian | ○ | ○ | ○ | — | — |
| Chinese | — | ● | — | — | — |
| Croatian | ○ | ○ | ○ | — | — |
| Czech | ○ | ○ | ○ | — | — |
| Danish | ○ | ○ | ○ | — | — |
| Dutch | ○ | ● | ● | — | — |
| English | ○ | ● | ● | ● | — |
| Estonian | ○ | ○ | ○ | — | — |
| Finnish | ○ | ○ | ○ | — | — |
| French | ○ | ● | ● | ● | — |
| German | ○ | ● | ● | ● | — |
| Greek | ○ | ○ | ○ | — | — |
| Hindi | — | ● | — | — | — |
| Hungarian | ○ | ○ | ○ | — | — |
| Italian | ○ | ● | ● | — | — |
| Japanese | — | ● | — | — | — |
| Korean | — | ● | — | — | — |
| Latvian | ○ | ○ | ○ | — | — |
| Lithuanian | ○ | ○ | ○ | — | — |
| Maltese | ○ | ○ | ○ | — | — |
| Polish | ○ | ● | ● | — | — |
| Portuguese | ○ | ● | ● | — | — |
| Romanian | ○ | ○ | ○ | — | — |
| Russian | ○ | ● | ● | — | ○ |
| Slovak | ○ | ○ | ○ | — | — |
| Slovenian | ○ | ○ | ○ | — | — |
| Spanish | ○ | ● | ● | ● | — |
| Swedish | ○ | ○ | ○ | — | — |
| Turkish | — | ● | — | — | — |
| Ukrainian | ○ | ● | ● | — | — |

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
Canary models don't detect the language reliably. Use one for a language you can pick, and pick it, instead of relying on **Auto-detect**.
::

### All Whisper languages

Whisper models can recognize these languages with **Auto-detect**. All of them work with Whisper Turbo, and all except Cantonese work with Whisper Small. Quality varies by language, so try a short recording first.

Afrikaans, Albanian, Amharic, Arabic, Armenian, Assamese, Azerbaijani, Bashkir, Basque, Belarusian, Bengali, Bosnian, Breton, Bulgarian, Burmese, Cantonese, Catalan, Chinese, Croatian, Czech, Danish, Dutch, English, Estonian, Faroese, Finnish, French, Galician, Georgian, German, Greek, Gujarati, Haitian Creole, Hausa, Hawaiian, Hebrew, Hindi, Hungarian, Icelandic, Indonesian, Italian, Japanese, Javanese, Kannada, Kazakh, Khmer, Korean, Lao, Latin, Latvian, Lingala, Lithuanian, Luxembourgish, Macedonian, Malagasy, Malay, Malayalam, Maltese, Maori, Marathi, Mongolian, Nepali, Norwegian, Norwegian Nynorsk, Occitan, Pashto, Persian, Polish, Portuguese, Punjabi, Romanian, Russian, Sanskrit, Serbian, Shona, Sindhi, Sinhala, Slovak, Slovenian, Somali, Spanish, Sundanese, Swahili, Swedish, Tagalog, Tajik, Tamil, Tatar, Telugu, Thai, Tibetan, Turkish, Turkmen, Ukrainian, Urdu, Uzbek, Vietnamese, Welsh, Yiddish, Yoruba.

### Which speech model to choose

TalkBar uses one model during the recording and another for **Enhance transcript** afterwards, so you can choose each separately.

| You speak | Live transcription model | After-recording enhancement model |
| --- | --- | --- |
| A language Parakeet V3 covers (see the table above) | **Parakeet V3** (the default) or **Orukeet INT8**, an updated version | **Whisper Turbo** (the default) |
| Any other language, including Turkish, Japanese, Korean, Chinese, Arabic and Hindi | **Whisper Small**. It's light, with lower accuracy. **Whisper Turbo** is more accurate but slow for live use. | **Whisper Turbo** |
| Only English, German, Spanish or French, and you want the smallest download | **Canary 180M Flash** | **Canary 180M Flash** or **Whisper Turbo** |

::callout{icon="i-heroicons-information-circle" color="gray"}
The interface languages 日本語, 한국어, 简体中文, 繁體中文 and Türkçe need a Whisper model for transcription. The default live model doesn't cover them, and changing the interface language doesn't switch the model for you.
::

With a Whisper model for live transcription, the [timeline](/settings/voice#timelines) refreshes every 30 seconds at the fastest.

### Set the spoken language

1. Open **Settings → Voice → Transcription**.
2. Choose the **Live transcription model** and **After-recording enhancement model**. Download them if needed.
3. Leave **Transcription language** on **Auto-detect**, or pick the language if words come out wrong. The list shows only languages your chosen models support. It's locked while your models detect the language themselves, as Parakeet V3, Orukeet INT8 and GigaAM v3 do. For Parakeet V3 and Orukeet, see the next section.

### Hold Parakeet V3 and Orukeet to one language

Parakeet V3 and Orukeet detect the language on their own. When they write words in the wrong language, for example English words in a Russian conversation, you can hold them to one language: they then write only that language's letters. It works for English, Russian, Ukrainian, Spanish, German, French, Italian, Portuguese, Dutch and Polish.

| Where | What it changes |
| --- | --- |
| **Transcription language** in [Settings → General → Session defaults](/settings/general#session-defaults) | The language new recordings start with. |
| **Transcription language** in the [New session window](/sessions/starting-a-session) | This session only, including scheduled sessions. A series keeps the choice for its next sessions. |
| **Transcription language** in the transcript **View** menu while recording | The rest of this recording, from the next words. **Continue session** keeps it. |
| **Dictation language** in [Settings → Voice → Dictation](/settings/voice#speech), or **Language** in the dictation panel's quick settings | Dictation only, separate from sessions. |

**Enhance transcript** and audio imports on these models use the language too. See [Session details](/sessions/session-details#enhance-transcript) and [Importing recordings](/sessions/importing-recordings).

::callout{icon="i-heroicons-exclamation-triangle" color="amber"}
Hold a recording only to a language everyone speaks in it. Speech in another language, including system audio, is dropped or comes out garbled. Languages written with the same letters (for example Spanish and Italian) can still mix; the hold mostly stops words in the wrong alphabet. Leave it on **Auto-detect** for conversations in several languages.
::

## Dictation

Dictation uses the same speech models. **Dictation model** follows your live model unless you pick another, so a language table above applies to the model you dictate with. **Dictation language** follows your **Transcription language** unless you lock it to one language. With Parakeet V3 or Orukeet, it has its own setting instead (see [Hold Parakeet V3 and Orukeet to one language](#hold-parakeet-v3-and-orukeet-to-one-language)). See [Dictation](/voice/dictation).

## Live translation

[Live translation](/voice/live-translation) works on these pairs. Each pair needs its own model of roughly 400 MB, and the translation runs on your computer.

| From | To |
| --- | --- |
| English | Russian |
| Russian | English |
| English | Spanish |
| English | German |
| English | French |

The audio must be in the **From** language, and the speech model must support it.

## Summaries, chats and notes

These settings control the language AI writes in, separately from the language spoken.

| What | Setting | Choices |
| --- | --- | --- |
| Summary, timeline and session title | **Summary language**, in the [New session window](/sessions/starting-a-session) and on the [session's summary](/sessions/session-details#summary) | **Auto**, which follows the language spoken, or one of the 16 languages below |
| A single chat | **Reply language**, in the chat's [**Answer using**](/chats-and-notes/ask-talkbar) menu | **Auto**, which uses **Response Language**, or one of the 16 languages below |
| AI answers overall | [**Response Language**](/settings/ai-providers#response-language) | **Auto (Application UI Language)**, any interface language, or your own |
| AI in notes | None | Keeps the language of the selected text or note. See [Notes](/chats-and-notes/notes#which-language-the-ai-writes-in). |

The 16 languages are English, Spanish, French, Italian, German, Portuguese, Dutch, Polish, Russian, Ukrainian, Chinese, Japanese, Korean, Turkish, Arabic and Hindi.

A summary can be in a different language from the speech. For example, you can record in Japanese with a Whisper model and get the summary in English. How well AI writes in a language depends on the [model you use](/ai/providers-and-models).

## Related

- [Recording and transcription](/voice/recording-and-transcription)
- [Settings → Voice](/settings/voice)
- [Dictation](/voice/dictation)
- [Live translation](/voice/live-translation)
- [Local models](/ai/local-models)
- [General settings](/settings/general)
