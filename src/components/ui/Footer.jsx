// frontend - components/ui/Footer.jsx
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const footerLinks = {
  Company: [
    { href: '/about', label: 'About' },
    { href: '/careers', label: 'Careers' },
    { href: '/blog', label: 'Blog' },
  ],
  Support: [
    { href: '/help', label: 'Help Center' },
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
  ],
  Legal: [
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
  ],
};

export default function Footer() {
  return (
    <footer className='relative mt-20 border-t border-white/10 bg-black px-4 py-16 text-white'>
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute left-1/3 top-0 h-64 w-64 rounded-full bg-purple-600/10 blur-[100px]' />
      </div>

      <div className='mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-5'>
        <div className='col-span-2'>
          <h3 className='text-2xl font-bold'>
            Rent
            <span className='bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
              ify
            </span>
          </h3>
          <p className='mt-3 max-w-xs text-sm text-white/50'>
            Discover, book, and manage rental properties with confidence — all
            in one platform.
          </p>
          <div className='mt-5 flex gap-4 text-lg text-white/60'>
            <a href='#' className='transition hover:text-white'>
              <FaFacebook />
            </a>
            <a href='#' className='transition hover:text-white'>
              <FaInstagram />
            </a>
            <a href='#' className='transition hover:text-white'>
              <FaTwitter />
            </a>
            <a href='#' className='transition hover:text-white'>
              <FaLinkedin />
            </a>
          </div>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className='mb-4 text-sm font-semibold text-white/90'>
              {title}
            </h4>
            <ul className='space-y-3 text-sm text-white/50'>
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='transition hover:text-white'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className='mx-auto mt-12 max-w-6xl border-t border-white/10 pt-6 text-center text-xs text-white/40'>
        © 2026 Rentify. All rights reserved.
      </div>
    </footer>
  );
}
