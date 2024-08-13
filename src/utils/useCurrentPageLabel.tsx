import { useLocation } from 'react-router-dom';
import { LINKS } from '../constants';

export function useCurrentLabel() {
    const location = useLocation();
    const currentPath = location.pathname.substring(1);

    //если юрл совпадает с лейблом из списка ссылок - вынести его, если нет - null
    const currentLink = LINKS.find(link => link.path === currentPath);
    return currentLink ? currentLink.label : null;
}
