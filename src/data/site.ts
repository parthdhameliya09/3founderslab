export const siteConfig = {
  name: "3FoundersLab",
  tagline: "We build digital experiences that help businesses grow.",
  description:
    "3FoundersLab is a technology and digital solutions agency for websites, branding, UI/UX design, digital marketing and intelligent automation.",
  email: "3founderslab@gmail.com",
  phone: "+91 76982 09890",
  location: "India",
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined,
};

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/blogs", label: "Blogs" },
] as const;

export type SocialLink = { name: string; href: string };
export const socialLinks: SocialLink[] = [
  { name: "Instagram", href: "https://www.instagram.com/3founderslab" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/3founderslab" },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61596404880251" },
  { name: "X", href: "https://x.com/3FoundersLab" },
];
