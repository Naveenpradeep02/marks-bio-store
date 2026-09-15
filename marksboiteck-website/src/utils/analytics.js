import { api } from "../api";

const ANON_KEY = "mb_anon_id";
const SESSION_KEY = "mb_session_id";
const UTM_KEY = "mb_utm_params";

function generateUUID() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return (
    "mb_" +
    Math.random().toString(36).substring(2, 15) +
    Date.now().toString(36)
  );
}

export function getAnonymousId() {
  let anonId = localStorage.getItem(ANON_KEY);
  if (!anonId) {
    anonId = "anon_" + generateUUID();
    localStorage.setItem(ANON_KEY, anonId);
  }
  return anonId;
}

export function getSessionId() {
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = "sess_" + generateUUID();
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

export function getUtmParams() {
  try {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source");
    const utmMedium = params.get("utm_medium");
    const utmCampaign = params.get("utm_campaign");
    const utmTerm = params.get("utm_term");
    const utmContent = params.get("utm_content");

    if (utmSource || utmCampaign) {
      const utms = { utmSource, utmMedium, utmCampaign, utmTerm, utmContent };
      sessionStorage.setItem(UTM_KEY, JSON.stringify(utms));
      return utms;
    }

    const saved = sessionStorage.getItem(UTM_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    return {};
  }
}

function getDeviceType() {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(
      ua,
    )
  ) {
    return "mobile";
  }
  return "desktop";
}

let sessionStartTime = Date.now();

export async function sendAnalyticsEvent(eventType, eventData = {}) {
  try {
    const durationSeconds = Math.floor((Date.now() - sessionStartTime) / 1000);
    const utms = getUtmParams();

    const payload = {
      sessionId: getSessionId(),
      anonymousSessionId: getAnonymousId(),
      eventType,
      pageUrl: window.location.pathname + window.location.search,
      referrer: document.referrer || "",
      deviceType: getDeviceType(),
      browser: navigator.userAgent.includes("Chrome")
        ? "Chrome"
        : navigator.userAgent.includes("Firefox")
          ? "Firefox"
          : "Safari",
      operatingSystem: navigator.platform || "",
      durationSeconds,
      ...utms,
      ...eventData,
    };

    // Non-blocking fire-and-forget
    api.post("/api/analytics/events", { events: [payload] }).catch(() => {});
  } catch (err) {
    // Analytics error should never break user interactions
  }
}

export function trackPageView(pageUrl = window.location.pathname) {
  sendAnalyticsEvent("page_view", { pageUrl });
}

export function trackProductView(productId, variantId = null, metadata = {}) {
  sendAnalyticsEvent("product_view", {
    productId,
    variantId,
    eventMetadata: metadata,
  });
}

export function trackAddToCart(
  productId,
  variantId = null,
  quantity = 1,
  metadata = {},
) {
  sendAnalyticsEvent("add_to_cart", {
    productId,
    variantId,
    eventMetadata: { quantity, ...metadata },
  });
}

export function trackSearch(query, resultCount = 0) {
  if (!query || query.trim() === "") return;
  sendAnalyticsEvent("search", {
    searchQuery: query.trim(),
    eventMetadata: { resultCount },
  });
}

export function trackSearchClick(productId, query) {
  sendAnalyticsEvent("search_click", {
    productId,
    searchQuery: query ? query.trim() : null,
  });
}

export function trackCheckoutStart(cartItems = [], cartTotal = 0) {
  sendAnalyticsEvent("checkout_start", {
    eventMetadata: { itemCount: cartItems.length, cartTotal },
  });
}

export function trackDwellTime(productId, seconds) {
  if (!productId || seconds <= 0) return;
  sendAnalyticsEvent("dwell_time", {
    productId,
    eventMetadata: { seconds },
  });
}
