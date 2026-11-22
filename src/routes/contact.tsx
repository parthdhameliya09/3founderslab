import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { seo, breadcrumbs } from '@/lib/seo'
import { organizationSchema, webPageSchema, ORG_ID } from '@/lib/schema'

// Google reCAPTCHA v2 ("I'm not a robot"). The site key is public; the secret key lives only in EmailJS.
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined

type Grecaptcha = {
  ready: (cb: () => void) => void
  render: (el: HTMLElement, opts: { sitekey: string; callback?: (token: string) => void; 'expired-callback'?: () => void }) => number
  getResponse: (id?: number) => string
  reset: (id?: number) => void
}
declare global {
  interface Window { grecaptcha?: Grecaptcha }
}

/** Loads the reCAPTCHA script once and renders the checkbox into the returned ref. */
function useRecaptcha(siteKey: string | undefined) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<number | null>(null)
  const [token, setToken] = useState('')

  useEffect(() => {
    if (!siteKey || !containerRef.current) return
    const render = () => {
      const g = window.grecaptcha
      if (!g || !containerRef.current || widgetId.current !== null) return
      g.ready(() => {
        if (!containerRef.current || widgetId.current !== null) return
        widgetId.current = g.render(containerRef.current, {
          sitekey: siteKey,
          callback: setToken,
          'expired-callback': () => setToken(''),
        })
      })
    }
    if (window.grecaptcha) { render(); return }
    const existing = document.querySelector<HTMLScriptElement>('script[data-recaptcha]')
    const script = existing ?? document.createElement('script')
    if (!existing) {
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.dataset.recaptcha = 'true'
      document.head.appendChild(script)
    }
    script.addEventListener('load', render)
    return () => script.removeEventListener('load', render)
  }, [siteKey])

  const reset = () => {
    if (widgetId.current !== null) window.grecaptcha?.reset(widgetId.current)
    setToken('')
  }

  return { containerRef, token, reset }
}

// EmailJS IDs come from env vars (see .env.example). They are public by design.
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined

type Status = 'idle' | 'sending' | 'success' | 'error'

