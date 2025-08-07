'use client';

import { useState } from 'react';

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen(!open)}
      className='group relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5'
      aria-label='Menu'
    >
      <span
        className={`h-0.5 w-6 bg-black transition-all duration-300 ${
          open ? 'rotate-45 translate-y-1.5' : ''
        }`}
      />
      <span
        className={`h-0.5 w-6 bg-black transition-all duration-300 ${open ? 'opacity-0' : ''}`}
      />
      <span
        className={`h-0.5 w-6 bg-black transition-all duration-300 ${
          open ? '-rotate-45 -translate-y-1.5' : ''
        }`}
      />
    </button>
  );
}
