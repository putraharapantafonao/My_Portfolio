# 🚀 Premium Developer Portfolio

A modern, high-performance, and fully responsive personal portfolio built with [Astro](https://astro.build/) and [Tailwind CSS v4](https://tailwindcss.com/). Designed to showcase projects, publications, skills, and certifications with an elegant, glassmorphic aesthetic.

![Astro](https://img.shields.io/badge/Astro-0F172A?style=for-the-badge&logo=astro)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

## ✨ Features

- **Modern & Premium Design**: Built with a sleek dark/light mode, glassmorphism UI, glowing gradients, and subtle micro-animations.
- **Admin Dashboard**: Built-in, password-protected Admin Panel to effortlessly edit profile information, upload images, and manage content via JSON files without touching code.
- **Multi-Language Support (i18n)**: Seamlessly toggle between English (EN) and Indonesian (ID).
- **Responsive Layout**: Completely mobile-friendly and optimized for all screen sizes.
- **Integrated Sections**:
  - 🏠 **Home**: Hero section, dynamic skills marquee, stats, and a glowing Contact form.
  - 💻 **Projects**: Grid layout showcasing featured works with GitHub and Demo links.
  - 📜 **Publications**: List of academic or technical publications.
  - 🏆 **Certificates**: Verified credentials and achievements with a built-in image lightbox.
  - 📝 **Blog**: Technical notes and thoughts.
- **Performance First**: Leveraging Astro's island architecture for lightning-fast loading speeds.

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [FontAwesome](https://fontawesome.com/)
- **Data Storage**: Local JSON files (managed via Admin Panel)

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v22+) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/putraharapantafonao/My_Portfolio.git
   ```

2. **Navigate into the project directory:**
   ```bash
   cd My_Portfolio
   ```

3. **Install the dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser** and visit `http://localhost:4321` to see the portfolio!

## 🔐 Admin Panel
To access the Admin Panel and edit your portfolio's content dynamically:
1. Navigate to `/admin` (e.g., `http://localhost:4321/admin`).
2. Log in using your credentials.
3. Edit your profile, skills, projects, and more via a user-friendly interface.

## 📦 Building for Production

To build the project for production, run:
```bash
npm run build
```
This will generate the optimized static or server assets in the `dist/` directory, ready to be deployed.

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).
