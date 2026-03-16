class TrubergNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav id="main-nav" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4">
                <div class="container mx-auto px-6 flex items-center justify-between">
                    <a href="#home" class="text-2xl font-display font-bold text-white tracking-wide hover:text-amber-400 transition-colors">
                        Trubeg
                    </a>

                    <!-- Desktop Links -->
                    <div class="hidden md:flex items-center gap-8">
                        <a href="#about"        class="nav-link text-white/80 hover:text-white text-sm font-medium transition-colors">About</a>
                        <a href="#services"     class="nav-link text-white/80 hover:text-white text-sm font-medium transition-colors">Services</a>
                        <a href="#projects"     class="nav-link text-white/80 hover:text-white text-sm font-medium transition-colors">Projects</a>
                        <a href="#contact"      class="nav-link text-white/80 hover:text-white text-sm font-medium transition-colors">Contact</a>
                        <a href="#consultation" class="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:-translate-y-0.5">
                            Book Now
                        </a>
                    </div>

                    <!-- Mobile menu button -->
                    <button id="mobile-menu-btn" class="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors" aria-label="Menu">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                    </button>
                </div>

                <!-- Mobile Menu -->
                <div id="mobile-menu" class="md:hidden hidden bg-slate-900/98 backdrop-blur-sm border-t border-white/10 mt-4">
                    <div class="container mx-auto px-6 py-4 flex flex-col gap-3">
                        <a href="#about"        class="text-white/80 hover:text-amber-400 py-2 text-sm font-medium transition-colors" onclick="document.getElementById('mobile-menu').classList.add('hidden')">About</a>
                        <a href="#services"     class="text-white/80 hover:text-amber-400 py-2 text-sm font-medium transition-colors" onclick="document.getElementById('mobile-menu').classList.add('hidden')">Services</a>
                        <a href="#projects"     class="text-white/80 hover:text-amber-400 py-2 text-sm font-medium transition-colors" onclick="document.getElementById('mobile-menu').classList.add('hidden')">Projects</a>
                        <a href="#contact"      class="text-white/80 hover:text-amber-400 py-2 text-sm font-medium transition-colors" onclick="document.getElementById('mobile-menu').classList.add('hidden')">Contact</a>
                        <a href="#consultation" class="mt-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-lg text-center transition-colors" onclick="document.getElementById('mobile-menu').classList.add('hidden')">Book Now</a>
                    </div>
                </div>
            </nav>
        `;

        // Scroll behaviour — darken on scroll
        const nav = document.getElementById('main-nav');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                nav.classList.add('bg-slate-900/97', 'backdrop-blur-md', 'shadow-lg', 'py-3');
                nav.classList.remove('py-4');
            } else {
                nav.classList.remove('bg-slate-900/97', 'backdrop-blur-md', 'shadow-lg', 'py-3');
                nav.classList.add('py-4');
            }
        });

        // Mobile menu toggle
        document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
            document.getElementById('mobile-menu')?.classList.toggle('hidden');
        });
    }
}

customElements.define('truberg-navbar', TrubergNavbar);