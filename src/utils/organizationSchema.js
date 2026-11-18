// Structured data built only from verified information already published on
// the site (Footer.jsx / AboutUs.jsx / FAQSection.jsx). No opening hours,
// coordinates, social profiles, branches, reviews or statistics are invented.
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutomotiveBusiness',
  name: 'Kaysetrans Auto',
  url: 'https://www.kaysetransauto.co.zw',
  telephone: '+263 784532889',
  email: 'tinotendakatsande@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'N04 Nigel Philip Eastly',
    addressLocality: 'Harare',
    addressCountry: 'ZW',
  },
};
