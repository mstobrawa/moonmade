# Moonmade 🌙

Platforma e-commerce z biżuterią autorską. Zbudowana w Next.js z App Routerem, TypeScript i Supabase.

🔗 **[moonmade-flame.vercel.app](https://moonmade-flame.vercel.app)**

---

## Zrzuty ekranu

![Screenshot 1](https://github.com/user-attachments/assets/89fdbb98-7c24-41ab-b572-82af690a03fe)
![Screenshot 2](https://github.com/user-attachments/assets/036acdc3-ceaa-40c1-987c-702b45cb8ef7)
![Screenshot 3](https://github.com/user-attachments/assets/eb84f442-f223-466f-98a2-090b63b4db19)

---

## Funkcje

- Katalog produktów z filtrowaniem i wyszukiwaniem
- Koszyk zakupowy z zarządzaniem stanem
- Pełny checkout z formularzem zamówienia
- Panel administracyjny do zarządzania produktami i zamówieniami
- Autoryzacja użytkowników (Supabase Auth)
- Integracja płatności AutoPay *(w przygotowaniu)*

---

## Stack

**Frontend**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

**Backend / infrastruktura**
- Supabase (baza danych + autoryzacja)
- Vercel (deployment)

---

## Uruchomienie lokalne

```bash
git clone https://github.com/mstobrawa/moonmade.git
cd moonmade
npm install
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000)

### Zmienne środowiskowe

Utwórz plik `.env.local` na podstawie `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Autor

**Michał Stobrawa** — [mikewebworks.dev](https://mikewebworks.dev)
