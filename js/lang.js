async function setLanguage(lang) {
  try {
    const res = await fetch(`json/${lang}.json`);
    if (!res.ok) {
      throw new Error(`Could not load json/${lang}.json (status: ${res.status})`);
    }
    const translations = await res.json();

    document.querySelectorAll("[data-translate]").forEach(el => {
      const key = el.getAttribute("data-translate");
      if (translations[key]) {
    
        el.innerHTML = translations[key].replace(/\n/g, "<br>");
      }
    });

  
    document.querySelectorAll(".lang-flag").forEach(img => {
      const flagLang = img.getAttribute("data-lang");
      if (!flagLang) return;
      
      if (flagLang === lang) {
        img.classList.add("active");
      } else {
        img.classList.remove("active");
      }
    });

    
    localStorage.setItem("siteLang", lang);

  } catch (err) {
    console.error("Error loading language file:", err);
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("siteLang") || "en";
  setLanguage(savedLang);

  const btnEn = document.getElementById("btn-en");
  const btnSr = document.getElementById("btn-sr");

  if (btnEn) btnEn.addEventListener("click", () => setLanguage("en"));
  if (btnSr) btnSr.addEventListener("click", () => setLanguage("sr"));
});
