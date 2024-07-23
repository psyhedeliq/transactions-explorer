import ClientLayout from './ClientLayout';

export const metadata = {
    title: 'Blockchain Explorer',
    description: 'Explore Ethereum and Polygon transactions',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
