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
      { id: 'skills', label: 'Hard Skills' },
      { id: 'experience', label: 'Experience' },
      { id: 'approach', label: 'How I Work' },
      { id: 'product-work', label: 'Product Work' },
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
        'Software Developer at AIDILAB (May 2016 - May 1, 2021)',
      ],
      ctaPrimary: 'Contact',
      ctaLinkedIn: 'LinkedIn',
      ctaPrint: 'Print / PDF CV',
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
            date: 'May 2016 - May 1, 2021',
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
        eyebrow: 'Selected Product Work',
        title: 'Flagship SaaS projects',
        intro:
          'Both projects below reflect my direct architecture and implementation ownership before my transition to product management roles.',
        items: [
          {
            tag: 'SaaS #1 - IoT',
            title: 'UDOO Cloud',
            problem:
              'Connected hardware products need a reliable cloud layer for telemetry, orchestration, and lifecycle operations.',
            users:
              'Teams running IoT-enabled products and operations that need centralized cloud visibility and control.',
            role:
              'I was the main architect for the platform, including microservice backend design and frontend development.',
            decisions: [
              'I designed a microservice-based backend architecture.',
              'I designed and implemented the frontend application surface.',
              'I designed message-based communication on RabbitMQ.',
              'I designed data structures on MongoDB for the cloud domain model.',
            ],
            impact:
              'I delivered the core cloud foundation used to manage and operate connected UDOO workflows.',
            futureFit:
              'This demonstrates my ability to bridge product direction and hands-on system design in SaaS + hardware contexts.',
            references: [
              {
                label: 'UDOO IoT documentation',
                url: 'https://www.udoo.org/docs-iot/',
              },
            ],
          },
          {
            tag: 'SaaS #2 - Device Management',
            title: 'Edgehog IoT (original implementation)',
            problem:
              'Device lifecycle platforms need reliable fleet operations, telemetry handling, updates, and cloud integration.',
            users:
              'Product and operations teams responsible for connected-device lifecycle management at scale.',
            role:
              'I was the main architect for the original Edgehog IoT implementation, with backend architecture and frontend ownership.',
            decisions: [
              'I designed a microservice backend and built the frontend layer.',
              'I designed messaging on MQTT using Mosquitto.',
              'I designed a hybrid persistence model: SQL for structured device data and MongoDB for telemetry.',
              'I integrated the platform with AWS IoT Cloud.',
              'The later Astarte-based rewrite is treated as a separate implementation; my contribution there focused on the edge agent.',
            ],
            impact:
              'I established the original product architecture used for device management workflows and cloud integration.',
            futureFit:
              'This shows my system-level product thinking across backend architecture, data strategy, and cloud-device integration.',
            references: [
              {
                label: 'Edgehog website',
                url: 'https://edgehog.io/',
              },
              {
                label: 'Edgehog Device Manager GitHub org (current overhaul context)',
                url: 'https://github.com/edgehog-device-manager',
              },
            ],
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
            value: 'francesco.vaiani@gmail.com',
            href: 'mailto:francesco.vaiani@gmail.com',
          },
          {
            label: 'LinkedIn',
            value: 'francesco-vaiani-81266aa7',
            href: 'https://www.linkedin.com/in/francesco-vaiani-81266aa7/',
          },
          {
            label: 'Location',
            value: 'Italy',
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
      { id: 'skills', label: 'Hard Skills' },
      { id: 'experience', label: 'Esperienza' },
      { id: 'approach', label: 'Come lavoro' },
      { id: 'product-work', label: 'Progetti' },
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
        'Software Developer in AIDILAB (maggio 2016 - 1 maggio 2021)',
      ],
      ctaPrimary: 'Contatti',
      ctaLinkedIn: 'LinkedIn',
      ctaPrint: 'Stampa / PDF CV',
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
            date: 'maggio 2016 - 1 maggio 2021',
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
        eyebrow: 'Progetti Prodotto Selezionati',
        title: 'Progetti SaaS principali',
        intro:
          'Entrambi i progetti riflettono la mia ownership diretta su architettura e implementazione prima della transizione verso ruoli product.',
        items: [
          {
            tag: 'SaaS #1 - IoT',
            title: 'UDOO Cloud',
            problem:
              'I prodotti hardware connessi richiedono un layer cloud affidabile per telemetria, orchestrazione e lifecycle operativo.',
            users:
              'Team che gestiscono prodotti IoT e operations con necessita di controllo e visibilita centralizzati.',
            role:
              'Sono stato main architect della piattaforma con design backend a microservizi e sviluppo frontend.',
            decisions: [
              'Ho progettato un architettura backend basata su microservizi.',
              'Ho progettato e sviluppato il frontend applicativo.',
              'Ho progettato il sistema di messaggistica su RabbitMQ.',
              'Ho progettato il modello dati su MongoDB.',
            ],
            impact:
              'Ho realizzato la base cloud per la gestione operativa dei flussi UDOO connessi.',
            futureFit:
              'Questo evidenzia la mia capacita di collegare direzione prodotto e system design operativo in contesti SaaS + hardware.',
            references: [
              {
                label: 'Documentazione UDOO IoT',
                url: 'https://www.udoo.org/docs-iot/',
              },
            ],
          },
          {
            tag: 'SaaS #2 - Device Management',
            title: 'Edgehog IoT (implementazione originale)',
            problem:
              'Le piattaforme di lifecycle device richiedono gestione affidabile di flotta, telemetria, aggiornamenti e integrazione cloud.',
            users:
              'Team prodotto e operations responsabili del ciclo di vita dei dispositivi connessi.',
            role:
              'Sono stato main architect dell implementazione Edgehog IoT originale, con ownership su backend e frontend.',
            decisions: [
              'Ho progettato backend a microservizi e sviluppato il frontend.',
              'Ho progettato la messaggistica MQTT con Mosquitto.',
              'Ho progettato una persistenza ibrida: SQL per dati strutturati device e MongoDB per telemetria.',
              'Ho integrato la piattaforma con AWS IoT Cloud.',
              'La successiva riscrittura Astarte-based e trattata come implementazione separata; in quella fase il mio contributo principale e stato sull edge agent.',
            ],
            impact:
              'Ho definito la prima architettura prodotto per workflow di device management e integrazione cloud.',
            futureFit:
              'Questo dimostra il mio product thinking a livello sistema su backend, strategia dati e integrazione cloud-device.',
            references: [
              {
                label: 'Sito Edgehog',
                url: 'https://edgehog.io/',
              },
              {
                label: 'GitHub org Edgehog Device Manager (contesto overhaul attuale)',
                url: 'https://github.com/edgehog-device-manager',
              },
            ],
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
            value: 'francesco.vaiani@gmail.com',
            href: 'mailto:francesco.vaiani@gmail.com',
          },
          {
            label: 'LinkedIn',
            value: 'francesco-vaiani-81266aa7',
            href: 'https://www.linkedin.com/in/francesco-vaiani-81266aa7/',
          },
          {
            label: 'Localita',
            value: 'Italia',
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
    },
  },
};
