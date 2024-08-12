import { Link } from 'react-router-dom';
import { LINKS } from '../../constants';

const LinksList: React.FC = () => {
    return (
        <>
            {LINKS.map((link) => (
                <Link key={link.label} to={`${link.path}`}>
                {link.label}
                </Link>
            ))}
        </>
    )
}

export default LinksList