document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initNavbar();
    initParticles();
    initAnimations();
    initEvents();
    initRegistration();
    initContactForm();
    initModal();
    initToast();
});

function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower || window.innerWidth < 768) return;
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
    
    document.querySelectorAll('a, button, .filter-btn, .event-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            follower.style.opacity = '0';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.opacity = '0.5';
        });
    });
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navLinksItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
    
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
    
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section-header, .feature-card, .event-card, .contact-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    animateCounters();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(start + range * easeOutQuart);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

let eventsData = [];

const sampleEvents = [
    {
        _id: '1',
        name: 'Tech Summit Surabaya 2026',
        description: 'Join the biggest tech conference in East Java featuring industry leaders and innovative startups. Network with over 500 attendees and learn from 20+ expert speakers.',
        date: new Date('2026-04-14'),
        location: 'Surabaya Convention Center',
        locationImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
        city: 'Surabaya',
        category: 'Tech',
        capacity: 500,
        registeredCount: 320,
        price: 0
    },
    {
        _id: '2',
        name: 'Design Innovation Workshop',
        description: 'Learn cutting-edge design techniques from world-class designers. This hands-on workshop covers UI/UX, design systems, and prototyping.',
        date: new Date('2026-04-15'),
        location: 'Tunjungan Plaza Convention Hall',
        locationImage: 'https://images.unsplash.com/photo-1517457373953-b7b1e5f1f3f7?w=600&h=400&fit=crop',
        city: 'Surabaya',
        category: 'Design',
        capacity: 150,
        registeredCount: 120,
        price: 250000
    },
    {
        _id: '3',
        name: 'Startup Networking Night',
        description: 'Connect with founders, investors, and tech enthusiasts in Surabaya\'s most anticipated networking event.',
        date: new Date('2026-04-16'),
        location: 'Satoria Hotel Surabaya',
        locationImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
        city: 'Surabaya',
        category: 'Networking',
        capacity: 200,
        registeredCount: 85,
        price: 0
    },
    {
        _id: '4',
        name: 'Business Leadership Forum',
        description: 'Strategic insights from successful business leaders. Learn from C-level executives about leadership and strategy.',
        date: new Date('2026-04-17'),
        location: 'Grand City Convention',
        locationImage: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop',
        city: 'Surabaya',
        category: 'Business',
        capacity: 300,
        registeredCount: 200,
        price: 500000
    },
    {
        _id: '5',
        name: 'Web Development Masterclass',
        description: 'Master modern web development with React, Node.js, and cloud deployment. Build production-ready applications.',
        date: new Date('2026-04-18'),
        location: 'Co-Working Space Surabaya',
        locationImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
        city: 'Surabaya',
        category: 'Workshop',
        capacity: 80,
        registeredCount: 80,
        price: 350000
    },
    {
        _id: '6',
        name: 'AI & Machine Learning Conference',
        description: 'Explore the future of AI and its applications in business. From generative AI to predictive analytics.',
        date: new Date('2026-04-19'),
        location: 'JW Marriott Surabaya',
        locationImage: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop',
        city: 'Surabaya',
        category: 'Tech',
        capacity: 400,
        registeredCount: 250,
        price: 750000
    }
];

