# Moonmade 🌙

An e-commerce platform for handcrafted jewelry built with Next.js, TypeScript, and Supabase. Focused on modern storefront architecture, checkout flows, and scalable full-stack development.

[🌐 Live Demo](https://moonmade-test.vercel.app/) | [📂 GitHub Repository](https://github.com/mstobrawa/moonmade)

Next.js 14 • Full-Stack E-commerce • Supabase

---

## 🛠️ Tech Stack

* **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
* **Backend & Database:** Supabase (PostgreSQL)
* **Authentication:** Supabase Auth
* **Deployment:** Vercel

---

## Why this project?

This project was created to explore real-world e-commerce architecture using Next.js and Supabase. The main focus was building cart logic, checkout experience, authentication, and scalable frontend patterns.

---

## 📱 Visual Preview

<table width="100%">
  <thead>
    <tr>
      <th width="33%" align="center">🛒 Home Page</th>
      <th width="33%" align="center">💳 Product preview</th>
      <th width="33%" align="center">💼 Admin Panel</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top">
        <img src="https://github.com/user-attachments/assets/89fdbb98-7c24-41ab-b572-82af690a03fe" width="100%" alt="Home Page" />
      </td>
      <td valign="top">
        <img src="https://github.com/user-attachments/assets/036acdc3-ceaa-40c1-987c-702b45cb8ef7" width="100%" alt="Product preview" />
      </td>
      <td valign="top">
        <img src="https://github.com/user-attachments/assets/eb84f442-f223-466f-98a2-090b63b4db19" width="100%" alt="Admin panel preview" />
      </td>
    </tr>
  </tbody>
</table>

---

## ✨ Features

* **Product Catalog:** List of items with filtering and real-time search.
* **Shopping Cart:** Full state management (adding, removing, and changing quantities).
* **Checkout:** Multi-step checkout flow with validation and payment-ready architecture.
* **Admin Dashboard (Work in Progress):** Product management and future order handling.
* **Authentication:** Secure user sign-up and login via Supabase.

---

## Architecture Highlights

* App Router structure
* Component-based UI
* Global cart state
* Supabase authentication and data layer
* Mobile-first responsive approach

---

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js** (v18 or higher) and **npm** installed.

### Environment Setup

Create a `.env.local` file in the root directory based on `.env.example` and add your keys:

```text
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run Locally

1. Clone the repository:

```bash
git clone https://github.com/mstobrawa/moonmade.git
```

2. Install dependencies:

```bash
cd moonmade && npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open `http://localhost:3000` in your browser.

---

## 🗺️ Roadmap

* [ ] Integrate payment gateway for production checkout.
* [ ] Add email notifications for new orders.
* [ ] Implement image uploads for the Admin Panel using Supabase Storage.

---

## 👤 Author

**Michał Stobrawa**
*Frontend & Fullstack Developer*

- **GitHub:** [@mstobrawa](https://github.com)
- **LinkedIn:** [Michał Stobrawa](https://www.linkedin.com/in/michal-stobrawa/)
- **Email:** [stobrawa.m@gmail.com](mailto:stobrawa.m@gmail.com)

