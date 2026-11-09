export type Testimonial = { name: string; company: string; role: string; quote: string; photo?: string; placeholder?: boolean };

// PLACEHOLDERS — replace with genuine client feedback.
export const testimonials: Testimonial[] = [
  { name: "Client Name", company: "Company Name", role: "Designation", quote: "Placeholder testimonial. Add genuine client feedback here once available.", placeholder: true },
  { name: "Client Name", company: "Company Name", role: "Designation", quote: "Placeholder testimonial. Add genuine client feedback here once available.", placeholder: true },
  { name: "Client Name", company: "Company Name", role: "Designation", quote: "Placeholder testimonial. Add genuine client feedback here once available.", placeholder: true },
];

export type TeamMember = { name: string; role: string; bio: string; photo?: string; linkedin?: string };

// PLACEHOLDERS — replace with real founder and team profiles.
export const team: TeamMember[] = [
  { name: "Founder Name", role: "Co-founder", bio: "Add a short bio, focus areas and background." },
  { name: "Founder Name", role: "Co-founder", bio: "Add a short bio, focus areas and background." },
  { name: "Founder Name", role: "Co-founder", bio: "Add a short bio, focus areas and background." },
];
