'use client';

import Link from 'next/link';
import Timestamp from '../basic/Timestamp';

function FootLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className='text-sm text-gray-800 dark:text-gray-100 hover:text-amber-700'>
      {children}
    </Link>
  );
}

export default function Footer() {
  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/' },
        { name: 'Prices', href: '/' },
        { name: 'FAQ', href: '/' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '/' },
        { name: 'GitHub', href: '/' },
      ],
    },
    {
      title: 'Legal',
      links: [{ name: 'Terms of Service', href: '/' }],
    },
  ];

  return (
    <footer className='flex flex-col justify-center p-2 py-7 border-t border-gray-200 dark:border-dark-border-subtle footer-background bg-white items-center  dark:bg-black dark:text-white'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='flex flex-col space-y-4'>
            <h3 className='text-lg font-semibold'>Craft</h3>
            <p>A modern project management tool built with Next.js.</p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className='flex flex-col space-y-4'>
              <h3 className='text-base font-semibold'>{section.title}</h3>
              <ul role='list' className=' space-y-2'>
                {section.links.map((link) => (
                  <li key={link.name} role='listitem'>
                    <FootLink href={link.href}>{link.name}</FootLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-8 pt-8 text-center'>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          &copy; <Timestamp /> Craft. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
