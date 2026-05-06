// ─────────────────────────────────────────────────────────────
//  BluePrint Studio — Client Configuration
//
//  THIS IS THE ONLY FILE EDITED PER CLIENT.
//
//  Override only the values that differ from the defaults
//  and the industry preset. You do not need to repeat
//  every field — only the ones you are changing.
//
//  Current client: Cape Town Roofing Co. (demo)
// ─────────────────────────────────────────────────────────────

import type { ClientConfig } from './types';

type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

export const clientOverrides: DeepPartial<ClientConfig> = {

  business: {
    name:        'Cape Town Roofing Co.',
    tagline:     'Cape Town\'s trusted roofing specialists since 2008.',
    phone:       '+27 21 555 0100',
    email:       'info@capetownroofing.co.za',
    address:     '12 Long Street',
    city:        'Cape Town',
    province:    'Western Cape',
    postalCode:  '8001',
    industry:    'roofing',
    logo:        '/images/logo.svg',
    logoAlt:     'Cape Town Roofing Co. logo',
    foundedYear: 2008,
  },

  theme: {
    primaryColor: '#1f3a5f',    // deep navy
    accentColor:  '#e8500a',    // burnt orange
    fontHeading:  'Lexend',
    fontBody:     'Inter',
  },

  seo: {
    title:         'Cape Town Roofing Co. | Roofing Specialists in Cape Town',
    description:   'Licensed roofing contractors serving Cape Town since 2008. Installations, repairs, and waterproofing. Free quotes - call +27 21 555 0100.',
    ogImage:       '/images/og-image.jpg',
    googleReviews: '',           // add Google Reviews URL when available
  },

  hero: {
    headline:    'Cape Town\'s Trusted Roofing Specialists',
    subheadline: 'Quality roof installations, repairs, and waterproofing - done right the first time, guaranteed.',
    ctaText:     'Get a Free Roof Quote',
    ctaHref:     '#contact',
    image:       '/images/hero.webp',
    imageAlt:    'Roofing team working on a residential roof in Cape Town',
    subtext:     'Free inspection · No obligation · 10-year workmanship guarantee',
  },

  about: {
    heading:  'Cape Town\'s Roofing Experts Since 2008',
    body:     'We have been protecting Cape Town homes and businesses for over 15 years. From IBR and Chromadek installations to emergency leak repairs, our licensed team delivers lasting workmanship at honest prices. Every job comes with a 10-year workmanship guarantee.',
    image:    '/images/about.webp',
    imageAlt: 'Cape Town Roofing Co. team on a completed roof installation',
    ctaText:  'Get a Free Quote',
    ctaHref:  '#contact',
  },

  testimonials: {
    heading:    'What Cape Town Homeowners Say',
    reviewsUrl: '',             // add Google Reviews URL when available
    items: [
      {
        name:     'David van der Merwe',
        location: 'Kenilworth, Cape Town',
        text:     'Absolutely professional from quote to completion. The team repaired our leaking flat roof in one day and even cleaned up perfectly. Highly recommend.',
        rating:   5,
      },
      {
        name:     'Fatima Jacobs',
        location: 'Bellville',
        text:     'They installed a brand-new IBR roof on our home and the results are exceptional. Competitive pricing and the 10-year guarantee gives us complete peace of mind.',
        rating:   5,
      },
      {
        name:     'Mark Erasmus',
        location: 'Durbanville',
        text:     'Called them about an emergency leak before a big storm. They were on-site within 4 hours and fixed the problem completely. Outstanding service.',
        rating:   5,
      },
    ],
  },

  contact: {
    showMap:     false,
    mapEmbedUrl: '',
    // recaptchaSiteKey is loaded from .env — do not put real key here
  },

  footer: {
    tagline:     'Quality roofing for Cape Town homes and businesses since 2008.',
    showSocials: false,
  },

  legal: {
    lastUpdated: '2026-05-04',
  },

};
