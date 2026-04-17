export const REQUIRED_SECTION_IDS = [
  'profile',
  'experience',
  'education',
  'product-work',
  'approach',
  'media',
  'skills',
  'languages',
  'contact',
];

export const SITE_CONTENT = {
  en: {
    lang: 'en',
    title: 'Francesco Vaiani | Technical Product Manager',
    description:
      'Technical Product Manager with a full-stack background focused on SaaS, IoT, and device management.',
    ui: {
      hiddenSectionIds: ['media'],
    },
    nav: [
      { id: 'hero', label: 'Hero' },
      { id: 'profile', label: 'Profile' },
      { id: 'product-work', label: 'Domain Expertise' },
      { id: 'skills', label: 'Hard Skills' },
      { id: 'experience', label: 'Experience' },
      { id: 'approach', label: 'How I Work' },
      { id: 'education', label: 'Education' },
      { id: 'languages', label: 'Languages' },
      { id: 'contact', label: 'Contact' },
      { id: 'media', label: 'Media' },
    ],
    rail: {
      title: 'Francesco Vaiani',
      subtitle:
        'Technical Product Manager | Hardware Strategy, SaaS Execution, and Cross-Functional Delivery',
    },
    hero: {
      eyebrow: 'Francesco Vaiani',
      title: 'Technical Product Manager for Hardware Platforms, IoT, and Device Lifecycle',
      summary:
        'From code to product strategy: I connect business goals and technical execution to deliver clear roadmaps, faster alignment, and reliable outcomes.',
      kpis: [
        'Product Manager at SECO (since April 2023)',
        'Senior Software Developer at SECO Mind (June 2021 - April 2023)',
        'Software Developer at AIDILAB (May 2016 - May 2021)',
      ],
      ctaPrimary: 'Contact',
      ctaLinkedIn: 'LinkedIn',
      ctaPrint: 'Print CV',
    },
    sections: {
      profile: {
        eyebrow: 'Profile Summary',
        title: 'Product-first leadership, built on technical depth',
        paragraphs: [
          'I am a Technical Product Manager at SECO with a full-stack software background and direct responsibility for hardware product initiatives.',
          'I lead a small group of Product Managers in Italy and coordinate international stakeholders to deliver hardware product strategy and execution across cross-functional teams.',
          'My approach combines analytics, customer interviews, and competitive analysis to turn market signals into clear priorities, supporting growth in client inquiries, sold units, and expansion into new markets.',
        ],
      },
      experience: {
        eyebrow: 'Job Experiences',
        title: 'Career path',
        items: [
          {
            title: 'Product Manager',
            company: 'SECO',
            city: 'Arezzo',
            date: 'April 2023 - Present',
            scope:
              'I own product scope for SaaS platform evolution, prioritization, and cross-functional execution.',
            contributions: [
              'I lead product framing and roadmap alignment across business and engineering teams.',
              'I use technical depth to improve trade-off quality, delivery sequencing, and communication.',
            ],
          },
          {
            title: 'Senior Software Developer',
            company: 'SECO Mind',
            city: 'Padova',
            date: 'June 2021 - April 2023',
            scope: 'I worked on full-stack engineering across platform and product surfaces.',
            contributions: [
              'I contributed to backend and frontend implementation quality in SaaS platform contexts.',
              'I built technical experience now applied to product leadership and stakeholder alignment.',
            ],
          },
          {
            title: 'Software Developer',
            company: 'AIDILAB',
            city: 'Siena',
            date: 'May 2016 - May 2021',
            scope:
              'I covered engineering responsibilities until the AIDILAB merge with Hopenly and Ispirata.',
            contributions: [
              'I built the full-stack foundation that now supports my product strategy and technical communication.',
            ],
          },
        ],
      },
      education: {
        eyebrow: 'My Education',
        title: 'Education',
        items: [
          {
            date: '2004 - 2010',
            institution: 'Universita di Siena',
            city: 'Siena',
            degree: "Bachelor's Degree in Computer Theory and Science",
            description:
              'I built my foundation in computer science theory, software fundamentals, and analytical problem solving.',
          },
        ],
      },
      productWork: {
        eyebrow: 'Domain Expertise',
        title: 'Hardware-First PM with SaaS Experience',
        intro:
          'I focus on product decisions where hardware strategy, device lifecycle requirements, and SaaS execution must stay aligned.',
        items: [
          {
            title: 'Hardware-Software Product Strategy',
            detail:
              'I connect hardware constraints and software roadmap decisions, aligning R&D, Sales, and Marketing to improve inquiries, sold units, and market expansion.',
          },
          {
            title: 'Device Lifecycle Management',
            detail:
              'I prioritize capabilities across onboarding, monitoring, updates, and fleet operations by balancing user value, technical feasibility, and business impact.',
          },
          {
            title: 'Industrial IoT SaaS Platforms',
            detail:
              'I bring previous hands-on SaaS experience in connected-product environments, translating technical complexity into clear product priorities.',
          },
        ],
      },
      approach: {
        eyebrow: 'How I Work',
        title: 'CIRCLES-aligned product execution',
        items: [
          {
            title: 'Clarify context and customer',
            detail:
              'I start by defining the situation, target customer, and constraints before jumping to solutions.',
          },
          {
            title: 'Translate insights into needs',
            detail:
              'I combine customer interviews, analytics, and market signals to identify the highest-value problems.',
          },
          {
            title: 'Prioritize with explicit trade-offs',
            detail:
              'I cut through competing requests by ranking impact, feasibility, and strategic fit with transparent decisions.',
          },
          {
            title: 'Shape options and execution',
            detail:
              'I frame solution paths with engineering and go-to-market teams, then align scope, sequencing, and delivery ownership.',
          },
          {
            title: 'Close the loop with outcomes',
            detail:
              'I track inquiries, sold units, and market traction to refine strategy and strengthen roadmap quality.',
          },
        ],
      },
      media: {
        eyebrow: 'Media / Videos',
        title: 'Video communication work',
        intro: 'Temporarily hidden until final video list is provided.',
        items: [],
      },
      skills: {
        eyebrow: 'Hard Skills',
        title: 'Core capabilities for product roles',
        groups: [
          {
            title: 'Product Strategy',
            items: [
              { label: 'Opportunity sizing and market analysis', value: 92 },
              { label: 'Discovery and prioritization (CIRCLES-aligned)', value: 91 },
            ],
          },
          {
            title: 'Technical Product Differentiation',
            items: [
              { label: 'Hardware product strategy and lifecycle planning', value: 93 },
              { label: 'Full-stack to hardware product translation', value: 92 },
            ],
          },
          {
            title: 'Execution and Alignment',
            items: [
              { label: 'Cross-functional execution (R&D, Sales, Marketing)', value: 90 },
              { label: 'International stakeholder coordination', value: 89 },
            ],
          },
        ],
      },
      languages: {
        eyebrow: 'Languages',
        title: 'Language proficiency',
        items: [
          { name: 'Italian', level: 'Native' },
          { name: 'English', level: 'Professional' },
        ],
      },
      tools: {
        eyebrow: 'Software Familiarity',
        title: 'Software familiarity',
        items: [
          {
            name: 'PowerPoint',
            icon: 'simple-icons:microsoftpowerpoint',
          },
          {
            name: 'Excel',
            icon: 'simple-icons:microsoftexcel',
          },
          {
            name: 'ChatGPT',
            icon: 'simple-icons:openai',
          },
          {
            name: 'Python',
            icon: 'simple-icons:python',
          },
          {
            name: 'JavaScript',
            icon: 'simple-icons:javascript',
          },
        ],
      },
      contact: {
        eyebrow: 'Contact',
        title: 'Professional channels',
        intro: 'Public and verified contact points.',
        items: [
          {
            label: 'Email',
            type: 'obfuscated-email',
            maskedValue: 'francesco.vaiani [at] gmail [dot] com',
            emailCodes: [
              102,
              114,
              97,
              110,
              99,
              101,
              115,
              99,
              111,
              46,
              118,
              97,
              105,
              97,
              110,
              105,
              64,
              103,
              109,
              97,
              105,
              108,
              46,
              99,
              111,
              109,
            ],
          },
          {
            label: 'LinkedIn',
            value: 'francesco-vaiani-81266aa7',
            href: 'https://www.linkedin.com/in/francesco-vaiani-81266aa7/',
          },
          {
            label: 'Location',
            value: 'Arezzo, Italy',
            href: '',
          },
        ],
      },
    },
    labels: {
      languageToggle: 'Language switch',
      themeToggle: 'Theme switch',
      themeLight: 'Light',
      themeDark: 'Dark',
      themeAuto: 'Auto',
      contributionPrefix: 'Contribution',
      missingLink: 'Link pending',
      printAria: 'Print this page as PDF',
      referencesLabel: 'References',
      problemLabel: 'Problem',
      usersLabel: 'Users',
      roleLabel: 'Role',
      impactLabel: 'Impact',
      whyMattersLabel: 'Why it matters',
      cityLabel: 'City',
      institutionLabel: 'Institution',
      degreeLabel: 'Degree',
      aboutLabel: 'About',
      toolsAria: 'Software logos carousel',
      menuOpenLabel: 'Open menu',
      menuCloseLabel: 'Close menu',
      menuText: 'Menu',
    },
  },
  it: {
    lang: 'it',
    title: 'Francesco Vaiani | Technical Product Manager',
    description:
      'Technical Product Manager con background full-stack specializzato in SaaS, IoT e device management.',
    ui: {
      hiddenSectionIds: ['media'],
    },
    nav: [
      { id: 'hero', label: 'Hero' },
      { id: 'profile', label: 'Profilo' },
      { id: 'product-work', label: 'Expertise di Dominio' },
      { id: 'skills', label: 'Hard Skills' },
      { id: 'experience', label: 'Esperienza' },
      { id: 'approach', label: 'Come lavoro' },
      { id: 'education', label: 'Formazione' },
      { id: 'languages', label: 'Lingue' },
      { id: 'contact', label: 'Contatti' },
      { id: 'media', label: 'Media' },
    ],
    rail: {
      title: 'Francesco Vaiani',
      subtitle:
        'Technical Product Manager | Strategia Hardware, Esecuzione SaaS e Delivery Cross-Funzionale',
    },
    hero: {
      eyebrow: 'Francesco Vaiani',
      title: 'Technical Product Manager per Piattaforme Hardware, IoT e Device Lifecycle',
      summary:
        'Dal codice alla strategia di prodotto: collego obiettivi di business ed esecuzione tecnica per ottenere roadmap chiare, allineamento rapido e risultati affidabili.',
      kpis: [
        'Product Manager in SECO (da aprile 2023)',
        'Senior Software Developer in SECO Mind (giugno 2021 - aprile 2023)',
        'Software Developer in AIDILAB (maggio 2016 - maggio 2021)',
      ],
      ctaPrimary: 'Contatti',
      ctaLinkedIn: 'LinkedIn',
      ctaPrint: 'Stampa CV',
    },
    sections: {
      profile: {
        eyebrow: 'Sintesi Profilo',
        title: 'Leadership product-first, con forte base tecnica',
        paragraphs: [
          'Sono Technical Product Manager in SECO, con background full-stack software e responsabilita diretta su iniziative di prodotto hardware.',
          'Guido un piccolo gruppo di Product Manager in Italia e coordino stakeholder internazionali per portare a risultato strategia ed esecuzione di prodotto hardware in team cross-funzionali.',
          'Il mio approccio unisce analytics, interviste clienti e analisi competitiva per trasformare segnali di mercato in priorita chiare, con impatto su inquiry dei clienti, unita vendute ed espansione in nuovi mercati.',
        ],
      },
      experience: {
        eyebrow: 'Esperienze',
        title: 'Percorso professionale',
        items: [
          {
            title: 'Product Manager',
            company: 'SECO',
            city: 'Arezzo',
            date: 'aprile 2023 - oggi',
            scope:
              'Ho responsabilita di prodotto su evoluzione piattaforma SaaS, prioritizzazione ed esecuzione cross-funzionale.',
            contributions: [
              'Guido il framing di prodotto e l allineamento roadmap tra business e engineering.',
              'Uso profondita tecnica per migliorare qualita dei trade-off e affidabilita della delivery.',
            ],
          },
          {
            title: 'Senior Software Developer',
            company: 'SECO Mind',
            city: 'Padova',
            date: 'giugno 2021 - aprile 2023',
            scope: 'Ho lavorato come full-stack engineer su piattaforme e funzionalita di prodotto.',
            contributions: [
              'Ho contribuito a backend e frontend in contesti SaaS.',
              'Ho costruito la base tecnica che oggi applico a leadership di prodotto e allineamento stakeholder.',
            ],
          },
          {
            title: 'Software Developer',
            company: 'AIDILAB',
            city: 'Siena',
            date: 'maggio 2016 - maggio 2021',
            scope:
              'Ho gestito responsabilita ingegneristiche fino alla merge di AIDILAB con Hopenly e Ispirata.',
            contributions: [
              'Ho costruito la base full-stack che ora uso per strategia prodotto e comunicazione tecnica.',
            ],
          },
        ],
      },
      education: {
        eyebrow: 'Formazione',
        title: 'My Education',
        items: [
          {
            date: '2004 - 2010',
            institution: 'Universita di Siena',
            city: 'Siena',
            degree: 'Laurea in Informatica Teorica e Scienze Computazionali',
            description:
              'Ho costruito una base accademica in teoria informatica, fondamenti software e approccio analitico al problem solving.',
          },
        ],
      },
      productWork: {
        eyebrow: 'Expertise di Dominio',
        title: 'Product Manager hardware-first con esperienza SaaS',
        intro:
          'Mi focalizzo su decisioni di prodotto dove strategia hardware, requisiti di lifecycle dei device ed esecuzione SaaS devono restare allineate.',
        items: [
          {
            title: 'Strategia Prodotto Hardware-Software',
            detail:
              'Collego vincoli hardware e decisioni roadmap software, allineando R&D, Sales e Marketing per migliorare inquiry, unita vendute ed espansione di mercato.',
          },
          {
            title: 'Gestione del Lifecycle dei Device',
            detail:
              'Prioritizzo capacita lungo onboarding, monitoraggio, aggiornamenti e fleet operations bilanciando valore utente, fattibilita tecnica e impatto business.',
          },
          {
            title: 'Piattaforme SaaS per Industrial IoT',
            detail:
              'Porto esperienza SaaS maturata in contesti di prodotti connessi, trasformando complessita tecnica in priorita prodotto chiare.',
          },
        ],
      },
      approach: {
        eyebrow: 'Come Lavoro',
        title: 'Esecuzione prodotto allineata al framework CIRCLES',
        items: [
          {
            title: 'Chiarezza su contesto e cliente',
            detail:
              'Parto dalla definizione del contesto, del cliente target e dei vincoli prima di entrare nelle soluzioni.',
          },
          {
            title: 'Dagli insight ai bisogni',
            detail:
              'Unisco interviste cliente, analytics e segnali di mercato per identificare i problemi a maggior valore.',
          },
          {
            title: 'Prioritizzazione con trade-off espliciti',
            detail:
              'Gestisco richieste concorrenti valutando impatto, fattibilita e coerenza strategica con decisioni trasparenti.',
          },
          {
            title: 'Opzioni di soluzione ed esecuzione',
            detail:
              'Definisco opzioni con engineering e go-to-market, allineando scope, sequenza e ownership della delivery.',
          },
          {
            title: 'Misura risultati e apprendimento continuo',
            detail:
              'Monitoro inquiry, unita vendute e trazione di mercato per affinare strategia e qualita della roadmap.',
          },
        ],
      },
      media: {
        eyebrow: 'Media / Video',
        title: 'Comunicazione video',
        intro: 'Sezione temporaneamente nascosta finche non arriva la lista video finale.',
        items: [],
      },
      skills: {
        eyebrow: 'Hard Skills',
        title: 'Competenze principali',
        groups: [
          {
            title: 'Strategia di Prodotto',
            items: [
              { label: 'Analisi di mercato e opportunity sizing', value: 92 },
              { label: 'Discovery e prioritizzazione (allineate a CIRCLES)', value: 91 },
            ],
          },
          {
            title: 'Differenziazione Tecnica di Prodotto',
            items: [
              { label: 'Strategia hardware e pianificazione del lifecycle', value: 93 },
              { label: 'Traduzione full-stack verso decisioni prodotto hardware', value: 92 },
            ],
          },
          {
            title: 'Esecuzione e Allineamento',
            items: [
              { label: 'Esecuzione cross-funzionale (R&D, Sales, Marketing)', value: 90 },
              { label: 'Coordinamento stakeholder internazionali', value: 89 },
            ],
          },
        ],
      },
      languages: {
        eyebrow: 'Lingue',
        title: 'Competenze linguistiche',
        items: [
          { name: 'Italiano', level: 'Madrelingua' },
          { name: 'Inglese', level: 'Professionale' },
        ],
      },
      tools: {
        eyebrow: 'Software Familiarity',
        title: 'Software conosciuti',
        items: [
          {
            name: 'PowerPoint',
            icon: 'simple-icons:microsoftpowerpoint',
          },
          {
            name: 'Excel',
            icon: 'simple-icons:microsoftexcel',
          },
          {
            name: 'ChatGPT',
            icon: 'simple-icons:openai',
          },
          {
            name: 'Python',
            icon: 'simple-icons:python',
          },
          {
            name: 'JavaScript',
            icon: 'simple-icons:javascript',
          },
        ],
      },
      contact: {
        eyebrow: 'Contatti',
        title: 'Canali professionali',
        intro: 'Contatti pubblici e verificati.',
        items: [
          {
            label: 'Email',
            type: 'obfuscated-email',
            maskedValue: 'francesco.vaiani [at] gmail [dot] com',
            emailCodes: [
              102,
              114,
              97,
              110,
              99,
              101,
              115,
              99,
              111,
              46,
              118,
              97,
              105,
              97,
              110,
              105,
              64,
              103,
              109,
              97,
              105,
              108,
              46,
              99,
              111,
              109,
            ],
          },
          {
            label: 'LinkedIn',
            value: 'francesco-vaiani-81266aa7',
            href: 'https://www.linkedin.com/in/francesco-vaiani-81266aa7/',
          },
          {
            label: 'Localita',
            value: 'Arezzo, Italia',
            href: '',
          },
        ],
      },
    },
    labels: {
      languageToggle: 'Cambio lingua',
      themeToggle: 'Tema',
      themeLight: 'Chiaro',
      themeDark: 'Scuro',
      themeAuto: 'Auto',
      contributionPrefix: 'Contributo',
      missingLink: 'Link in attesa',
      printAria: 'Stampa questa pagina in PDF',
      referencesLabel: 'Riferimenti',
      problemLabel: 'Problema',
      usersLabel: 'Utenti',
      roleLabel: 'Ruolo',
      impactLabel: 'Impatto',
      whyMattersLabel: 'Perche conta',
      cityLabel: 'Citta',
      institutionLabel: 'Istituzione',
      degreeLabel: 'Titolo',
      aboutLabel: 'About',
      toolsAria: 'Carosello software',
      menuOpenLabel: 'Apri menu',
      menuCloseLabel: 'Chiudi menu',
      menuText: 'Menu',
    },
  },
};
