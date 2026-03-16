class TrubergChat extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
        this.messages = [];
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    z-index: 1000;
                    font-family: 'Inter', sans-serif;
                }

                .chat-container {
                    position: absolute;
                    bottom: 80px;
                    right: 0;
                    width: 380px;
                    max-width: calc(100vw - 48px);
                    background: #fff;
                    border-radius: 16px;
                    box-shadow: 0 25px 60px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.08);
                    overflow: hidden;
                    transform: scale(0.92) translateY(16px);
                    opacity: 0;
                    pointer-events: none;
                    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
                    border: 1px solid #f0ebe3;
                }

                .chat-container.open {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                    pointer-events: all;
                }

                .chat-header {
                    background: linear-gradient(135deg, #8B5E3C 0%, #6B4226 100%);
                    color: white;
                    padding: 18px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .header-left {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .avatar-group {
                    display: flex;
                }

                .avatar {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.25);
                    border: 2px solid rgba(255,255,255,0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    font-weight: 700;
                    color: white;
                }

                .header-info .name {
                    font-weight: 700;
                    font-size: 15px;
                    letter-spacing: 0.01em;
                }

                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 11px;
                    color: rgba(255,255,255,0.8);
                    margin-top: 2px;
                }

                .status-dot {
                    width: 7px;
                    height: 7px;
                    background: #4ade80;
                    border-radius: 50%;
                    position: relative;
                    flex-shrink: 0;
                }

                .status-dot::after {
                    content: '';
                    position: absolute;
                    inset: -2px;
                    border-radius: 50%;
                    background: #4ade80;
                    opacity: 0.4;
                    animation: pulse-dot 2s infinite;
                }

                @keyframes pulse-dot {
                    0% { transform: scale(1); opacity: 0.4; }
                    100% { transform: scale(2.2); opacity: 0; }
                }

                .close-btn {
                    background: rgba(255,255,255,0.15);
                    border: none;
                    color: white;
                    cursor: pointer;
                    padding: 6px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    transition: background 0.2s;
                }

                .close-btn:hover { background: rgba(255,255,255,0.25); }

                .chat-body {
                    height: 340px;
                    overflow-y: auto;
                    padding: 20px;
                    background: #faf8f5;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    scroll-behavior: smooth;
                }

                .chat-body::-webkit-scrollbar { width: 4px; }
                .chat-body::-webkit-scrollbar-track { background: transparent; }
                .chat-body::-webkit-scrollbar-thumb { background: #d4c4b0; border-radius: 4px; }

                .chat-footer {
                    padding: 14px 16px;
                    background: white;
                    border-top: 1px solid #f0ebe3;
                }

                .chat-button {
                    width: 58px;
                    height: 58px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #8B5E3C 0%, #C17A3A 100%);
                    color: white;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 8px 24px rgba(139, 94, 60, 0.45);
                    transition: all 0.3s ease;
                    position: relative;
                }

                .chat-button:hover {
                    transform: scale(1.08);
                    box-shadow: 0 12px 32px rgba(139, 94, 60, 0.55);
                }

                .chat-button.pulse::after {
                    content: '';
                    position: absolute;
                    inset: -5px;
                    border-radius: 50%;
                    border: 2px solid #C17A3A;
                    animation: ring-pulse 2.5s infinite;
                }

                @keyframes ring-pulse {
                    0% { transform: scale(1); opacity: 0.8; }
                    100% { transform: scale(1.45); opacity: 0; }
                }

                .message {
                    max-width: 82%;
                    padding: 11px 15px;
                    border-radius: 14px;
                    font-size: 13.5px;
                    line-height: 1.55;
                    animation: msgPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                @keyframes msgPop {
                    from { opacity: 0; transform: translateY(8px) scale(0.96); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }

                .message.incoming {
                    background: white;
                    border: 1px solid #ede8e0;
                    border-bottom-left-radius: 4px;
                    align-self: flex-start;
                    color: #2d2016;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
                }

                .message.outgoing {
                    background: linear-gradient(135deg, #8B5E3C, #C17A3A);
                    color: white;
                    border-bottom-right-radius: 4px;
                    align-self: flex-end;
                    box-shadow: 0 2px 8px rgba(139,94,60,0.3);
                }

                .message.system {
                    background: #f0ebe3;
                    color: #8B7355;
                    font-size: 12px;
                    text-align: center;
                    max-width: 100%;
                    padding: 7px 12px;
                    border-radius: 8px;
                    align-self: center;
                }

                .typing-indicator {
                    display: flex;
                    gap: 4px;
                    padding: 12px 16px;
                    background: white;
                    border: 1px solid #ede8e0;
                    border-radius: 14px;
                    border-bottom-left-radius: 4px;
                    align-self: flex-start;
                    width: fit-content;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
                }

                .typing-indicator span {
                    width: 7px;
                    height: 7px;
                    background: #C17A3A;
                    border-radius: 50%;
                    animation: typing 1.4s infinite ease-in-out both;
                }

                .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
                .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
                .typing-indicator span:nth-child(3) { animation-delay: 0s; }

                @keyframes typing {
                    0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
                    40% { transform: scale(1); opacity: 1; }
                }

                .quick-replies {
                    display: flex;
                    gap: 7px;
                    flex-wrap: wrap;
                    margin-bottom: 12px;
                }

                .quick-reply {
                    padding: 6px 13px;
                    background: #faf8f5;
                    border: 1.5px solid #e8ddd0;
                    border-radius: 20px;
                    font-size: 12px;
                    cursor: pointer;
                    transition: all 0.2s;
                    color: #6B4226;
                    font-weight: 500;
                }

                .quick-reply:hover {
                    background: #8B5E3C;
                    border-color: #8B5E3C;
                    color: white;
                    transform: translateY(-1px);
                }

                .input-group {
                    display: flex;
                    gap: 8px;
                    align-items: center;
                }

                input[type="text"] {
                    flex: 1;
                    padding: 10px 14px;
                    border: 1.5px solid #e8ddd0;
                    border-radius: 10px;
                    font-size: 13.5px;
                    outline: none;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    background: #faf8f5;
                    color: #2d2016;
                    font-family: 'Inter', sans-serif;
                }

                input[type="text"]::placeholder { color: #b8a898; }

                input[type="text"]:focus {
                    border-color: #8B5E3C;
                    box-shadow: 0 0 0 3px rgba(139, 94, 60, 0.1);
                    background: white;
                }

                .send-btn {
                    width: 40px;
                    height: 40px;
                    padding: 0;
                    background: linear-gradient(135deg, #8B5E3C, #C17A3A);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .send-btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 4px 12px rgba(139,94,60,0.4);
                }

                .unread-badge {
                    position: absolute;
                    top: -4px;
                    right: -4px;
                    background: #ef4444;
                    color: white;
                    font-size: 11px;
                    font-weight: 700;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    display: none;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid white;
                }

                .unread-badge.show { display: flex; }
            </style>

            <div class="chat-container" id="chat-window">
                <div class="chat-header">
                    <div class="header-left">
                        <div class="avatar-group">
                            <div class="avatar">T</div>
                        </div>
                        <div class="header-info">
                            <div class="name">Truberg Support</div>
                            <div class="status-badge">
                                <span class="status-dot"></span>
                                <span>We're online · typically reply in minutes</span>
                            </div>
                        </div>
                    </div>
                    <button class="close-btn" id="close-chat" aria-label="Close chat">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                </div>

                <div class="chat-body" id="chat-messages">
                    <div class="message system">👋 Welcome to Truberg</div>
                    <div class="message incoming">Hello! I'm here to help with any questions about our construction and consultancy services. What can I assist you with today?</div>
                </div>

                <div class="chat-footer">
                    <div class="quick-replies" id="quick-replies">
                        <button class="quick-reply" data-message="I'd like to get a quote">💰 Get a quote</button>
                        <button class="quick-reply" data-message="I want to book a consultation">📅 Book consultation</button>
                        <button class="quick-reply" data-message="I have a question about your services">🏗️ Our services</button>
                    </div>
                    <div class="input-group">
                        <input type="text" id="chat-input" placeholder="Type a message..." autocomplete="off">
                        <button class="send-btn" id="send-btn" aria-label="Send message">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                        </button>
                    </div>
                </div>
            </div>

            <button class="chat-button pulse" id="chat-toggle" aria-label="Open chat">
                <div class="unread-badge" id="unread-badge">1</div>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </button>
        `;
    }

    setupEventListeners() {
        const toggle    = this.shadowRoot.getElementById('chat-toggle');
        const closeBtn  = this.shadowRoot.getElementById('close-chat');
        const chatWin   = this.shadowRoot.getElementById('chat-window');
        const input     = this.shadowRoot.getElementById('chat-input');
        const sendBtn   = this.shadowRoot.getElementById('send-btn');
        const badge     = this.shadowRoot.getElementById('unread-badge');

        // Show unread badge after 3s to grab attention
        setTimeout(() => { badge.classList.add('show'); }, 3000);

        toggle.addEventListener('click', () => {
            this.isOpen = !this.isOpen;
            chatWin.classList.toggle('open', this.isOpen);
            toggle.classList.remove('pulse');
            badge.classList.remove('show');
            if (this.isOpen) setTimeout(() => input.focus(), 350);
        });

        closeBtn.addEventListener('click', () => {
            this.isOpen = false;
            chatWin.classList.remove('open');
        });

        const sendMessage = () => {
            const text = input.value.trim();
            if (!text) return;
            this.addMessage(text, 'outgoing');
            input.value = '';
            // Hide quick replies after first user message
            const qr = this.shadowRoot.getElementById('quick-replies');
            if (qr) qr.style.display = 'none';
            this.simulateResponse(text);
        };

        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });

        this.shadowRoot.querySelectorAll('.quick-reply').forEach(btn => {
            btn.addEventListener('click', () => {
                const text = btn.getAttribute('data-message');
                this.addMessage(text, 'outgoing');
                const qr = this.shadowRoot.getElementById('quick-replies');
                if (qr) qr.style.display = 'none';
                this.simulateResponse(text);
            });
        });
    }

    openChat() {
        this.isOpen = true;
        const chatWin = this.shadowRoot.getElementById('chat-window');
        const toggle  = this.shadowRoot.getElementById('chat-toggle');
        const badge   = this.shadowRoot.getElementById('unread-badge');
        chatWin.classList.add('open');
        toggle.classList.remove('pulse');
        badge.classList.remove('show');
        setTimeout(() => this.shadowRoot.getElementById('chat-input')?.focus(), 350);
    }

    addMessage(text, type) {
        const messages = this.shadowRoot.getElementById('chat-messages');
        const msgDiv   = document.createElement('div');
        msgDiv.className = `message ${type}`;
        msgDiv.textContent = text;
        messages.appendChild(msgDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    showTyping() {
        const messages = this.shadowRoot.getElementById('chat-messages');
        const typing   = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.id = 'typing';
        typing.innerHTML = '<span></span><span></span><span></span>';
        messages.appendChild(typing);
        messages.scrollTop = messages.scrollHeight;
    }

    hideTyping() {
        this.shadowRoot.getElementById('typing')?.remove();
    }

    simulateResponse(userText) {
        this.showTyping();

        const lower = userText.toLowerCase();
        let response = "Thank you for reaching out! A member of our team will get back to you shortly. For immediate assistance, call us at +254 748-675-161.";

        if (lower.includes('quote') || lower.includes('cost') || lower.includes('price') || lower.includes('how much')) {
            response = "We'd love to prepare a detailed quote for you! 📋 Please book a free consultation so our experts can understand your project scope. You can use the booking form on our website or call +254 748-675-161.";
        } else if (lower.includes('consultation') || lower.includes('book') || lower.includes('appointment') || lower.includes('schedule')) {
            response = "Great choice! 📅 Our free consultations are 45 minutes with a senior engineer. Head to the 'Book Consultation' section on this page, or call +254 748-675-161 to schedule directly.";
        } else if (lower.includes('service') || lower.includes('what do you') || lower.includes('offer')) {
            response = "We offer a full range of construction services: 🏗️ Commercial & residential construction, project consultancy, renovation & restoration, and sustainable building. Which area interests you most?";
        } else if (lower.includes('residential') || lower.includes('home') || lower.includes('house')) {
            response = "We build stunning custom homes and residential estates. 🏠 From architectural design to final handover, we handle everything. Would you like to schedule a free site assessment?";
        } else if (lower.includes('commercial') || lower.includes('office') || lower.includes('warehouse')) {
            response = "Our commercial division handles office complexes, retail spaces, warehouses, and industrial facilities. 🏢 We have completed 100+ commercial projects. Shall we arrange a consultation?";
        } else if (lower.includes('sustainable') || lower.includes('green') || lower.includes('eco') || lower.includes('leed')) {
            response = "Sustainability is central to everything we build. 🌿 We use green-certified materials, energy-efficient designs, and can guide you through LEED certification. Want to learn more?";
        } else if (lower.includes('location') || lower.includes('where') || lower.includes('address') || lower.includes('find you')) {
            response = "We're located at Anniversary Towers, 14th Floor, Nairobi CBD. 📍 Office hours: Mon–Fri 8AM–6PM, Sat 9AM–3PM. Feel free to drop by!";
        } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('good')) {
            response = "Hello! Welcome to Truberg 👋 We're Nairobi's trusted construction & consultancy firm. How can we help with your project today?";
        } else if (lower.includes('project status') || lower.includes('my project') || lower.includes('update')) {
            response = "For project status updates, please contact your assigned project manager directly, or email projects@truberg.org with your project reference number. 📊";
        } else if (lower.includes('thank')) {
            response = "You're very welcome! 😊 Don't hesitate to reach out anytime. We're here to make your construction journey smooth and successful.";
        }

        setTimeout(() => {
            this.hideTyping();
            this.addMessage(response, 'incoming');
        }, 1200 + Math.random() * 600);
    }
}

customElements.define('truberg-chat', TrubergChat);