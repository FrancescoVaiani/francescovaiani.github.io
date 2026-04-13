import assert from 'node:assert/strict';
import { REQUIRED_SECTION_IDS, SITE_CONTENT } from '../scripts/content.js';

const LOCALES = ['en', 'it'];

function sectionKeyFromId(sectionId) {
  return sectionId === 'product-work' ? 'productWork' : sectionId;
}

export function runContentModelTests() {
  const cases = [
    {
      name: 'both locales exist',
      fn: () => {
        for (const locale of LOCALES) {
          assert.ok(SITE_CONTENT[locale], `Missing locale: ${locale}`);
        }
      },
    },
    {
      name: 'navigation includes required sections in each locale',
      fn: () => {
        for (const locale of LOCALES) {
          const navIds = SITE_CONTENT[locale].nav.map((item) => item.id);
          for (const sectionId of REQUIRED_SECTION_IDS) {
            assert.ok(navIds.includes(sectionId), `Locale ${locale} missing nav id ${sectionId}`);
          }
        }
      },
    },
    {
      name: 'section payloads exist for each required section',
      fn: () => {
        for (const locale of LOCALES) {
          for (const sectionId of REQUIRED_SECTION_IDS) {
            const key = sectionKeyFromId(sectionId);
            assert.ok(
              SITE_CONTENT[locale].sections[key],
              `Locale ${locale} missing section payload for ${key}`,
            );
          }
        }
      },
    },
    {
      name: 'experience items include city and critical fields',
      fn: () => {
        for (const locale of LOCALES) {
          const items = SITE_CONTENT[locale].sections.experience.items;
          assert.ok(
            Array.isArray(items) && items.length >= 3,
            `Locale ${locale} has incomplete experience`,
          );
          for (const item of items) {
            assert.ok(item.title);
            assert.ok(item.company);
            assert.ok(item.city);
            assert.ok(item.date);
            assert.ok(item.scope);
            assert.ok(Array.isArray(item.contributions));
          }
        }
      },
    },
    {
      name: 'education exists with one or more entries in each locale',
      fn: () => {
        for (const locale of LOCALES) {
          const education = SITE_CONTENT[locale].sections.education;
          assert.ok(education);
          assert.ok(Array.isArray(education.items) && education.items.length >= 1);
          for (const item of education.items) {
            assert.ok(item.date);
            assert.ok(item.institution);
            assert.ok(item.city);
            assert.ok(item.degree);
          }
        }
      },
    },
    {
      name: 'product work includes two flagship blocks',
      fn: () => {
        for (const locale of LOCALES) {
          const items = SITE_CONTENT[locale].sections.productWork.items;
          assert.equal(items.length, 2, `Locale ${locale} should have exactly 2 flagship blocks`);
        }
      },
    },
    {
      name: 'skills values stay in 0..100 range',
      fn: () => {
        for (const locale of LOCALES) {
          const groups = SITE_CONTENT[locale].sections.skills.groups;
          for (const group of groups) {
            for (const item of group.items) {
              assert.ok(item.value >= 0 && item.value <= 100, `${locale} skill out of range`);
            }
          }
        }
      },
    },
    {
      name: 'languages contain exactly two business labels',
      fn: () => {
        const allowedLevels = new Set(['Native', 'Professional', 'Madrelingua', 'Professionale']);
        for (const locale of LOCALES) {
          const items = SITE_CONTENT[locale].sections.languages.items;
          assert.equal(items.length, 2, `Locale ${locale} should have exactly 2 languages`);
          for (const item of items) {
            assert.ok(item.name);
            assert.ok(allowedLevels.has(item.level), `Locale ${locale} has unexpected level`);
          }
        }
      },
    },
    {
      name: 'tools include required five software entries',
      fn: () => {
        const expected = new Set(['PowerPoint', 'Excel', 'ChatGPT', 'Python', 'JavaScript']);
        const iconPrefix = 'simple-icons:';
        for (const locale of LOCALES) {
          const items = SITE_CONTENT[locale].sections.tools.items;
          assert.equal(items.length, 5, `Locale ${locale} should have exactly 5 tools`);
          for (const item of items) {
            assert.ok(expected.has(item.name), `Locale ${locale} has unexpected tool ${item.name}`);
            assert.ok(item.icon.startsWith(iconPrefix), `${locale} tool icon must use simple-icons`);
          }
        }
      },
    },
    {
      name: 'hidden section config points to valid sections',
      fn: () => {
        for (const locale of LOCALES) {
          const hidden = SITE_CONTENT[locale].ui?.hiddenSectionIds || [];
          const navIds = SITE_CONTENT[locale].nav.map((item) => item.id);
          for (const sectionId of hidden) {
            const key = sectionKeyFromId(sectionId);
            assert.ok(navIds.includes(sectionId), `${locale} hidden section missing in nav: ${sectionId}`);
            assert.ok(
              SITE_CONTENT[locale].sections[key],
              `${locale} hidden section missing payload: ${sectionId}`,
            );
          }
        }
      },
    },
  ];

  for (const testCase of cases) {
    testCase.fn();
  }

  return cases.map((testCase) => testCase.name);
}
