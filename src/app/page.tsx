import HeroSection from "@/components/home/HeroSection";
import WizardSection from "@/components/home/WizardSection";
import {
  TrustedBy,
  SubjectsSection,
  CurriculumSection,
  WhyChoose,
  HowItWorks,
  TutorsSection,
  TestimonialsSection,
  DashboardPreview,
  PricingPreview,
  BlogPreview,
  FAQSection,
  CTASection,
} from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WizardSection />
      <TrustedBy />
      <SubjectsSection />
      <CurriculumSection />
      <WhyChoose />
      <HowItWorks />
      <TutorsSection />
      <TestimonialsSection />
      <DashboardPreview />
      <PricingPreview />
      <BlogPreview />
      <FAQSection />
      <CTASection />
    </>
  );
}
