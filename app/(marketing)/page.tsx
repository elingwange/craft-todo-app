import HeroSection from '../components/HeroSection';
import Testimonial from '../components/Testimonial';

export default function HomePage() {
  return (
    <div className='flex flex-col'>
      <HeroSection />
      <Testimonial />
    </div>
  );
}
