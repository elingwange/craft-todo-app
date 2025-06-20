import Image from 'next/image';
import Button from '../components/ui/Button';

export default function HomePage() {
  return (
    <div className='flex flex-col'>
      <section className='flex flex-col p-2 py-7 bg-theme-light items-center justify-center  dark:bg-black dark:text-white'>
        <h1 className='text-5xl md:text-6xl font-serif font-semibold text-gray-900 leading-tight dark:text-white'>
          &nbsp;&nbsp;&nbsp;&nbsp;Effortless <br />
          issue tracking
        </h1>
        <h3 className=' text-lg font-medium pt-7 text-center max-w-[400px] md:max-w-[600px] mx-auto'>
          A simple yet powerful tool to streamline team workflows and resolve issues faster. Manage
          you projects with case.
        </h3>
        <Button className='my-8'>Get Started</Button>
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
    </div>
  );
}
