import Link from 'next/link';
import Button from '../components/ui/Button';

export default function HeroSection() {
  return (
    <section className='flex flex-col p-2 py-7 bg-theme-light items-center justify-center  dark:bg-black dark:text-white'>
      <h1 className='text-5xl text-center md:text-6xl font-serif font-semibold text-gray-900 leading-tight dark:text-white'>
        Effortless <br />
        issue tracking
      </h1>
      <p className=' text-lg font-medium pt-7 text-center max-w-md md:max-w-xl mx-auto'>
        A simple yet powerful tool to streamline team workflows and resolve issues faster. Manage
        your projects with ease.
      </p>
      <Link href='/signin'>
        <Button className='my-8'>Get Started</Button>
      </Link>
    </section>
  );
}