export const Route = createFileRoute('/contact')({
  head: () =>
    seo({
      title: 'Contact Us: Start Your Website or Automation Project',
      description: 'Tell 3FoundersLab about your website, e-commerce, design or AI automation project. Based in Ahmedabad, working worldwide. We reply within 24 hours.',
      path: '/contact',
      jsonLd: [
        webPageSchema('ContactPage', {
          path: '/contact',
          name: 'Contact 3FoundersLab',
          description: 'Contact 3FoundersLab by email, phone or the project enquiry form.',
          extra: { mainEntity: { '@id': ORG_ID } },
        }),
        organizationSchema(),
        breadcrumbs([{ name: 'Contact', path: '/contact' }]),
      ],
    }),
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

const budgetOptions = [
  'Below ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000 – ₹3,00,000',
  '₹3,00,000+',
]
const contactOptions = ['Email', 'Phone', 'WhatsApp']

/** Theme-styled dropdown. Renders in the page DOM (unlike a native <select> popup), so the custom cursor works over it. */
function ThemedSelect({ label, name, placeholder, options, value, onChange }: {
  label: string
  name: string
  placeholder?: string
  options: string[]
  value: string
  onChange: (value: string) => void
}) {
  const labelId = `${name}-label`
  return (
    <div className="block text-[12px] font-semibold">
      <span id={labelId}>{label}</span>
      <SelectPrimitive.Root name={name} value={value || undefined} onValueChange={onChange}>
        <SelectPrimitive.Trigger
          aria-labelledby={labelId}
          className="group mt-2 flex h-[42px] w-full items-center justify-between rounded-lg border border-[#e0e6ef] bg-[#f3f4f6] px-[15px] text-left text-[12px] font-normal text-[#111827] outline-none transition-colors hover:border-[#2563eb] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10 data-[placeholder]:text-[#64748b] data-[state=open]:border-[#2563eb] data-[state=open]:bg-white"
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <ChevronDown className="h-4 w-4 text-[#64748b] transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-[#2563eb]" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={6}
            className="z-50 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-[#e0e6ef] bg-white p-1.5 shadow-[0_12px_32px_-8px_rgba(15,23,42,0.18)] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
          >
            <SelectPrimitive.Viewport>
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option}
                  value={option}
                  className="relative flex h-9 select-none items-center rounded-lg pl-3 pr-8 text-[12px] text-[#374151] outline-none transition-colors data-[highlighted]:bg-[#eff4ff] data-[highlighted]:text-[#1749bd] data-[state=checked]:font-semibold data-[state=checked]:text-[#080808]"
                >
                  <SelectPrimitive.ItemText>{option}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="absolute right-3 text-[#2563eb]">
                    <Check className="h-3.5 w-3.5" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  )
}

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
  const [budget, setBudget] = useState('')
  const [preferredContact, setPreferredContact] = useState('Email')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const captcha = useRecaptcha(RECAPTCHA_SITE_KEY)

  function toggleService(service: string) {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service],
    )
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return

    const form = event.currentTarget
    const data = new FormData(form)
    const field = (key: string) => String(data.get(key) ?? '').trim()

    // Honeypot: real users never see or fill this field; bots usually do.
    if (field('website')) {
      setStatus('success')
      form.reset()
      return
    }

    if (selectedServices.length === 0) {
      setStatus('error')
      setErrorMessage('Please select at least one service.')
      return
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('EmailJS is not configured. Set the VITE_EMAILJS_* environment variables.')
      setStatus('error')
      setErrorMessage('The form is temporarily unavailable. Please email us at hello@3founderslab.com.')
      return
    }

    if (RECAPTCHA_SITE_KEY && !captcha.token) {
      setStatus('error')
      setErrorMessage('Please tick "I\'m not a robot" before sending.')
      return
    }

    setStatus('sending')
    setErrorMessage('')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: field('name'),
          company: field('company') || '—',
          email: field('email'),
          phone: field('phone') || '—',
          services: selectedServices.join(', '),
          budget: budget || 'Not specified',
          preferredContact: preferredContact || 'Email',
          description: field('description'),
          submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
          // EmailJS verifies this token server-side when reCAPTCHA is enabled on the template.
          'g-recaptcha-response': captcha.token,
        },
        {
          publicKey: EMAILJS_PUBLIC_KEY,
          // Ignore requests from headless browsers (common for bots).
          blockHeadless: true,
          // Allow at most one send every 30 seconds from this browser.
          limitRate: { id: 'contact-form', throttle: 30_000 },
        },
      )
      setStatus('success')
      form.reset()
      setBudget('')
      setPreferredContact('Email')
      captcha.reset()
    } catch (err) {
      // A token can only be used once, so always ask for a fresh tick after a failed attempt.
      captcha.reset()
      console.error('EmailJS send failed', err)
      setStatus('error')
      const code = (err as { status?: number })?.status
      setErrorMessage(
        code === 429
          ? 'You just sent an enquiry. Please wait 30 seconds before sending another.'
          : 'Something went wrong while sending. Please try again or email us at hello@3founderslab.com.',
      )
    }
  }

  return (
    <div className="min-h-screen bg-white px-5 py-12 text-[#080808] sm:px-8 sm:py-[72px]">
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
            <a href="mailto:3founderslab@gmail.com" className="flex min-h-[74px] items-center gap-4 rounded-xl border border-[#e0e6ef] px-[18px] py-4 transition-colors hover:border-[#2563eb]">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eff4ff] text-[#1749bd]"><MailIcon /></span>
              <span>
                <span className="block text-[13px] font-bold">3founderslab@gmail.com</span>
                <span className="block text-[11px] text-[#4b5563]">Email us anytime</span>
              </span>
            </a>
            <a href="tel:+917698209890" className="flex min-h-[74px] items-center gap-4 rounded-xl border border-[#e0e6ef] px-[18px] py-4 transition-colors hover:border-[#2563eb]">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eff4ff] text-[#1749bd]"><PhoneIcon /></span>
              <span>
                <span className="block text-[13px] font-bold">+91 76982 09890</span>
                <span className="block text-[11px] text-[#4b5563]">Mon–Sat, 10am–7pm IST</span>
              </span>
            </a>
            <div className="flex min-h-[74px] items-center gap-4 rounded-xl border border-[#e0e6ef] px-[18px] py-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eff4ff] text-[#1749bd]"><PinIcon /></span>
              <span>
                <span className="block text-[13px] font-bold">Ahmedabad, Gujarat, India</span>
                <span className="block text-[11px] text-[#4b5563]">Available worldwide</span>
              </span>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-[#f3f4f6] px-[21px] py-[21px]">
            <p className="text-[13px] font-bold">Prefer a quick call?</p>
            <p className="mt-2 text-[13px] text-[#374151]">Book a free 20-min discovery call.</p>
            <a href="mailto:3founderslab@gmail.com?subject=Book%20a%20discovery%20call" className="mt-4 inline-flex h-9 items-center rounded-lg bg-[#080808] px-[18px] text-[12px] font-semibold text-white transition-colors hover:bg-[#2563eb]">
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
              <ThemedSelect
                label="Estimated Budget"
                name="budget"
                placeholder="Select range"
                options={budgetOptions}
                value={budget}
                onChange={setBudget}
              />
              <ThemedSelect
                label="Preferred Contact"
                name="preferredContact"
                options={contactOptions}
                value={preferredContact}
                onChange={setPreferredContact}
              />
            </div>

            <label className="mt-[17px] block text-[12px] font-semibold">Project Description *
              <textarea required name="description" placeholder="Tell us about your goals, timeline and anything else helpful..." className="mt-2 min-h-[100px] w-full resize-y rounded-lg border border-[#e0e6ef] bg-[#f3f4f6] px-[15px] py-[12px] text-[12px] font-normal leading-5 text-[#111827] outline-none placeholder:text-[#64748b] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10" />
            </label>

            {/* Honeypot field: hidden from people and screen readers, catches bots */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>

            {RECAPTCHA_SITE_KEY && <div ref={captcha.containerRef} className="mt-5 min-h-[78px]" />}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-5 flex h-[44px] w-full items-center justify-center rounded-lg bg-[#2864e8] text-[12px] font-semibold text-white transition-colors hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === 'sending' ? 'Sending…' : <>Send Enquiry <span className="ml-1">→</span></>}
            </button>
            <div aria-live="polite">
              {status === 'success' && (
                <p role="status" className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-center text-[12px] text-green-700">
                  Thanks! Your enquiry has been sent. We'll get back to you within 24 hours.
                </p>
              )}
              {status === 'error' && (
                <p role="alert" className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-center text-[12px] text-red-700">
                  {errorMessage}
                </p>
              )}
            </div>
            <p className="mt-[9px] text-center text-[10px] text-[#4b5563]">By submitting, you agree to our Privacy Policy.</p>
          </form>
        </section>
      </div>
    </div>
  )
}