import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { LayoutWrapper, Main } from './Layout.styles';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <LayoutWrapper>
            <Header />
            <Main>{children}</Main>
            <Footer />
        </LayoutWrapper>
    );
};

export default Layout;
