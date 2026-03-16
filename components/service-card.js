class TrubergService extends HTMLElement {
    static get observedAttributes() {
        return ['icon', 'title', 'description', 'features'];
    }

    connectedCallback() { this.render(); }
    attributeChangedCallback() { this.render(); }

    getIcon(name) {
        const icons = {
            'clipboard': `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>`,
            'hard-hat': `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a8 8 0 0 1 16 0v3"/></svg>`,
            'home': `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
            'refresh-cw': `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
            'droplet': `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
            'shield': `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
        };
        return icons[name] || icons['clipboard'];
    }

    render() {
        const icon        = this.getAttribute('icon') || 'clipboard';
        const title       = this.getAttribute('title') || 'Service';
        const description = this.getAttribute('description') || '';
        const features    = (this.getAttribute('features') || '').split(',').map(f => f.trim()).filter(Boolean);

        this.innerHTML = `
            <div class="group relative bg-white rounded-xl p-8 shadow-sm hover:shadow-xl 
                 transition-all duration-400 border border-stone-100 hover:border-amber-200 
                 hover:-translate-y-1 overflow-hidden">

                <!-- warm accent bar on hover -->
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-400 
                     scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left rounded-t-xl"></div>

                <div class="inline-flex items-center justify-center w-14 h-14 rounded-xl 
                     bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white 
                     transition-all duration-300 mb-6">
                    ${this.getIcon(icon)}
                </div>

                <h3 class="text-xl font-bold text-slate-800 mb-3 group-hover:text-amber-700 transition-colors duration-300">
                    ${title}
                </h3>

                <p class="text-stone-500 text-sm leading-relaxed mb-6">${description}</p>

                ${features.length ? `
                <ul class="space-y-2">
                    ${features.map(f => `
                    <li class="flex items-center gap-2 text-sm text-stone-600">
                        <span class="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></span>
                        ${f}
                    </li>`).join('')}
                </ul>` : ''}
            </div>
        `;
    }
}

customElements.define('truberg-service', TrubergService);