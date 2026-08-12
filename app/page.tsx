import { Benefits } from '@/components/landing/benefits';
import { DashboardMockup } from '@/components/landing/dashboard-mockup';
import { Footer } from '@/components/landing/footer';
import { Hero } from '@/components/landing/hero';
import { InterestForm } from '@/components/landing/interest-form';
import { Workflow } from '@/components/landing/workflow';

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-ink text-white">
      <div
        className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(circle_at_72%_12%,rgba(116,242,192,0.13),transparent_30%),radial-gradient(circle_at_15%_62%,rgba(170,155,255,0.11),transparent_28%)]"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        <Hero />
        <DashboardMockup />
        <Benefits />
        <Workflow />
        <InterestForm />
        <Footer />
      </div>
    </main>
  );
}
