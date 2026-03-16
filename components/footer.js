class TrubergFooter extends HTMLElement {
    connectedCallback() {
        const year = new Date().getFullYear();
        this.innerHTML = `
            <footer class="bg-slate-900 text-gray-300 pt-16">
                <div class="container mx-auto px-6">
                    <div class="grid md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
                        <div>
                            <h3 class="text-2xl font-display font-bold text-white mb-4">Trubeg</h3>
                            <p class="text-sm text-gray-400 leading-relaxed max-w-sm">
                                Premium construction & consultancy solutions built on trust,
                                engineering excellence, and long-term value.
                            </p>
                        </div>
                        <div>
                            <h4 class="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Legal</h4>
                            <ul class="space-y-3 text-sm">
                                <li>
                                    <!-- FIX: anchor links to in-page modals, not server routes -->
                                    <a href="#" onclick="showLegalModal('terms'); return false;" 
                                       class="hover:text-amber-400 transition-colors cursor-pointer">
                                        Terms &amp; Conditions
                                    </a>
                                </li>
                                <li>
                                    <a href="#" onclick="showLegalModal('privacy'); return false;" 
                                       class="hover:text-amber-400 transition-colors cursor-pointer">
                                        Privacy Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Connect</h4>
                            <div class="flex gap-4">
                                <a href="https://instagram.com" target="_blank" aria-label="Instagram"
                                   class="hover:text-amber-400 transition-colors transform hover:scale-110">
                                    <i data-feather="instagram"></i>
                                </a>
                                <a href="https://wa.me/254748675161" target="_blank" aria-label="WhatsApp"
                                   class="hover:text-amber-400 transition-colors transform hover:scale-110">
                                    <i data-feather="message-circle"></i>
                                </a>
                                <a href="https://x.com" target="_blank" aria-label="X"
                                   class="hover:text-amber-400 transition-colors transform hover:scale-110">
                                    <i data-feather="twitter"></i>
                                </a>
                                <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn"
                                   class="hover:text-amber-400 transition-colors transform hover:scale-110">
                                    <i data-feather="linkedin"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row justify-between items-center py-6 text-sm text-gray-400">
                        <div class="font-semibold text-white">trubeg.org</div>
                        <div>© ${year} Trubeg. All rights reserved.</div>
                    </div>
                </div>
            </footer>
        `;

        // Re-run feather icons after render
        if (typeof feather !== 'undefined') feather.replace();
    }
}

customElements.define('truberg-footer', TrubergFooter);