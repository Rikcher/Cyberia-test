import React from 'react';
import LinksList from './ui/LinksList';
import LogoLink from './ui/LogoLink';


const Footer: React.FC = () => {

    return (
        <footer className='px-[21.25rem] pt-[7.625rem] pb-[8.875rem] bg-custom-blue flex justify-between items-center'>
            <div className='flex flex-col gap-7'>
                <LogoLink width={12.25}/>
                <p className='max-w-48'>Веб-разработка и усиление IT-команд</p>
            </div>
            <div className='flex gap-16'>
                <div className='flex flex-col gap-6'>
                    <p>+7 999 123 45 67</p>
                    <p>hello@cyberia.studio</p>
                    <p>ул.Ярных, д.35, оф.10</p>
                </div>
                <div className='flex flex-col flex-wrap gap-y-6 gap-x-16 max-h-32'>
                    <LinksList />
                </div>
            </div>
            <div className='flex flex-col max-w-64 text-darker-gray'>
                <p>2021, digital-агентство Cyberia</p>
                <a className='hover:underline' target='_blank' href="#">Положение о защите персональных данных</a>
                <a className='hover:underline' target='_blank' href="#">Политика в отношении обработки и защиты персональных данных</a>
                <a className='hover:underline' target='_blank' href="#">Оферта оказания услуг</a>
            </div>
        </footer>
    );
};

export default Footer