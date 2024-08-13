import React from 'react';
import LinksList from './ui/LinksList';
import LogoLink from './ui/LogoLink';
import { useTranslation } from 'react-i18next';


const Footer: React.FC = () => {
    const { t } = useTranslation();

    return (
        <footer className='py-8 lg:pt-[7.625rem] lg:pb-[8.875rem] bg-custom-blue flex items-center w-full'>
            <div className="mx-auto px-6 w-[1300px] flex flex-col lg:flex-row items-center justify-between gap-5">
                <div className='flex flex-col gap-7 mb-9 lg:mb-0'>
                    <LogoLink width={12.25}/>
                    <p className='max-w-48 text-center lg:text-left'>{t("footer_title")}</p>
                </div>
                <div className='flex gap-5 lg:gap-16 mb-9 lg:mb-0'>
                    <div className='flex flex-col gap-6'>
                        <p>+7 999 123 45 67</p>
                        <p>hello@cyberia.studio</p>
                        <p>ул.Ярных, д.35, оф.10</p>
                    </div>
                    <div className='flex flex-col flex-wrap gap-y-1 xxs:gap-y-6 gap-11 lg:gap-x-16 xxs:max-h-32'>
                        <LinksList />
                    </div>
                </div>
                <div className='flex flex-col text-center lg:text-left max-w-64 text-darker-gray'>
                    <p>{t("footer_p")}</p>
                    <a className='hover:underline' target='_blank' href="#">{t("footer_link_1")}</a>
                    <a className='hover:underline' target='_blank' href="#">{t("footer_link_2")}</a>
                    <a className='hover:underline' target='_blank' href="#">{t("footer_link_3")}</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer