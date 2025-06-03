export default function Signin() {
  return (
    <main className=' bg-slate-100 h-screen flex flex-col justify-center'>
      <div className=''>
        <section className='flex flex-col p-2 items-center justify-center'>
          <h1 className='text-3xl md:text-2xl font-serif font-semibold text-gray-900 leading-tight'>
            Craft
          </h1>
          <h3 className=' text-2xl font-semibold pt-2 px-3'>Sign in to your account.</h3>
        </section>
        <section className='flex flex-col p-2 bg-white mt-5 items-center'>
          <p className=' text-lg pt-5 px-3 w-screen'>Email</p>
          <input className=' border-2 px-3 w-screen mx-3' />
          <p className=' text-lg pt-5 px-3'>Password</p>
          <input className=' w-max border-2' />
          <button className='p-1 px-3 rounded-md my-7 bg-theme-coffee w-max mx-3'>Sign in</button>
          <h3 className=' text-ms pt-2 px-3'>Don&apos;t have an account? sign up</h3>
        </section>
      </div>
    </main>
  );
}
