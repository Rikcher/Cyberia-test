import React, { useEffect, useState } from 'react';
import themeToggler from '../assets/themeTogler.svg'; 
import LinksList from './ui/LinksList';
import LogoLink from './ui/LogoLink';
import i18n from '../i18n';
import { Languages } from '../constants';
import { getLastSelectedLanguage } from '../i18n';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
    const lastSelectedLanguage = getLastSelectedLanguage()
    const [selectedLanguage, setSelectedLanguage] = useState(lastSelectedLanguage)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024);
    const { t } = useTranslation();

    //сменить язык при нажатии на соответствующую кнопку в навбаре и добавить его как активный в локал сторадж
    const handleLanguageChange = (langCode: Languages) => {
        i18n.changeLanguage(langCode); 
        localStorage.setItem('lastSelectedLanguage', langCode); 
        setSelectedLanguage(langCode); 
    };

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 1024);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };
    
    return (
        <header className='w-full flex justify-center'>
            <nav className='text-white py-16 mx-auto px-6 w-[1300px] flex justify-between gap-5 items-center'>
                <LogoLink />
                {/* Если экран больше 1024px - рендер обычного навбара */}
                {isLargeScreen ? (
                    <>
                    <div className="flex gap-[3.75rem]">    
                        <LinksList />
                    </div>
                    <div className='flex gap-[3.75rem] items-center'>
                        <button>
                            <img src={themeToggler} alt="Toggle Theme" /> {/* Added alt attribute */}
                        </button>
                        <div className='flex items-center gap-1'>
                            <button
                                className={`transition-text duration-300 ease-in-out ${selectedLanguage === "en" ? "text-blue-600" : ""}`}
                                onClick={(e) => handleLanguageChange(e.currentTarget.getAttribute('value') as Languages)}
                                value="en"
                            >
                                EN
                            </button>
                            <span> / </span>
                            <button
                            className={`transition-text duration-300 ease-in-out ${selectedLanguage === "ru" ? "text-blue-600" : ""}`} 
                            onClick={(e) => handleLanguageChange(e.currentTarget.value as Languages)} 
                            value="ru">
                                RU
                            </button>
                        </div>
                    </div>
                    </>
                ) : (
                    // Если экран меньше 1024px рендер бургер меню
                    <>
                        <button className="right-6 z-30 hamburger-menu lg:hidden flex flex-col justify-between h-11 w-9 px-1 py-3 aspect-square cursor-pointer"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <span className={`rounded-full w-full h-0.5 bg-white origin-top-right transition-all duration-300 ease-in-out ${isMenuOpen ? "-rotate-42" : ""}`}></span>
                            <span className={`rounded-full w-full h-0.5 bg-white transition-all duration-300 ease-in-out ${isMenuOpen ? "opacity-0" : "opacity-100"}`}></span>
                            <span className={`rounded-full w-full h-0.5 bg-white origin-bottom-right transition-all duration-300 ease-in-out ${isMenuOpen ? "rotate-42" : ""}`}></span>
                        </button>
                        {/* Тут в классе я использую касмтоный класс no-doc-scroll, который отключает скрол страницы, пока оверлей открыт */}
                        <div className={`${isMenuOpen ? "opacity-100 top-0 no-doc-scroll" : "opacity-0 -top-80 pointer-events-none"} transition-all duration-300 ease-in-out h-screen w-screen fixed inset-0 bg-deep-blue pt-32 pb-10 px-6 z-20`}>
                            <div className='flex flex-col gap-8 border-b border-solid border-[#2B2D3A] pb-12 mb-9'>
                                <LinksList closeMenu={closeMenu} />
                            </div>
                            <div className='flex flex-col gap-6 text-gray-400 border-b border-solid border-[#2B2D3A] pb-12'>
                                <p className='text-lg mb-4'>{`${t("contacts")}:`}</p>
                                <p>+7 999 123 45 67</p>
                                <p>hello@cyberia.studio</p>
                                <p>ул.Ярных, д.35, оф.10</p>
                            </div>
                        </div>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