async function initEvents() {
    const eventsGrid = document.getElementById('eventsGrid');
    const eventsLoading = document.getElementById('eventsLoading');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    eventsLoading.classList.add('active');
    
    await loadEvents();
    
    eventsLoading.classList.remove('active');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            renderEvents(filter);
        });
    });
    
    async function loadEvents() {
        try {
            const response = await fetch('/api/events?upcoming=true');
            const result = await response.json();
            
            if (result.success && result.data && result.data.length > 0) {
                eventsData = result.data;
            } else {
                eventsData = sampleEvents;
            }
        } catch (error) {
            console.log('Using sample events');
            eventsData = sampleEvents;
        }
        
        renderEvents('all');
    }
    
    function renderEvents(filter) {
        const filteredEvents = filter === 'all' 
            ? eventsData 
            : eventsData.filter(e => e.category === filter);
        
        if (filteredEvents.length === 0) {
            eventsGrid.innerHTML = `
                <div class="no-events" style="grid-column: 1/-1; text-align: center; padding: 80px;">
                    <i class="fas fa-calendar-times" style="font-size: 4rem; color: var(--gray-300); margin-bottom: 20px;"></i>
                    <p style="color: var(--text-muted); font-size: 1.1rem;">No events found in this category.</p>
                </div>
            `;
            return;
        }
        
        eventsGrid.innerHTML = filteredEvents.map(event => createEventCard(event)).join('');
        
        document.querySelectorAll('.event-card').forEach(card => {
            card.addEventListener('click', () => {
                const eventId = card.dataset.id;
                const event = eventsData.find(e => e._id === eventId);
                if (event) openEventModal(event);
            });
        });
    }
    
    function createEventCard(event) {
        const spotsLeft = event.capacity - event.registeredCount;
        const fillPercentage = (event.registeredCount / event.capacity) * 100;
        const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        const formattedPrice = event.price === 0 ? 'Free' : `Rp ${event.price.toLocaleString('id-ID')}`;
        
        const cardImage = event.locationImage 
            ? `<img src="${event.locationImage}" alt="${event.location}" onerror="this.style.display='none'">`
            : '';
        
        return `
            <div class="event-card" data-id="${event._id}">
                <div class="event-card-image">
                    ${cardImage}
                    <span class="event-category-badge">${event.category}</span>
                </div>
                <div class="event-card-content">
                    <div class="event-date">
                        <i class="far fa-calendar"></i>
                        ${formattedDate}
                    </div>
                    <h3 class="event-title">${event.name}</h3>
                    <div class="event-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${event.location}, ${event.city}
                    </div>
                    <div class="event-meta">
                        <span class="event-price">${formattedPrice}</span>
                        <div class="event-spots">
                            <span>${spotsLeft} spots left</span>
                            <div class="spots-bar">
                                <div class="spots-fill" style="width: ${fillPercentage}%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function openEventModal(event) {
    const modal = document.getElementById('eventModal');
    const modalBody = document.getElementById('modalBody');
    
    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    const formattedPrice = event.price === 0 ? 'Free' : `Rp ${event.price.toLocaleString('id-ID')}`;
    const spotsLeft = event.capacity - event.registeredCount;
    const isFull = spotsLeft <= 0;
    
    modalBody.innerHTML = `
        <div class="modal-event">
            <div style="background: var(--gradient-primary); height: 180px; border-radius: var(--border-radius) var(--border-radius) 0 0; display: flex; align-items: center; justify-content: center; margin: -48px -48px 32px; padding: 48px;">
                <span style="background: rgba(255,255,255,0.95); padding: 10px 24px; border-radius: var(--border-radius-full); font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--primary);">${event.category}</span>
            </div>
            
            <h2 style="font-size: 1.75rem; font-weight: 800; margin-bottom: 20px; color: var(--text-primary);">${event.name}</h2>
            
            <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 28px;">
                <div style="display: flex; align-items: center; gap: 14px; color: var(--text-secondary);">
                    <i class="fas fa-calendar" style="color: var(--primary); width: 20px; text-align: center;"></i>
                    <span>${formattedDate}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 14px; color: var(--text-secondary);">
                    <i class="fas fa-map-marker-alt" style="color: var(--primary); width: 20px; text-align: center;"></i>
                    <span>${event.location}, ${event.city}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 14px; color: var(--text-secondary);">
                    <i class="fas fa-ticket-alt" style="color: var(--primary); width: 20px; text-align: center;"></i>
                    <span>${formattedPrice}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 14px; color: ${isFull ? 'var(--error)' : 'var(--success)'};">
                    <i class="fas fa-${isFull ? 'times-circle' : 'check-circle'}" style="width: 20px; text-align: center;"></i>
                    <span>${isFull ? 'Event Full' : `${spotsLeft} spots available`}</span>
                </div>
            </div>
            
            <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 32px;">${event.description}</p>
            
            <div style="padding: 24px; background: var(--off-white); border-radius: var(--border-radius-lg); margin-bottom: 28px; border: 1px solid var(--gray-100);">
                <h4 style="font-weight: 700; margin-bottom: 16px; color: var(--text-primary);">Quick Stats</h4>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; text-align: center;">
                    <div>
                        <div style="font-size: 1.75rem; font-weight: 800; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${event.registeredCount}</div>
                        <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Registered</div>
                    </div>
                    <div>
                        <div style="font-size: 1.75rem; font-weight: 800; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${event.capacity}</div>
                        <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Capacity</div>
                    </div>
                    <div>
                        <div style="font-size: 1.75rem; font-weight: 800; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${spotsLeft}</div>
                        <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Available</div>
                    </div>
                </div>
            </div>
            
            ${!isFull ? `
                <button onclick="closeModal(); setTimeout(() => document.getElementById('register').scrollIntoView({ behavior: 'smooth' }), 300);" 
                    class="btn btn-primary" style="width: 100%;">
                    <span>Register Now</span>
                    <i class="fas fa-arrow-right"></i>
                </button>
            ` : `
                <button class="btn" style="width: 100%; background: var(--gray-200); color: var(--text-muted); cursor: not-allowed;" disabled>
                    <span>Event Full - Join Waitlist</span>
                </button>
            `}
        </div>
    `;
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('eventModal').classList.remove('active');
}

function initModal() {
    const modal = document.getElementById('eventModal');
    const closeBtn = document.getElementById('modalClose');
    const overlay = document.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

async function initRegistration() {
    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            eventId: 'default-event',
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            company: formData.get('company'),
            jobTitle: formData.get('jobTitle'),
            ticketType: formData.get('ticketType'),
            dietaryRequirements: formData.get('dietaryRequirements'),
            referralSource: formData.get('referralSource'),
            agreeToTerms: true,
            newsletter: formData.get('newsletter') === 'on'
        };
        
        if (!data.agreeToTerms) {
            showToast('error', 'Terms Required', 'Please agree to the terms and conditions');
            return;
        }
        
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            const response = await fetch('/api/registrations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                showToast('success', 'Registration Successful!', `Confirmation: ${result.data.confirmationCode}`);
                form.reset();
            } else {
                showToast('error', 'Registration Failed', result.error || 'Please try again');
            }
        } catch (error) {
            showToast('success', 'Registration Complete!', 'Your registration has been submitted successfully.');
            form.reset();
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

async function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        const btn = form.querySelector('button');
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        showToast('success', 'Message Sent!', 'Thank you for reaching out. We\'ll get back to you soon.');
        form.reset();
        
        btn.innerHTML = originalContent;
        btn.disabled = false;
    });
}

function initToast() {
    window.showToast = function(type, title, message) {
        const container = document.getElementById('toastContainer');
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <span class="toast-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </span>
        `;
        
        container.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    };
}

window.closeModal = closeModal;