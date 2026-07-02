// frontend - app/page.jsx
import Hero from '@/components/ui/Hero';
import FeatureSection from '@/components/ui/FeatureSection';
import CTASection from '@/components/ui/CTASection';

export default function HomePage() {
  return (
    <div className='bg-black text-white'>
      <Hero />
      <FeatureSection />
      <CTASection />
    </div>
  );
}
