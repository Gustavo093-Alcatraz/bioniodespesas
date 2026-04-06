document.addEventListener('DOMContentLoaded', () => {
    // Parallax Mouse Effect for Hero
    const cards = document.querySelectorAll('.orbit-card');
    
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;

        cards.forEach((card, index) => {
            const depth = (index + 1) * 0.5;
            card.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0) rotate(var(--rot))`;
        });
    });

    // Scroll Parallax for Background Spheres
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const sphere1 = document.querySelector('.sphere-1');
        const sphere2 = document.querySelector('.sphere-2');
        
        if (sphere1) sphere1.style.transform = `translateY(${scrolled * 0.2}px)`;
        if (sphere2) sphere2.style.transform = `translateY(-${scrolled * 0.1}px)`;
    });

    // Scroll Reveal for Phone Mockup
    const phone = document.getElementById('phone');
    if (phone) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'scale(1)';
                }
            });
        }, { threshold: 0.2 });
        observer.observe(phone);
    }
});
