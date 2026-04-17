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
const printLeftCol = document.getElementById('print-left-col');
const printRightCol = document.getElementById('print-right-col');

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
const themeSwitches = Array.from(document.querySelectorAll('[data-role="theme-switch"]'));
const languageSwitches = Array.from(document.querySelectorAll('[data-role="language-switch"]'));
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
const mobileMenuLabel = mobileMenuToggle ? mobileMenuToggle.querySelector('.mobile-menu-label') : null;

let observer = null;
let activeLocale = resolveInitialLocale(localStorage.getItem(LOCALE_STORAGE_KEY), navigator.language);
let activeTheme = normalizeTheme(localStorage.getItem(THEME_STORAGE_KEY));
const mobileMenuMedia = window.matchMedia('(max-width: 1024px)');
const MAILTO_PREFIX_CODES = [109, 97, 105, 108, 116, 111, 58];
const PRINT_PORTRAIT_SRC = './assets/propic_scontornata_portrait.png';
const PRINT_PORTRAIT_LOAD_TIMEOUT_MS = 2500;
let printPortraitHydrated = false;
let printPortraitLoadPromise = null;

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
    if (isActive) {
      navItem.setAttribute('aria-current', 'location');
    } else {
      navItem.removeAttribute('aria-current');
    }
  }
}

function resolveHiddenSectionIds(localeData) {
  return new Set(localeData.ui?.hiddenSectionIds || []);
}

