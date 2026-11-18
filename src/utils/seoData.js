// SEO helpers built strictly from data returned by the inventory API and the
// business details already published on the site. Nothing here invents a price,
// specification, location, condition or availability claim.

export const SITE_URL = 'https://www.kaysetransauto.co.zw';
export const MARKET = 'Harare, Zimbabwe';

function clean(value) {
  if (value === undefined || value === null) return '';
  return String(value).trim();
}

// Deterministic grouping; toLocaleString varies with the runtime locale.
function groupedNumber(value) {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Only listings explicitly marked available are advertised and prerendered.
export function isActiveVehicle(vehicle) {
  return !!vehicle && clean(vehicle.status).toLowerCase() === 'available';
}

export function vehicleSubject(vehicle) {
  if (!vehicle) return '';
  return [vehicle.year, vehicle.make, vehicle.model].map(clean).filter(Boolean).join(' ');
}

export function vehicleTitle(vehicle) {
  const subject = vehicleSubject(vehicle);
  return `${subject || 'Vehicle'} for Sale in ${MARKET}`;
}

export function vehicleDescription(vehicle) {
  const subject = vehicleSubject(vehicle) || 'This vehicle';
  const facts = [];

  const price = Number(vehicle?.price);
  if (Number.isFinite(price) && price > 0) facts.push(`Price: $${groupedNumber(price)}`);

  const mileage = Number(vehicle?.mileage);
  if (Number.isFinite(mileage) && mileage > 0) facts.push(`Mileage: ${groupedNumber(mileage)} km`);

  const transmission = clean(vehicle?.transmission);
  if (transmission) facts.push(`Transmission: ${transmission}`);

  const fuel = clean(vehicle?.fuel);
  if (fuel) facts.push(`Fuel: ${fuel}`);

  const supplied = clean(vehicle?.description).slice(0, 160);
  const detail = facts.length ? ` ${facts.join('. ')}.` : '';
  const note = supplied ? ` ${supplied}` : '';

  return `Explore this ${subject} for sale in ${MARKET}.${detail}${note} Contact Kaysetrans Auto to enquire.`;
}

export function vehicleImages(vehicle) {
  const images = Array.isArray(vehicle?.car_images) ? vehicle.car_images : [];
  return images.map((img) => clean(img.image_url)).filter(Boolean);
}

export function primaryVehicleImage(vehicle) {
  const images = Array.isArray(vehicle?.car_images) ? vehicle.car_images : [];
  const primary = images.find((img) => img.is_primary) || images[0];
  return primary ? clean(primary.image_url) : '';
}

export function vehicleImageAlt(vehicle, index = null) {
  const subject = vehicleSubject(vehicle) || 'Vehicle';
  return index === null
    ? `${subject} at Kaysetrans Auto`
    : `${subject} - image ${index + 1} at Kaysetrans Auto`;
}

function withoutUndefined(value) {
  if (Array.isArray(value)) return value.map(withoutUndefined);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, item]) => item !== undefined && item !== null && item !== '')
        .map(([key, item]) => [key, withoutUndefined(item)]),
    );
  }
  return value;
}

export function absoluteUrl(path) {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

export function vehicleSchema(vehicle) {
  if (!isActiveVehicle(vehicle)) return null;

  const subject = vehicleSubject(vehicle);
  if (!subject) return null;

  const path = `/cars/${vehicle.id}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: subject,
    brand: clean(vehicle.make) ? { '@type': 'Brand', name: clean(vehicle.make) } : undefined,
    model: clean(vehicle.model) || undefined,
    vehicleModelDate: clean(vehicle.year) || undefined,
    image: vehicleImages(vehicle),
    url: absoluteUrl(path),
  };

  const mileage = Number(vehicle.mileage);
  if (Number.isFinite(mileage) && mileage > 0) {
    schema.mileageFromOdometer = {
      '@type': 'QuantitativeValue',
      value: mileage,
      unitCode: 'KMT',
    };
  }

  const price = Number(vehicle.price);
  if (Number.isFinite(price) && price > 0) {
    schema.offers = {
      '@type': 'Offer',
      price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: absoluteUrl(path),
    };
  }

  return withoutUndefined(schema);
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Kaysetrans Auto',
  url: SITE_URL,
  inLanguage: 'en-ZW',
};
