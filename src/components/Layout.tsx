import React from 'react'
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { useCurrentLabel } from '../utils/useCurrentPageLabel';
import { useTranslation } from 'react-i18next';


const Layout: React.FC = () => {
    const currentLabel = useCurrentLabel()
    const { t } = useTranslation();

    return (
        <div id='AppWrapper' className='min-h-screen bg-custom-gradient flex flex-col'>
            <Header />
            <main className='px-[21.25rem] grow'>
                <p className='text-medium-gray mb-32'>
                    {t("home")}
                    {currentLabel ? 
                    <><span className='text-medium-gray'> / </span><span className='text-light-gray'>{t(`${currentLabel}`)}</span></>
                    : null}
                </p>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout

