import Image from 'next/image';

export default function Testimonial() {
  return (
    <section className='flex flex-col bg-white  px-5 justify-center py-20 mb-24 align-middle dark:bg-gray-900 dark:text-white'>
      <header className='flex flex-row p-2 items-center justify-center mb-10'>
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
      <figure>
        <blockquote className='font-semibold text-xl md:text-2xl text-gray-900 leading-relaxed text-center mx-5 md:max-w-[600px] md:mx-auto dark:text-white'>
          “Craft has revolutionized our issue tracking process. Its user-friendly interface and
          robust features have greatly improved our productivity and efficiency.”
        </blockquote>
        <figcaption>
          <Image
            src='/ceo.png'
            alt='CEO Julia Underwood'
            width={48}
            height={48}
            className='w-12 h-12 rounded-full object-cover border border-gray-300 bg-slate-300 mx-auto mt-10'
          />
          <div className='mt-4 flex items-center justify-center space-x-3 text-base'>
            <span className='font-semibold text-gray-900  dark:text-gray-100'>Julia Underwood</span>
            <svg
              width={3}
              height={3}
              viewBox='0 0 2 2'
              aria-hidden='true'
              className='fill-gray-900 dark:fill-gray-100'
            >
              <circle r={1} cx={1} cy={1} />
            </svg>
            <span className='text-gray-600 dark:text-gray-400'>CEO of Workcation</span>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
