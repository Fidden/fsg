import MainLayout from '@/components/Layouts/MainLayout';
import Container from '@/components/ui/Container';
import Hero from '@/components/Landing/Hero';
import Guide from '@/components/Landing/Guide';
import Shops from '@/components/Landing/Shops';
import Address from '@/components/Landing/Address';
import Flights from '@/components/Landing/Flights';
import Offices from '@/components/Landing/Offices';
import FAQ from '@/components/Landing/FAQ';
import About from '@/components/Landing/About';
import CTA from '@/components/Landing/CTA';
import Footer from '@/components/Landing/Footer';

export default function Index() {
  return (
    <MainLayout>
      <Container>
        <Hero />
        <Guide />
        <Shops />
        <Address />
        <Flights />
        <Offices />
        <FAQ />
        <About />
        <CTA />
        <Footer />
      </Container>
    </MainLayout>
  );
}
