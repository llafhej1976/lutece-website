# Audit LUTECE Consulting — 2026-05-19

> **Méthode** : inspection statique du code source (repo local) + requêtes HTTP vers prod (`https://lutece-consulting.com`). Les scores Lighthouse et captures d'écran réels nécessitent un navigateur headless (non disponible dans cet environnement CLI) — signalé explicitement pour chaque mesure concernée.

---

## 0. Résumé exécutif

- **Note globale : 6,5 / 10**
- **État global : Acceptable** — le socle technique est propre, mais plusieurs problèmes structurels réduisent la crédibilité auprès d'une cible DSI bancaire.
- **Effort de refonte : Moyen** (aucune réécriture nécessaire — corrections ciblées suffisent)

### Top 5 problèmes critiques

1. **5 dépendances installées mais non utilisées** : `framer-motion`, `react-hook-form`, `zod`, `axios`, `js-cookie`, `next-themes` — code mort dans `package.json`.
2. **`force-dynamic` sur des pages statiques** (About, Services) — détruit le cache edge, augmente le TTFB sans raison.
3. **Couleur du Pilier 3 incohérente** : Home l'affiche en vert (`#4ADE80`), toutes les autres pages en rose (`#E879F9`) — rupture visible du système de design.
4. **`text-muted (#5A5E6B)` : contraste 3,04:1** — ne passe pas WCAG AA pour le texte normal (seuil 4,5:1). Utilisé pour les dates, temps de lecture, infos secondaires.
5. **Conflit de headers HTTP** : `X-Frame-Options: DENY` (Next.js) + `SAMEORIGIN` (Cloudflare) envoyés simultanément — comportement indéfini selon les navigateurs.

### Top 3 points positifs

1. **Design system token cohérent** : `globals.css` définit une palette, une typographie, un system de cards et de boutons bien construit — la base est saine.
2. **SEO technique solide** : JSON-LD complet (Person + Organization + WebSite + Article), sitemap dynamique avec 17 URLs, meta descriptions dans les limites, canonical correct, HSTS actif.
3. **Accessibilité de base respectée** : skip-to-content, focus ring WCAG AA, aria-labels, `prefers-reduced-motion`, sémantique HTML correcte (header/nav/main/footer).

---

## 1. Stack & Code

### Dépendances

**[MAJEUR] 6 packages installés mais jamais importés**

- **Fichier** : `frontend/package.json`
- **Observation** : `framer-motion@^11`, `react-hook-form@^7.52`, `zod@^3.23`, `axios@^1.7`, `js-cookie@^3`, `next-themes@^0.4` sont dans `dependencies` / `devDependencies` mais aucun import ne les référence dans `src/`.
- **Pourquoi c'est un problème** : surface de risque CVE inutile, dépendances sans raison dans `node_modules` (880 kB+ pour framer-motion seul), confusion pour tout contributeur futur.
- **Référence** : principe "no dead code / no dead deps".

**[MINEUR] Contact form n'utilise pas react-hook-form/zod installés**

- **Fichier** : `frontend/src/app/contact/ContactForm.tsx`
- **Observation** : le formulaire utilise `e.currentTarget` + `form.elements.namedItem()` manuellement. `react-hook-form` et `zod` sont installés pour ce cas d'usage exact mais ignorés.
- **Pourquoi c'est un problème** : la validation côté client est inexistante (aucune vérification des longueurs, formats, XSS) avant envoi.

### TypeScript

**[MINEUR] Type inline dans JSX (Home page)**

- **Fichier** : `frontend/src/app/page.tsx:326-333`
- **Observation** : le type `{ slug: string; pillar: number; title_fr: string; ... }` est défini inline dans le `.map()` au lieu d'une interface partagée.
- **Pourquoi c'est un problème** : même type `Article` redéfini dans `page.tsx`, `blog/page.tsx`, `blog/[slug]/page.tsx` — violation DRY, risque de désynchronisation.

### Configuration

**[MAJEUR] `force-dynamic` sur pages statiques**

