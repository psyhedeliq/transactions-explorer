import { Roboto, Montserrat } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });

const theme = {
    colors: {
        primary: '#3498db',
        secondary: '#e74c3c',
        background: '#ecf0f1',
        text: '#2c3e50',
        accent: '#f39c12',
    },
    fonts: {
        body: roboto.style.fontFamily,
        heading: montserrat.style.fontFamily,
    },
    fontSizes: {
        small: '0.8rem',
        medium: '1rem',
        large: '1.2rem',
        xlarge: '1.5rem',
    },
};

export default theme;
