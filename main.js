// Parallax Mouse Effect for Hero
const orbit = document.getElementById('orbit');
const cards = document.querySelectorAll('.orbit-card');

window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;

    cards.forEach((card, index) => {
        const depth = (index + 1) * 0.5;
        card.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0) rotate(var(--rot))`;
    });
});

// Scroll Reveal Animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.id === 'phone') {
                entry.target.style.transform = 'scale(1.1) rotateX(5deg)';
            }
        }
    });
}, observerOptions);



const phone = document.getElementById('phone');
if (phone) {
    observer.observe(phone);
}

// Scroll Parallax for Spheres
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const sphere1 = document.querySelector('.sphere-1');
    const sphere2 = document.querySelector('.sphere-2');
    
    if (sphere1) sphere1.style.transform = `translateY(${scrolled * 0.2}px)`;
    if (sphere2) sphere2.style.transform = `translateY(-${scrolled * 0.1}px)`;

    if (phone) {
        const phonePos = phone.getBoundingClientRect().top;
        if (phonePos < 400) {
            phone.style.transform = `scale(1) rotateX(${Math.max(0, (400 - phonePos) / 10)}deg)`;
        }
    }
});


// --- GSAP Scrollytelling for 3D Cards ---
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const frontCard = document.querySelector('.bionio-card-front');
    const backCard = document.querySelector('.bionio-card-back');
    const wrapper = document.querySelector('.bionio-cards-3d-wrapper');

    if (frontCard && backCard && wrapper) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                endTrigger: '#scrolly-title',
                end: 'bottom top', // Unpins and ends animation when title hits the top of the screen
                scrub: 1, 
                pin: '.bionio-cards-3d-wrapper',
                pinSpacing: false 
            }
        });

        // 1. Join cards and flatten rotation
        tl.to(backCard, {
            x: 240,
            y: -245,
            z: -10, // Force behind definitively
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            duration: 1
        }, 0);

        tl.to(frontCard, {
            x: 0,
            y: 0,
            z: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            duration: 1
        }, 0);

        // 2. Fast fade out and scale down right before it finishes
        tl.to(wrapper, {
            opacity: 0,
            scale: 0.8,
            duration: 0.15
        }, 0.85); // Happens at the very end of the scroll
    }
}
// --- GSAP Horizontal Scroll for Process Section ---
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    const processTrack = document.querySelector('.process-track');
    const processWrapper = document.querySelector('.process-wrapper');

    if (processTrack && processWrapper) {
        let sections = gsap.utils.toArray(".process-step");

        gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".process-wrapper",
                pin: true,
                scrub: 1,
                snap: 1 / (sections.length - 1),
                start: "top top",
                end: () => "+=" + processTrack.offsetWidth,
                invalidateOnRefresh: true
            }
        });
    }

    // --- Counter Animation for Stats ---
    const stats = document.querySelectorAll('.stat-num');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-val'));
        gsap.to(stat, {
            scrollTrigger: {
                trigger: stat,
                start: "top 80%",
            },
            innerHTML: target,
            duration: 2,
            snap: { innerHTML: 1 },
            onUpdate: function() {
                const suffix = stat.querySelector('span') ? stat.querySelector('span').innerText : '';
                stat.innerHTML = Math.ceil(this.targets()[0].innerHTML) + `<span>${suffix}</span>`;
            }
        });
    });

    // --- Staggered Reveals for Mural Cards ---
    gsap.from(".mural-card", {
        scrollTrigger: {
            trigger: ".mural-section",
            start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    });

    // --- Special Reveal for Data Blocks in Process Step 2 ---
    ScrollTrigger.create({
        trigger: ".glass-card",
        start: "left center", // Triggered during horizontal scroll
        containerAnimation: gsap.to(".process-step", { xPercent: -100 * 2 }), // Reference the horizontal scroll
        onEnter: () => {
            document.querySelectorAll('.block').forEach(b => b.classList.add('visible'));
        }
    });
}


// --- Observe Process Steps for 3D Tilt Effect ---
const visualCards = document.querySelectorAll('.visual-card');
window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    visualCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;

        const angleX = (mouseY - cardY) / 30;
        const angleY = (cardX - mouseX) / 30;

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            card.style.transform = `rotateY(${angleY}deg) rotateX(${angleX}deg) scale(1.05)`;
        }
    });
});
