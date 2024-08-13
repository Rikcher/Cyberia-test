import { useTranslation } from "react-i18next";

const NotFound = () => {
    const { t } = useTranslation();

    return (
        <>
            <h1 className='text-center font-semibold font-black text-5xl'>{t("not_found")}</h1>
        </>
    );
};

export default NotFound;

