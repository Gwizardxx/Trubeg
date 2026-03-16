// ─── OPENING ANIMATION ───────────────────────────────────────────────────────
window.addEventListener('load', () => {
    const anim  = document.getElementById('opening-animation');
    const text  = document.getElementById('truberg-text');
    const tag   = document.getElementById('tagline');

    if (!anim || !text) return;

    setTimeout(() => {
        text.classList.add('animate');
        text.style.opacity = '1';
        text.style.transform = 'scale(1)';
    }, 200);

    setTimeout(() => {
        if (tag) { tag.style.opacity = '1'; }
    }, 900);

    setTimeout(() => {
        anim.style.opacity = '0';
        anim.style.transition = 'opacity 0.8s ease';
        setTimeout(() => {
            anim.style.display = 'none';
        }, 800);
    }, 2800);
});

// ─── BOOKING FORM ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

    // Set minimum date to today
    const dateInput = document.getElementById('preferred-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    const form = document.getElementById('booking-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name    = form.querySelector('input[type="text"]')?.value.trim();
            const email   = form.querySelector('input[type="email"]')?.value.trim();
            const service = form.querySelector('select')?.value;
            const date    = document.getElementById('preferred-date')?.value;
            const time    = document.getElementById('preferred-time')?.value;

            if (!name || !email || !service || !date || !time) {
                showToast('Please fill in all required fields.', 'error');
                return;
            }

            // Simulate submission
            const btn = form.querySelector('button[type="submit"]');
            const original = btn.innerHTML;
            btn.innerHTML = `<svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Confirming...`;
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = original;
                btn.disabled = false;
                form.reset();
                showToast(`✅ Booking confirmed for ${date} at ${time}. We'll email you shortly, ${name}!`, 'success');
            }, 1800);
        });
    }

    // Intersection observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-fade-in-up').forEach(el => {
        observer.observe(el);
    });
});

// ─── VIEW ALL PROJECTS BUTTON ─────────────────────────────────────────────────
// Attach to the "View All Projects" button in the Projects section
document.addEventListener('DOMContentLoaded', () => {
    // The button is rendered inside truberg-navbar via innerHTML — use event delegation
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action="view-all-projects"]');
        if (btn) {
            e.preventDefault();
            openAllProjectsModal();
        }
    });
});

