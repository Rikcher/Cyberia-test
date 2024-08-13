import i18n from "i18next";
import i18nBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const getCurrentHost =
    import.meta.env.MODE === "development"
        ? "http://localhost:5173"
        : "LINK TO PROD"; 

export function getLastSelectedLanguage() {
    const savedLanguage = localStorage.getItem('lastSelectedLanguage');
    
    // Если нет языка, сохранённого в локал сторадже - посмотри стоил ли у юзера язык ру или енг, если да - выбрать именно этот язык
    if (!savedLanguage) {
        const browserLanguage = navigator.language.split('-')[0]; // Extracts the language part (e.g., 'en', 'ru')
        
        const languagePreferences = ['ru', 'en'];
        
        const languageIndex = languagePreferences.indexOf(browserLanguage);
        
        // Если язык юзера нашёлся и совпал с ру или енг - выбрать его, нет - ру по дефолту
        return languageIndex > -1 ? browserLanguage : 'ru';
    }
    
    // если язык уже был сохранён в локал сторадже - использовать его
    return savedLanguage;
}


i18n
    .use(i18nBackend)
    .use(initReactI18next)
    .init({
        fallbackLng: "ru",
        lng: getLastSelectedLanguage(), 
        interpolation: {
        escapeValue: false,
        },
        backend: {
        loadPath: `${getCurrentHost}/i18n/{{lng}}.json`,
        },
    });


export default i18n;
