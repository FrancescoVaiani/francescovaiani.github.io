import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_CONTENT } from './content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const SITE_URL = 'https://francescovaiani.github.io';
const LINKEDIN_URL = 'https://www.linkedin.com/in/francesco-vaiani-81266aa7/';
const PERSON_NAME = 'Francesco Vaiani';
const DEFAULT_EMAIL_MASK = 'francesco.vaiani [at] gmail [dot] com';
const LOCALE_TO_OG = {
  en: 'en_US',
  it: 'it_IT',
};

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeJsonForHtml(value) {
  return String(value).replaceAll('</script', '<\\/script');
}

function mapSectionIdToContentKey(sectionId) {
  return sectionId === 'product-work' ? 'productWork' : sectionId;
}

function buildToolMarkup(item, className = '') {
  const safeClass = className ? ` ${className}` : '';
  const cloneHiddenAttr = className.includes('is-clone') ? ' aria-hidden="true"' : '';
  return `
    <article class="tool-logo${safeClass}"${cloneHiddenAttr}>
      <iconify-icon class="tool-logo-icon" icon="${escapeHtml(item.icon)}" aria-hidden="true"></iconify-icon>
      <span>${escapeHtml(item.name)}</span>
    </article>
  `;
}

function buildToolsTrackMarkup(localeData) {
  const copies = 4;
  const items = localeData.sections.tools.items;
  const markup = Array.from({ length: copies }, (_, copyIndex) =>
    items
      .map((item) => buildToolMarkup(item, copyIndex === 0 ? 'is-original' : 'is-clone'))
      .join(''),
  ).join('');
  return {
    markup,
    shift: 100 / copies,
  };
}

function sanitizeCharCodes(codes) {
  return codes
    .map((value) => Number.parseInt(String(value), 10))
    .filter((code) => Number.isInteger(code) && code >= 32 && code <= 126);
}

function buildContactValueMarkup(item) {
  if (item.type === 'obfuscated-email' && Array.isArray(item.emailCodes)) {
    const safeCodes = sanitizeCharCodes(item.emailCodes);
    if (safeCodes.length > 0) {
      const maskedValue = item.maskedValue || DEFAULT_EMAIL_MASK;
      return `<a href="#" data-obfuscated-email="${escapeHtml(safeCodes.join('.'))}">${escapeHtml(maskedValue)}</a>`;
    }
  }

  if (item.href) {
    return `<a href="${escapeHtml(item.href)}" target="_blank" rel="noreferrer noopener">${escapeHtml(item.value)}</a>`;
  }

  return `<span>${escapeHtml(item.value || '')}</span>`;
}

function renderProfile(localeData) {
  const data = localeData.sections.profile;
  return `
    <p class="eyebrow">${escapeHtml(data.eyebrow)}</p>
    <h2>${escapeHtml(data.title)}</h2>
    <div class="prose-group">
      ${data.paragraphs.map((line) => `<p>${escapeHtml(line)}</p>`).join('')}
    </div>
  `;
}

function renderExperience(localeData) {
  const data = localeData.sections.experience;
  const noteMarkup = data.note ? `<p class="section-note">${escapeHtml(data.note)}</p>` : '';
  return `
    <p class="eyebrow">${escapeHtml(data.eyebrow)}</p>
    <h2>${escapeHtml(data.title)}</h2>
    ${noteMarkup}
    <div class="timeline">
      ${data.items
        .map(
          (item) => `
            <article class="timeline-item">
              <h3>${escapeHtml(item.title)}</h3>
              <p class="meta">${escapeHtml(item.date)} | ${escapeHtml(item.company)} | ${escapeHtml(item.city)}</p>
              <p>${escapeHtml(item.scope)}</p>
              <ul class="bullet-list">
                ${item.contributions.map((entry) => `<li>${escapeHtml(entry)}</li>`).join('')}
              </ul>
            </article>
          `,
        )
        .join('')}
    </div>
  `;
}

function renderEducation(localeData) {
  const data = localeData.sections.education;
  const noteMarkup = data.note ? `<p class="section-note">${escapeHtml(data.note)}</p>` : '';
  return `
    <p class="eyebrow">${escapeHtml(data.eyebrow)}</p>
    <h2>${escapeHtml(data.title)}</h2>
    ${noteMarkup}
    <div class="timeline timeline-education">
      ${data.items
        .map(
          (item) => `
            <article class="timeline-item">
              <h3>${escapeHtml(item.degree)}</h3>
              <p class="meta">${escapeHtml(item.date)} | ${escapeHtml(item.institution)} | ${escapeHtml(item.city)}</p>
              <p>${escapeHtml(item.description)}</p>
            </article>
          `,
        )
        .join('')}
    </div>
  `;
}

