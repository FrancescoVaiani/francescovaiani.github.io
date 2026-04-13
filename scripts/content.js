export const REQUIRED_SECTION_IDS = [
  'profile',
  'experience',
  'product-work',
  'approach',
  'media',
  'skills',
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
      { id: 'experience', label: 'Experience' },
      { id: 'product-work', label: 'Product Work' },
      { id: 'approach', label: 'Approach' },
      { id: 'media', label: 'Media' },
      { id: 'skills', label: 'Skills' },
      { id: 'contact', label: 'Contact' },
    ],
    rail: {
      title: 'Francesco Vaiani',
      subtitle: 'Technical Product Manager | SaaS, IoT and Device Management',
    },
    hero: {
      eyebrow: 'Francesco Vaiani',
      title: 'Technical Product Manager for SaaS, IoT, and Device Management',
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
        title: 'Product-first identity, built on full-stack depth',
        paragraphs: [
          'Current role: Product Manager at SECO. Previous roles: Senior Software Developer at SECO Mind and Software Developer at AIDILAB.',
          'I focus on SaaS products in IoT and device management, connecting business strategy with architecture and delivery.',
          'I am currently targeting Product Manager Hardware, Product Manager SaaS, and Product Manager roles.',
        ],
      },
      experience: {
        eyebrow: 'Experience Timeline',
        title: 'Career path',
        note:
          'Timeline validated with direct user input. AIDILAB ended on May 1, 2021 with the merge into Hopenly and Ispirata.',
        items: [
          {
            title: 'Product Manager',
            company: 'SECO',
            date: 'April 2023 - Present',
            scope:
              'Product scope for SaaS platform evolution, prioritization, and cross-functional execution.',
            contributions: [
              'Leads product framing and roadmap alignment across business and engineering teams.',
              'Uses technical depth to improve trade-off quality, delivery sequencing, and communication.',
            ],
          },
          {
            title: 'Senior Software Developer',
            company: 'SECO Mind',
            date: 'June 2021 - April 2023',
            scope: 'Full-stack engineering work across platform and product surfaces.',
            contributions: [
              'Contributed to backend and frontend implementation quality in SaaS platform contexts.',
              'Built technical experience now applied to product leadership and stakeholder alignment.',
            ],
          },
          {
            title: 'Software Developer',
            company: 'AIDILAB',
            date: 'May 2016 - May 1, 2021',
            scope:
              'Engineering responsibilities until the AIDILAB merge with Hopenly and Ispirata.',
            contributions: [
              'Built the full-stack foundation that now supports product strategy and technical communication.',
            ],
          },
        ],
      },
      productWork: {
        eyebrow: 'Selected Product Work',
        title: 'Flagship SaaS projects',
        intro:
          'Both projects below reflect direct architecture and implementation ownership before the transition to product management roles.',
        items: [
          {
            tag: 'SaaS #1 - IoT',
            title: 'UDOO Cloud',
            problem:
              'Connected hardware products need a reliable cloud layer for telemetry, orchestration, and lifecycle operations.',
            users:
              'Teams running IoT-enabled products and operations that need centralized cloud visibility and control.',
            role:
              'Main architect for the platform, including microservice backend design and frontend development.',
            decisions: [
              'Designed a microservice-based backend architecture.',
              'Designed and implemented the frontend application surface.',
              'Designed message-based communication on RabbitMQ.',
              'Designed data structures on MongoDB for the cloud domain model.',
            ],
            impact:
              'Delivered the core cloud foundation used to manage and operate connected UDOO workflows.',
            futureFit:
              'Demonstrates ability to bridge product direction and hands-on system design in SaaS + hardware contexts.',
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
              'Main architect for the original Edgehog IoT implementation, with backend architecture and frontend ownership.',
            decisions: [
              'Designed a microservice backend and built the frontend layer.',
              'Designed messaging on MQTT using Mosquitto.',
              'Designed a hybrid persistence model: SQL for structured device data and MongoDB for telemetry.',
              'Integrated the platform with AWS IoT Cloud.',
              'Later Astarte-based rewrite is treated as a separate implementation; contribution there focused on the edge agent.',
            ],
            impact:
              'Established the original product architecture used for device management workflows and cloud integration.',
            futureFit:
              'Shows system-level product thinking across backend architecture, data strategy, and cloud-device integration.',
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
        eyebrow: 'Product Approach',
        title: 'How I work',
        items: [
          {
            title: 'Discovery and prioritization',
            detail:
              'I frame roadmap decisions around user value, technical feasibility, and delivery risk.',
          },
          {
            title: 'Technical depth in product decisions',
            detail:
              'I use architecture-level understanding to identify trade-offs early and reduce execution risk.',
          },
          {
            title: 'Business-engineering translation',
            detail:
              'I convert technical complexity into clear product choices for stakeholders and leadership.',
          },
          {
            title: 'Target opportunity focus',
            detail:
              'Current focus: Product Manager Hardware, Product Manager SaaS, and Product Manager roles.',
          },
        ],
      },
      media: {
        eyebrow: 'Media / Videos',
        title: 'Video communication work',
        intro:
          'Temporarily hidden until final video list is provided.',
        items: [],
      },
      skills: {
        eyebrow: 'Skills and Tools',
        title: 'Grouped capabilities',
        groups: [
          {
            title: 'Product',
            items: [
              { label: 'Discovery and prioritization', value: 92 },
              { label: 'Roadmapping and scope definition', value: 89 },
            ],
          },
          {
            title: 'Engineering',
            items: [
              { label: 'Microservice architecture design', value: 88 },
              { label: 'Full-stack implementation fluency', value: 86 },
            ],
          },
          {
            title: 'SaaS / Domain',
            items: [
              { label: 'IoT and device lifecycle platforms', value: 90 },
              { label: 'Cloud-device integration strategy', value: 87 },
            ],
          },
          {
            title: 'Communication',
            items: [
              { label: 'Cross-functional alignment', value: 91 },
              { label: 'Technical storytelling', value: 87 },
            ],
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
            label: 'Open to roles',
            value: 'Product Manager Hardware, Product Manager SaaS, Product Manager',
            href: '',
          },
          {
            label: 'Location',
            value: 'Italy',
            href: '',
          },
          {
            label: 'Languages',
            value: 'English / Italian',
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
      profileUpdated: 'Profile content validated with user-provided information.',
      missingLink: 'Link pending',
      printAria: 'Print this page as PDF',
      referencesLabel: 'References',
      problemLabel: 'Problem',
      usersLabel: 'Users',
      roleLabel: 'Role',
      impactLabel: 'Impact',
      whyMattersLabel: 'Why it matters',
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
      { id: 'experience', label: 'Esperienza' },
      { id: 'product-work', label: 'Progetti' },
      { id: 'approach', label: 'Approccio' },
      { id: 'media', label: 'Media' },
      { id: 'skills', label: 'Competenze' },
      { id: 'contact', label: 'Contatti' },
    ],
    rail: {
      title: 'Francesco Vaiani',
      subtitle: 'Technical Product Manager | SaaS, IoT e Device Management',
    },
    hero: {
      eyebrow: 'Francesco Vaiani',
      title: 'Technical Product Manager per SaaS, IoT e Device Management',
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
        title: 'Identita product-first, costruita su basi full-stack',
        paragraphs: [
          'Ruolo attuale: Product Manager in SECO. Ruoli precedenti: Senior Software Developer in SECO Mind e Software Developer in AIDILAB.',
          'Mi concentro su prodotti SaaS in ambito IoT e device management, collegando strategia di business, architettura ed esecuzione.',
          'Ruoli target: Product Manager Hardware, Product Manager SaaS e Product Manager.',
        ],
      },
      experience: {
        eyebrow: 'Timeline Esperienza',
        title: 'Percorso professionale',
        note:
          'Timeline validata con input diretto. AIDILAB si conclude il 1 maggio 2021 con la merge in Hopenly e Ispirata.',
        items: [
          {
            title: 'Product Manager',
            company: 'SECO',
            date: 'aprile 2023 - oggi',
            scope:
              'Responsabilita di prodotto su evoluzione piattaforma SaaS, prioritizzazione ed esecuzione cross-funzionale.',
            contributions: [
              'Guida il framing di prodotto e l allineamento roadmap tra business e engineering.',
              'Usa profondita tecnica per migliorare qualita dei trade-off e affidabilita della delivery.',
            ],
          },
          {
            title: 'Senior Software Developer',
            company: 'SECO Mind',
            date: 'giugno 2021 - aprile 2023',
            scope: 'Contributo full-stack su piattaforme e funzionalita di prodotto.',
            contributions: [
              'Contributo a backend e frontend in contesti SaaS.',
              'Base tecnica oggi applicata a leadership di prodotto e allineamento stakeholder.',
            ],
          },
          {
            title: 'Software Developer',
            company: 'AIDILAB',
            date: 'maggio 2016 - 1 maggio 2021',
            scope:
              'Responsabilita ingegneristiche fino alla merge di AIDILAB con Hopenly e Ispirata.',
            contributions: [
              'Costruzione della base full-stack ora usata per strategia prodotto e comunicazione tecnica.',
            ],
          },
        ],
      },
      productWork: {
        eyebrow: 'Progetti Prodotto Selezionati',
        title: 'Progetti SaaS principali',
        intro:
          'Entrambi i progetti riflettono ownership diretta su architettura e implementazione prima della transizione verso ruoli product.',
        items: [
          {
            tag: 'SaaS #1 - IoT',
            title: 'UDOO Cloud',
            problem:
              'I prodotti hardware connessi richiedono un layer cloud affidabile per telemetria, orchestrazione e lifecycle operativo.',
            users:
              'Team che gestiscono prodotti IoT e operations con necessita di controllo e visibilita centralizzati.',
            role:
              'Main architect della piattaforma con design backend a microservizi e sviluppo frontend.',
            decisions: [
              'Design di un architettura backend basata su microservizi.',
              'Design e sviluppo del frontend applicativo.',
              'Design del sistema di messaggistica su RabbitMQ.',
              'Design del modello dati su MongoDB.',
            ],
            impact:
              'Realizzazione della base cloud per la gestione operativa dei flussi UDOO connessi.',
            futureFit:
              'Evidenzia capacita di collegare direzione prodotto e system design operativo in contesti SaaS + hardware.',
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
              'Main architect dell implementazione Edgehog IoT originale, con ownership su backend e frontend.',
            decisions: [
              'Design di backend a microservizi e sviluppo frontend.',
              'Design della messaggistica MQTT con Mosquitto.',
              'Design persistenza ibrida: SQL per dati strutturati device e MongoDB per telemetria.',
              'Integrazione con AWS IoT Cloud.',
              'La successiva riscrittura Astarte-based e trattata come implementazione separata; contributo principale su quella fase: edge agent.',
            ],
            impact:
              'Definizione della prima architettura prodotto per workflow di device management e integrazione cloud.',
            futureFit:
              'Dimostra product thinking a livello sistema su backend, strategia dati e integrazione cloud-device.',
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
        eyebrow: 'Approccio al Prodotto',
        title: 'Metodo di lavoro',
        items: [
          {
            title: 'Discovery e prioritizzazione',
            detail:
              'Definisco roadmap e priorita bilanciando valore utente, fattibilita tecnica e rischio delivery.',
          },
          {
            title: 'Profondita tecnica nelle decisioni',
            detail:
              'Uso comprensione architetturale per individuare presto trade-off e ridurre rischio di esecuzione.',
          },
          {
            title: 'Traduzione business-engineering',
            detail:
              'Trasformo complessita tecnica in scelte prodotto chiare per stakeholder e leadership.',
          },
          {
            title: 'Focus opportunita',
            detail:
              'Target attuale: Product Manager Hardware, Product Manager SaaS e Product Manager.',
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
        eyebrow: 'Competenze e Strumenti',
        title: 'Capacita raggruppate',
        groups: [
          {
            title: 'Product',
            items: [
              { label: 'Discovery e prioritizzazione', value: 92 },
              { label: 'Roadmapping e definizione scope', value: 89 },
            ],
          },
          {
            title: 'Engineering',
            items: [
              { label: 'Design architetture a microservizi', value: 88 },
              { label: 'Fluency di implementazione full-stack', value: 86 },
            ],
          },
          {
            title: 'SaaS / Dominio',
            items: [
              { label: 'Piattaforme IoT e lifecycle device', value: 90 },
              { label: 'Strategie di integrazione cloud-device', value: 87 },
            ],
          },
          {
            title: 'Comunicazione',
            items: [
              { label: 'Allineamento cross-funzionale', value: 91 },
              { label: 'Storytelling tecnico', value: 87 },
            ],
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
            label: 'Ruoli target',
            value: 'Product Manager Hardware, Product Manager SaaS, Product Manager',
            href: '',
          },
          {
            label: 'Localita',
            value: 'Italia',
            href: '',
          },
          {
            label: 'Lingue',
            value: 'Inglese / Italiano',
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
      profileUpdated: 'Contenuti profilo validati con informazioni fornite direttamente dall utente.',
      missingLink: 'Link in attesa',
      printAria: 'Stampa questa pagina in PDF',
      referencesLabel: 'Riferimenti',
      problemLabel: 'Problema',
      usersLabel: 'Utenti',
      roleLabel: 'Ruolo',
      impactLabel: 'Impatto',
      whyMattersLabel: 'Perche conta',
    },
  },
};
