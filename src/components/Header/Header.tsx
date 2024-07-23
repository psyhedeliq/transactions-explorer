import Link from 'next/link';
import { HeaderWrapper, HeaderTitle } from './Header.styles';

const Header: React.FC = () => {
    return (
        <HeaderWrapper>
            <Link href="/" passHref>
                <HeaderTitle>Blockchain Explorer</HeaderTitle>
            </Link>
        </HeaderWrapper>
    );
};

export default Header;