function renderProductWork(localeData) {
  const data = localeData.sections.productWork;
  const introMarkup = data.intro ? `<p class="section-note">${escapeHtml(data.intro)}</p>` : '';
  return `
    <p class="eyebrow">${escapeHtml(data.eyebrow)}</p>
    <h2>${escapeHtml(data.title)}</h2>
    ${introMarkup}
    <div class="cards cards-single-column" role="list">
      ${data.items
        .map(
          (item) => `
            <article class="card" role="listitem">
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.detail)}</p>
            </article>
          `,
        )
        .join('')}
    </div>
  `;
}

function renderApproach(localeData) {
  const data = localeData.sections.approach;
  return `
    <p class="eyebrow">${escapeHtml(data.eyebrow)}</p>
    <h2>${escapeHtml(data.title)}</h2>
    <div class="approach-orbit" role="list">
      ${data.items
        .map((item, index) => {
          const step = index + 1;
          return `
            <article class="card approach-step approach-step--${step}" role="listitem">
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.detail)}</p>
            </article>
          `;
        })
        .join('')}
    </div>
  `;
}

function renderMedia(localeData) {
  const data = localeData.sections.media;
  return `
    <p class="eyebrow">${escapeHtml(data.eyebrow)}</p>
    <h2>${escapeHtml(data.title)}</h2>
    <p class="section-note">${escapeHtml(data.intro)}</p>
  `;
}

function renderSkills(localeData) {
  const data = localeData.sections.skills;
  return `
    <p class="eyebrow">${escapeHtml(data.eyebrow)}</p>
    <h2>${escapeHtml(data.title)}</h2>
    <div class="skills-panels">
      ${data.groups
        .map(
          (group) => `
            <article class="skill-panel">
              <h3>${escapeHtml(group.title)}</h3>
              ${group.items
                .map((item) => {
                  const clampedValue = Math.min(Math.max(Number(item.value) || 0, 0), 100);
                  return `
                    <div class="skill-meter" style="--value:${clampedValue}%">
                      <div class="skill-head">
                        <span>${escapeHtml(item.label)}</span>
                        <strong>${clampedValue}%</strong>
                      </div>
                      <div class="skill-track">
                        <span class="skill-fill"></span>
                      </div>
                    </div>
                  `;
                })
                .join('')}
            </article>
          `,
        )
        .join('')}
    </div>
  `;
}

function renderLanguages(localeData) {
  const data = localeData.sections.languages;
  return `
    <p class="eyebrow">${escapeHtml(data.eyebrow)}</p>
    <h2>${escapeHtml(data.title)}</h2>
    <div class="languages-grid">
      ${data.items
        .map(
          (item) => `
            <article class="language-card">
              <h3>${escapeHtml(item.name)}</h3>
              <p>${escapeHtml(item.level)}</p>
            </article>
          `,
        )
        .join('')}
    </div>
  `;
}

function renderContact(localeData) {
  const data = localeData.sections.contact;
  return `
    <p class="eyebrow">${escapeHtml(data.eyebrow)}</p>
    <h2>${escapeHtml(data.title)}</h2>
    <p class="section-note">${escapeHtml(data.intro)}</p>
    <div class="contact-grid">
      ${data.items
        .map((item) => {
          const valueMarkup = buildContactValueMarkup(item);
          return `
            <article class="contact-item">
              <h3>${escapeHtml(item.label)}</h3>
              <p>${valueMarkup}</p>
            </article>
          `;
        })
        .join('')}
    </div>
  `;
}

function renderToolsPrint(localeData) {
  const data = localeData.sections.tools;
  return `
    <p class="eyebrow">${escapeHtml(data.eyebrow)}</p>
    <h2>${escapeHtml(data.title)}</h2>
    <div class="print-tools-grid">
      ${data.items.map((item) => buildToolMarkup(item)).join('')}
    </div>
  `;
}

