import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig, socialLinks } from "@/data/site";
import logo from "@/assets/logo.png";

const quick = [
  { to: "/", label: "Home" }, { to: "/services", label: "Services" }, { to: "/work", label: "Work" },
  { to: "/about", label: "About Us" }, { to: "/blogs", label: "Blogs" }, { to: "/contact", label: "Contact" },
] as const;
const serviceLinks = ["Website Development", "E-commerce", "UI/UX Design", "Branding", "AI Automation", "Digital Marketing", "SEO"];

export function Footer() {
  return (
    <footer className="border-t bg-surface">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <img src={logo} alt="3FoundersLab Logo" className="h-8 w-auto object-contain" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A technology and digital solutions agency helping businesses build, improve and grow online.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-brand" /><a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">{siteConfig.email}</a></li>
            <li className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-brand" />{siteConfig.phone}</li>
            <li className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-brand" />{siteConfig.location}</li>
          </ul>
        </div>
        <FooterCol title="Quick Links" className="md:col-span-2">
          {quick.map((l) => <li key={l.to}><Link to={l.to} className="hover:text-foreground">{l.label}</Link></li>)}
        </FooterCol>
        <FooterCol title="Services" className="md:col-span-3">
          {serviceLinks.map((s) => <li key={s}><Link to="/services" className="hover:text-foreground">{s}</Link></li>)}
        </FooterCol>
        <FooterCol title="Connect" className="md:col-span-3">
          {socialLinks.map((s) => <li key={s.name}><a href={s.href} target="_blank" rel="noreferrer" className="hover:text-foreground">{s.name}</a></li>)}
        </FooterCol>
      </div>
      <div className="border-t">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 3FoundersLab. All Rights Reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h3 className="text-sm font-semibold tracking-normal">{title}</h3>
      <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">{children}</ul>
    </div>
  );
}
