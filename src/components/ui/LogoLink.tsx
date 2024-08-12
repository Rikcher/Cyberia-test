import { Link } from 'react-router-dom';
import Logo from '/src/assets/logo.svg'; // Ensure this path is correct

interface LogoLinkProps {
    width?: number;
}

const LogoLink: React.FC<LogoLinkProps> = ({ width = 8.125 }) => { 
    return (
        <Link to="/" style={{ width: `${width}rem` }}> 
            <img className='w-full' src={Logo} alt="Logo" />
        </Link>
    );
};

export default LogoLink;
