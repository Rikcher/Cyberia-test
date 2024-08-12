// utils/useCurrentLabel.js
import { useLocation } from 'react-router-dom';
import { LINKS } from '../constants';

export function useCurrentLabel() {
    const location = useLocation();
    const currentPath = location.pathname.substring(1);

    // Find the link object that matches the current path
    const currentLink = LINKS.find(link => link.path === currentPath);
    // Extract the label from the found link object, if it doesn't exist - return null
    return currentLink ? currentLink.label : null;
}
