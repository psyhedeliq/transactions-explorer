import { FooterWrapper } from './Footer.styles';

const Footer: React.FC = () => {
    return (
        <FooterWrapper>
            © {new Date().getFullYear()} Blockchain Explorer. All rights
            reserved.
        </FooterWrapper>
    );
};

export default Footer;
