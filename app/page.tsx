import Image from 'next/image';
import BurgerMenu from './components/burgermenu';

export default function Home() {
  return (
    <div className='flex flex-col'>
      <header className='flex flex-row p-2 bg-theme-light items-center'>
        <Image src='/ic_logo.png' alt='Logo' width={55} height={55} />
        <h1 className='font-playfair text-2xl font-semibold'>Craft</h1>
        {/* <BurgerMenu /> */}
        <button className=' border border-gray-400 p-1 px-3 rounded-md ml-auto mr-2'>
          Sign in
        </button>
      </header>

      <section className='flex flex-col p-2 bg-theme-light items-center justify-center'>
        <h1 className='text-5xl md:text-6xl font-serif font-semibold text-gray-900 leading-tight'>
          &nbsp;&nbsp;&nbsp;&nbsp;Effortless <br />
          issue tracking
        </h1>

        <h3 className=' text-lg font-medium pt-7 px-3'>
          &nbsp;&nbsp;&nbsp;A simple yet powerful tool to streamline team workflows and resolve
          issues faster.
        </h3>
        <button className='p-1 px-3 rounded-md my-7 bg-theme-coffee'>Get Started</button>
      </section>

      <section className='flex flex-col p-2 bg-white  mx-5 mt-5'>
        <header className='flex flex-row p-2items-center'>
          <Image
            src='/building.png'
            alt='Logo'
            width={33}
            height={27}
            style={{ height: '27px', width: '33px', objectFit: 'fill' }}
          />
          <h1 className='font-playfair text-xl font-semibold text-gray-800 ml-2'>Workcation</h1>
        </header>
        <p className='font-medium text-xl md:text-3xl text-gray-900 leading-relaxed max-w-3xl mt-6'>
          “Craft has revolutionized our issue tracking process. Its user-friendly interface and
          robust features have greatly improved our productivity and efficiency.”
        </p>

        <div className='flex items-stretch space-x-4 mt-5'>
          <img
            alt=''
            src='./ceo.png'
            className='size-12 rounded-full object-cover border border-gray-300'
          />

          <div className='flex flex-col justify-between'>
            <p className='text-lg font-bold text-gray-900 leading-none'>Julia Underwood</p>
            <p className='font-serif text-xl text-gray-800 leading-snug'>CEO of Workcation</p>
          </div>
        </div>
      </section>
    </div>
  );
}
