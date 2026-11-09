import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
})

const sections = [
  {
    title: '1. Information we collect',
    body: 'When you contact us or submit a project enquiry, we may collect information you choose to provide, such as your name, email address, phone number, business or company name, requested services, budget range, and project description. We may also receive basic technical information, such as your browser type, device information, and pages visited, through server logs or analytics tools if those are enabled on the website.',
  },
  {
    title: '2. How we use your information',
    body: 'We use the information you provide to respond to enquiries, understand your requirements, prepare proposals or estimates, communicate about a potential or ongoing project, improve our website and services, and protect the website against misuse. We do not use enquiry details for unrelated marketing unless you have agreed to receive such communication.',
  },
  {
    title: '3. Sharing your information',
    body: 'We do not sell your personal information. We may share information with team members, contractors, or service providers who need it to help us operate the website or deliver a service, and where required by law or to protect our legal rights. We expect anyone handling information on our behalf to use it only for the relevant purpose and to protect it appropriately.',
  },
  {
    title: '4. Cookies and analytics',
    body: 'Our website may use essential cookies or similar technologies to make the website work and, if enabled, analytics tools to understand website usage. You can control cookies through your browser settings. Blocking some cookies may affect website functionality.',
  },
  {
    title: '5. Data security and retention',
    body: 'We use reasonable measures designed to protect information against unauthorised access, loss, or misuse. No method of online transmission or storage is completely secure, so we cannot guarantee absolute security. We keep information only for as long as reasonably necessary to respond to you, provide services, meet legal obligations, resolve disputes, and enforce agreements.',
  },
  {
    title: '6. Your choices and requests',
    body: 'You may contact us to request access to, correction of, or deletion of personal information you have provided, subject to applicable law and any records we are required to retain. You can also ask us to stop sending non-essential promotional messages at any time.',
  },
  {
    title: '7. Third-party websites',
    body: 'Our website may contain links to third-party websites or services. Their privacy practices are governed by their own policies, and we are not responsible for how they collect or use information. Please review their policies before sharing information with them.',
  },
  {
    title: '8. Children’s privacy',
    body: 'Our website and services are intended for businesses and general audiences, not for children. We do not knowingly seek to collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can review the request.',
  },
  {
    title: '9. Changes to this policy',
    body: 'We may update this Privacy Policy from time to time. The revised version will be posted on this page with an updated effective date. Your continued use of the website after an update means you have had the opportunity to review the revised policy.',
  },
]

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white px-5 py-14 text-[#080808] sm:px-8 sm:py-20">
      <article className="mx-auto w-full max-w-[820px]">
        <Link to="/" className="inline-flex items-center text-[13px] font-semibold text-[#2563eb] hover:underline">← Back to home</Link>
        <p className="mt-10 text-[11px] font-bold tracking-[0.12em] text-[#2563eb]">LEGAL</p>
        <h1 className="mt-3 text-4xl font-bold tracking-[-0.035em] sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm leading-6 text-[#4b5563]">Effective date: 10 November 2026</p>
        <p className="mt-8 text-[15px] leading-7 text-[#374151]">3FoundersLab (“we”, “us”, or “our”) respects your privacy. This Privacy Policy explains what information we may collect when you visit <a href="https://3founderslab.in" className="text-[#2563eb] hover:underline">3founderslab.in</a>, contact us, or enquire about our services, and how we use and protect that information.</p>
        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-bold tracking-[-0.02em]">{section.title}</h2>
              <p className="mt-3 text-[14px] leading-7 text-[#4b5563]">{section.body}</p>
            </section>
          ))}
        </div>
        <section className="mt-10 rounded-xl border border-[#e0e6ef] bg-[#f8fafc] p-6">
          <h2 className="text-lg font-bold">10. Contact us</h2>
          <p className="mt-3 text-[14px] leading-7 text-[#4b5563]">For questions or privacy-related requests, contact us at <a href="mailto:hello@3founderslab.com" className="font-semibold text-[#2563eb] hover:underline">hello@3founderslab.com</a>.</p>
          <p className="mt-2 text-[13px] text-[#64748b]">3FoundersLab · Ahmedabad, Gujarat, India</p>
        </section>
        <div className="mt-12 border-t border-[#e5e7eb] pt-6 text-[12px] text-[#64748b]">
          <Link to="/terms" className="font-semibold text-[#2563eb] hover:underline">Terms &amp; Conditions →</Link>
        </div>
      </article>
    </main>
  )
}
