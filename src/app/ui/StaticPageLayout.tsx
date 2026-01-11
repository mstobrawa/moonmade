import React from "react";

interface StaticPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function StaticPageLayout({
  title,
  children,
}: StaticPageLayoutProps) {
  return (
    <main className="min-h-screen bg-moon-cream text-moon-contrast px-4 py-10">
      <div className="max-w-3xl mx-auto bg-moon-white rounded-2xl shadow-md p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-8 text-center">{title}</h1>

        <div className="prose prose-neutral max-w-none">{children}</div>
      </div>
    </main>
  );
}
