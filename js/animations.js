document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // --- 3D Cards Hero Animation ---
        const frontCard = document.querySelector('.bionio-card-front');
        const backCard = document.querySelector('.bionio-card-back');
        const wrapper = document.querySelector('.bionio-cards-3d-wrapper');

        if (frontCard && backCard && wrapper) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    endTrigger: '#scrolly-title',
                    end: 'bottom top',
                    scrub: 1, 
                    pin: '.bionio-cards-3d-wrapper',
                    pinSpacing: false 
                }
            });

            tl.to(backCard, {
                x: 500, y: -130, z: -10,
                rotateX: 0, rotateY: 0, rotateZ: 0,
                scale: 1, duration: 1
            }, 0);

            tl.to(frontCard, {
                x: 90, y: 0, z: 0,
                rotateX: 0, rotateY: 0, rotateZ: 0,
                scale: 1, duration: 1
            }, 0);

            tl.to(wrapper, {
                opacity: 0, scale: 0.8, duration: 0.15
            }, 0.85);
        }

        // --- Horizontal Scroll Process ---
        const processTrack = document.querySelector('.process-track');
        if (processTrack) {
            const scrollTween = gsap.to(processTrack, {
                x: () => -(processTrack.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: ".process-wrapper",
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    end: () => "+=" + (processTrack.scrollWidth - window.innerWidth),
                    invalidateOnRefresh: true
                }
            });

            ScrollTrigger.create({
                trigger: ".glass-card",
                start: "left center",
                containerAnimation: scrollTween,
                onEnter: () => {
                    document.querySelectorAll('.block').forEach(b => b.classList.add('visible'));
                }
            });
        }

        // --- Counter Animation for Stats ---
        const stats = document.querySelectorAll('.stat-num');
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-val'));
            const suffix = stat.querySelector('span') ? stat.querySelector('span').innerText : '';
            const obj = { value: 0 };

            gsap.to(obj, {
                value: target,
                duration: 2,
                scrollTrigger: {
                    trigger: stat,
                    start: "top 80%",
                    once: true
                },
                onUpdate: function() {
                    // XSS mitigation: avoid innerHTML, use safe DOM manipulation
                    const spanEl = document.createElement('span');
                    spanEl.textContent = suffix;
                    stat.textContent = '';
                    stat.appendChild(document.createTextNode(Math.ceil(obj.value)));
                    stat.appendChild(spanEl);
                }
            });
        });

        /* 
        // --- CTA Section Animation Disabled for visibility ---
        gsap.from(".cta-wrapper > *", {
            scrollTrigger: {
                trigger: ".footer-cta",
                start: "top 70%",
            },
            y: 30, opacity: 0, duration: 1, stagger: 0.15, ease: "power2.out"
        });
        */
    }
});
