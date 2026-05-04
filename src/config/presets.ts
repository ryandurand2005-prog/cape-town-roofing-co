// ─────────────────────────────────────────────────────────────
//  BluePrint Studio — Industry Presets
//
//  Presets override only the fields that differ per industry.
//  They do not repeat defaults — just the deltas.
//  Applied AFTER defaults, BEFORE client overrides.
//
//  Merge order: defaultConfig → industryPreset → clientOverrides
// ─────────────────────────────────────────────────────────────

import type { Industry } from './types';

type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

import type { ClientConfig } from './types';

export const industryPresets: Record<Industry, DeepPartial<ClientConfig>> = {

  roofing: {
    hero: {
      headline:    'Cape Town\'s Trusted Roofing Specialists',
      subheadline: 'Quality roofing installations, repairs, and waterproofing — done right the first time.',
      ctaText:     'Get a Free Roof Quote',
      subtext:     'Free inspection · No obligation',
    },
    whyChooseUs: {
      heading: 'Why Choose Us for Your Roof',
      points: [
        { icon: 'shield-check', text: 'Fully licensed roofing contractor with comprehensive insurance cover.' },
        { icon: 'clock',        text: 'Fast response — emergency repairs attended to within 24 hours.' },
        { icon: 'star',         text: '5-star rated by over 200 Cape Town homeowners and businesses.' },
        { icon: 'hammer',       text: '10-year workmanship guarantee on all new roof installations.' },
      ],
    },
    services: {
      heading: 'Our Roofing Services',
      layout:  'grid',
      items: [
        { icon: 'home',         name: 'Roof Installations',  description: 'New roof installations for residential and commercial properties, using quality IBR, Chromadek, and tile.' },
        { icon: 'wrench',       name: 'Roof Repairs',        description: 'Leak detection and repairs for all roof types — fast, reliable, and guaranteed.' },
        { icon: 'droplets',     name: 'Waterproofing',       description: 'Flat roof and parapet wall waterproofing to keep your property dry, year after year.' },
        { icon: 'layers',       name: 'Fascia & Gutters',    description: 'Supply and installation of fascia boards, gutters, and downpipes with professional finish.' },
      ],
    },
    contact: {
      heading:        'Get a Free Roof Inspection',
      subheading:     'Tell us about your roofing needs and we will send someone to assess the job at no charge.',
      formFields:     ['name', 'phone', 'email', 'service', 'message'],
      serviceOptions: ['New Roof Installation', 'Roof Repair', 'Waterproofing', 'Fascia & Gutters', 'Roof Inspection', 'Other'],
    },
    seo: {
      title:       'Cape Town Roofing Co. | Roofing Specialists in Cape Town',
      description: 'Licensed roofing contractors in Cape Town. Installations, repairs, and waterproofing. Free quotes. Call us today.',
    },
  },

  'real-estate': {
    hero: {
      headline:    'Find Your Perfect Home in Cape Town',
      subheadline: 'Expert property guidance, personalised service, and results that speak for themselves.',
      ctaText:     'Start Your Property Search',
      subtext:     'No pressure · Expert advice',
    },
    whyChooseUs: {
      heading: 'Why Work With Us',
      points: [
        { icon: 'award',        text: 'Award-winning agency with over R500M in successful transactions.' },
        { icon: 'map-pin',      text: "Specialists in Cape Town's most sought-after neighbourhoods." },
        { icon: 'users',        text: 'A dedicated agent for every client — not a revolving door.' },
        { icon: 'trending-up',  text: 'Market-leading pricing strategies to maximise your property value.' },
      ],
    },
    services: {
      heading: 'Our Services',
      layout:  'grid',
      items: [
        { icon: 'home',         name: 'Residential Sales',   description: 'Buying or selling a home? We handle every step with expert guidance and local market knowledge.' },
        { icon: 'building',     name: 'Property Rentals',    description: 'Long-term and short-term rental placements for landlords and tenants across Cape Town.' },
        { icon: 'bar-chart-2',  name: 'Property Valuations', description: 'Accurate, data-driven valuations to help you price right and sell fast.' },
        { icon: 'briefcase',    name: 'Commercial Property', description: 'Office, retail, and industrial property sales and leasing for businesses.' },
      ],
    },
    contact: {
      heading:        'Talk to an Agent Today',
      subheading:     'Tell us what you\'re looking for and one of our agents will be in touch within 24 hours.',
      formFields:     ['name', 'phone', 'email', 'service', 'message'],
      serviceOptions: ['Buy a Property', 'Sell a Property', 'Rent a Property', 'List for Rental', 'Property Valuation', 'Commercial Enquiry'],
    },
    seo: {
      title:       'Real Estate Agent | Property Sales & Rentals in Cape Town',
      description: 'Cape Town property specialists. Buy, sell, and rent residential and commercial property. Expert agents, proven results.',
    },
  },

  general: {
    // No overrides — default config applies as-is for general businesses
  },
};
