import HeroCard from "./HeroCard";

interface StaticPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function StaticPageLayout({
  title,
  children,
}: StaticPageLayoutProps) {
  return (
    <main className="store-page-spacing px-4 text-moon-contrast md:px-6">
      <HeroCard>
        <p className="moon-nav-text mb-3 text-[0.72rem] text-moon-rose-dark/80">
          Moonmade
        </p>
        <h1 className="mb-8 text-left text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>

        <div>
          <div className="space-y-5 text-base leading-8 text-moon-contrast/82 [&_a]:text-moon-rose-dark [&_a]:transition-colors [&_a]:duration-300 [&_a]:hover:text-moon-contrast [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_strong]:font-medium [&_ul]:space-y-2">
            {children}
          </div>
        </div>
      </HeroCard>
    </main>
  );
}
