# Design System - "Signal Deck"

Questo design system e progettato per un personal site/CV premium B2B con focus:

- Product Manager identity dominante
- Credibilita tecnica senza look da developer portfolio
- Lettura veloce per recruiter + lettura profonda per hiring manager
- Esperienza desktop-first con mobile solido
- Stesso contenuto per screen e print (CV classico via `@media print`)

## 1) Brand Intent

**Personality**  
Preciso, affidabile, tech-forward, pragmatico.

**Visual direction**  
Neutrali sofisticati + un solo accento azzurro energia. Tipografia forte, griglia pulita, motion controllato.

**Non-goals**

- No template startup generico
- No estetica da agency/designer portfolio
- No effetti decorativi senza funzione

## 2) Foundations

## Color system

- Neutral ramp: struttura, testo, superfici.
- Accent ramp: azioni, evidenze, feedback interattivo.
- Semantic mapping: niente hex hardcoded nei componenti.

Core semantic colors:

- `background.canvas`: `#FCFDFE`
- `background.surface`: `#F4F6F8`
- `text.strong`: `#111827`
- `text.default`: `#2F3747`
- `text.subtle`: `#627086`
- `interactive.primary`: `#0098F0`
- `interactive.primaryHover`: `#0079C2`
- `border.default`: `#D3DAE4`

Dark-mode semantic mapping (estratto):

- `background.canvas`: `#0A0F19`
- `background.elevated`: `#1D2432`
- `text.strong`: `#F4F6F8`
- `text.default`: `#E9EDF2`
- `interactive.primary`: `#3AB6FF`
- `border.default`: `#223048`

Theme behavior:

- Toggle esplicito: `data-theme="light|dark"` su root
- Fallback automatico: `prefers-color-scheme`
- Persistenza consigliata: `localStorage` (chiave `signaldeck.theme`)

## Typography

- Heading: `Sora` (forte, contemporaneo, tecnico ma non rigido)
- Body: `Source Sans 3` (alta leggibilita)
- Mono/support: `JetBrains Mono`

Type scale:

- Display: `3.5rem` / `700`
- H1: `2.75rem` / `700`
- H2: `1.75rem` / `600`
- H3: `1.25rem` / `600`
- Body L: `1.125rem`
- Body: `1rem`
- Caption: `0.875rem`

## Spacing & layout

- 8pt logic con micro-step a 4px.
- Container desktop: max `1180px`.
- Grid desktop: 12 colonne.
- Grid tablet: 8 colonne.
- Grid mobile: 4 colonne.

## Motion

Motion intenzionale, non decorativa:

- Hero reveal
- Section reveal in scroll
- Card hover feedback
- Active section indicator

Token motion:

- Fast: `120ms`
- Base: `220ms`
- Slow: `420ms`
- Easing standard: `cubic-bezier(0.2, 0, 0, 1)`
- Easing emphasis: `cubic-bezier(0.22, 1, 0.36, 1)`

`prefers-reduced-motion: reduce` disabilita animazioni non essenziali.

## 3) Component Blueprint

## Hero

- Hero full-bleed (`100vw`) a piena altezza viewport (`100vh`) per impatto immediato
- Titolo forte con ruolo "Product Manager"
- Sottotitolo che esplicita background full-stack e dominio SaaS/IoT/device management
- CTA primarie: Contact, LinkedIn, Print/PDF
- Visual hero con foto mezzo busto B/N + geometria tecnica sobria (no forme playful)
- KPI/credibility chips opzionali (senza claim inventati)

## Sticky section nav

- Sempre visibile su desktop
- Evidenzia sezione attiva
- Shortcut rapido a Experience / Product Work / Media

## Experience timeline

- Blocco compatto per ogni ruolo: azienda, titolo, date, scope, contributi
- Layout leggibile anche in print (collassa in singola colonna)

## Case study cards (flagship)

Due blocchi principali:

- SaaS #1 IoT
- SaaS #2 Device Management

Entrambi con struttura costante:

- Problem space
- Users/customers
- Role + decision scope
- Key decisions
- Outcome/impact (solo verificato)

## Media cards

- Thumbnail 16:9
- Titolo + descrizione breve
- Contributo personale esplicito
- Link/Embed action chiara

## Skills confidence bars

Per screen e print usare barre con percentuali, organizzate per gruppi:

- Product
- Engineering
- Domain
- Communication

Regole:

- Percentuali realistiche e verificabili
- Stesso dato in web e print (single source of truth)
- Forte leggibilita anche in scala di grigi

## 4) Accessibility & i18n

- Contrasto minimo AA per testo e UI controls
- Focus visibile sempre (`2px` accent ring)
- Navigazione keyboard-first completa
- Language switch EN/IT sempre raggiungibile
- Nessuna localizzazione parziale: entrambe le lingue complete
- Light e dark theme devono mantenere contrasto AA su testo e controlli interattivi

## 5) Print Mode Contract (`@media print`)

La stessa pagina deve diventare CV classico:

- Singola colonna
- Elementi decorativi nascosti
- Nav/toggle/cta non essenziali nascosti
- Ombre, blur, gradient rimossi
- Tipografia e spaziature ottimizzate per A4
- Break controllati (`break-inside: avoid` sui blocchi critici)
- Layout consigliato: colonna laterale informativa + area contenuti principale (editoriale pulita)

## 6) Token Strategy for AI Agents

Formato scelto: JSON Design Tokens (DTCG style), perche:

- e machine-readable e deterministico
- mantiene relazioni semantiche tra token
- facilmente trasformabile in CSS vars, Tailwind config, TS types
- ottimo per pipeline AI-assisted (analisi, generazione UI, refactor)

File canonicale: `design-system/tokens/design-tokens.json`

Regole:

- Nessun valore raw nei componenti: usare token semantici
- Token primitivi separati da token semantici
- Stato componenti (`default`, `hover`, `focus`, `disabled`) tokenizzato

## 7) Deliverables In Repo

- Human guide: `design-system/DESIGN_SYSTEM.md`
- Visual proof: `design-system/preview.html`
- AI token source: `design-system/tokens/design-tokens.json`
- CSS export: `design-system/css/tokens.css`
- Base interaction + print stylesheet: `design-system/css/base.css`
- Portrait asset copy: `assets/propic_scontornata.png` and `design-system/assets/propic_scontornata.png`
- Print design concept mock section in preview (`#print-preview`)
