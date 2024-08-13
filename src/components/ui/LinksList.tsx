// LinksList.tsx
import { Link } from 'react-router-dom';
import { LINKS } from '../../constants';
import { useTranslation } from 'react-i18next';

interface LinksListProps {
    closeMenu?: () => void;
}

const LinksList: React.FC<LinksListProps> = ({ closeMenu }) => {
    const { t } = useTranslation();

    return (
        <>
            {LINKS.map((link) => (
                <div key={link.label} className='relative group' onClick={closeMenu}>
                    <Link className='text-lg' to={`${link.path}`}>
                        {t(`${link.label}`)} 
                    </Link>
                    <div className='absolute -bottom-1.5 transition-w duration-300 ease-in-out w-0 h-0.5 bg-blue-600 group-hover:w-full'></div>
                </div>
            ))}
        </>
    )
}

export default LinksList;