function openAllProjectsModal() {
    // Remove existing modal if any
    document.getElementById('all-projects-modal')?.remove();

    const allProjects = [
        { image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=640&h=360&fit=crop', category: 'Commercial',   title: 'Armco Business Complex',        location: 'Moi Avenue District',    reviewer: 'Sarah Wambui, CEO Armco',                review: 'Trubeg transformed our vision into a landmark. Their consultative approach saved us 15% on projected costs.' },
        { image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=640&h=360&fit=crop', category: 'Residential',  title: 'The Ruiru Estates',             location: 'Ruiru Ndani',            reviewer: 'Jane Romanoff',                          review: 'Their attention to detail is unmatched. They perfected our lifestyle.' },
        { image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=640&h=360&fit=crop', category: 'Industrial',   title: 'GreenTech Manufacturing Co.',   location: 'Industrial Zone',        reviewer: 'James Arteta, Plant Director',           review: 'Completed 3 weeks ahead of schedule with zero safety incidents.' },
        { image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=640&h=360&fit=crop', category: 'Residential',  title: 'Karen Heights Villas',          location: 'Karen, Nairobi',         reviewer: 'David & Anne Kariuki',                   review: 'From blueprint to handover — a flawless experience. Highly recommended.' },
        { image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=640&h=360&fit=crop', category: 'Commercial',   title: 'Westgate Retail Park',         location: 'Westlands',              reviewer: 'Mark Odhiambo, Retail Director',         review: 'On time, on budget, and exceptional quality throughout.' },
        { image: 'https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=640&h=360&fit=crop', category: 'Sustainable',  title: 'EcoHub Office Complex',         location: 'Upper Hill',             reviewer: 'Lucy Ngugi, Sustainability Lead',        review: 'LEED Gold certified and a joy to work in daily.' },
        { image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&h=360&fit=crop', category: 'Renovation',   title: 'Heritage Bank Restoration',     location: 'CBD Nairobi',            reviewer: 'Peter Otieno, Bank Manager',             review: 'They preserved every historical detail while bringing the building into the 21st century.' },
        { image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=640&h=360&fit=crop', category: 'Residential',  title: 'Lavington Court Apartments',    location: 'Lavington',              reviewer: 'Stella Mwangi',                          review: 'Beautiful quality, great communication, and delivered on time.' },
        { image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=640&h=360&fit=crop', category: 'Commercial',   title: 'TechPark Innovation Hub',       location: 'Kilimani',               reviewer: 'Brian Njoroge, CEO TechPark',            review: 'The space perfectly reflects our brand identity. World class.' },
    ];

    const modal = document.createElement('div');
    modal.id = 'all-projects-modal';
    modal.style.cssText = `
        position: fixed; inset: 0; z-index: 9999;
        background: rgba(15, 20, 30, 0.92);
        backdrop-filter: blur(6px);
        overflow-y: auto;
        padding: 40px 20px;
        animation: fadeIn 0.3s ease;
    `;

    modal.innerHTML = `
        <style>
            @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
            @keyframes slideUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
            .proj-card { animation: slideUp 0.4s ease both; }
        </style>
        <div style="max-width: 1100px; margin: 0 auto;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:32px;">
                <div>
                    <p style="color:#f59e0b; font-size:13px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:6px;">Our Portfolio</p>
                    <h2 style="color:white; font-size:32px; font-weight:800; font-family:'Playfair Display',serif;">All Projects</h2>
                </div>
                <button onclick="document.getElementById('all-projects-modal').remove()" 
                    style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:white; 
                           padding:10px 20px; border-radius:8px; cursor:pointer; font-size:14px; 
                           transition:background 0.2s; display:flex; align-items:center; gap:8px;"
                    onmouseover="this.style.background='rgba(255,255,255,0.2)'" 
                    onmouseout="this.style.background='rgba(255,255,255,0.1)'">
                    ✕ Close
                </button>
            </div>
            <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap:24px;">
                ${allProjects.map((p, i) => `
                <div class="proj-card" style="animation-delay:${i * 0.06}s; background:white; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.3);">
                    <div style="position:relative; height:200px; overflow:hidden;">
                        <img src="${p.image}" alt="${p.title}" style="width:100%; height:100%; object-fit:cover; transition:transform 0.5s ease;" 
                             onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'"
                             onerror="this.src='https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=640&h=360&fit=crop'">
                        <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(15,20,30,0.8) 0%, transparent 50%);"></div>
                        <span style="position:absolute; top:12px; left:12px; background:#f59e0b; color:white; font-size:11px; font-weight:700; padding:4px 10px; border-radius:20px; text-transform:uppercase; letter-spacing:0.05em;">
                            ${p.category}
                        </span>
                        <div style="position:absolute; bottom:12px; left:12px; right:12px;">
                            <div style="color:white; font-weight:700; font-size:16px; line-height:1.3;">${p.title}</div>
                            <div style="color:#fcd34d; font-size:12px; margin-top:3px;">📍 ${p.location}</div>
                        </div>
                    </div>
                    <div style="padding:16px;">
                        <p style="color:#6b7280; font-size:13px; font-style:italic; line-height:1.5; margin-bottom:12px;">"${p.review}"</p>
                        <div style="font-size:12px; color:#374151; font-weight:600; border-top:1px solid #f3f4f6; padding-top:10px;">— ${p.reviewer}</div>
                    </div>
                </div>`).join('')}
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    // Close on Escape
    const escHandler = (e) => { if (e.key === 'Escape') { modal.remove(); document.removeEventListener('keydown', escHandler); } };
    document.addEventListener('keydown', escHandler);
}

// ─── LEGAL MODAL (Privacy Policy & Terms) ────────────────────────────────────
const legalContent = {
    privacy: {
        title: 'Privacy Policy',
        updated: 'March 2026',
        body: `
            <h3>1. Introduction</h3>
            <p>Trubeg Construction & Consultancy ("Trubeg", "we", "our", or "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage our services.</p>

            <h3>2. Information We Collect</h3>
            <p><strong>Personal Information:</strong> When you book a consultation or contact us, we collect your name, email address, phone number, and project details you voluntarily provide.</p>
            <p><strong>Usage Data:</strong> We automatically collect information about how you interact with our website, including IP address, browser type, pages visited, and time spent on pages.</p>
            <p><strong>Communication Data:</strong> Records of correspondence when you contact us via email, phone, or our chat widget.</p>

            <h3>3. How We Use Your Information</h3>
            <p>We use the information we collect to:</p>
            <ul>
                <li>Process and respond to consultation bookings and enquiries</li>
                <li>Send you project updates, invoices, and relevant communications</li>
                <li>Improve our website, services, and customer experience</li>
                <li>Comply with legal and regulatory obligations</li>
                <li>Send occasional marketing materials (only with your consent)</li>
            </ul>

            <h3>4. Data Sharing</h3>
            <p>We do <strong>not</strong> sell, trade, or rent your personal information to third parties. We may share data with:</p>
            <ul>
                <li>Trusted service providers who assist our operations (e.g., email platforms, accounting software) under strict confidentiality agreements</li>
                <li>Regulatory or law enforcement bodies when legally required</li>
                <li>Professional advisors such as lawyers and auditors</li>
            </ul>

            <h3>5. Data Retention</h3>
            <p>We retain your personal data for as long as necessary to fulfil the purposes for which it was collected, and as required by Kenyan law. Project records are typically retained for 7 years after project completion.</p>

            <h3>6. Your Rights</h3>
            <p>You have the right to:</p>
            <ul>
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data (subject to legal retention requirements)</li>
                <li>Withdraw consent to marketing communications at any time</li>
                <li>Lodge a complaint with the relevant data protection authority</li>
            </ul>

            <h3>7. Cookies</h3>
            <p>Our website uses essential cookies to function correctly. We do not use tracking or advertising cookies. You can disable cookies in your browser settings, though this may affect website functionality.</p>

            <h3>8. Security</h3>
            <p>We implement industry-standard security measures including SSL encryption, secure servers, and access controls to protect your information. However, no method of transmission over the internet is 100% secure.</p>

            <h3>9. Third-Party Links</h3>
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.</p>

            <h3>10. Changes to This Policy</h3>
            <p>We may update this policy periodically. The "Last Updated" date at the top will reflect any changes. Continued use of our website after changes constitutes acceptance of the updated policy.</p>

            <h3>11. Contact Us</h3>
            <p>For any privacy-related questions or requests, please contact us at:<br>
            📧 <a href="mailto:consult@trubeg.org">consult@trubeg.org</a><br>
            📍 Anniversary Towers, 14th Floor, Nairobi, Kenya<br>
            📞 +254 757-056-893</p>
        `
    },
    terms: {
        title: 'Terms & Conditions',
        updated: 'March 2026',
        body: `
            <h3>1. Acceptance of Terms</h3>
            <p>By accessing the Trubeg website or engaging our construction and consultancy services, you agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use of our services and website.</p>

            <h3>2. Services</h3>
            <p>Trubeg provides construction, project consultancy, renovation, and related professional services. The specific scope, timeline, deliverables, and fees for each engagement are defined in a separate written Service Agreement signed by both parties.</p>

            <h3>3. Consultations</h3>
            <p>Initial consultations (45 minutes) are offered free of charge. Subsequent consultations and all project-related services are subject to fees outlined in your Service Agreement. Trubeg reserves the right to cancel or reschedule consultations with reasonable notice.</p>

            <h3>4. Quotations & Pricing</h3>
            <p>All quotations are valid for 30 days from the date of issue unless otherwise stated. Prices are subject to change based on material costs, site conditions, or scope modifications. Agreed pricing is binding only when confirmed in a signed Service Agreement.</p>

            <h3>5. Payment Terms</h3>
            <p>Payment schedules are defined in individual Service Agreements. Standard terms include an upfront deposit (typically 30%), milestone payments during construction, and a final payment upon practical completion. Late payments may incur interest at 2% per month.</p>

            <h3>6. Client Responsibilities</h3>
            <p>Clients are responsible for:</p>
            <ul>
                <li>Providing accurate site information, legal documentation, and timely approvals</li>
                <li>Ensuring site access for Trubeg personnel and subcontractors</li>
                <li>Obtaining any required planning permissions or approvals before work commences</li>
                <li>Timely decision-making to avoid project delays</li>
            </ul>

            <h3>7. Intellectual Property</h3>
            <p>All architectural drawings, engineering designs, project plans, and reports prepared by Trubeg remain our intellectual property until full payment is received, at which point ownership transfers to the client as agreed in the Service Agreement.</p>

            <h3>8. Warranties & Defects Liability</h3>
            <p>Trubeg provides a 12-month defects liability period from practical completion for workmanship defects. Structural warranties are provided as specified in individual Service Agreements. Warranties do not cover damage resulting from misuse, modifications by third parties, or natural disasters.</p>

            <h3>9. Limitation of Liability</h3>
            <p>Trubeg's total liability for any claim arising from our services shall not exceed the total fees paid for the relevant project. We are not liable for indirect, consequential, or incidental losses including loss of profit, revenue, or business opportunity.</p>

            <h3>10. Force Majeure</h3>
            <p>Trubeg shall not be held liable for delays or failures caused by circumstances beyond our reasonable control, including acts of God, government restrictions, material shortages, or labour disputes. We will notify you promptly of any such events.</p>

            <h3>11. Dispute Resolution</h3>
            <p>Any disputes arising from our services shall be resolved through good-faith negotiation first. If unresolved within 30 days, disputes shall be referred to mediation under the Nairobi Centre for International Arbitration rules. Kenyan law governs these Terms.</p>

            <h3>12. Termination</h3>
            <p>Either party may terminate a Service Agreement with 14 days written notice. Upon termination, the client shall pay for all work completed to date. Trubeg reserves the right to immediately suspend services in cases of non-payment or breach of agreement.</p>

            <h3>13. Website Use</h3>
            <p>Content on this website is for informational purposes only. You may not reproduce, distribute, or use our content without written permission. We reserve the right to modify or discontinue any part of the website without notice.</p>

            <h3>14. Changes to Terms</h3>
            <p>We reserve the right to update these Terms at any time. Updated terms are effective upon posting to the website. Continued use of our services constitutes acceptance.</p>

            <h3>15. Contact</h3>
            <p>For any questions regarding these Terms:<br>
            📧 <a href="mailto:consult@trubeg.org">consult@trubeg.org</a><br>
            📍 Anniversary Towers, 14th Floor, Nairobi, Kenya<br>
            📞 +254 757-056-893</p>
        `
    }
};

function showLegalModal(type) {
    document.getElementById('legal-modal')?.remove();

    const content = legalContent[type];
    if (!content) return;

    const modal = document.createElement('div');
    modal.id = 'legal-modal';
    modal.style.cssText = `
        position: fixed; inset: 0; z-index: 9999;
        background: rgba(10, 15, 25, 0.88);
        backdrop-filter: blur(6px);
        overflow-y: auto;
        padding: 40px 20px;
        animation: fadeInLegal 0.3s ease;
    `;

    modal.innerHTML = `
        <style>
            @keyframes fadeInLegal { from { opacity:0 } to { opacity:1 } }
            #legal-body h3 { font-size:16px; font-weight:700; color:#1e293b; margin:24px 0 8px; }
            #legal-body p  { color:#4b5563; font-size:14px; line-height:1.75; margin-bottom:10px; }
            #legal-body ul { color:#4b5563; font-size:14px; line-height:1.75; margin:0 0 10px 20px; list-style:disc; }
            #legal-body a  { color:#b45309; text-decoration:underline; }
        </style>
        <div style="max-width:760px; margin:0 auto; background:white; border-radius:16px; overflow:hidden; box-shadow:0 30px 80px rgba(0,0,0,0.4);">
            <!-- Header -->
            <div style="background:linear-gradient(135deg,#1e293b 0%,#0f172a 100%); padding:28px 32px; display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <p style="color:#f59e0b; font-size:12px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:4px;">Trubeg Legal</p>
                    <h2 style="color:white; font-size:26px; font-weight:800; font-family:'Playfair Display',serif; margin:0;">${content.title}</h2>
                    <p style="color:rgba(255,255,255,0.5); font-size:12px; margin-top:6px;">Last updated: ${content.updated}</p>
                </div>
                <button onclick="document.getElementById('legal-modal').remove()"
                    style="background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.2); color:white; 
                           width:38px; height:38px; border-radius:8px; cursor:pointer; font-size:18px; 
                           display:flex; align-items:center; justify-content:center; flex-shrink:0;"
                    onmouseover="this.style.background='rgba(255,255,255,0.22)'" 
                    onmouseout="this.style.background='rgba(255,255,255,0.12)'">✕</button>
            </div>
            <!-- Body -->
            <div id="legal-body" style="padding:32px; max-height:65vh; overflow-y:auto;">
                ${content.body}
            </div>
            <!-- Footer -->
            <div style="padding:20px 32px; background:#f8fafc; border-top:1px solid #e5e7eb; display:flex; justify-content:flex-end;">
                <button onclick="document.getElementById('legal-modal').remove()"
                    style="padding:10px 28px; background:#1e293b; color:white; border:none; border-radius:8px; cursor:pointer; font-size:14px; font-weight:600;">
                    Close
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    const esc = (e) => { if (e.key === 'Escape') { modal.remove(); document.removeEventListener('keydown', esc); } };
    document.addEventListener('keydown', esc);
}

// ─── TOAST NOTIFICATION ───────────────────────────────────────────────────────
function showToast(message, type = 'success') {
    document.getElementById('toast-container')?.remove();

    const container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = `
        position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
        z-index: 99999; animation: toastIn 0.4s cubic-bezier(0.34,1.56,0.64,1);
    `;

    const colors = type === 'success'
        ? 'background:#065f46; border-left:4px solid #10b981;'
        : 'background:#7f1d1d; border-left:4px solid #ef4444;';

    container.innerHTML = `
        <style>@keyframes toastIn { from { opacity:0; transform:translateX(-50%) translateY(16px) } to { opacity:1; transform:translateX(-50%) translateY(0) } }</style>
        <div style="${colors} color:white; padding:14px 22px; border-radius:10px; font-size:14px; 
                    max-width:480px; box-shadow:0 8px 32px rgba(0,0,0,0.3); line-height:1.5;">
            ${message}
        </div>
    `;

    document.body.appendChild(container);
    setTimeout(() => container.remove(), 5000);
}