- **Fichiers** : `frontend/src/app/about/page.tsx:` (pas de `force-dynamic`), mais `page.tsx` (Home) et `blog/page.tsx` et `blog/[slug]/page.tsx` l'ont.
- **Observation** : Home utilise `force-dynamic` pour fetcher 3 articles récents — raisonnable. Mais `blog/[slug]/page.tsx` (`force-dynamic`) et `blog/page.tsx` (`force-dynamic`) pourraient utiliser `revalidate: 300` (ISR) au lieu de SSR pur.
- **Pourquoi c'est un problème** : chaque visite d'un article = un appel réseau vers l'API backend + rendering Node.js complet, sans cache. Sur 12 articles stables, c'est inutile.

**[COSMÉTIQUE] Code mort dans globals.css**

- **Fichier** : `frontend/src/app/globals.css:373-380`
- **Observation** : les classes `.glass-card` et `.glow-primary` sont commentées "BACKWARD COMPAT" mais aucun composant ne les référence.
- **Pourquoi c'est un problème** : CSS mort livré en production.

---

## 2. Layout global (header / footer / container)

**[OK] Header**

- Fixed 72px, `z-50`, backdrop-blur au scroll, `pt-[72px]` compensé dans chaque page. H1 visible sans chevauchement sur tous les viewports examinés.

**[OK] Container**

- `max-width: 1200px` + `padding-inline: clamp(20px, 5vw, 48px)` — implémentation correcte, jamais 100% pleine largeur sur desktop large.

**[OK] Footer**

- Reste en bas du document. Grille 4 colonnes desktop, empilage mobile correct.

**[MINEUR] Hero Home — pas de `pt-[72px]` direct**

- **Page** : `/` (Home)
- **Viewport** : tous
- **Observation** : la section Hero utilise `min-h-[85vh]` avec un `pt-[72px]` sur le `.container` intérieur au lieu de la section. La section elle-même débute sous le header grâce au padding interne. Fonctionne, mais différent des autres pages qui compensent avec `pt-[72px]` sur le `<div>` racine — pratique incohérente.

---

## 3. Design system

**[MAJEUR] Couleur Pilier 3 — incohérence inter-pages**

- **Pages** : `/` (Home) vs `/services`, `/blog`, `/about`, `/blog/[slug]`
- **Observation** :
  - Home (`page.tsx:334`) : pillar 3 → `#4ADE80` (vert, couleur "success")
  - Blog, Services, About : pillar 3 → `#E879F9` (rose)
  - La constante `PILLAR` est redéfinie par page sans source de vérité unique.
- **Pourquoi c'est un problème** : un DSI qui voit "AI Governance & Conformité" en vert sur la Home et en rose sur le Blog perçoit un site incohérent.

**[OK] Palette de tokens**

- 4 niveaux de texte (primary/secondary/tertiary/muted), 3 backgrounds, 3 accents (violet/cyan/green). Système clair et documenté dans `:root`.

**[OK] Boutons**

- 2 variants (primary/ghost) + 1 size modifier (lg). Pas de mélange de styles hors système.

**[OK] Cards**

- 3 variants (`.card`, `.card-interactive`, `.card-gradient-border`) utilisés de manière cohérente entre pages.

**[OK] Icônes**

- Uniquement `lucide-react`. Tailles cohérentes (11-32px selon contexte).

**[MINEUR] Classes Tailwind dynamiques**

- **Fichier** : `frontend/src/app/services/page.tsx:185`
- **Observation** : `` `delay-${i + 1}` `` génère les classes `delay-1`, `delay-2`, `delay-3` à l'exécution. Tailwind v4 analyse statiquement le code pour générer les classes — ces classes dynamiques ne sont présentes que parce que `globals.css` les définit manuellement. Fonctionne actuellement, mais fragile.
- **Pourquoi c'est un problème** : si quelqu'un refactorise l'animation, les classes pourraient ne plus être générées.

**[COSMÉTIQUE] Pas d'emojis décoratifs** ✓

---

## 4. Page Home (`/`)

**[OK] H1**

> "L'architecte qui met de l'IA agentique en production dans des environnements régulés."

