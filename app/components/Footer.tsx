'use client';

import Link from 'next/link';
import Timestamp from './Timestamp';

export default function Footer() {
  return (
    <footer className='border-t border-gray-200 dark:border-dark-border-subtle footer-background flex flex-col p-2 py-7 bg-white items-center justify-center  dark:bg-black dark:text-white'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='flex flex-col space-y-4'>
            <h3 className='text-lg font-semibold'>Craft</h3>
            <p>A modern project management tool built with Next.js.</p>
          </div>

          <div className='flex flex-col space-y-4'>
            <h3 className='text-base font-semibold'>Product</h3>
            <ul className=' space-y-2'>
              <li>
                <Link
                  href={'/'}
                  className='text-sm text-gray-800 dark:text-gray-100 hover:text-amber-700'
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href={'/'}
                  className='text-sm text-gray-800 dark:text-gray-100 hover:text-amber-700'
                >
                  Prices
                </Link>
              </li>
              <li>
                <Link
                  href={'/'}
                  className='text-sm text-gray-800 dark:text-gray-100 hover:text-amber-700'
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className='flex flex-col space-y-4'>
            <h3 className='text-base font-semibold'>Resources</h3>
            <ul className=' space-y-2'>
              <li>
                <Link
                  href={'/'}
                  className='text-sm text-gray-800 dark:text-gray-100 hover:text-amber-700'
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href={'/'}
                  className='text-sm text-gray-800 dark:text-gray-100 hover:text-amber-700'
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          <div className='flex flex-col space-y-4'>
            <h3 className='text-base font-semibold'>Legal</h3>
            <ul className=' space-y-2'>
              <li>
                <Link
                  href={'/'}
                  className='text-sm text-gray-800 dark:text-gray-100 hover:text-amber-700'
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
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
