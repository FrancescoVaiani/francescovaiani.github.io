import { REQUIRED_SECTION_IDS, SITE_CONTENT } from './content.js';

export const LOCALES = ['en', 'it'];
export const THEMES = ['light', 'dark', 'auto'];
export const LOCALE_STORAGE_KEY = 'signaldeck.locale';
export const THEME_STORAGE_KEY = 'signaldeck.theme';

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

export function localeHasRequiredSections(localeContent) {
  return REQUIRED_SECTION_IDS.every((sectionId) => {
    if (sectionId === 'hero') {
      return Array.isArray(localeContent.nav) && localeContent.nav.some((item) => item.id === 'hero');
    }

    const map = {
      'product-work': 'productWork',
    };
    const key = map[sectionId] || sectionId;
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
