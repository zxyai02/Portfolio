import { PortfolioData } from '../types/portfolio';

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: 'SYED AMZAD HOSSAIN',
    handle: 'amzadhossain',
    role: 'Industrial Engineer & Tech Enthusiast',
    tagline: "Hi, I'm SYED AMZAD HOSSAIN",
    bioHeadline: 'Industrial Engineer & Technology Enthusiast',
    bioParagraphs: [
      'INDUSTRIAL ENGINEER & Tech Enthusiastic',
      'My work bridges mathematical precision with humanist editorial elegance: I design design systems in Figma and write the production React, Canvas, and serverless architectures that bring them to life with zero latency and relentless typographic clarity.',
      'When not architecting enterprise SaaS platforms, I build retro-arcade Canvas physics games and curate chromatic abstract fluid graphics licensed globally on Adobe Stock.'
    ],
    location: 'Dhaka, Bangladesh',
    timezone: 'GMT+6 (BST)',
    email: 'serviceforeuphoria@gmail.com',
    availability: 'Open to select senior product design & engineering roles, contracts, and design consultations.',
    isAvailableForHire: true,
    avatarUrl: '/assets/aistudio/image_261590ae.png',
    stats: [
      { value: '8+', label: 'Years Experience', subtext: 'Full-Stack UI/UX & Systems' },
      { value: '24+', label: 'Shipped Systems', subtext: 'SaaS, Dashboards & Games' },
      { value: '4.8M+', label: 'End Users', subtext: 'Healthcare, RMG & EdTech' },
      { value: '99.9%', label: 'Traceability Rigor', subtext: 'DGDA & EU DPP Compliance' }
    ],
    skills: [
      {
        category: 'UI/UX & Product Design',
        items: ['Design Systems (Tokens)', 'Complex Data Telemetry', 'Information Architecture', 'Figma Prototyping', 'Light/Dark Thematic Tokens', 'High-Density Typography', 'User Flow Modeling']
      },
      {
        category: 'Frontend Engineering',
        items: ['React 19 & TypeScript', 'Tailwind CSS v4', 'HTML5 2D Canvas & Physics', 'State Machines', 'Motion & Micro-interactions', 'Vite & Modern Bundlers']
      },
      {
        category: 'Backend & Cloud Systems',
        items: ['Cloudflare Workers & KV', 'REST & GraphQL APIs', 'Google Workspace Automations', 'PostgreSQL & Drizzle', 'Serverless Architecture']
      },
      {
        category: 'Creative Technology',
        items: ['Generative Vector Graphics', 'Adobe Creative Cloud', 'Game Loop Optimization', 'Dynamic Sound Synthesis', 'Audio/Visual Stock Assets']
      }
    ],
    socialLinks: [
      {
        platform: 'Behance',
        label: 'behance.net/majesticsoul1',
        url: 'https://behance.net/majesticsoul1',
        icon: 'behance'
      },
      {
        platform: 'Adobe Stock',
        label: 'Stock Contributor',
        url: 'https://stock.adobe.com',
        icon: 'stock'
      },
      {
        platform: 'GitHub',
        label: 'github.com/majesticsoul',
        url: 'https://github.com',
        icon: 'github'
      },
      {
        platform: 'LinkedIn',
        label: 'linkedin.com/in/majestic-soul',
        url: 'https://linkedin.com',
        icon: 'linkedin'
      },
      {
        platform: 'Email',
        label: 'serviceforeuphoria@gmail.com',
        url: 'mailto:serviceforeuphoria@gmail.com',
        icon: 'mail'
      }
    ]
  },
  projects: [
    {
      id: 'proj-panacea',
      slug: 'panacea-pharmacy-dims-system',
      title: 'PANACEA: Pharmacy Operations & DIMS Clinical Registry',
      subtitle: 'DGDA-compliant clinical dispensary ERP with cold-chain telemetry and double-entry financial P&L.',
      category: 'Enterprise SaaS',
      client: 'PharmaCare Network & DGDA Healthcare Dispensaries',
      year: '2024 - 2026',
      image: '/assets/aistudio/image_e6739381.png',
      liveUrl: 'https://panacea.serviceforeuphoria.workers.dev',
      summary: 'A mission-critical pharmacy operating system built to enforce strict Directorate General of Drug Administration (DGDA) price caps, monitor cold-chain vaccine loggers (+2°C to +8°C), and track FEFO inventory across 3,724 brands.',
      challenge: 'Pharmacies in Bangladesh routinely struggle with manual price compliance, counterfeit medication prevention, and expired batch wastage due to fragmented POS software lacking strict regulatory constraints.',
      solution: 'Engineered an ultra-fast Cloudflare Worker-powered ERP with offline-tolerant POS terminals, real-time gross margin trajectories, batch expiry alerts, and integrated DIMS clinical drug monographs.',
      tags: ['Cloudflare Workers', 'React', 'Tailwind CSS', 'DGDA Compliance', 'Healthcare ERP', 'Financial P&L'],
      metrics: [
        { label: 'Medicine Brands', value: '3,724' },
        { label: 'Active Generics', value: '931' },
        { label: 'DGDA Compliance', value: '100%' },
        { label: 'Cold-Chain Batches', value: '80 Active' }
      ],
      featured: true,
      isPublished: true,
      order: 1
    },
    {
      id: 'proj-meteorology',
      slug: 'atmosphere-meteorological-forecast-hub',
      title: 'Global Meteorological Forecast Hub & Climate Telemetry',
      subtitle: 'Planetary synoptic weather intelligence platform with multi-variable curves and storm surge tracking.',
      category: 'UI/UX Systems',
      client: 'Geneva Atmospheric Research Hub / Planetary Climate Consortium',
      year: '2025 - 2026',
      image: '/assets/aistudio/image_1843ce9d.png',
      secondaryImages: ['/assets/aistudio/image_8b9fbbe7.png'],
      figmaUrl: 'https://figma.com/@atmosphere-hub',
      summary: 'A high-density meteorological design system and web console displaying live synoptic radar, atmospheric composition, hurricane SLOSH surge vectors, and 14-day extended multi-model comparisons.',
      challenge: 'Meteorologists and civil defense teams were bogged down by separate disjointed tools for radar, satellite infrared, isobaric winds, and cyclone evacuation telemetry.',
      solution: 'Constructed an unified light/dark thematic design token system in Figma and AI Studio, consolidating satellite imagery, telemetry nodes (Tokyo, Geneva, London, New York), and real-time advisory bulletins into an actionable single-pane console.',
      tags: ['Design Systems', 'Figma', 'Data Telemetry', 'Climate Analytics', 'Thematic Tokens', 'Synoptic Radars'],
      metrics: [
        { label: 'Global Nodes', value: '6 Megacities' },
        { label: 'Model Horizon', value: '14-Day' },
        { label: 'Telemetry Refresh', value: 'Sub-Minute' },
        { label: 'Design Tokens', value: '120+ Semantic' }
      ],
      featured: true,
      isPublished: true,
      order: 2
    },
    {
      id: 'proj-urmi-scm',
      slug: 'urmi-bangladesh-rmg-supply-chain',
      title: 'Bangladesh RMG Supply Chain & Sustainability Intelligence',
      subtitle: 'Farm-to-closet provenance, real-time GPS container tracking, and EU Digital Product Passport (DPP).',
      category: 'Enterprise SaaS',
      client: 'Urmi Group Demra Composite Apparel Complex',
      year: '2024 - 2025',
      image: '/assets/aistudio/image_c8662f29.png',
      liveUrl: 'https://scmdelta.vercel.app',
      summary: 'Full-spectrum transparency platform for the ready-made garment (RMG) sector in Bangladesh, tracking garment consignments from organic cotton farms through Chittagong Port to international retail shelves (Decathlon, Puma, M&S).',
      challenge: 'New European Union Digital Product Passport (EU DPP) mandates require rigorous chemical safety, water usage, and carbon footprint audits that legacy spreadsheets could not verify.',
      solution: 'Designed and deployed an interactive Supply Chain Traceability Matrix featuring Demra LEED Platinum solar metrics (2.4 MWp Clean Grid), biological effluent treatment telemetry, and single-garment QR passports.',
      tags: ['Supply Chain Traceability', 'EU DPP Ready', 'React', 'LEED Platinum', 'Industrial SCM'],
      metrics: [
        { label: 'Annual Volume', value: '42.5M Pcs' },
        { label: 'Clean Solar Grid', value: '2.4 MWp' },
        { label: 'Carbon per Piece', value: '1.62 kg' },
        { label: 'Water Footprint', value: '29 L' }
      ],
      featured: true,
      isPublished: true,
      order: 3
    },
    {
      id: 'proj-cosmic-odyssey',
      slug: 'cosmic-odyssey-dhaka-space-arcade',
      title: 'Cosmic Odyssey: Dhaka Stratosphere Flight Arcade',
      subtitle: 'Retro-futuristic Canvas flight simulator and space combat game with progressive orbital tiers.',
      category: 'Interactive & Games',
      client: 'Creative Lab & Interactive Web Project',
      year: '2025 - 2026',
      image: '/assets/aistudio/image_0a9f355d.png',
      summary: 'High-performance interactive HTML5 Canvas arcade game simulating a solar-assisted atmospheric drone launched from Dhaka Airspace ascending through 10 progressive tiers to the Observable Universe Horizon.',
      challenge: 'Maintaining silky smooth 60fps physics, particle hazards, laser firepower collision checks, and sound synthesis without dropping frames on low-end devices.',
      solution: 'Custom mathematical engine utilizing spatial partitioning, hardware-accelerated 2D Canvas rendering, upgradeable Engineering Bay modules (Ion Thrusters, Plasma Cannons, Collector Magnet), and tactile keyboard/virtual touch controls.',
      tags: ['HTML5 Canvas', 'Game Loop', 'Physics Engine', 'TypeScript', 'Spatial Audio', 'Retro-Futurism'],
      metrics: [
        { label: 'Celestial Tiers', value: '10 Stages' },
        { label: 'Frame Rate', value: '60 FPS' },
        { label: 'Asset Payload', value: '<250 KB' },
        { label: 'Hull Physics', value: 'Custom Vec2' }
      ],
      featured: true,
      isPublished: true,
      order: 4
    },
    {
      id: 'proj-insight-institute',
      slug: 'insight-institute-academic-olympiad-platform',
      title: 'Insight Institute: Academic Coaching & Olympiad Platform',
      subtitle: 'Bilingual EdTech platform and student admissions hub for competitive mathematics and science.',
      category: 'UI/UX Systems',
      client: 'Insight Institute (BUET & DU Instructor Panel)',
      year: '2024 - 2025',
      image: '/assets/aistudio/image_8b9b29a2.png',
      summary: 'Deep-learning academic platform serving Class 6-12 board exams, SSC, HSC, and National Math/Science Olympiad aspirants across Sanarpar, Siddirganj, and Dhaka.',
      challenge: 'Crafting a premium Bengali web presence that balanced technical rigor with accessible mobile navigation for students and parents across diverse devices.',
      solution: 'Developed an atmospheric deep teal UI with bespoke Bengali typographic hierarchy, course search, scholarship assessment finder, and seamless admission tracking.',
      tags: ['EdTech', 'Bengali Typography', 'Web Experience', 'Curriculum Finder', 'Admissions UX'],
      metrics: [
        { label: 'Target Grades', value: 'Class 6 - 12' },
        { label: 'Academic Streams', value: 'SSC, HSC, Olympiad' },
        { label: 'Student Inquiries', value: '10,000+' },
        { label: 'Instructor Roster', value: 'BUET & DU Panel' }
      ],
      featured: false,
      isPublished: true,
      order: 5
    },
    {
      id: 'proj-admission-sync',
      slug: 'admission-sync-sheets-pipeline',
      title: 'Automated Student Admission & Pipeline Sync Engine',
      subtitle: 'Zero-latency Google Sheets synchronization pipeline handling multi-campus enrollment records.',
      category: 'Workflow Automation',
      client: 'Insight Institute Admissions Administration',
      year: '2024 - 2025',
      image: '/assets/aistudio/image_90af126e.png',
      summary: 'Backend automation bridge routing real-time online student registrations into secure, distributed Google Sheets with timestamping, batch division, and SMS notification webhooks.',
      challenge: 'Staff were overwhelmed by manual data re-entry from online application forms into offline campus registers, causing enrollment delays and double-booking.',
      solution: 'Architected automated cloud triggers with data sanitation, phone number normalization, duplicate rejection, and instant administrative status updates.',
      tags: ['Google Workspace API', 'Workflow Automation', 'Cloud Functions', 'Data Pipelines', 'Spreadsheet Ops'],
      metrics: [
        { label: 'Sync Latency', value: '<1.2s' },
        { label: 'Data Accuracy', value: '100%' },
        { label: 'Daily Processed', value: '500+ Submissions' },
        { label: 'Campuses Linked', value: 'Sanarpar & Main' }
      ],
      featured: false,
      isPublished: true,
      order: 6
    },
    {
      id: 'proj-stock-abstract',
      slug: 'vivid-rainbow-abstract-graphics',
      title: 'Vivid Rainbow Abstract Waves & Chromatic Assets',
      subtitle: 'Curated 2K/4K spectral fluid ribbons and pigment burst visual assets for international licensing.',
      category: 'Digital Art & Graphics',
      client: 'Adobe Stock Contributor Portfolio',
      year: '2024 - 2026',
      image: '/assets/aistudio/image_dbcfa868.png',
      summary: 'A commercial graphic collection of vibrant fluid wave dynamics, rainbow pigment powder splashes, and abstract 3D ribbons crafted for editorial, packaging, and digital branding.',
      challenge: 'Generating ultra-clean chromatic gradients with natural organic turbulence that print crisply without color banding or noise artifacts.',
      solution: 'Blended parametric vector flow lines with high-resolution particle simulation and custom spectral color grading to deliver commercial-grade stock assets.',
      tags: ['Generative Design', 'Chromatic Vectors', 'Adobe Stock', 'Digital Art', 'Fluid Simulation'],
      metrics: [
        { label: 'Resolution', value: '4K Commercial' },
        { label: 'Color Gamut', value: 'Wide Spectrum' },
        { label: 'Downloads', value: 'International' },
        { label: 'Asset Formats', value: 'Vector & Raster' }
      ],
      featured: false,
      isPublished: true,
      order: 7
    },
    {
      id: 'proj-behance-brand',
      slug: 'majestic-soul-brand-system',
      title: 'Majestic Soul: Identity, Monograph & Behance Showcase',
      subtitle: 'Personal brand mark, design tokens, and verified Behance design archive.',
      category: 'UI/UX Systems',
      client: 'Majestic Soul Studio',
      year: '2024 - 2026',
      image: '/assets/aistudio/image_261590ae.png',
      liveUrl: 'https://behance.net/majesticsoul1',
      summary: 'The visual identity system and public portfolio monograph of Majestic Soul, featuring custom typography pairings, iconic fountain pen brand mark, and comprehensive project case studies.',
      challenge: 'Establishing a cohesive personal brand that speaks equally to high-level product executives seeking enterprise SaaS clarity and creative directors seeking visual punch.',
      solution: 'Created an unboxed, editorial visual language balancing stark dark backgrounds, tabular precision, and vibrant focal points.',
      tags: ['Personal Brand', 'Behance Verified', 'Visual Identity', 'Design Monograph'],
      metrics: [
        { label: 'Behance Profile', value: 'majesticsoul1' },
        { label: 'Global Views', value: 'Growing' },
        { label: 'Curated Fields', value: 'UI/UX & Systems' },
        { label: 'Status', value: 'Verified Creator' }
      ],
      featured: false,
      isPublished: true,
      order: 8
    }
  ],
  blogPosts: [
    {
      id: 'post-1',
      slug: 'designing-meteorological-telemetry-systems',
      title: 'Designing Telemetry Systems: From Weather Stations to Live Synoptic Radars',
      excerpt: 'How we structured a multi-variable climate hub to present 14-day models, storm surge tracks, and atmospheric vectors without sensory overload.',
      content: `When designing the **Global Meteorological Forecast Hub**, our guiding design mandate was simple yet formidable: **A flight dispatcher or storm coordinator has under 15 seconds to evaluate atmospheric risk**.

If the interface requires scrolling through nested accordions or deciphering low-contrast chart legends, lives and infrastructure are at stake.

### 1. The Trap of "Cockpit Clutter"
Most legacy meteorological dashboards suffer from the "instrument overload" syndrome: sixty competing gauges, flashing red alert badges, and uncalibrated saturated color maps.

To solve this, we implemented strict **semantic design tokens**:
- **Baseline Neutrality**: 60% of the screen remains deep slate or calm paper white.
- **Dynamic Scrims**: Maps render underneath a 40% ambient vector layer so synoptic isobars pop out cleanly.
- **Single-Elevation Depth**: No card-within-card containers. Every metric card lives on a single plane with 1px hairline dividers.

### 2. Dual-Mode Thematic Calibration
Unlike consumer consumer apps where dark mode is just an inverted background, meteorological data changes readability under different ambient field conditions:
- **Night / Control Center Shift**: High-contrast dark mode with desaturated blue-slate surfaces preserves night-vision adaptation during emergency operations.
- **Field / Daylight Inspection**: Light mode converts vector curves into sharp dark-navy lines over pure white, making sunlight glare manageable on ruggedized field tablets.

### 3. Conclusion
Great data design is not about displaying everything you have in the database; it is about providing the exact slice of reality the operator needs to take decisive action.`,
      category: 'Design Systems',
      readTime: '6 min read',
      publishedAt: 'October 14, 2026',
      coverImage: '/assets/aistudio/image_1843ce9d.png',
      tags: ['Design Systems', 'Data Visualization', 'UI/UX', 'Telemetry'],
      isPublished: true
    },
    {
      id: 'post-2',
      slug: 'architecting-panacea-dgda-pharmacy-erp',
      title: 'Architecting Panacea: Sub-50ms Pharmacy Operations on Cloudflare Workers',
      excerpt: 'Enforcing strict DGDA price compliance and cold-chain vaccine loggers while keeping retail POS checkout transactions lightning-fast.',
      content: `In Bangladesh, community pharmacies manage thousands of fast-moving medicine brands, ranging from daily essentials like Paracetamol and Esomeprazole to sensitive biological cold-chain vaccines.

Yet, most local retail software runs on sluggish legacy desktop setups that crash during power cuts and fail to enforce **Directorate General of Drug Administration (DGDA)** Maximum Retail Prices (MRP).

### The Engineering Philosophy Behind Panacea
We built **PANACEA** with three uncompromised pillars:
1. **Zero-Latency Checkout**: A pharmacist barcode scan or generic search must return matching items within 30 milliseconds.
2. **Deterministic Price Ceiling**: The POS strictly prevents any cashier from billing above the regulatory DGDA price ceiling.
3. **FEFO Inventory Rotation**: First-Expiring, First-Out. The system prioritizes batches nearing expiration, drastically reducing inventory write-offs.

### Edge Performance
By deploying the API on Cloudflare Workers close to Dhaka ISPs and caching drug monographs in KV storage, we achieved sub-50ms round trips across standard 4G connections.

### Typography for High-Speed Scanning
In high-stress retail environments, a misread milligram dosage can be dangerous. We paired **Outfit** for structural headers with **JetBrains Mono** for all stock valuations, batch codes, and currency figures (৳ BDT), guaranteeing aligned tabular decimals across tables.`,
      category: 'Enterprise SaaS',
      readTime: '8 min read',
      publishedAt: 'September 28, 2026',
      coverImage: '/assets/aistudio/image_e6739381.png',
      tags: ['Cloudflare Workers', 'Healthcare', 'SaaS Architecture', 'ERP'],
      isPublished: true
    },
    {
      id: 'post-3',
      slug: 'demra-to-global-shelves-eu-dpp-traceability',
      title: 'From Demra to Global Shelves: Building the EU DPP Traceability Matrix',
      excerpt: 'Translating factory rooftop solar energy, zero-toxic effluent water purification, and farm-to-closet supply chains into single-scan digital passports.',
      content: `The European Union's impending **Digital Product Passport (DPP)** is reshaping the RMG (Ready-Made Garments) manufacturing industry in Bangladesh.

Brands like Decathlon, Puma, and Marks & Spencer now require granular traceability down to the specific organic cotton field, wastewater treatment purity, and clean solar kilowatt-hours consumed per knitted hoodie.

### Turning Invisible Audits Into Visible Trust
Working with the LEED Platinum-certified **Urmi Group Demra Composite Apparel Complex**, we designed the **SCM Delta Traceability Hub**.

Key UX breakthroughs included:
- **The Garment Provenance Line**: A linear timeline showing physical consignment movement from Demra Assembly Line 04 through final Chittagong customs clearance.
- **Sustainability At A Glance**: Real-time meters for the Demra 2.4 MWp rooftop solar grid and biological water treatment (34.2 L / kg fabric dyeing ratio).
- **Public-Facing QR Digital Passport**: Shoppers in Paris or Munich can scan a garment label and immediately inspect the exact chemical safety and carbon footprint certification.

Transparency is no longer a corporate sustainability report; it is an interactive consumer expectation.`,
      category: 'Supply Chain & SCM',
      readTime: '5 min read',
      publishedAt: 'August 19, 2026',
      coverImage: '/assets/aistudio/image_c8662f29.png',
      tags: ['Supply Chain', 'Sustainability', 'EU DPP', 'Traceability'],
      isPublished: true
    },
    {
      id: 'post-4',
      slug: 'canvas-vs-dom-micro-optimizations-cosmic-odyssey',
      title: 'Canvas vs DOM: Micro-Optimizations in Building Cosmic Odyssey',
      excerpt: 'Why we bypassed traditional React DOM components for a custom 2D Canvas game loop when simulating Dhaka Stratosphere drone physics.',
      content: `When building **Cosmic Odyssey**, an arcade retro-flight experience set across the skies of Bangladesh, we initially tested standard React components with CSS animations.

At 20 active asteroids, everything looked smooth. At 150 incoming space debris particles, plasma laser projectiles, and glowing collector magnetic rings, DOM layout reflows quickly decimated the frame rate.

### Transitioning to a Pure 2D Canvas Loop
We stripped away the DOM nodes inside the gameplay viewport in favor of an imperative **HTML5 Canvas loop**:
- **Spatial Grid Partitioning**: Instead of computing $O(n^2)$ collision checks between every bullet and asteroid, we partition the screen into a $10\\times 10$ spatial grid.
- **Pre-rendered Sprite Sheets**: Complex radial laser glows and drone hulls are drawn once off-screen and blitted onto the main canvas with zero overhead.
- **Audio Synthesis Without Files**: Laser sound effects and EMP bursts are synthesized on the fly via the browser's Web Audio API oscillators, keeping total initial game weight under 250 KB!

The result is a silky 60 FPS experience that runs just as smoothly on a budget smartphone as on a high-refresh desktop display.`,
      category: 'Creative Tech',
      readTime: '7 min read',
      publishedAt: 'July 11, 2026',
      coverImage: '/assets/aistudio/image_0a9f355d.png',
      tags: ['Canvas', 'Game Dev', 'Performance', 'TypeScript'],
      isPublished: true
    }
  ],
  messages: [
    {
      id: 'msg-1',
      name: 'Farhan Rahman',
      email: 'f.rahman@techventures.co',
      subject: 'Inquiry: Telemetry Dashboard Design for Logistics Fleet',
      message: 'Hello Majestic Soul, we came across your SCM Delta and Atmosphere Forecast Hub work. We are building a live logistics vehicle tracking platform in South Asia and would love to discuss a 3-month design architecture engagement.',
      date: '2026-10-25 14:32',
      isRead: false
    },
    {
      id: 'msg-2',
      name: 'Elena Rostova',
      email: 'elena@nordicdesignlab.io',
      subject: 'Behance Appreciation & Product Design Consultation',
      message: 'Loved your Behance case study on the Planetary Climate Analytics UI! The typography and dark mode token system is exceptionally well executed. Are you open to remote advisory consultations?',
      date: '2026-10-22 09:15',
      isRead: true
    }
  ]
};
