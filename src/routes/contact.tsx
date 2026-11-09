import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import type { FormEvent } from 'react'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

const services = [
  'Website Development',
  'E-commerce',
  'UI/UX Design',
  'Branding',
  'AI Automation',
  'SEO',
  'MERN',
  'Other',
]

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function ContactPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Website Development',
    'E-commerce',
  ])
  const [submitted, setSubmitted] = useState(false)

  function toggleService(service: string) {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service],
    )
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-white px-5 py-12 text-[#080808] sm:px-8 sm:py-[72px]">
      <div className="mx-auto grid w-full max-w-[1024px] grid-cols-1 items-start gap-8 lg:grid-cols-[388px_minmax(0,1fr)] lg:gap-9">
        <section className="pt-0 lg:pt-0">
          <p className="mb-4 text-[11px] font-bold tracking-[0.12em] text-[#2563eb]">CONTACT</p>
          <h1 className="max-w-[390px] text-[42px] font-bold leading-[1.39] tracking-[-0.035em] sm:text-[48px] sm:leading-[1.22]">
            Let's Talk About Your Next Project.
          </h1>
          <p className="mt-4 max-w-[390px] text-[15px] leading-6 text-[#374151]">
            Tell us about your business and what you're looking to build. We reply within 24 hours.
          </p>

          <div className="mt-7 space-y-3">
            <a href="mailto:hello@3founderslab.com" className="flex min-h-[74px] items-center gap-4 rounded-xl border border-[#e0e6ef] px-[18px] py-4 transition-colors hover:border-[#2563eb]">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eff4ff] text-[#1749bd]"><MailIcon /></span>
              <span>
                <span className="block text-[13px] font-bold">hello@3founderslab.com</span>
                <span className="block text-[11px] text-[#4b5563]">Email us anytime</span>
              </span>
            </a>
            <a href="tel:+919876543210" className="flex min-h-[74px] items-center gap-4 rounded-xl border border-[#e0e6ef] px-[18px] py-4 transition-colors hover:border-[#2563eb]">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eff4ff] text-[#1749bd]"><PhoneIcon /></span>
              <span>
                <span className="block text-[13px] font-bold">+91 98765 43210</span>
                <span className="block text-[11px] text-[#4b5563]">Mon–Sat, 10am–7pm IST</span>
              </span>
            </a>
            <div className="flex min-h-[74px] items-center gap-4 rounded-xl border border-[#e0e6ef] px-[18px] py-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eff4ff] text-[#1749bd]"><PinIcon /></span>
              <span>
                <span className="block text-[13px] font-bold">Ahmedabad, Gujarat, India</span>
                <span className="block text-[11px] text-[#4b5563]">Available worldwide, remote-first</span>
              </span>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-[#f3f4f6] px-[21px] py-[21px]">
            <p className="text-[13px] font-bold">Prefer a quick call?</p>
            <p className="mt-2 text-[13px] text-[#374151]">Book a free 20-min discovery call.</p>
            <a href="mailto:hello@3founderslab.com?subject=Book%20a%20discovery%20call" className="mt-4 inline-flex h-9 items-center rounded-lg bg-[#080808] px-[18px] text-[12px] font-semibold text-white transition-colors hover:bg-[#2563eb]">
              Schedule Call <span className="ml-1">→</span>
            </a>
          </div>
        </section>

        <section className="rounded-[21px] border border-[#e0e6ef] px-6 py-8 sm:px-9 sm:py-9">
          <h2 className="text-[22px] font-bold leading-7 tracking-[-0.02em]">Tell us about your project</h2>
          <p className="mt-1 text-[12px] text-[#4b5563]">Fields marked * are required. No spam, ever.</p>

          <form className="mt-7" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-x-[14px] gap-y-[15px] sm:grid-cols-2">
              <label className="block text-[12px] font-semibold">Full Name *
                <input required name="name" placeholder="Your name" className="mt-2 h-[42px] w-full rounded-lg border border-[#e0e6ef] bg-[#f3f4f6] px-[15px] text-[12px] font-normal text-[#111827] outline-none placeholder:text-[#64748b] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10" />
              </label>
              <label className="block text-[12px] font-semibold">Business / Company
                <input name="company" placeholder="Company name" className="mt-2 h-[42px] w-full rounded-lg border border-[#e0e6ef] bg-[#f3f4f6] px-[15px] text-[12px] font-normal text-[#111827] outline-none placeholder:text-[#64748b] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10" />
              </label>
              <label className="block text-[12px] font-semibold">Email Address *
                <input required type="email" name="email" placeholder="you@company.com" className="mt-2 h-[42px] w-full rounded-lg border border-[#e0e6ef] bg-[#f3f4f6] px-[15px] text-[12px] font-normal text-[#111827] outline-none placeholder:text-[#64748b] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10" />
              </label>
              <label className="block text-[12px] font-semibold">Phone Number
                <input type="tel" name="phone" placeholder="+91 ..." className="mt-2 h-[42px] w-full rounded-lg border border-[#e0e6ef] bg-[#f3f4f6] px-[15px] text-[12px] font-normal text-[#111827] outline-none placeholder:text-[#64748b] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10" />
              </label>
            </div>

            <fieldset className="mt-[17px]">
              <legend className="text-[12px] font-semibold">Services Required *</legend>
              <div className="mt-2 flex flex-wrap gap-[7px]">
                {services.map((service) => {
                  const active = selectedServices.includes(service)
                  return (
                    <button key={service} type="button" onClick={() => toggleService(service)} aria-pressed={active} className={`h-[35px] rounded-lg border px-[13px] text-[12px] transition-colors ${active ? 'border-[#080808] bg-[#080808] font-semibold text-white' : 'border-[#e0e6ef] bg-white text-[#374151] hover:border-[#2563eb]'}`}>
                      {service}
                    </button>
                  )
                })}
              </div>
              <input type="hidden" name="services" value={selectedServices.join(', ')} />
            </fieldset>

            <div className="mt-[17px] grid grid-cols-1 gap-x-[14px] gap-y-[15px] sm:grid-cols-2">
              <label className="block text-[12px] font-semibold">Estimated Budget
                <select name="budget" defaultValue="" className="mt-2 h-[42px] w-full rounded-lg border border-[#e0e6ef] bg-[#f3f4f6] px-[15px] text-[12px] font-normal text-[#374151] outline-none focus:border-[#2563eb]">
                  <option value="" disabled>Select range</option>
                  <option>Below ₹25,000</option>
                  <option>₹25,000 – ₹50,000</option>
                  <option>₹50,000 – ₹1,00,000</option>
                  <option>₹1,00,000 – ₹3,00,000</option>
                  <option>₹3,00,000+</option>
                </select>
              </label>
              <label className="block text-[12px] font-semibold">Preferred Contact
                <select name="preferredContact" defaultValue="Email" className="mt-2 h-[42px] w-full rounded-lg border border-[#e0e6ef] bg-[#f3f4f6] px-[15px] text-[12px] font-normal text-[#374151] outline-none focus:border-[#2563eb]">
                  <option>Email</option>
                  <option>Phone</option>
                  <option>WhatsApp</option>
                </select>
              </label>
            </div>

            <label className="mt-[17px] block text-[12px] font-semibold">Project Description *
              <textarea required name="description" placeholder="Tell us about your goals, timeline and anything else helpful..." className="mt-2 min-h-[100px] w-full resize-y rounded-lg border border-[#e0e6ef] bg-[#f3f4f6] px-[15px] py-[12px] text-[12px] font-normal leading-5 text-[#111827] outline-none placeholder:text-[#64748b] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10" />
            </label>

            <button type="submit" className="mt-5 flex h-[44px] w-full items-center justify-center rounded-lg bg-[#2864e8] text-[12px] font-semibold text-white transition-colors hover:bg-[#1d4ed8]">
              Send Enquiry <span className="ml-1">→</span>
            </button>
            {submitted && <p role="status" className="mt-3 text-center text-[12px] text-[#2563eb]">Thanks for your interest! The form is ready for backend integration.</p>}
            <p className="mt-[9px] text-center text-[10px] text-[#4b5563]">By submitting, you agree to our Privacy Policy. Ready for backend integration.</p>
          </form>
        </section>
      </div>
    </main>
  )
}