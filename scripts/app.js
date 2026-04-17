import { SITE_CONTENT } from './content.js';
import {
  LOCALES,
  LOCALE_STORAGE_KEY,
  THEME_STORAGE_KEY,
  escapeHtml,
  normalizeTheme,
  resolveInitialLocale,
  validateSiteContentModel,
} from './site-utils.js';

const root = document.documentElement;
const metaDescription = document.querySelector('meta[name="description"]');

const navList = document.getElementById('nav-list');
const railTitle = document.getElementById('rail-title');
const railSubtitle = document.getElementById('rail-subtitle');

const heroEyebrow = document.getElementById('hero-eyebrow');
const heroTitle = document.getElementById('hero-title');
const heroSummary = document.getElementById('hero-summary');
const heroKpis = document.getElementById('hero-kpis');
const ctaContact = document.getElementById('cta-contact');
const ctaLinkedIn = document.getElementById('cta-linkedin');
const ctaPrint = document.getElementById('cta-print');

const toolsStrip = document.getElementById('tools-strip');
const toolsStripEyebrow = document.getElementById('tools-strip-eyebrow');
const toolsStripTitle = document.getElementById('tools-strip-title');
const toolsTrack = document.getElementById('tools-track');

const sectionPrintIntro = document.getElementById('print-intro');
const sectionProfile = document.getElementById('profile');
const sectionExperience = document.getElementById('experience');
const sectionEducation = document.getElementById('education');
const sectionProductWork = document.getElementById('product-work');
const sectionApproach = document.getElementById('approach');
const sectionMedia = document.getElementById('media');
const sectionSkills = document.getElementById('skills');
const sectionLanguages = document.getElementById('languages');
const sectionContact = document.getElementById('contact');
const sectionToolsPrint = document.getElementById('tools-print');

const sectionElements = [
  sectionProfile,
  sectionExperience,
  sectionEducation,
  sectionProductWork,
  sectionApproach,
  sectionMedia,
  sectionSkills,
  sectionLanguages,
  sectionContact,
  sectionToolsPrint,
];

const langButtons = Array.from(document.querySelectorAll('[data-lang]'));
const themeButtons = Array.from(document.querySelectorAll('[data-theme-set]'));
const themeSwitch = document.getElementById('theme-switch');
const languageSwitch = document.getElementById('language-switch');

let observer = null;
let activeLocale = resolveInitialLocale(localStorage.getItem(LOCALE_STORAGE_KEY), navigator.language);
let activeTheme = normalizeTheme(localStorage.getItem(THEME_STORAGE_KEY));

if (!validateSiteContentModel()) {
  throw new Error('Invalid content model. Missing required sections.');
}

function mapSectionIdToContentKey(sectionId) {
  const map = {
    'product-work': 'productWork',
  };
  return map[sectionId] || sectionId;
}

function setTheme(theme) {
  activeTheme = normalizeTheme(theme);
  if (activeTheme === 'auto') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', activeTheme);
  }

  for (const button of themeButtons) {
    const isActive = button.dataset.themeSet === activeTheme;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  }

  localStorage.setItem(THEME_STORAGE_KEY, activeTheme);
}

function setActiveNav(sectionId) {
  const navItems = navList.querySelectorAll('.nav-item');
  for (const navItem of navItems) {
    const href = navItem.getAttribute('href');
    const target = href ? href.replace('#', '') : '';
    const isActive = target === sectionId;
    navItem.classList.toggle('active', isActive);
    navItem.setAttribute('aria-current', isActive ? 'true' : 'false');
  }
}

function resolveHiddenSectionIds(localeData) {
  return new Set(localeData.ui?.hiddenSectionIds || []);
}

function applySectionVisibility(hiddenSectionIds) {
  for (const section of sectionElements) {
    if (!section) {
      continue;
    }

    const shouldHide = hiddenSectionIds.has(section.id);
    section.hidden = shouldHide;
    section.setAttribute('aria-hidden', String(shouldHide));
  }
}

function renderNavigation(localeData, hiddenSectionIds) {
  navList.innerHTML = localeData.nav
    .filter((item) => !hiddenSectionIds.has(item.id))
    .map((item) => `<a class="nav-item" href="#${item.id}">${escapeHtml(item.label)}</a>`)
    .join('');
}

