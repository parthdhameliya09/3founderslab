import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb, BadgeCheck, Eye, Sparkles, ShieldCheck, RefreshCw, User, Linkedin } from "lucide-react";
import { team } from "@/data/people";
import { PageHero, Reveal, SectionHeading, CtaSection } from "@/components/site/ui";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | 3FoundersLab" },
      { name: "description", content: "3FoundersLab is a technology-focused service company bringing together development, design and innovation." },
      { property: "og:title", content: "About 3FoundersLab" },
      { property: "og:description", content: "We are 3FoundersLab. We build with purpose." },
    ],
  }),
  component: AboutPage,
});

const story = [
  ["Who we are", "A technology-focused service company bringing development, design and innovation together under one roof."],
  ["What we do", "We build websites, stores, brands and automations — and help businesses keep improving them after launch."],
  ["Why we started", "Too many businesses juggle separate vendors for design, development and marketing. We started 3FoundersLab to be one accountable partner for all of it."],
  ["Our approach", "Understand the business first, then choose the simplest technology that solves the real problem — and measure what changes."],
];

const values = [
  [Lightbulb, "Innovation"], [BadgeCheck, "Quality"], [Eye, "Transparency"],
  [Sparkles, "Creativity"], [ShieldCheck, "Reliability"], [RefreshCw, "Continuous improvement"],
] as const;

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title={<>We Are 3FoundersLab. <span className="text-brand">We Build With Purpose.</span></>}
        description="Technology, creativity and strategy under one roof — for startups, small businesses and growing brands." />

      <section className="section-y">
        <div className="container-site grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-2">
          {story.map(([h, t], i) => (
            <Reveal key={h} delay={(i % 2) * 80} className="h-full"><div className="h-full bg-background p-8 md:p-10">
              <span className="font-mono text-xs text-brand">0{i + 1}</span>
              <h2 className="mt-4 text-2xl font-bold">{h}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{t}</p>
            </div></Reveal>
          ))}
        </div>
      </section>

      <section className="section-y bg-foreground text-background">
        <div className="container-site grid gap-12 md:grid-cols-2">
          <Reveal><p className="eyebrow">Mission</p><p className="mt-4 text-2xl font-semibold leading-snug md:text-3xl">To help businesses build a complete digital ecosystem that makes them look professional, operate efficiently and grow online.</p></Reveal>
          <Reveal delay={120}><p className="eyebrow">Vision</p><p className="mt-4 text-2xl font-semibold leading-snug md:text-3xl">To be the technology partner ambitious businesses trust from their first website to their next transformation.</p></Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <SectionHeading eyebrow="Values" title="What guides our work." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(([Icon, v], i) => (
              <Reveal key={v} delay={(i % 3) * 70}><div className="flex items-center gap-4 border-b pb-6">
                <Icon className="h-6 w-6 text-brand" strokeWidth={1.6} /><span className="text-xl font-semibold">{v}</span>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-site">
          <SectionHeading eyebrow="Team" title="The people behind the lab." />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={i} delay={i * 80}>
                {m.linkedin ? (
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-lg border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                    aria-label={`View ${m.name}'s LinkedIn profile`}
                  >
                    {m.photo ? (
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="h-full w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <User className="h-14 w-14 text-border" strokeWidth={1.2} />
                    )}
                    <span className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-[#0A66C2] shadow-sm backdrop-blur-xs transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0A66C2] group-hover:text-white">
                      <Linkedin className="h-4 w-4" />
                    </span>
                  </a>
                ) : (
                  <div className="flex aspect-[4/5] items-center justify-center rounded-lg border bg-background">
                    {m.photo ? (
                      <img src={m.photo} alt={m.name} className="h-full w-full rounded-lg object-cover" />
                    ) : (
                      <User className="h-14 w-14 text-border" strokeWidth={1.2} />
                    )}
                  </div>
                )}
                <div className="mt-5 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{m.name}</h3>
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-[#0A66C2]"
                      aria-label={`${m.name}'s LinkedIn`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <p className="text-sm text-brand">{m.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{m.bio}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
