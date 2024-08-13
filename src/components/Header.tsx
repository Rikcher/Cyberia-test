import React, { useState } from 'react';
import themeToggler from '../assets/themeTogler.svg'; // Adjusted path
import LinksList from './ui/LinksList';
import LogoLink from './ui/LogoLink';
import i18n from '../i18n';
import { Languages } from '../constants';
import { getLastSelectedLanguage } from '../i18n';

const Header: React.FC = () => {
    const lastSelectedLanguage = getLastSelectedLanguage()
    const [selectedLanguage, setSelectedLanguage] = useState(lastSelectedLanguage)

    const handleLanguageChange = (langCode: Languages) => {
        i18n.changeLanguage(langCode);
        localStorage.removeItem('translations'); // Remove translations cache when changing language
        localStorage.setItem('lastSelectedLanguage', langCode); // Update the last-selected language
        setSelectedLanguage(langCode); // Update the local state with the selected language
    };
    
    return (
        <header>
            <nav className='text-white py-16 px-[21.25rem] flex justify-between items-center'>
                <LogoLink />
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
            </nav>
        </header>
    );
};

export default Header;
