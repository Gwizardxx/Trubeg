class TrubergProject extends HTMLElement {
    static get observedAttributes() {
        return ['image', 'category', 'title', 'location', 'review', 'reviewer'];
    }

    connectedCallback() { this.render(); }
    attributeChangedCallback() { this.render(); }

    render() {
        const image    = this.getAttribute('image') || '';
        const category = this.getAttribute('category') || 'Project';
        const title    = this.getAttribute('title') || 'Untitled Project';
        const location = this.getAttribute('location') || '';
        const review   = this.getAttribute('review') || '';
        const reviewer = this.getAttribute('reviewer') || '';
        const initials = reviewer.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

        this.innerHTML = `
            <div class="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <div class="relative h-64 overflow-hidden">
                    <img src="${image}" alt="${title}" 
                         class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                         onerror="this.src='https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=640&h=360&fit=crop'">
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>

                    <div class="absolute top-4 left-4">
                        <span class="bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                            ${category}
                        </span>
                    </div>

                    <div class="absolute bottom-4 left-4 right-4">
                        <h3 class="text-white font-bold text-xl mb-1 leading-tight">${title}</h3>
                        <div class="flex items-center gap-1.5 text-amber-300 text-sm">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            <span>${location}</span>
                        </div>
                    </div>
                </div>

                <div class="p-6">
                    <div class="flex gap-0.5 mb-3">
                        ${Array(5).fill(0).map(() => `
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`).join('')}
                    </div>

                    <blockquote class="text-stone-500 text-sm italic mb-5 leading-relaxed line-clamp-3">"${review}"</blockquote>

                    <div class="flex items-center gap-3 pt-4 border-t border-stone-100">
                        <div class="w-9 h-9 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full 
                             flex items-center justify-center text-white font-bold text-xs shadow-sm flex-shrink-0">
                            ${initials}
                        </div>
                        <div>
                            <div class="font-semibold text-slate-800 text-sm">${reviewer}</div>
                            <div class="text-xs text-stone-400">Verified Client</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('truberg-project', TrubergProject);