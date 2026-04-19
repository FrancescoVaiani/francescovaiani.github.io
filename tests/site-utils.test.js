import assert from 'node:assert/strict';
import {
  escapeHtml,
  localeHasRequiredSections,
  normalizeTheme,
  resolveInitialLocale,
  slugifyForId,
  validateSiteContentModel,
} from '../scripts/site-utils.js';
import { SITE_CONTENT } from '../scripts/content.js';

export function runSiteUtilsTests() {
  const cases = [
    {
      name: 'normalizeTheme keeps supported values',
      fn: () => {
        assert.equal(normalizeTheme('light'), 'light');
        assert.equal(normalizeTheme('dark'), 'dark');
        assert.equal(normalizeTheme('auto'), 'auto');
      },
    },
    {
      name: 'normalizeTheme falls back to auto for unknown values',
      fn: () => {
        assert.equal(normalizeTheme('sepia'), 'auto');
        assert.equal(normalizeTheme(''), 'auto');
      },
    },
    {
      name: 'resolveInitialLocale prioritizes saved locale',
      fn: () => {
        assert.equal(resolveInitialLocale('it', 'en-US'), 'it');
        assert.equal(resolveInitialLocale('en', 'it-IT'), 'en');
      },
    },
    {
      name: 'resolveInitialLocale uses browser language when no saved locale exists',
      fn: () => {
        assert.equal(resolveInitialLocale(null, 'it-IT'), 'it');
        assert.equal(resolveInitialLocale(undefined, 'en-GB'), 'en');
      },
    },
    {
      name: 'resolveInitialLocale honors default locale before browser language',
      fn: () => {
        assert.equal(resolveInitialLocale(null, 'en-US', 'it'), 'it');
        assert.equal(resolveInitialLocale(undefined, 'it-IT', 'en'), 'en');
      },
    },
    {
      name: 'locale content has required sections',
      fn: () => {
        assert.equal(localeHasRequiredSections(SITE_CONTENT.en), true);
        assert.equal(localeHasRequiredSections(SITE_CONTENT.it), true);
      },
    },
    {
      name: 'locale content requires hero nav entry',
      fn: () => {
        const localeWithoutHero = {
          ...SITE_CONTENT.en,
          nav: SITE_CONTENT.en.nav.filter((item) => item.id !== 'hero'),
        };
        assert.equal(localeHasRequiredSections(localeWithoutHero), false);
      },
    },
    {
      name: 'full site content model validates',
      fn: () => {
        assert.equal(validateSiteContentModel(), true);
      },
    },
    {
      name: 'escapeHtml sanitizes special characters',
      fn: () => {
        assert.equal(
          escapeHtml('<script>alert("x")</script>'),
          '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;',
        );
      },
    },
    {
      name: 'slugifyForId creates stable ids',
      fn: () => {
        assert.equal(slugifyForId('Product Work!'), 'product-work');
        assert.equal(slugifyForId('  Media / Videos  '), 'media-videos');
      },
    },
  ];

  for (const testCase of cases) {
    testCase.fn();
  }

  return cases.map((testCase) => testCase.name);
}
