import './globals.css';
import { Lato } from 'next/font/google';
import { Providers } from './providers';
import StyledJsxRegistry from './registry';
import { Analytics } from '@vercel/analytics/react';

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
});

export const metadata = {
  title: 'Career Pages',
  description: 'Build using https://gluestack.io/',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='gs'>
      <body className={lato.className}>
        <Providers>
          <StyledJsxRegistry>{children}</StyledJsxRegistry>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
