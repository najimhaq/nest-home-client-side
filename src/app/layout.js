// frontend - app/layout.js
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import { Manrope } from 'next/font/google';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { ThemeProvider } from '@/components/ui/ThemeProvider';


export const metadata = {
  title: 'Rentify - Find Your Perfect Nest',
  description: 'Discover and book amazing rental properties worldwide',
};

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
});

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning className={manrope.className}>
      <body className='flex min-h-screen flex-col bg-black text-white antialiased'>
        <ThemeProvider>
          <Navbar />
          <main className='grow'>{children}</main>
          <Footer />
          <Toaster
            position='top-right'
            toastOptions={{
              style: {
                background: '#171717',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
