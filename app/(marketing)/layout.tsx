import Image from 'next/image';
import Link from 'next/link';
import { Timestamp } from '../components/timestramp';
import Button from '../components/ui/Button';
import { Suspense } from 'react';
import DashboardButton from '../components/DashboardButton';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className='flex flex-row p-2 bg-theme-light items-center  dark:bg-gray-900 dark:text-white'>
        <Image src='/logo.png' alt='Logo' width={55} height={55} />
        <h1 className='font-playfair text-2xl font-semibold'>Craft</h1>
        {/* <BurgerMenu /> */}
        <Suspense
          fallback={
            <>
              <Link href='/signin' className=' ml-auto mr-2'>
                <Button variant='outline'>Sign in</Button>
              </Link>
              <Link href='/signup'>
                <Button>Sign up</Button>
              </Link>
            </>
          }
        >
          <div className=' ml-auto mr-2'>
            <DashboardButton />
          </div>
        </Suspense>
      </header>
      <div>{children}</div>;
      <footer className='border-t border-gray-200 dark:border-dark-border-subtle footer-background flex flex-col p-2 py-7 bg-white items-center justify-center  dark:bg-black dark:text-white'>
        <div className='container mx-auto px-4 py-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div className='flex flex-col space-y-4'>
              <h3 className='text-lg font-semibold'>Craft</h3>
              <p>A modern project management tool built with Next.js.</p>
            </div>

            <div className='flex flex-col space-y-4'>
              <h3 className='text-ms font-semibold'>Product</h3>
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
              <h3 className='text-ms font-semibold'>Resourses</h3>
              <ul className=' space-y-2'>
                <li>
                  <Link
                    href={'/'}
                    className='text-sm text-gray-800 dark:text-gray-100 hover:text-amber-700'
                  >
                    Documention
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
              <h3 className='text-ms font-semibold'>Legal</h3>
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
    </div>
  );
}