function renderPrintIntro(localeData, assetBase) {
  const aboutText = localeData.hero.summary || localeData.sections.profile.paragraphs[0] || '';
  return `
    <div class="print-identity-head">
      <h2>${escapeHtml(localeData.hero.eyebrow)}</h2>
      <p>${escapeHtml(localeData.hero.title)}</p>
    </div>
    <div class="print-about">
      <h3>${escapeHtml(localeData.labels.aboutLabel)}</h3>
      <p>${escapeHtml(aboutText)}</p>
    </div>
    <div class="print-photo-wrap">
      <img
        data-print-portrait
        data-src="${escapeHtml(`${assetBase}assets/propic_scontornata_portrait.png`)}"
        alt="Francesco Vaiani portrait"
        width="600"
        height="600"
        decoding="async"
      />
    </div>
  `;
}

function buildPrintPanelMarkup(sourceHtml, sourceId) {
  return `
    <section class="panel print-panel print-source-${sourceId}">
      ${sourceHtml}
    </section>
  `;
}

function buildStructuredData(localeData, pageUrl) {
  const personId = `${SITE_URL}/#person`;
  const siteId = `${SITE_URL}/#website`;
  const profilePageId = `${pageUrl}#profile-page`;
  const profileItems = localeData.sections.profile.paragraphs;
  const productItems = localeData.sections.productWork.items;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': siteId,
        url: `${SITE_URL}/`,
        name: 'Francesco Vaiani',
        inLanguage: ['en', 'it'],
      },
      {
        '@type': 'ProfilePage',
        '@id': profilePageId,
        url: pageUrl,
        name: localeData.title,
        inLanguage: localeData.lang,
        description: localeData.description,
        isPartOf: {
          '@id': siteId,
        },
        about: {
          '@id': personId,
        },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: PERSON_NAME,
        url: `${SITE_URL}/`,
        jobTitle: 'Technical Product Manager',
        description: localeData.description,
        sameAs: [LINKEDIN_URL],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Arezzo',
          addressRegion: 'Tuscany',
          addressCountry: 'IT',
        },
        homeLocation: {
          '@type': 'Place',
          name: 'Arezzo, Italy',
        },
        hasOccupation: {
          '@type': 'Occupation',
          name: 'Product Manager',
          occupationLocation: {
            '@type': 'City',
            name: 'Arezzo',
          },
        },
        knowsLanguage: ['Italian', 'English'],
        knowsAbout: [
          'SaaS',
          'IoT',
          'Device lifecycle management',
          'Hardware product strategy',
          'Cross-functional delivery',
        ],
        worksFor: {
          '@type': 'Organization',
          name: 'SECO',
        },
        knows: profileItems.concat(productItems.map((item) => item.title)),
      },
    ],
  };
}

function buildSeoKeywords(locale) {
  if (locale === 'it') {
    return [
      'product manager arezzo',
      'product manager full remote',
      'technical product manager',
      'product manager hardware',
      'product manager iot',
      'product manager saas',
      'francesco vaiani',
      'arezzo italia',
    ].join(', ');
  }

  return [
    'product manager arezzo',
    'product manager full remote',
    'remote product manager',
    'technical product manager',
    'hardware product manager',
    'iot product manager',
    'saas product manager',
    'francesco vaiani',
  ].join(', ');
}

