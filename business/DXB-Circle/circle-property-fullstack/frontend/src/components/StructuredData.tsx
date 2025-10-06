// Structured Data (JSON-LD) for SEO
export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Beechford Estate Office",
    "description": "Discreet property services with institutional-grade analytics. Evidence-driven decisions, integrated execution, and ongoing portfolio management for discerning families.",
    "url": "https://www.beechfordestates.com",
    "logo": "https://www.beechfordestates.com/vite.svg",
    "email": "partners@beechfordestates.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dubai",
      "addressCountry": "AE"
    },
    "areaServed": {
      "@type": "City",
      "name": "Dubai"
    },
    "sameAs": [
      // Add social media profiles when available
    ],
    "serviceType": [
      "Property Investment Advisory",
      "Portfolio Management",
      "Real Estate Analytics",
      "Property Optimization",
      "Investment Strategy"
    ],
    "priceRange": "$$$$"
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Beechford Estate Office",
    "url": "https://www.beechfordestates.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.beechfordestates.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Real Estate Investment Advisory",
    "provider": {
      "@type": "RealEstateAgent",
      "name": "Beechford Estate Office"
    },
    "areaServed": {
      "@type": "City",
      "name": "Dubai"
    },
    "description": "Institutional-grade property analysis, portfolio optimization, and integrated execution services for high-net-worth individuals and family offices.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  )
}

