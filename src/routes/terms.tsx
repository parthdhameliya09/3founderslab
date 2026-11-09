import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/terms')({
    component: TermsPage,
})

const sections = [
    {
        title: '1. About these terms',
        body: 'These Terms & Conditions (“Terms”) govern your access to and use of the 3FoundersLab website at 3founderslab.in and any enquiry or communication you make through it. By using the website, you agree to these Terms. If you do not agree, please do not use the website.',
    },
    {
        title: '2. Our services',
        body: '3FoundersLab provides digital and technology-related services that may include website and application development, e-commerce solutions, UI/UX design, branding, automation, search engine optimisation, and related consulting. Information on this website is general information about our services, not a binding offer to deliver a particular project.',
    },
    {
        title: '3. Enquiries, proposals and project agreements',
        body: 'Submitting an enquiry does not create a client relationship or require either party to proceed with a project. Before work begins, the parties should agree in writing on the project scope, deliverables, milestones, timeline, fees, payment schedule, responsibilities, revision limits, and any other project-specific conditions. If a signed proposal, statement of work, or separate agreement conflicts with these website Terms, the project-specific agreement will apply to that project to the extent of the conflict.',
    },
    {
        title: '4. Fees and payments',
        body: 'Fees, taxes, deposits, payment milestones, and accepted payment methods will be stated in the relevant proposal or project agreement. Unless that agreement says otherwise, work may be paused if an agreed payment is overdue. Any cancellation, refund, or rescheduling terms will be governed by the relevant project agreement and applicable law.',
    },
    {
        title: '5. Your responsibilities',
        body: 'You agree to provide accurate information, timely feedback, and the content, access, approvals, and materials reasonably needed for the project. You must ensure that you have the necessary rights and permissions to use any materials you provide. Delays in providing required information or approvals may affect delivery dates and project scope.',
    },
    {
        title: '6. Intellectual property',
        body: 'Unless a separate written agreement states otherwise, each party retains ownership of materials, tools, code, processes, and intellectual property it owned or developed independently before the project. Ownership or licensing of project-specific deliverables, source files, third-party components, and work in progress will be set out in the relevant project agreement. Third-party software, fonts, stock assets, plugins, and open-source components remain subject to their own licences.',
    },
    {
        title: '7. Acceptable website use',
        body: 'You must not misuse the website, attempt to gain unauthorised access to it or its systems, interfere with its operation, introduce malicious code, scrape or copy content in a way that violates law or others’ rights, or use the website for unlawful, misleading, or harmful purposes.',
    },
    {
        title: '8. Third-party services and links',
        body: 'Projects may involve third-party platforms, hosting providers, payment processors, APIs, plugins, or other services. Those services are controlled by their respective providers and are subject to their own terms, availability, fees, and privacy policies. We are not responsible for changes, outages, or acts or omissions of third-party providers outside our reasonable control.',
    },
    {
        title: '9. Disclaimers',
        body: 'We aim to keep website information accurate and available, but provide the website on an “as is” and “as available” basis. To the extent permitted by law, we do not guarantee that the website will always be uninterrupted, error-free, or free of harmful components. Any project-specific warranties or service commitments must be stated in the relevant written agreement.',
    },
    {
        title: '10. Limitation of liability',
        body: 'To the extent permitted by applicable law, 3FoundersLab will not be liable for indirect, incidental, special, consequential, or punitive losses, or for loss of profits, revenue, data, goodwill, or business opportunity arising from your use of the website. Nothing in these Terms excludes or limits liability that cannot legally be excluded or limited. Any liability relating to a commissioned project will be addressed in the applicable project agreement and applicable law.',
    },
    {
        title: '11. Privacy',
        body: 'Our collection and use of personal information is explained in our Privacy Policy. By using the website, you acknowledge that you can review that policy before submitting personal information.',
    },
    {
        title: '12. Changes to these Terms',
        body: 'We may update these Terms from time to time. The updated version will be posted on this page with a revised effective date. The Terms in force when a project agreement is entered into may be supplemented or replaced by that project agreement.',
    },
    {
        title: '13. Governing law and jurisdiction',
        body: 'These Terms are governed by the laws of India, without regard to conflict-of-law principles. Subject to any mandatory legal requirements, the courts having jurisdiction in Ahmedabad, Gujarat, India will have jurisdiction over disputes relating to these Terms or use of the website.',
    },
]

function TermsPage() {
    return (
        <main className="min-h-screen bg-white px-5 py-14 text-[#080808] sm:px-8 sm:py-20">
            <article className="mx-auto w-full max-w-[820px]">
                <Link to="/" className="inline-flex items-center text-[13px] font-semibold text-[#2563eb] hover:underline">← Back to home</Link>
                <p className="mt-10 text-[11px] font-bold tracking-[0.12em] text-[#2563eb]">LEGAL</p>
                <h1 className="mt-3 text-4xl font-bold tracking-[-0.035em] sm:text-5xl">Terms &amp; Conditions</h1>
                <p className="mt-4 text-sm leading-6 text-[#4b5563]">Effective date: 10 November 2026</p>
                <p className="mt-8 text-[15px] leading-7 text-[#374151]">Welcome to 3FoundersLab. These Terms &amp; Conditions explain the rules for using our website and making enquiries about our services. Please read them carefully.</p>
                <div className="mt-10 space-y-8">
                    {sections.map((section) => (
                        <section key={section.title}>
                            <h2 className="text-lg font-bold tracking-[-0.02em]">{section.title}</h2>
                            <p className="mt-3 text-[14px] leading-7 text-[#4b5563]">{section.body}</p>
                        </section>
                    ))}
                </div>
                <section className="mt-10 rounded-xl border border-[#e0e6ef] bg-[#f8fafc] p-6">
                    <h2 className="text-lg font-bold">14. Contact us</h2>
                    <p className="mt-3 text-[14px] leading-7 text-[#4b5563]">If you have questions about these Terms, contact us at <a href="mailto:hello@3founderslab.com" className="font-semibold text-[#2563eb] hover:underline">hello@3founderslab.com</a>.</p>
                    <p className="mt-2 text-[13px] text-[#64748b]">3FoundersLab · Ahmedabad, Gujarat, India</p>
                </section>
                <div className="mt-12 border-t border-[#e5e7eb] pt-6 text-[12px] text-[#64748b]">
                    <Link to="/privacy" className="font-semibold text-[#2563eb] hover:underline">Privacy Policy →</Link>
                </div>
            </article>
        </main>
    )
}
