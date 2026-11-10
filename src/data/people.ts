import parth from "@/assets/parth.jpeg"
export type Testimonial = { name: string; company: string; role: string; quote: string; photo?: string; placeholder?: boolean; highlight?: string };

export const testimonials: Testimonial[] = [
  { name: "Rahul Mehta", company: "Mehta Enterprises", role: "Founder", quote: "We were spending hours managing repetitive tasks manually. 3FoundersLab helped automate our workflow and made daily operations much smoother. Really happy with the results.", placeholder: true, highlight: "Automation" },
  { name: "Aarav Shah", company: "Elevate Solutions", role: "Director", quote: "Our old website wasn't attracting customers. The team redesigned it with a clean, modern look and better user experience. The overall result was exactly what we needed.", placeholder: true, highlight: "Web Development" },
  { name: "Mitchell", company: "UrbanCraft Studio", role: "Co-Founder", quote: "We needed a professional online presence to showcase our business. 3FoundersLab understood our vision and delivered a website that represents our brand perfectly.", placeholder: true, highlight: "Digital Solutions" },
];

export type TeamMember = { name: string; role: string; bio: string; photo?: string; linkedin?: string };

export const team: TeamMember[] = [
  { name: "Adarsh Kori", role: "Founder", bio: "Add a short bio, focus areas and back", photo: "./src/assets/adarsh.jpeg", linkedin: "https://linkedin.com/in/example" },
  { name: "Kaushal Kalal", role: "Founder", bio: "Add a short bio, focus areas and back", photo: "./src/assets/kaushal.jpeg", linkedin: "https://linkedin.com/in/example" },
  { name: "Parth Dhameliya", role: "Founder", bio: "🚀 Curious about tech, passionate about problem-solving & always exploring new ways to turn ideas into reality. 💡", photo: parth, linkedin: "https://in.linkedin.com/in/parthdhameliya" },
];
