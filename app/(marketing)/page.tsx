import HeroSection from '../components/layout/HeroSection';
import Testimonial from '../components/layout/Testimonial';

export default function HomePage() {
  return (
    <div className='flex flex-col'>
      <HeroSection />
      <Testimonial />
    </div>
  );
}