function renderHero(localeData) {
  heroEyebrow.textContent = localeData.hero.eyebrow;
  heroTitle.textContent = localeData.hero.title;
  heroSummary.textContent = localeData.hero.summary;

  heroKpis.innerHTML = localeData.hero.kpis
    .map((kpi) => `<span>${escapeHtml(kpi)}</span>`)
    .join('');

  ctaContact.textContent = localeData.hero.ctaPrimary;
  ctaLinkedIn.textContent = localeData.hero.ctaLinkedIn;
  ctaPrint.textContent = localeData.hero.ctaPrint;
  ctaPrint.setAttribute('aria-label', localeData.labels.printAria);
}

function buildToolMarkup(item, className = '') {
  const safeClass = className ? ` ${className}` : '';
  return `
    <article class="tool-logo${safeClass}">
      <iconify-icon class="tool-logo-icon" icon="${escapeHtml(item.icon)}" aria-hidden="true"></iconify-icon>
      <span>${escapeHtml(item.name)}</span>
    </article>
  `;
}

function renderToolsStrip(localeData) {
  const data = localeData.sections.tools;
  const copies = 4;

  toolsStripEyebrow.textContent = data.eyebrow;
  toolsStripTitle.textContent = data.title;
  toolsStrip.setAttribute('aria-label', localeData.labels.toolsAria);

  const allCopies = Array.from({ length: copies }, (_, copyIndex) =>
    data.items
      .map((item) => buildToolMarkup(item, copyIndex === 0 ? 'is-original' : 'is-clone'))
      .join(''),
  ).join('');
  const shift = 100 / copies;

  toolsTrack.innerHTML = allCopies;
  toolsTrack.style.setProperty('--tools-shift', `${shift}%`);

  for (const clone of toolsTrack.querySelectorAll('.is-clone')) {
    clone.setAttribute('aria-hidden', 'true');
  }
}

function renderPrintIntro(localeData) {
  const aboutText = localeData.hero.summary || localeData.sections.profile.paragraphs[0] || '';
  sectionPrintIntro.innerHTML = `
    <div class="print-identity-head">
      <h2>${escapeHtml(localeData.hero.eyebrow)}</h2>
      <p>${escapeHtml(localeData.hero.title)}</p>
    </div>
    <div class="print-about">
      <h3>${escapeHtml(localeData.labels.aboutLabel)}</h3>
      <p>${escapeHtml(aboutText)}</p>
    </div>
    <div class="print-photo-wrap">
      <img src="./assets/propic_scontornata_portrait.png" alt="Francesco Vaiani portrait" />
    </div>
  `;
}