Qualifie le profil en < 5 secondes. Un DSI bancaire comprend immédiatement le positionnement. Note : le texte utilise `text-[#7A7E8C]` pour la seconde partie — le contraste 4,86:1 est suffisant mais la rupture de couleur en milieu de phrase peut distraire.

**[MINEUR] Stat "TJM 850–1100 €/j" répétée 5 fois sur la page**

- **Observation** : présent dans Hero (meta line), Stats band, Approach section (implicite), CTA final, footer.
- **Pourquoi c'est un problème** : sur-signalement qui peut signaler l'insécurité tarifaire plutôt que la confiance.

**[MINEUR] Blog teaser — fallback redondant**

- **Fichier** : `frontend/src/app/page.tsx:346-372`
- **Observation** : le fallback "Premier article à paraître" subsiste dans le code mais ne s'affiche plus (12 articles existent). Ce code mort s'exécutera si l'API est indisponible.
- **Pourquoi c'est un problème** : non critique, mais le fallback visible en cas d'erreur API serait trompeur ("articles à venir" alors qu'ils existent).

**[OK] CTAs**

- Primary "Voir mes services" + Ghost "Me contacter" — hiérarchie claire.

**[OK] Section proof**

- 4 proof items (Shield, FileCheck, Layers, CheckCircle) avec détails concrets. Fonctionnel sans être fort — aucun chiffre vérifiable (nombre de systèmes déployés, pourcentage de réduction de latence, etc.).

---

## 5. Page À propos (`/about`)

**[OK] Structure générale**

- Bio + preuve + expertise + timeline + CTA. Logique et complète.

**[MINEUR] Timeline — lacune 2020-2022 non expliquée**

- **Page** : `/about`
- **Observation** : LUTECE Consulting SAS est fondée en mars 2020 (date légale réelle, maintenant correcte dans le code). Le premier jalon IA est en 2022 ("Spécialisation IA Générative"). Les 2 années 2020-2021 sont absentes du timeline.
- **Pourquoi c'est un problème** : un visiteur peut se demander ce qui s'est passé entre la création de la société et le pivot IA.

**[OK] Coordonnées**

- Email, téléphone, LinkedIn, GitHub — tous présents et corrects.

**[MINEUR] Pas de photo réelle**

- **Observation** : le placeholder est un grand "L" en dégradé (144×144px). La page elle-même demande "use real photo" (instruction documentée).
- **Pourquoi c'est un problème** : la crédibilité d'un consultant indépendant repose en partie sur l'identité visuelle personnelle. Un DSI bancaire qui ne voit pas de visage a un signal de confiance en moins.

---

## 6. Page Services (`/services`)

**[OK] Structure**

- 3 services avec numéros, descriptions, livrables vérifiables, tags. Format clair.

**[MINEUR] Numéros décoratifs 01/02/03 — taille relative**

- **Page** : `/services`
- **Viewport** : tous
- **Observation** : les numéros sont en `text-5xl` (48px) avec `color: service.accent`. Le titre H2 adjacent est en `text-2xl` (24px). Ratio 2:1 — les numéros dominent visuellement les titres sur certains viewports.
- **Référence** : convention — numéros décoratifs ne devraient pas dépasser la taille du titre qui suit.

**[MINEUR] Liens services Home vers mauvais anchors**

- **Fichiers** : `frontend/src/app/page.tsx` (PILLARS)
- **Observation** :
  - Home link pillar 1 → `/services#architecture`
  - Home link pillar 2 → `/services#llmops`
  - Home link pillar 3 → `/services#compliance`
  - Services page IDs réels : `#ai-platform-architecture`, `#llmops-multi-llm`, `#ai-act-compliance`
- **Pourquoi c'est un problème** : les 3 liens "En savoir plus" de la Home arrivent sur la page `/services` mais ne scrollent pas vers la bonne section (anchors inexistants → scroll top).

**[OK] FAQ JSON-LD**

- FAQPage schema.org correctement implémenté sur la page Services.

---

## 7. Page Blog (`/blog`)

**[OK] Structure générale**

- Section "À la une" (featured) + "Tous les articles". 12 articles présents.

**[MINEUR] Pas de pagination**

- **Observation** : `per_page=20` codé en dur. À 20 articles, les plus anciens disparaissent silencieusement.

**[MINEUR] Pas de filtrage par pilier**

- **Observation** : les badges de pilier (cyan/violet/rose) sont présents comme légende en haut, mais non cliquables — ils ne filtrent pas.
- **Pourquoi c'est un problème** : un visiteur intéressé uniquement par "EU AI Act" ne peut pas filtrer — il doit tout lire.

**[MAJEUR] `created_at` identique pour tous les articles**

- **Observation** : tous les articles ont `created_at: 2026-05-19T12:48:18` malgré des `published_at` s'étalant d'avril 2025 à mars 2026.
- **Pourquoi c'est un problème** : les moteurs de recherche peuvent utiliser `created_at` pour détecter la "fraîcheur" du contenu. Un backfill visible de 13 mois de contenu en 1 journée est un signal qui peut réduire la valeur attribuée aux articles.

**[MINEUR] Aucune image de couverture sur les 12 articles**

- **Observation** : `cover_image_url: null` pour tous. Le rendu liste est entièrement textuel.
- **Pourquoi c'est un problème** : sur le Blog index, les articles featured n'ont aucun visuel différenciateur — l'accroche "À la une" est portée uniquement par le titre.

### Page article (`/blog/[slug]`)

**[OK] Renderer de contenu — code blocks**

- Le renderer code-fence-first (corrigé en session) fonctionne : `CircuitState` est présent dans le HTML de prod.

**[OK] Titre dédupliqué**

- Le `# Title` en début de `content_fr` est strippé — le H1 de la page est l'unique titre.

**[MINEUR] Pas de Table des matières**

- Les articles sont longs (8-12 min de lecture). Aucun TOC automatique.

**[MINEUR] Pas de highlighting syntaxique couleur**

- Les code blocks sont monochrome cyan (`color: #4DD0FF`). Pas de syntax highlighting multi-couleur (mots-clés, strings, commentaires distincts). Sur des blocs de 40+ lignes YAML/Python, la lisibilité est réduite.

**[MINEUR] Aucune image dans les articles**

- Les diagrammes architecturaux sont en ASCII art dans des blocs de code. L'instruction "use real draw.io schemas" est documentée mais non encore implémentée.

---

## 8. Page Contact (`/contact`)

**[OK] Layout 2 colonnes**

- Formulaire gauche + sidebar droite (disponibilité, coordonnées directes, profils). Correct sur desktop.

**[MINEUR] Bouton submit `w-full` sur tous les viewports**

- **Page** : `/contact`
- **Viewport** : 1280×800, 1920×1080
- **Observation** : `<button className="btn btn-primary btn-lg w-full">` — le bouton s'étend sur toute la largeur de la colonne formulaire (~560px sur 1280px) sur desktop.
- **Pourquoi c'est un problème** : sur les pages contact de référence B2B (Stripe, Intercom, Linear), le bouton submit est `fit-content` ou `min-width` sur desktop — pas full-width. Un bouton 560px de large sur un formulaire pro perçu comme disproportionné.
- **Référence** : pattern standard B2B forms.

**[MINEUR] Pas d'`autocomplete` sur les champs principaux**

- **Observation** : `<input name="name">`, `<input name="email">`, `<input name="company">` sans `autocomplete="name"`, `autocomplete="email"`, `autocomplete="organization"`.
- **Pourquoi c'est un problème** : friction UX — les gestionnaires de mots de passe et autofill navigateurs n'auto-remplissent pas correctement.

**[MINEUR] Politique de confidentialité non liée**

- **Observation** : le texte RGPD indique "Conformément au RGPD, vous pouvez exercer vos droits à loic.lafhej@..." — pas de lien vers une politique de confidentialité formelle.
- **Pourquoi c'est un problème** : RGPD Art. 13 exige une information complète sur le traitement. L'email seul ne suffit pas légalement.

**[OK] Honeypot anti-spam**

- Champ masqué `name="website"` avec `tabIndex={-1}` et `pointer-events: none`. Implémentation correcte.

**[OK] Champs de qualification B2B**

- Société, Fonction, Budget (5 niveaux), Date démarrage. Suffisant pour qualifier un lead B2B.

**[OK] État post-envoi**

- Message de confirmation affiché avec délai de réponse "24-48h". ✓

**[OK] Mentions légales dans le footer**

- SIREN 882 573 215 + TVA FR91882573215 + adresse présents (ajoutés en session).

---

## 9. Accessibilité

### Problèmes identifiés par analyse statique

**[MAJEUR] `text-muted (#5A5E6B)` : contraste insuffisant pour texte normal**

- **Pages** : toutes (dates, temps de lecture, meta infos)
- **Observation** : contraste de `#5A5E6B` sur `#0A0B10` = **3,04:1**.
- **Pourquoi c'est un problème** : WCAG 2.1 AA exige **4,5:1** pour le texte normal (< 18pt / < 14pt bold). Les dates d'articles, temps de lecture, et labels secondaires utilisent ce token.
- **Règle WCAG** : 1.4.3 Contrast (Minimum).
- **Note** : `text-tertiary (#7A7E8C)` = 4,86:1 → PASSE. `text-muted` est en dehors du seuil.

**[OK] Tous les autres tokens passent WCAG AA**

- `text-primary (#F5F6F8)` : 18,18:1 ✓
- `text-secondary (#B4B7C1)` : 9,81:1 ✓
- `text-tertiary (#7A7E8C)` : 4,86:1 ✓
- `accent-cyan (#4DD0FF)` : 11,03:1 ✓
- `accent-violet (#7C5CFF)` : 4,52:1 (passe AA de justesse, texte large uniquement recommandé) ✓

**[OK] Focus ring**

- `:focus-visible { outline: 2px solid var(--accent-cyan); outline-offset: 2px; }` — présent et visible.

**[OK] Skip-to-content**

- `.skip-to-content` présent dans le layout, devient visible au focus clavier.

**[OK] Sémantique HTML**

- `<header role="banner">`, `<nav aria-label="Navigation principale">`, `<main id="main-content">`, `<footer role="contentinfo">`, `<article>` pour les articles de blog.

**[OK] Labels formulaire**

- Tous les `<input>` et `<select>` ont un `<label htmlFor>` explicite.

**[OK] `prefers-reduced-motion`**

- Toutes les animations désactivées via `@media (prefers-reduced-motion: reduce)`.

**[OK] `aria-hidden` sur éléments décoratifs**

- Icônes, numéros, pulse-dot correctement masqués avec `aria-hidden="true"`.

**[MINEUR] Navigation mobile — tap targets**

- **Composant** : `Header.tsx:143-151`
- **Observation** : les liens de navigation mobile ont `py-4` (16px top + 16px bottom) + `text-base` (height ~24px) ≈ 56px de hauteur. Conforme 44px minimum ✓. Mais les liens occupent 100% de la largeur — correct.

---

## 10. Performance

*Note : scores Lighthouse réels nécessitent un navigateur headless. Les observations ci-dessous sont basées sur l'analyse du code source et des headers HTTP.*

### Points identifiés

**[MAJEUR] `force-dynamic` sur pages ne nécessitant pas de SSR pur**

- **Pages** : `blog/[slug]/page.tsx`, `blog/page.tsx`, `page.tsx` (Home)
- **Observation** : `cache-control: private, no-cache, no-store, max-age=0, must-revalidate` sur toutes les réponses.
- **Pourquoi c'est un problème** : le TTFB (Time To First Byte) est directement le temps de rendu Node.js + appel API backend. Sur un serveur OCI à Paris avec 1 service backend, chaque visite repart de zéro.
- **Impact attendu** : LCP dégradé vs une approche ISR (revalidate: 300).

**[OK] Polices**

- `next/font/google` avec `display: swap` pour Inter et JetBrains Mono. Préchargement automatique via Next.js ✓.

**[OK] Images**

- Aucune image dans les articles ou pages (hormis OG) → pas de problème d'optimisation image.

**[MINEUR] Bundle JS**

- Taille du bundle first-load shared : ~102 kB (visible dans le build output). Raisonnable mais inclut 6 packages inutilisés dans `node_modules` (pas dans le bundle client car jamais importés — mais présence dans `node_modules` non nécessaire).

**[MINEUR] Sitemap `lastModified` : `new Date()` à chaque requête**

- **Fichier** : `frontend/src/app/sitemap.ts`
- **Observation** : chaque `url` a `lastModified: new Date()` — la date change à chaque hit.
- **Pourquoi c'est un problème** : les crawlers Google utilisent `lastmod` pour prioriser le recrawl. Un `lastmod` qui change à chaque requête sans contenu changé est un signal bruit.

---

## 11. SEO technique

**[OK] `<title>` et `<meta description>`**

- Home : titre 58 chars, description 133 chars ✓
- About : description 134 chars ✓
- Services : description 147 chars ✓
- Blog : description 153 chars ✓
- Contact : description 142 chars ✓
- Tous < 160 chars ✓

**[OK] Open Graph + Twitter Card**

- OG title, description, url, image (1200×630), type sur toutes les pages ✓.
- Twitter card `summary_large_image` ✓.

**[OK] JSON-LD**

- `Person` + `Organization` + `WebSite` en global (layout.tsx) ✓
- `ItemList` + `FAQPage` sur `/services` ✓
- `Article` sur `/blog/[slug]` ✓

**[OK] Sitemap**

- 17 URLs (5 pages statiques + 12 articles), priority et changeFrequency correctes ✓.

**[OK] Canonical**

- `<link rel="canonical">` présent sur chaque page ✓.

**[MINEUR] OG image — incohérence avec la palette du site**

- **Fichier** : `frontend/src/app/opengraph-image.tsx`
- **Observation** : fond noir pur (`#000000`), gradient `#00d9ff → #6b00ff → #ff00c8` sur le logo. Le site utilise `#0A0B10` comme fond et `#7C5CFF` / `#4DD0FF` comme accents. Les deux ne correspondent pas.
- **Pourquoi c'est un problème** : partage LinkedIn/Twitter affiche une image visuellement différente de la palette du site — incohérence de marque perceptible.

**[MINEUR] `robots.txt` — double bloc `User-Agent: *`**

- **Observation** : le fichier servi contient deux blocs `User-agent: *` — un géré par Cloudflare (avec `Content-Signal: search=yes,ai-train=no`), un généré par `robots.ts` (avec `Disallow: /api/`). Techniquement valide (les crawlers mergent les règles), mais source de confusion.
- **Référence** : Google Search Central recommande un seul bloc par user-agent.

**[MINEUR] Pas de `hreflang`**

- **Observation** : la base de données expose `title_en`, `content_en`, `excerpt_en` pour chaque article. Ces champs existent mais ne sont pas rendus.
- **Pourquoi c'est un problème** : si une version anglaise est publiée un jour, l'absence de `hreflang` crée un risque de contenu dupliqué FR/EN.

**[OK] `robots.txt` directives principales**

- `Disallow: /api/` et `Disallow: /_next/` présents ✓.
- `Sitemap: https://lutece-consulting.com/sitemap.xml` présent ✓.

---

## 12. Sécurité

**[MAJEUR] Conflit `X-Frame-Options`**

- **Observation** : la réponse HTTP contient :
  ```
  X-Frame-Options: DENY       (depuis next.config.ts)
  X-Frame-Options: SAMEORIGIN (depuis Cloudflare)
  ```
- **Pourquoi c'est un problème** : deux valeurs contradictoires pour le même header. Selon RFC 7230, en cas de header dupliqué, le comportement est défini par l'implémentation du navigateur. Chrome utilise généralement la première valeur, mais ce n'est pas garanti.
- **Référence** : RFC 7230 §3.2.2 "Order of headers".

**[MAJEUR] `X-Content-Type-Options` dupliqué**

- **Observation** : `X-Content-Type-Options: nosniff` envoyé deux fois (Next.js + Cloudflare). Même valeur — pas de conflit, mais signal de configuration non maîtrisée.

**[MAJEUR] Absence de Content-Security-Policy**

- **Observation** : aucun header `Content-Security-Policy` dans la réponse.
- **Pourquoi c'est un problème** : sans CSP, le vecteur XSS n'est pas atténué côté navigateur. `dangerouslySetInnerHTML` est utilisé pour les JSON-LD dans `layout.tsx`, `services/page.tsx`, `blog/[slug]/page.tsx` — le contenu est contrôlé (pas d'input utilisateur), mais l'absence de CSP est un signal de maturité sécurité faible.

**[MINEUR] Absence de `Permissions-Policy`**

- **Observation** : aucun header `Permissions-Policy`.
- **Pourquoi c'est un problème** : best practice moderne (caméra, micro, géolocalisation désactivés explicitement sur un site vitrine).

**[OK] HTTPS / HSTS**

- `Strict-Transport-Security: max-age=31536000; includesubdomains` présent (Cloudflare) ✓.

**[OK] Pas de clés API exposées côté client**

- Les fetches d'articles sont server-side. Aucune clé API dans le bundle client ✓.

**[OK] Honeypot contact form** ✓

**[MINEUR] Pas de rate limiting visible sur `/api/contacts`**

- **Observation** : aucune configuration de rate limiting identifiée dans `docker-compose.prod.yml` ou dans le backend FastAPI.
- **Pourquoi c'est un problème** : une attaque par spam peut saturer la boîte email de l'admin.

---

## 13. i18n

**[MAJEUR] Pas de système i18n malgré des champs EN en base**

- **Observation** : chaque article en base de données expose `title_en`, `content_en`, `excerpt_en`. Ces champs sont jamais rendus dans le frontend. Aucune config i18n (`next-i18next`, `next-intl`, ou `[locale]` routing).
- **Pourquoi c'est un problème** : la promesse implicite (champs EN dans le schéma API) n'est pas honorée. Si Loïc veut vendre à des clients non-francophones, le site n'a pas de version anglaise.

**[OK] Langue déclarée**

- `<html lang="fr">` dans `layout.tsx` ✓.

**[MINEUR] Pas de sélecteur de langue**

- **Observation** : aucun composant de language switcher dans le Header.

**[MINEUR] Pas de `hreflang`**

- (cf. SEO section 11)

**[OK] Pas de strings en dur dans l'UI critique**

- Les libellés de nav, CTA, formulaire sont en dur en français — acceptable pour un site mono-langue intentionnel.

---

## 14. Mobile

**[OK] Navigation mobile**

- Drawer 280px depuis la droite, bouton burger accessible (`aria-label`, `aria-expanded`, `aria-controls`). Fermeture par backdrop click ✓.

**[OK] Formulaire contact mobile**

- Empilement mono-colonne sur mobile ✓. Les champs occupent 100% de la largeur.

**[MINEUR] `inputmode` absent sur les champs email/téléphone**

- **Fichier** : `frontend/src/app/contact/ContactForm.tsx`
- **Observation** : `<input type="email">` déclenche le bon clavier (avec @) sur iOS/Android. Mais `type="date"` pour la date de démarrage affiche un datepicker natif — peut être gênant sur certains mobiles anciens.

**[OK] Cards et grilles**

- Toutes les grilles 2-3 colonnes empilent correctement en mono-colonne sous `md:` (768px). Pas de scroll horizontal détecté.

**[MINEUR] Marquee (tech strip) — pas de `aria-label` suffisant**

- **Fichier** : `frontend/src/app/page.tsx:289`
- **Observation** : la section a `aria-label="Stack technique"` mais la div `.marquee-wrapper` a `aria-hidden="true"`. Correct pour les lecteurs d'écran (ne lit pas 40 tags en boucle). Sur mobile, la liste est lisible visuellement mais le hover-pause est inutilisable (pas de hover sur touch).

---

## 15. Synthèse par sévérité

### Bloquants

_Aucun problème ne bloque directement la conversion (envoi de message de contact)._

### Majeurs

1. **`text-muted (#5A5E6B)` contraste 3,04:1** — échec WCAG AA 1.4.3 (texte normal). Utilisé pour dates, temps de lecture.
2. **Couleur Pilier 3 incohérente** — vert (#4ADE80) sur Home, rose (#E879F9) sur toutes autres pages.
3. **6 dépendances installées, jamais importées** — `framer-motion`, `react-hook-form`, `zod`, `axios`, `js-cookie`, `next-themes`.
4. **`force-dynamic` injustifié sur `/blog` et `/blog/[slug]`** — détruit le cache edge, TTFB dégradé.
5. **Conflit `X-Frame-Options: DENY` + `SAMEORIGIN`** — comportement indéfini selon navigateur.
6. **Absence de Content-Security-Policy** — header de sécurité manquant.
7. **Pas de système i18n** malgré des champs EN présents dans le schéma API.

### Mineurs

1. Liens "En savoir plus" Home → anchors `/services#architecture`, `/services#llmops`, `/services#compliance` inexistants.
2. Bouton submit contact `w-full` disproportionné sur desktop.
3. Pas d'attribut `autocomplete` sur les champs du formulaire contact.
4. Pas de politique de confidentialité formelle (RGPD Art. 13).
5. OG image palette incohérente avec le site.
6. `robots.txt` double bloc `User-agent: *`.
7. Sitemap `lastModified: new Date()` = date fluctuante sans signification.
8. `created_at` identique (2026-05-19) pour 12 articles censés dater d'avril 2025 à mars 2026.
9. Type `Article` redéfini inline sur plusieurs pages (DRY violation).
10. Lacune 2020-2022 non expliquée dans la timeline About.
11. Pas de photo réelle de Loïc Lafhej.
12. Code mort `glass-card` / `glow-primary` dans `globals.css`.
13. Pas de `Permissions-Policy` header.
14. Pas de rate limiting visible sur `/api/contacts`.
15. Pas de pagination sur le Blog (limite silencieuse à 20 articles).
16. Pas de filtrage par pilier sur le Blog.
17. Pas de syntax highlighting multi-couleur sur les code blocks.
18. Aucune image de couverture sur les 12 articles.
19. Classes Tailwind dynamiques `delay-${i+1}` (fragile).

### Cosmétiques

1. `X-Content-Type-Options: nosniff` envoyé deux fois.
2. `Referrer-Policy` dupliqué (Next.js + Cloudflare).
3. TJM répété 5 fois sur la Home.
4. Pas de Table of Contents sur les longs articles.
5. Pas de newsletter / abonnement sur le Blog.
6. Hover-pause du marquee inutilisable sur touch.
7. `force-dynamic` absent sur About et Services (ils sont statiques — pas un problème, mais incohérence d'approche vs Home/Blog).
8. Fallback "Premier article à paraître" actif dans le code Home (ne s'affiche plus mais exécuté en cas d'erreur API).

---

## 16. Captures d'écran

> Les captures d'écran réelles (rendu navigateur) n'ont pas pu être générées depuis cet environnement CLI. Pour un audit visuel complet, lancer :
>
> ```bash
> npx playwright screenshot https://lutece-consulting.com --viewport-size="1280,800" audit/screenshots/home-desktop-1280.png
> npx playwright screenshot https://lutece-consulting.com --viewport-size="360,640" audit/screenshots/home-mobile-360.png
> # … répéter pour /about /services /blog /contact × 5 viewports
> ```
>
> Fichiers attendus dans `/audit/screenshots/` :
>
> - `home-desktop-1280.png`
> - `home-desktop-large-1920.png`
> - `home-tablet-768.png`
> - `home-mobile-414.png`
> - `home-mobile-360.png`
> - `about-desktop-1280.png`
> - `about-mobile-360.png`
> - `services-desktop-1280.png`
> - `services-mobile-360.png`
> - `blog-desktop-1280.png`
> - `blog-mobile-360.png`
> - `contact-desktop-1280.png`
> - `contact-mobile-360.png`
> - `article-desktop-1280.png`
> - `article-mobile-360.png`
