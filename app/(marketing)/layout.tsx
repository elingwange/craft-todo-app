import Image from 'next/image';
import Link from 'next/link';
import Button from '../components/ui/Button';
import { Suspense } from 'react';
import DashboardButton from '../components/DashboardButton';
import Footer from '../components/Footer';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className='flex flex-row p-2 bg-theme-light items-center  dark:bg-gray-900 dark:text-white'>
        <Image src='/logo.png' alt='Logo' width={55} height={55} loading='lazy' />
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
      <main>{children}</main>
      <Footer />
    </div>
  );
}
