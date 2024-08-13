import i18n from "i18next";
import i18nBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const getCurrentHost =
    import.meta.env.MODE === "development"
        ? "http://localhost:5173"
        : "LINK TO PROD"; 

export function getLastSelectedLanguage() {
    const savedLanguage = localStorage.getItem('lastSelectedLanguage');
    
    // If there's no saved language, check the browser's preferred language
    if (!savedLanguage) {
        const browserLanguage = navigator.language.split('-')[0]; // Extracts the language part (e.g., 'en', 'ru')
        
        const languagePreferences = ['ru', 'en'];
        
        const languageIndex = languagePreferences.indexOf(browserLanguage);
        
        // If the language is found in the preferences, use it; otherwise, fall back to 'ru'
        return languageIndex > -1 ? browserLanguage : 'ru';
    }
    
    // If there's a saved language, return it
    return savedLanguage;
}


i18n
    .use(i18nBackend)
    .use(initReactI18next)
    .init({
        fallbackLng: "ru",
        lng: getLastSelectedLanguage(), // Use the last-selected language
        interpolation: {
        escapeValue: false,
        },
        backend: {
        loadPath: `${getCurrentHost}/i18n/{{lng}}.json`,
        },
    });


export default i18n;
