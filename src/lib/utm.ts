export function getStoredUTMs() {
  if (typeof window === "undefined") {
    return {
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
      utmContent: "",
      utmTerm: "",
      gclid: "",
    };
  }

  return {
    utmSource: sessionStorage.getItem("utm_source") || "",
    utmMedium: sessionStorage.getItem("utm_medium") || "",
    utmCampaign: sessionStorage.getItem("utm_campaign") || "",
    utmContent: sessionStorage.getItem("utm_content") || "",
    utmTerm: sessionStorage.getItem("utm_term") || "",
    gclid: sessionStorage.getItem("gclid") || "",
  };
}
