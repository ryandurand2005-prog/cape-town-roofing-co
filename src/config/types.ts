// ─────────────────────────────────────────────────────────────
//  BluePrint Studio — Config Type Definitions
//  One file to rule them all. Every component reads from this.
// ─────────────────────────────────────────────────────────────

// ── Union Types ──────────────────────────────────────────────

export type Industry      = 'roofing' | 'real-estate' | 'general';
export type HeroStyle     = 'image' | 'video';
export type ServiceLayout = 'grid' | 'list';
export type FormField     = 'name' | 'phone' | 'email' | 'message' | 'service';
export type FontHeading   = 'Montserrat' | 'Poppins' | 'Raleway';
export type FontBody      = 'Inter' | 'Lato' | 'Open Sans';

// ── Sub-Interfaces ───────────────────────────────────────────

export interface BusinessConfig {
  name:        string;
  tagline:     string;
  phone:       string;
  email:       string;
  address:     string;
  city:        string;
  province:    string;
  postalCode:  string;
  country:     string;
  industry:    Industry;
  logo:        string;         // path to logo image in /public/images/
  logoAlt:     string;
  foundedYear: number;
}

export interface ThemeConfig {
  primaryColor:  string;       // hex, e.g. '#1f3a5f'
  accentColor:   string;       // hex, e.g. '#e8500a'
  fontHeading:   FontHeading;
  fontBody:      FontBody;
}

export interface SeoConfig {
  title:           string;     // <title> tag — keep under 60 chars
  description:     string;     // meta description — keep under 160 chars
  ogImage:         string;     // path to Open Graph image in /public/images/
  googleReviews:   string;     // Google Reviews URL (empty string = disabled)
}

export interface HeroConfig {
  style:        HeroStyle;
  headline:     string;
  subheadline:  string;
  ctaText:      string;        // primary button label
  ctaHref:      string;        // primary button target (usually '#contact')
  image:        string;        // path in /public/images/
  imageAlt:     string;
  subtext:      string;        // small trust text below CTA, e.g. 'Free quotes · No obligation'
}

export interface AboutConfig {
  heading:     string;
  body:        string;         // 1–3 sentences
  image:       string;
  imageAlt:    string;
  ctaText:     string;
  ctaHref:     string;
}

export interface WhyPoint {
  icon: string;                // one of the 24 allowed Lucide icon names
  text: string;
}

export interface WhyChooseUsConfig {
  heading: string;
  points:  WhyPoint[];         // exactly 4 points
}

export interface ServiceItem {
  icon:        string;
  name:        string;
  description: string;
}

export interface ServicesConfig {
  heading: string;
  layout:  ServiceLayout;
  items:   ServiceItem[];
}

export interface TestimonialItem {
  name:     string;
  location: string;
  text:     string;
  rating:   1 | 2 | 3 | 4 | 5;
}

export interface TestimonialsConfig {
  heading:      string;
  items:        TestimonialItem[];
  reviewsUrl:   string;          // Google Reviews URL (empty = hide link)
}

export interface ContactConfig {
  heading:          string;
  subheading:       string;
  formFields:       FormField[];
  serviceOptions:   string[];    // shown in service <select> if 'service' in formFields
  showMap:          boolean;
  mapEmbedUrl:      string;      // Google Maps embed URL (used only if showMap: true)
  recaptchaSiteKey: string;      // loaded from env in production; placeholder for template
}

export interface FooterConfig {
  tagline:     string;
  showSocials: boolean;
  facebook:    string;           // full URL or empty string
  instagram:   string;
  linkedin:    string;
}

export interface LegalConfig {
  usesAnalytics:     boolean;
  analyticsProvider: string;     // e.g. 'Google Analytics', 'Plausible'
  lastUpdated:       string;     // ISO date string: 'YYYY-MM-DD'
}

export interface SectionsConfig {
  about:        boolean;
  whyChooseUs:  boolean;
  services:     boolean;
  testimonials: boolean;
}

// ── Root Config Interface ────────────────────────────────────

export interface ClientConfig {
  business:     BusinessConfig;
  theme:        ThemeConfig;
  seo:          SeoConfig;
  hero:         HeroConfig;
  about:        AboutConfig;
  whyChooseUs:  WhyChooseUsConfig;
  services:     ServicesConfig;
  testimonials: TestimonialsConfig;
  contact:      ContactConfig;
  footer:       FooterConfig;
  legal:        LegalConfig;
  sections:     SectionsConfig;
}
