document.addEventListener('DOMContentLoaded', () => {
    // --- 3D Tilt Effect for Visual Cards ---
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
});
