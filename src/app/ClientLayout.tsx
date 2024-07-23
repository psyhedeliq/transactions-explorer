'use client';

import { ThemeProvider } from 'styled-components';
import StyledComponentsRegistry from './registry';
import GlobalStyle from '../styles/GlobalStyle';
import theme from '../styles/theme';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Roboto, Montserrat } from 'next/font/google';
import styled from 'styled-components';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Main = styled.main`
    flex: 1;
`;

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <StyledComponentsRegistry>
                    <ThemeProvider
                        theme={{
                            ...theme,
                            fonts: {
                                ...theme.fonts,
                                body: roboto.style.fontFamily,
                                heading: montserrat.style.fontFamily,
                            },
                        }}
                    >
                        <GlobalStyle />
                        <LayoutWrapper>
                            <Header />
                            <Main>{children}</Main>
                            <Footer />
                        </LayoutWrapper>
                    </ThemeProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