function setMobileMenuState(nextOpen, labels = SITE_CONTENT[activeLocale]?.labels) {
  const shouldOpen = Boolean(nextOpen && mobileMenuMedia.matches);
  document.body.classList.toggle('mobile-menu-open', shouldOpen);

  if (mobileMenuBackdrop) {
    mobileMenuBackdrop.hidden = !shouldOpen;
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.setAttribute('aria-expanded', String(shouldOpen));
    const ariaLabel = shouldOpen ? labels?.menuCloseLabel || 'Close menu' : labels?.menuOpenLabel || 'Open menu';
    mobileMenuToggle.setAttribute('aria-label', ariaLabel);
  }

  if (mobileMenuLabel) {
    mobileMenuLabel.textContent = labels?.menuText || 'Menu';
  }
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
      <img
        data-print-portrait
        data-src="${escapeHtml(PRINT_PORTRAIT_SRC)}"
        alt="Francesco Vaiani portrait"
        width="600"
        height="600"
        decoding="async"
      />
    </div>
  `;
  printPortraitHydrated = false;
  printPortraitLoadPromise = null;
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
  sectionProductWork.classList.remove('section-variant-expertise');
  sectionProductWork.innerHTML = `
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
  sectionApproach.innerHTML = `
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

function decodeCharCodes(codes) {
  return codes.map((code) => String.fromCharCode(code)).join('');
}

function parseEncodedCodes(rawValue) {
  if (!rawValue) {
    return [];
  }

  return rawValue
    .split('.')
    .map((part) => Number.parseInt(part, 10))
    .filter((code) => Number.isInteger(code) && code >= 32 && code <= 126);
}

function buildContactValueMarkup(item) {
  if (item.type === 'obfuscated-email' && Array.isArray(item.emailCodes)) {
    const safeCodes = item.emailCodes
      .map((value) => Number.parseInt(String(value), 10))
      .filter((code) => Number.isInteger(code) && code >= 32 && code <= 126);

    if (safeCodes.length > 0) {
      const decodedEmail = decodeCharCodes(safeCodes);
      const fallbackMaskedValue = decodedEmail.replace('@', ' [at] ').replace(/\./g, ' [dot] ');
      const maskedValue = item.maskedValue || fallbackMaskedValue;
      return `<a href="#" data-obfuscated-email="${escapeHtml(safeCodes.join('.'))}">${escapeHtml(maskedValue)}</a>`;
    }
  }

  if (item.href) {
    return `<a href="${escapeHtml(item.href)}" target="_blank" rel="noreferrer noopener">${escapeHtml(item.value)}</a>`;
  }

  return `<span>${escapeHtml(item.value || '')}</span>`;
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
          const value = buildContactValueMarkup(item);
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

function buildPrintPanelMarkup(sourceSection, sourceId) {
  if (!sourceSection) {
    return '';
  }

  return `
    <section class="panel print-panel print-source-${sourceId}">
      ${sourceSection.innerHTML}
    </section>
  `;
}

function renderPrintLayout(hiddenSectionIds) {
  if (!printLeftCol || !printRightCol) {
    return;
  }

  const sectionById = {
    'print-intro': sectionPrintIntro,
    contact: sectionContact,
    skills: sectionSkills,
    languages: sectionLanguages,
    experience: sectionExperience,
    education: sectionEducation,
    approach: sectionApproach,
    'product-work': sectionProductWork,
    'tools-print': sectionToolsPrint,
  };

  const shouldInclude = (id) => id === 'print-intro' || id === 'tools-print' || !hiddenSectionIds.has(id);
  const leftOrder = ['print-intro', 'contact', 'skills', 'languages'];
  const rightOrder = ['experience', 'education', 'approach', 'product-work', 'tools-print'];

  printLeftCol.innerHTML = leftOrder
    .filter(shouldInclude)
    .map((id) => buildPrintPanelMarkup(sectionById[id], id))
    .join('');

  printRightCol.innerHTML = rightOrder
    .filter(shouldInclude)
    .map((id) => buildPrintPanelMarkup(sectionById[id], id))
    .join('');
}

function hydratePrintPortraitSources() {
  const portraits = Array.from(document.querySelectorAll('[data-print-portrait]'));
  const hydratedPortraits = [];

  for (const portrait of portraits) {
    const src = portrait.getAttribute('data-src');
    if (!src) {
      continue;
    }

    portrait.setAttribute('loading', 'eager');
    if (portrait.getAttribute('src') !== src) {
      portrait.setAttribute('src', src);
    }

    hydratedPortraits.push(portrait);
  }

  return hydratedPortraits;
}

function isImageLoaded(image) {
  return image.complete && image.naturalWidth > 0;
}

function waitForImageLoad(image) {
  if (image.complete) {
    return Promise.resolve(isImageLoaded(image));
  }

  return new Promise((resolve) => {
    let settled = false;
    const timeoutId = window.setTimeout(() => {
      settle();
    }, PRINT_PORTRAIT_LOAD_TIMEOUT_MS);

    const settle = () => {
      if (settled) {
        return;
      }
      settled = true;
      window.clearTimeout(timeoutId);
      image.removeEventListener('load', onReady);
      image.removeEventListener('error', onReady);
      resolve(isImageLoaded(image));
    };

    const onReady = () => {
      settle();
    };

    image.addEventListener('load', onReady);
    image.addEventListener('error', onReady);
  });
}

function ensurePrintPortraitIsReady() {
  if (printPortraitHydrated) {
    return Promise.resolve();
  }

  if (printPortraitLoadPromise) {
    return printPortraitLoadPromise;
  }

  const portraits = hydratePrintPortraitSources();
  if (portraits.length === 0) {
    printPortraitHydrated = true;
    return Promise.resolve();
  }

  if (portraits.every((portrait) => isImageLoaded(portrait))) {
    printPortraitHydrated = true;
    return Promise.resolve();
  }

  printPortraitLoadPromise = Promise.all(portraits.map((portrait) => waitForImageLoad(portrait)))
    .then((results) => {
      printPortraitHydrated = results.every(Boolean);
    })
    .finally(() => {
      printPortraitLoadPromise = null;
    });

  return printPortraitLoadPromise;
}

function schedulePrintPortraitPreload() {
  const preload = () => {
    void ensurePrintPortraitIsReady();
  };

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(preload, { timeout: 1200 });
  } else {
    window.setTimeout(preload, 700);
  }
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
  for (const languageSwitch of languageSwitches) {
    languageSwitch.setAttribute('aria-label', localeData.labels.languageToggle);
  }
  for (const themeSwitch of themeSwitches) {
    themeSwitch.setAttribute('aria-label', localeData.labels.themeToggle);
  }
  setMobileMenuState(document.body.classList.contains('mobile-menu-open'), localeData.labels);

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
  renderPrintLayout(hiddenSectionIds);
  schedulePrintPortraitPreload();

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

  for (const themeButton of themeButtons) {
    let localizedLabel = '';
    if (themeButton.dataset.themeSet === 'light') {
      localizedLabel = localeData.labels.themeLight;
    } else if (themeButton.dataset.themeSet === 'dark') {
      localizedLabel = localeData.labels.themeDark;
    } else if (themeButton.dataset.themeSet === 'auto') {
      localizedLabel = localeData.labels.themeAuto;
    }

    if (!localizedLabel) {
      continue;
    }

    themeButton.setAttribute('aria-label', localizedLabel);
    themeButton.setAttribute('title', localizedLabel);

    const hiddenLabel = themeButton.querySelector('[data-theme-label]');
    if (hiddenLabel) {
      hiddenLabel.textContent = localizedLabel;
    }

    if (!themeButton.classList.contains('theme-btn--icon')) {
      themeButton.textContent = localizedLabel;
    }
  }

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
      setMobileMenuState(false, SITE_CONTENT[nextLocale]?.labels);
    });
  }

  for (const themeButton of themeButtons) {
    themeButton.addEventListener('click', () => {
      setTheme(themeButton.dataset.themeSet || 'auto');
      setMobileMenuState(false);
    });
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = document.body.classList.contains('mobile-menu-open');
      setMobileMenuState(!isOpen);
    });
  }

  if (mobileMenuBackdrop) {
    mobileMenuBackdrop.addEventListener('click', () => {
      setMobileMenuState(false);
    });
  }

  navList.addEventListener('click', (event) => {
    if (event.target.closest('.nav-item')) {
      setMobileMenuState(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('mobile-menu-open')) {
      setMobileMenuState(false);
    }
  });

  const closeMenuOnViewportChange = () => {
    if (!mobileMenuMedia.matches) {
      setMobileMenuState(false);
    }
  };

  if (typeof mobileMenuMedia.addEventListener === 'function') {
    mobileMenuMedia.addEventListener('change', closeMenuOnViewportChange);
  } else if (typeof mobileMenuMedia.addListener === 'function') {
    mobileMenuMedia.addListener(closeMenuOnViewportChange);
  }

  document.addEventListener('click', (event) => {
    const obfuscatedEmailTrigger = event.target.closest('[data-obfuscated-email]');
    if (obfuscatedEmailTrigger) {
      event.preventDefault();
      const encoded = obfuscatedEmailTrigger.getAttribute('data-obfuscated-email') || '';
      const emailCodes = parseEncodedCodes(encoded);
      if (emailCodes.length > 0) {
        const address = decodeCharCodes(emailCodes);
        const mailtoHref = `${decodeCharCodes(MAILTO_PREFIX_CODES)}${address}`;
        window.location.href = mailtoHref;
      }
      return;
    }

    const printAction = event.target.closest('[data-action="print"]');
    if (printAction) {
      event.preventDefault();
      ensurePrintPortraitIsReady().finally(() => {
        window.print();
      });
    }
  });

  window.addEventListener('beforeprint', () => {
    hydratePrintPortraitSources();
    void ensurePrintPortraitIsReady();
  });
}

function bootstrap() {
  setupEvents();
  setTheme(activeTheme);
  renderLocale();
  setMobileMenuState(false);
}

bootstrap();
