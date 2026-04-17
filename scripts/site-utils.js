import { REQUIRED_SECTION_IDS, SITE_CONTENT } from './content.js';

export const LOCALES = ['en', 'it'];
export const THEMES = ['light', 'dark', 'auto'];
export const LOCALE_STORAGE_KEY = 'signaldeck.locale';
export const THEME_STORAGE_KEY = 'signaldeck.theme';

const SECTION_ID_TO_CONTENT_KEY = {
  'product-work': 'productWork',
};

export function normalizeTheme(theme) {
  return THEMES.includes(theme) ? theme : 'auto';
}

export function resolveInitialLocale(savedLocale, browserLanguage = 'en') {
  if (LOCALES.includes(savedLocale)) {
    return savedLocale;
  }

  const lower = String(browserLanguage).toLowerCase();
  if (lower.startsWith('it')) {
    return 'it';
  }
  return 'en';
}

function mapSectionIdToContentKey(sectionId) {
  return SECTION_ID_TO_CONTENT_KEY[sectionId] || sectionId;
}

function hasHeroNavEntry(localeContent) {
  return Array.isArray(localeContent?.nav) && localeContent.nav.some((item) => item.id === 'hero');
}

export function localeHasRequiredSections(localeContent) {
  if (!localeContent || !hasHeroNavEntry(localeContent)) {
    return false;
  }

  return REQUIRED_SECTION_IDS.every((sectionId) => {
    const key = mapSectionIdToContentKey(sectionId);
    return Boolean(localeContent.sections && localeContent.sections[key]);
  });
}

export function validateSiteContentModel() {
  return LOCALES.every((locale) => localeHasRequiredSections(SITE_CONTENT[locale]));
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function slugifyForId(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replaceAll(/[^a-z0-9]+/g, '-')
    .replaceAll(/^-+|-+$/g, '');
}