function renderProfile(localeData) {
  const data = localeData.sections.profile;
  sectionProfile.innerHTML = `
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
  sectionExperience.innerHTML = `
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
  sectionEducation.innerHTML = `
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
  sectionProductWork.innerHTML = `
    <p class="eyebrow">${escapeHtml(data.eyebrow)}</p>
    <h2>${escapeHtml(data.title)}</h2>
    ${introMarkup}
    <div class="cards">
      ${data.items
        .map(
          (item) => `
            <article class="card">
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
  sectionApproach.innerHTML = `
    <p class="eyebrow">${escapeHtml(data.eyebrow)}</p>
    <h2>${escapeHtml(data.title)}</h2>
    <div class="cards cards-single-column">
      ${data.items
        .map(
          (item) => `
            <article class="card">
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.detail)}</p>
            </article>
          `,
        )
        .join('')}
    </div>
  `;
}

function renderMedia(localeData) {
  const data = localeData.sections.media;
  sectionMedia.innerHTML = `
    <p class="eyebrow">${escapeHtml(data.eyebrow)}</p>
    <h2>${escapeHtml(data.title)}</h2>
    <p class="section-note">${escapeHtml(data.intro)}</p>
  `;
}

function renderSkills(localeData) {
  const data = localeData.sections.skills;
  sectionSkills.innerHTML = `
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
  sectionLanguages.innerHTML = `
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
  sectionContact.innerHTML = `
    <p class="eyebrow">${escapeHtml(data.eyebrow)}</p>
    <h2>${escapeHtml(data.title)}</h2>
    <p class="section-note">${escapeHtml(data.intro)}</p>
    <div class="contact-grid">
      ${data.items
        .map((item) => {
          const value = item.href
            ? `<a href="${escapeHtml(item.href)}" target="_blank" rel="noreferrer noopener">${escapeHtml(item.value)}</a>`
            : `<span>${escapeHtml(item.value)}</span>`;
          return `
            <article class="contact-item">
              <h3>${escapeHtml(item.label)}</h3>
              <p>${value}</p>
            </article>
          `;
        })
        .join('')}
    </div>
  `;
}

function renderToolsPrint(localeData) {
  const data = localeData.sections.tools;
  sectionToolsPrint.innerHTML = `
    <p class="eyebrow">${escapeHtml(data.eyebrow)}</p>
    <h2>${escapeHtml(data.title)}</h2>
    <div class="print-tools-grid">
      ${data.items.map((item) => buildToolMarkup(item)).join('')}
    </div>
  `;
}

function setupRevealObserver() {
  if (observer) {
    observer.disconnect();
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          if (entry.target.id) {
            setActiveNav(entry.target.id);
          }
        }
      }
    },
    {
      threshold: 0.3,
      rootMargin: '-12% 0px -35% 0px',
    },
  );

  const revealElements = document.querySelectorAll('[data-reveal]:not([hidden])');
  for (const element of revealElements) {
    element.classList.add('is-visible');
    observer.observe(element);
  }

  setActiveNav('hero');
}

function renderLanguageState() {
  for (const button of langButtons) {
    const isActive = button.dataset.lang === activeLocale;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  }
}

function renderLocale() {
  const localeData = SITE_CONTENT[activeLocale];
  const hiddenSectionIds = resolveHiddenSectionIds(localeData);
  root.lang = localeData.lang;
  document.title = localeData.title;

  if (metaDescription) {
    metaDescription.setAttribute('content', localeData.description);
  }

  railTitle.textContent = localeData.rail.title;
  railSubtitle.textContent = localeData.rail.subtitle;
  languageSwitch.setAttribute('aria-label', localeData.labels.languageToggle);
  themeSwitch.setAttribute('aria-label', localeData.labels.themeToggle);

  applySectionVisibility(hiddenSectionIds);
  renderNavigation(localeData, hiddenSectionIds);
  renderHero(localeData);
  renderToolsStrip(localeData);
  renderPrintIntro(localeData);
  renderProfile(localeData);
  renderExperience(localeData);
  renderEducation(localeData);
  renderProductWork(localeData);
  renderApproach(localeData);
  if (hiddenSectionIds.has('media')) {
    sectionMedia.innerHTML = '';
  } else {
    renderMedia(localeData);
  }
  renderSkills(localeData);
  renderLanguages(localeData);
  renderContact(localeData);
  renderToolsPrint(localeData);

  const sectionIds = localeData.nav
    .map((item) => item.id)
    .filter((id) => id !== 'hero' && !hiddenSectionIds.has(id));
  for (const sectionId of sectionIds) {
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionKey = mapSectionIdToContentKey(sectionId);
      section.setAttribute('data-section-key', sectionKey);
    }
  }

  const themeLabelLight = document.getElementById('theme-light');
  const themeLabelDark = document.getElementById('theme-dark');
  const themeLabelAuto = document.getElementById('theme-auto');
  if (themeLabelLight) themeLabelLight.textContent = localeData.labels.themeLight;
  if (themeLabelDark) themeLabelDark.textContent = localeData.labels.themeDark;
  if (themeLabelAuto) themeLabelAuto.textContent = localeData.labels.themeAuto;

  renderLanguageState();
  setupRevealObserver();
}

function setupEvents() {
  for (const langButton of langButtons) {
    langButton.addEventListener('click', () => {
      const nextLocale = langButton.dataset.lang;
      if (!LOCALES.includes(nextLocale)) {
        return;
      }
      activeLocale = nextLocale;
      localStorage.setItem(LOCALE_STORAGE_KEY, activeLocale);
      renderLocale();
    });
  }

  for (const themeButton of themeButtons) {
    themeButton.addEventListener('click', () => {
      setTheme(themeButton.dataset.themeSet || 'auto');
    });
  }

  document.addEventListener('click', (event) => {
    const printAction = event.target.closest('[data-action="print"]');
    if (printAction) {
      event.preventDefault();
      window.print();
    }
  });
}

function bootstrap() {
  setupEvents();
  setTheme(activeTheme);
  renderLocale();
}

bootstrap();