function buildPage(locale) {
  const localeData = SITE_CONTENT[locale];
  const hiddenSectionIds = new Set(localeData.ui?.hiddenSectionIds || []);
  const isItalian = locale === 'it';
  const outputDir = isItalian ? path.join(ROOT_DIR, 'it') : ROOT_DIR;
  const outputPath = path.join(outputDir, 'index.html');
  const assetBase = isItalian ? '../' : './';
  const pageUrl = isItalian ? `${SITE_URL}/it/` : `${SITE_URL}/`;
  const alternateLocale = isItalian ? 'en' : 'it';
  const openGraphLocale = LOCALE_TO_OG[locale] || 'en_US';
  const alternateOgLocale = LOCALE_TO_OG[alternateLocale] || 'it_IT';
  const keywords = buildSeoKeywords(locale);
  const toolsTrack = buildToolsTrackMarkup(localeData);
  const structuredData = buildStructuredData(localeData, pageUrl);

  const profileMarkup = renderProfile(localeData);
  const productWorkMarkup = renderProductWork(localeData);
  const skillsMarkup = renderSkills(localeData);
  const experienceMarkup = renderExperience(localeData);
  const approachMarkup = renderApproach(localeData);
  const educationMarkup = renderEducation(localeData);
  const mediaMarkup = renderMedia(localeData);
  const languagesMarkup = renderLanguages(localeData);
  const contactMarkup = renderContact(localeData);
  const toolsPrintMarkup = renderToolsPrint(localeData);
  const printIntroMarkup = renderPrintIntro(localeData, assetBase);

  const sectionHtmlById = {
    'print-intro': printIntroMarkup,
    profile: profileMarkup,
    experience: experienceMarkup,
    education: educationMarkup,
    'product-work': productWorkMarkup,
    approach: approachMarkup,
    media: mediaMarkup,
    skills: skillsMarkup,
    languages: languagesMarkup,
    contact: contactMarkup,
    'tools-print': toolsPrintMarkup,
  };

  const shouldIncludeInPrint = (id) => id === 'print-intro' || id === 'tools-print' || !hiddenSectionIds.has(id);
  const leftOrder = ['print-intro', 'contact', 'skills', 'languages'];
  const rightOrder = ['experience', 'education', 'approach', 'product-work', 'tools-print'];
  const printLeftMarkup = leftOrder
    .filter((id) => shouldIncludeInPrint(id))
    .map((id) => buildPrintPanelMarkup(sectionHtmlById[id], id))
    .join('');
  const printRightMarkup = rightOrder
    .filter((id) => shouldIncludeInPrint(id))
    .map((id) => buildPrintPanelMarkup(sectionHtmlById[id], id))
    .join('');

  const navMarkup = localeData.nav
    .filter((item) => !hiddenSectionIds.has(item.id))
    .map((item) => `<a class="nav-item" href="#${item.id}">${escapeHtml(item.label)}</a>`)
    .join('');

  const sectionMarkup = (id, markup) => {
    const hidden = hiddenSectionIds.has(id);
    const key = mapSectionIdToContentKey(id);
    const hiddenAttr = hidden ? ' hidden aria-hidden="true"' : ' aria-hidden="false"';
    return `<section id="${id}" class="panel" data-reveal data-section-key="${key}"${hiddenAttr}>${markup}</section>`;
  };

  const jsonLd = escapeJsonForHtml(JSON.stringify(structuredData));

  const html = `<!doctype html>
<html lang="${escapeHtml(localeData.lang)}" data-default-locale="${escapeHtml(localeData.lang)}" data-asset-base="${escapeHtml(assetBase)}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(localeData.title)}</title>
    <meta name="description" content="${escapeHtml(localeData.description)}" />
    <meta
      name="robots"
      content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
    />
    <meta name="author" content="${escapeHtml(PERSON_NAME)}" />
    <meta name="keywords" content="${escapeHtml(keywords)}" />
    <meta name="geo.region" content="IT-AR" />
    <meta name="geo.placename" content="Arezzo" />
    <meta name="theme-color" content="#071631" />
    <meta name="referrer" content="strict-origin-when-cross-origin" />

    <link rel="canonical" href="${escapeHtml(pageUrl)}" />
    <link rel="alternate" href="${escapeHtml(`${SITE_URL}/`)}" hreflang="en" />
    <link rel="alternate" href="${escapeHtml(`${SITE_URL}/it/`)}" hreflang="it" />
    <link rel="alternate" href="${escapeHtml(`${SITE_URL}/`)}" hreflang="x-default" />

    <meta property="og:type" content="profile" />
    <meta property="og:site_name" content="Francesco Vaiani" />
    <meta property="og:title" content="${escapeHtml(localeData.title)}" />
    <meta property="og:description" content="${escapeHtml(localeData.description)}" />
    <meta property="og:url" content="${escapeHtml(pageUrl)}" />
    <meta property="og:image" content="${escapeHtml(`${SITE_URL}/assets/propic_scontornata.png`)}" />
    <meta property="og:locale" content="${escapeHtml(openGraphLocale)}" />
    <meta property="og:locale:alternate" content="${escapeHtml(alternateOgLocale)}" />
    <meta property="profile:first_name" content="Francesco" />
    <meta property="profile:last_name" content="Vaiani" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(localeData.title)}" />
    <meta name="twitter:description" content="${escapeHtml(localeData.description)}" />
    <meta name="twitter:image" content="${escapeHtml(`${SITE_URL}/assets/propic_scontornata.png`)}" />

    <link rel="icon" href="${escapeHtml(`${assetBase}favicon-32x32.png?v=2`)}" type="image/png" sizes="32x32" />
    <link rel="icon" href="${escapeHtml(`${assetBase}favicon-16x16.png?v=2`)}" type="image/png" sizes="16x16" />
    <link rel="shortcut icon" href="${escapeHtml(`${assetBase}favicon-32x32.png?v=2`)}" type="image/png" />
    <link rel="apple-touch-icon" href="${escapeHtml(`${assetBase}apple-touch-icon.png?v=2`)}" sizes="180x180" />
    <link rel="manifest" href="${escapeHtml(`${assetBase}site.webmanifest?v=2`)}" />

    <link rel="dns-prefetch" href="//fonts.googleapis.com" />
    <link rel="dns-prefetch" href="//fonts.gstatic.com" />
    <link rel="dns-prefetch" href="//code.iconify.design" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preconnect" href="https://code.iconify.design" crossorigin />
    <link rel="preload" as="image" href="${escapeHtml(`${assetBase}assets/propic_scontornata.png`)}" fetchpriority="high" />
    <link
      href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Sora:wght@500;600;700&family=Source+Sans+3:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js" defer></script>
    <link rel="stylesheet" href="${escapeHtml(`${assetBase}design-system/css/tokens.css`)}" />
    <link rel="stylesheet" href="${escapeHtml(`${assetBase}design-system/css/base.css`)}" />
    <link rel="stylesheet" href="${escapeHtml(`${assetBase}styles/site.css`)}" />

    <script type="application/ld+json">${jsonLd}</script>
  </head>
  <body>
    <button
      id="mobile-menu-toggle"
      class="mobile-menu-toggle chrome-only"
      type="button"
      aria-label="${escapeHtml(localeData.labels.menuOpenLabel)}"
      aria-controls="mobile-menu-panel"
      aria-expanded="false"
    >
      <span class="mobile-menu-icon" aria-hidden="true"></span>
      <span class="mobile-menu-label">${escapeHtml(localeData.labels.menuText)}</span>
    </button>
    <div id="mobile-menu-backdrop" class="mobile-menu-backdrop chrome-only" hidden></div>
    <div id="desktop-switches" class="chrome-only">
      <div
        class="lang-switch"
        id="language-switch-desktop"
        data-role="language-switch"
        aria-label="${escapeHtml(localeData.labels.languageToggle)}"
      >
        <button type="button" data-lang="en">EN</button>
        <button type="button" data-lang="it">IT</button>
      </div>

      <div
        class="theme-switch"
        id="theme-switch-desktop"
        data-role="theme-switch"
        aria-label="${escapeHtml(localeData.labels.themeToggle)}"
      >
        <button class="theme-btn theme-btn--icon" type="button" data-theme-set="light" aria-label="${escapeHtml(localeData.labels.themeLight)}" title="${escapeHtml(localeData.labels.themeLight)}">
          <iconify-icon icon="mdi:white-balance-sunny" aria-hidden="true"></iconify-icon>
          <span class="sr-only" data-theme-label="light">${escapeHtml(localeData.labels.themeLight)}</span>
        </button>
        <button class="theme-btn theme-btn--icon" type="button" data-theme-set="dark" aria-label="${escapeHtml(localeData.labels.themeDark)}" title="${escapeHtml(localeData.labels.themeDark)}">
          <iconify-icon icon="mdi:moon-waning-crescent" aria-hidden="true"></iconify-icon>
          <span class="sr-only" data-theme-label="dark">${escapeHtml(localeData.labels.themeDark)}</span>
        </button>
        <button class="theme-btn theme-btn--icon" type="button" data-theme-set="auto" aria-label="${escapeHtml(localeData.labels.themeAuto)}" title="${escapeHtml(localeData.labels.themeAuto)}">
          <iconify-icon icon="mdi:theme-light-dark" aria-hidden="true"></iconify-icon>
          <span class="sr-only" data-theme-label="auto">${escapeHtml(localeData.labels.themeAuto)}</span>
        </button>
      </div>
    </div>

    <section id="hero" class="hero-impact is-visible" data-reveal>
      <div class="hero-inner">
        <div class="hero-copy">
          <p class="eyebrow" id="hero-eyebrow">${escapeHtml(localeData.hero.eyebrow)}</p>
          <h1 id="hero-title">${escapeHtml(localeData.hero.title)}</h1>
          <p id="hero-summary">${escapeHtml(localeData.hero.summary)}</p>
          <div class="hero-kpis" id="hero-kpis">
            ${localeData.hero.kpis.map((kpi) => `<span>${escapeHtml(kpi)}</span>`).join('')}
          </div>
          <div class="cta-row chrome-only">
            <a class="btn btn-primary" id="cta-contact" href="#contact">${escapeHtml(localeData.hero.ctaPrimary)}</a>
            <a
              class="btn btn-ghost"
              id="cta-linkedin"
              href="${escapeHtml(LINKEDIN_URL)}"
              target="_blank"
              rel="noreferrer noopener"
            >${escapeHtml(localeData.hero.ctaLinkedIn)}</a>
            <a class="btn btn-ghost" id="cta-print" data-action="print" href="#hero" aria-label="${escapeHtml(localeData.labels.printAria)}">${escapeHtml(localeData.hero.ctaPrint)}</a>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-geometry" aria-hidden="true">
            <div class="hero-accent-bar"></div>
          </div>
          <img
            class="hero-portrait"
            src="${escapeHtml(`${assetBase}assets/propic_scontornata.png`)}"
            alt="Francesco Vaiani portrait"
            width="1400"
            height="1776"
            decoding="async"
            fetchpriority="high"
          />
        </div>
      </div>
    </section>

    <section id="tools-strip" class="tools-strip" data-reveal aria-label="${escapeHtml(localeData.labels.toolsAria)}">
      <div class="container">
        <p class="eyebrow tools-strip-eyebrow" id="tools-strip-eyebrow">${escapeHtml(localeData.sections.tools.eyebrow)}</p>
        <h2 class="tools-strip-title" id="tools-strip-title">${escapeHtml(localeData.sections.tools.title)}</h2>
        <div class="tools-marquee" role="region" aria-live="polite">
          <div class="tools-track" id="tools-track" style="--tools-shift:${toolsTrack.shift}%;">
            ${toolsTrack.markup}
          </div>
        </div>
      </div>
    </section>

    <div class="container">
      <div class="shell">
        <aside id="mobile-menu-panel" class="rail chrome-only">
          <h1 id="rail-title">${escapeHtml(localeData.rail.title)}</h1>
          <p id="rail-subtitle">${escapeHtml(localeData.rail.subtitle)}</p>

          <nav class="nav-list" id="nav-list" aria-label="Section navigation">${navMarkup}</nav>

          <div
            class="lang-switch"
            id="language-switch-mobile"
            data-role="language-switch"
            aria-label="${escapeHtml(localeData.labels.languageToggle)}"
          >
            <button type="button" data-lang="en">EN</button>
            <button type="button" data-lang="it">IT</button>
          </div>

          <div
            class="theme-switch"
            id="theme-switch-mobile"
            data-role="theme-switch"
            aria-label="${escapeHtml(localeData.labels.themeToggle)}"
          >
            <button class="theme-btn" type="button" data-theme-set="light">${escapeHtml(localeData.labels.themeLight)}</button>
            <button class="theme-btn" type="button" data-theme-set="dark">${escapeHtml(localeData.labels.themeDark)}</button>
            <button class="theme-btn" type="button" data-theme-set="auto">${escapeHtml(localeData.labels.themeAuto)}</button>
          </div>
        </aside>

        <main class="content" id="content-root">
          <section id="print-intro" class="panel print-only" aria-hidden="true">${printIntroMarkup}</section>
          ${sectionMarkup('profile', profileMarkup)}
          ${sectionMarkup('product-work', productWorkMarkup)}
          ${sectionMarkup('skills', skillsMarkup)}
          ${sectionMarkup('experience', experienceMarkup)}
          ${sectionMarkup('approach', approachMarkup)}
          ${sectionMarkup('education', educationMarkup)}
          ${sectionMarkup('media', mediaMarkup)}
          ${sectionMarkup('languages', languagesMarkup)}
          ${sectionMarkup('contact', contactMarkup)}
          <section id="tools-print" class="panel print-only" data-reveal aria-hidden="false" data-section-key="tools">${toolsPrintMarkup}</section>

          <div id="print-layout" class="print-only" aria-hidden="true">
            <div id="print-left-col">${printLeftMarkup}</div>
            <div id="print-right-col">${printRightMarkup}</div>
          </div>
        </main>
      </div>
    </div>

    <script type="module" src="${escapeHtml(`${assetBase}scripts/app.js`)}"></script>
  </body>
</html>
`;

  return {
    outputDir,
    outputPath,
    html,
  };
}

async function writeSitemapAndRobots() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/it/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
`;

  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  await writeFile(path.join(ROOT_DIR, 'sitemap.xml'), sitemap, 'utf-8');
  await writeFile(path.join(ROOT_DIR, 'robots.txt'), robots, 'utf-8');
}

async function run() {
  const pages = [buildPage('en'), buildPage('it')];

  for (const page of pages) {
    await mkdir(page.outputDir, { recursive: true });
    await writeFile(page.outputPath, page.html, 'utf-8');
  }

  await writeSitemapAndRobots();
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
