import Image from 'next/image';
import Link from 'next/link';
import { Timestamp } from './components/timestramp';
//import BurgerMenu from './components/burgermenu';

export default function Home() {
  return (
    <div className='flex flex-col'>
      <header className='flex flex-row p-2 bg-theme-light items-center  dark:bg-gray-900 dark:text-white'>
        <Image src='/logo.png' alt='Logo' width={55} height={55} />
        <h1 className='font-playfair text-2xl font-semibold'>Craft</h1>
        {/* <BurgerMenu /> */}
        <Link href='/signin' className=' ml-auto mr-2'>
          <button className=' border border-gray-400 p-1 px-3 rounded-md'>Sign in</button>
        </Link>
      </header>

      <section className='flex flex-col p-2 py-7 bg-theme-light items-center justify-center  dark:bg-black dark:text-white'>
        <h1 className='text-5xl md:text-6xl font-serif font-semibold text-gray-900 leading-tight dark:text-white'>
          &nbsp;&nbsp;&nbsp;&nbsp;Effortless <br />
          issue tracking
        </h1>

        <h3 className=' text-lg font-medium pt-7 text-center max-w-[400px] md:max-w-[600px] mx-auto'>
          A simple yet powerful tool to streamline team workflows and resolve issues faster. Manage
          you projects with case.
        </h3>
        <button className='p-1 px-3 rounded-md my-7 bg-theme-coffee dark:bg-amber-900'>
          Get Started
        </button>
      </section>

      <section className='flex flex-col bg-white  px-5 justify-center py-20 mb-24 align-middle dark:bg-gray-900 dark:text-white'>
        <header className='flex flex-row p-2items-center justify-center mb-10'>
          <Image
            src='/building.png'
            alt='Logo'
            width={33}
            height={27}
            className='w-[33px] h-[27px] object-fill'
          />
          <h1 className='font-playfair text-xl font-semibold text-gray-800 ml-2 dark:text-gray-400'>
            Workcation
          </h1>
        </header>
        <p className='font-semibold text-xl md:text-2xl text-gray-900 leading-relaxed text-center mx-5 md:max-w-[600px] md:mx-auto dark:text-white'>
          “Craft has revolutionized our issue tracking process. Its user-friendly interface and
          robust features have greatly improved our productivity and efficiency.”
        </p>

        <Image
          src='/ceo.png'
          alt='ceo'
          width={48}
          height={48}
          className='size-12 rounded-full object-cover border border-gray-300 bg-slate-300 mx-auto mt-10'
        />
        <div className='mt-4 flex items-center justify-center space-x-3 text-base'>
          <div className='font-semibold text-gray-900  dark:text-gray-100'>Julia Underwood</div>
          <svg
            width={3}
            height={3}
            viewBox='0 0 2 2'
            aria-hidden='true'
            className='fill-gray-900 dark:fill-gray-100'
          >
            <circle r={1} cx={1} cy={1} />
          </svg>
          <div className='text-gray-600 dark:text-gray-400'>CEO of Workcation</div>
        </div>
      </section>

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
