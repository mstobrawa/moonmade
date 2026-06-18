import LoginForm from "../ui/LoginForm";
import RegisterForm from "../ui/RegisterForm";
import HeroCard from "../ui/HeroCard";

export default function SignInUpPage() {
  return (
    <main className="store-page-spacing flex items-start justify-center px-6">
      <div className="w-full max-w-5xl">
        <HeroCard className="mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-moon-rose-dark">
            Moonmade Account
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-moon-contrast">
            Logowanie / Rejestracja
          </h1>
        </HeroCard>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <HeroCard className="h-full">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-moon-contrast">
                Logowanie
              </h2>
              <p className="text-sm text-moon-rose-dark/80">
                Masz już konto? Zaloguj się.
              </p>
            </div>
            <LoginForm />
          </HeroCard>

          <HeroCard className="h-full">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-moon-contrast">
                Rejestracja
              </h2>
              <p className="text-sm text-moon-rose-dark/80">
                Stwórz nowe konto.
              </p>
            </div>
            <RegisterForm />
          </HeroCard>
        </div>
      </div>
    </main>
  );
}
