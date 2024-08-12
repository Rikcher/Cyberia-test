import React from 'react';
import themeTogler from '/src/assets/themeTogler.svg'
import LinksList from './ui/LinksList';
import LogoLink from './ui/LogoLink';

const Header: React.FC = () => {
    return (
        <header>
            <nav className='text-white py-16 px-[21.25rem] flex justify-between items-center'>
                <LogoLink />
                <div className="flex gap-[3.75rem]">
                    <LinksList />
                </div>
                <div className='flex gap-[3.75rem] items-center'>
                    <button>
                        <img src={themeTogler} alt="" />
                    </button>
                    <button>EN / RU</button>
                </div>
            </nav>
        </header>
    );
};

export default Header