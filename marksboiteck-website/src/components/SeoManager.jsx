import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const API_BASE = "http://localhost:5000/api";

function setOrCreateMeta(nameOrProp, key, value) {
  if (!value) return;
  let element = document.querySelector(`meta[${nameOrProp}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(nameOrProp, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", value);
}

function setOrCreateLink(rel, href) {
  if (!href) return;
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

export default function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    async function applySeo() {
      try {
        const res = await fetch(`${API_BASE}/seo/resolve?path=${encodeURIComponent(location.pathname)}`);
        if (!res.ok) return;
        const data = await res.json();
        if (!isMounted) return;

        const { page, global } = data;

        // 1. Dynamic Title
        const defaultTitle = global?.global_site_name || "Marks Biotech | Advanced Dental Biomaterials";
        if (page?.meta_title) {
          document.title = page.meta_title;
        } else {
          document.title = defaultTitle;
        }

        // 2. Meta Description & Keywords
        const metaDesc = page?.meta_description || global?.global_meta_description || "";
        setOrCreateMeta("name", "description", metaDesc);
        if (page?.meta_keywords) {
          setOrCreateMeta("name", "keywords", page.meta_keywords);
        }

        // 3. Robots Directive
        const robots = page?.robots_directive || global?.global_robots || "index, follow";
        setOrCreateMeta("name", "robots", robots);

        // 4. Canonical URL
        const canonicalDomain = global?.global_canonical_domain || "https://marksbiotech.com";
        const canonical = page?.canonical_url || `${canonicalDomain}${location.pathname}`;
        setOrCreateLink("canonical", canonical);

        // 5. Open Graph Meta Tags
        const ogTitle = page?.og_title || page?.meta_title || document.title;
        const ogDesc = page?.og_description || metaDesc;
        const ogImg = page?.og_image || global?.global_og_image || "/assets/imgs/logo.webp";
        const fullOgImg = ogImg.startsWith("http") ? ogImg : `${canonicalDomain}${ogImg}`;

        setOrCreateMeta("property", "og:title", ogTitle);
        setOrCreateMeta("property", "og:description", ogDesc);
        setOrCreateMeta("property", "og:image", fullOgImg);
        setOrCreateMeta("property", "og:url", canonical);
        setOrCreateMeta("property", "og:type", "website");
        setOrCreateMeta("property", "og:site_name", global?.global_site_name || "Marks Biotech");

        // 6. Twitter Card Tags
        setOrCreateMeta("name", "twitter:card", page?.twitter_card || "summary_large_image");
        setOrCreateMeta("name", "twitter:title", page?.twitter_title || ogTitle);
        setOrCreateMeta("name", "twitter:description", page?.twitter_description || ogDesc);
        setOrCreateMeta("name", "twitter:image", page?.twitter_image ? (page.twitter_image.startsWith("http") ? page.twitter_image : `${canonicalDomain}${page.twitter_image}`) : fullOgImg);

        // 7. Schema Markup (Structured Data JSON-LD)
        let schemaScript = document.getElementById("mb-dynamic-schema-ld");
        if (!schemaScript) {
          schemaScript = document.createElement("script");
          schemaScript.id = "mb-dynamic-schema-ld";
          schemaScript.type = "application/ld+json";
          document.head.appendChild(schemaScript);
        }

        let schemaObject = null;
        if (page?.custom_schema) {
          try {
            schemaObject = typeof page.custom_schema === "string" ? JSON.parse(page.custom_schema) : page.custom_schema;
          } catch (e) {}
        }

        if (!schemaObject) {
          // Default WebPage / MedicalBusiness Schema
          schemaObject = {
            "@context": "https://schema.org",
            "@type": page?.schema_type || "MedicalBusiness",
            "name": global?.global_site_name || "Marks Biotech",
            "url": canonical,
            "description": metaDesc,
            "logo": `${canonicalDomain}/assets/imgs/logo.webp`,
            "sameAs": [
              "https://www.linkedin.com/company/marks-biotech",
              "https://www.instagram.com/marksbiotech"
            ]
          };
        }
        schemaScript.textContent = JSON.stringify(schemaObject, null, 2);

        // 8. Google Tag Manager (GTM)
        if (global?.google_tag_manager_id && global.google_tag_manager_id.trim()) {
          const gtmId = global.google_tag_manager_id.trim();
          if (!document.getElementById("mb-gtm-script")) {
            const gtmScript = document.createElement("script");
            gtmScript.id = "mb-gtm-script";
            gtmScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`;
            document.head.appendChild(gtmScript);
          }
        }

        // 9. Meta Pixel (Facebook Pixel)
        if (global?.meta_pixel_id && global.meta_pixel_id.trim()) {
          const pixelId = global.meta_pixel_id.trim();
          if (!document.getElementById("mb-pixel-script")) {
            const pixelScript = document.createElement("script");
            pixelScript.id = "mb-pixel-script";
            pixelScript.innerHTML = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixelId}');
fbq('track', 'PageView');`;
            document.head.appendChild(pixelScript);
          }
        }
      } catch (err) {
        // Fallback to default title
      }
    }

    applySeo();

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  return null;
}
