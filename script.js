document.addEventListener('DOMContentLoaded', function() {
    // Redirect handling for 2 hours persistence
    const redirectUrl = "https://direct-link.net/1334293/d3f4ult-hub-key-system";
    const redirectDelay = 7200000; // 2 hours in milliseconds
    
    // Check if this is the first visit or returning
    if (!localStorage.getItem('firstVisitTime')) {
        // First visit, set the timestamp
        localStorage.setItem('firstVisitTime', Date.now().toString());
    }
    
    // Calculate time elapsed since first visit
    const firstVisit = parseInt(localStorage.getItem('firstVisitTime'));
    const timeElapsed = Date.now() - firstVisit;
    
    if (timeElapsed >= redirectDelay) {
        // 2 hours have passed, redirect immediately
        window.location.href = redirectUrl;
    } else {
        // Set timeout for remaining time
        const remainingTime = redirectDelay - timeElapsed;
        setTimeout(function() {
            window.location.href = redirectUrl;
        }, remainingTime);
    }
    
    // Elements
    const revealBtn = document.getElementById('revealBtn');
    const keyContainer = document.getElementById('keyContainer');
    const countdown = document.getElementById('countdown');
    const keyDisplay = document.getElementById('keyDisplay');
    const copyBtn = document.getElementById('copyBtn');
    const successMessage = document.getElementById('successMessage');
    const backgroundAnimation = document.querySelector('.background-animation');
    const warningOverlay = document.getElementById('warningOverlay');
    const closeWarningBtn = document.getElementById('closeWarning');
    
    // Check if page was accessed directly
    function checkAccess() {
        // Get the referrer (the page that linked to this page)
        const referrer = document.referrer;
        
        // Check if the referrer is from Linkvertise
        // Replace 'linkvertise.com' with your actual Linkvertise domain
        if (!referrer.includes('linkvertise.com')) {
            // Show warning overlay
            warningOverlay.style.display = 'flex';
            // Disable all interactive elements
            disablePage();
        } else {
            // Hide warning overlay
            warningOverlay.style.display = 'none';
            // Enable all interactive elements
            enablePage();
        }
    }
    
    // Disable all interactive elements
    function disablePage() {
        revealBtn.disabled = true;
        copyBtn.disabled = true;
        document.querySelector('.container').style.opacity = '0.5';
        document.querySelector('.container').style.pointerEvents = 'none';
    }
    
    // Enable all interactive elements
    function enablePage() {
        revealBtn.disabled = false;
        copyBtn.disabled = false;
        document.querySelector('.container').style.opacity = '1';
        document.querySelector('.container').style.pointerEvents = 'auto';
    }
    
    // Close warning button functionality
    closeWarningBtn.addEventListener('click', function() {
        warningOverlay.style.display = 'none';
    });
    
    // Initialize access check
    checkAccess();
    
    // Create animated background circles
    createBackgroundCircles();
    
    // Button hover effect
    revealBtn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / this.offsetWidth) * 100;
        const y = ((e.clientY - rect.top) / this.offsetHeight) * 100;
        
        this.style.background = `radial-gradient(circle at ${x}% ${y}%, var(--accent) 0%, var(--primary) 50%, var(--primary-dark) 100%)`;
    });
    
    revealBtn.addEventListener('mouseleave', function() {
        this.style.background = 'linear-gradient(45deg, var(--primary), var(--primary-dark))';
    });
    
    // Reveal key with countdown
    revealBtn.addEventListener('click', function() {
        revealBtn.disabled = true;
        revealBtn.classList.remove('pulse');
        keyContainer.style.display = 'block';
        revealBtn.style.opacity = '0.5';
        
        // Add animation classes
        setTimeout(() => {
            keyContainer.classList.add('visible');
        }, 100);
        
        let seconds = 10;
        countdown.classList.add('countdown-animation');
        
        const timer = setInterval(function() {
            seconds--;
            countdown.textContent = seconds;
            
            // Add shake animation at specific points
            if(seconds <= 3) {
                countdown.style.color = 'var(--accent)';
                shakeElement(countdown);
            }
            
            if(seconds <= 0) {
                clearInterval(timer);
                countdown.style.display = 'none';
                keyDisplay.style.display = 'block';
                
                // Add confetti animation
                createConfetti();
            }
        }, 1000);
    });
    
    // Copy button functionality with animation
    copyBtn.addEventListener('click', function() {
        const keyText = document.querySelector('.key-text').textContent;
        navigator.clipboard.writeText(keyText).then(function() {
            successMessage.innerHTML = '<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg> Key copied to clipboard!';
            successMessage.classList.add('visible');
            
            // Flash effect on copy
            const keyValue = document.querySelector('.key-value');
            keyValue.style.backgroundColor = 'rgba(var(--success-rgb, 56, 176, 0), 0.15)';
            keyValue.style.borderColor = 'var(--success)';
            
            setTimeout(function() {
                keyValue.style.backgroundColor = 'var(--key-bg)';
                keyValue.style.borderColor = 'var(--light-border)';
            }, 300);
            
            setTimeout(function() {
                successMessage.classList.remove('visible');
            }, 3000);
        });
    });
    
    // Background animations
    function createBackgroundCircles() {
        // Clear existing background
        backgroundAnimation.innerHTML = '';
        
        // Create stars
        createStars();
        
        // Create shooting stars
        createShootingStars();
        
        // Create nebulae
        createNebulae();
    }
    
    // Create starry background
    function createStars() {
        const starCount = 200;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Random size between 1 and 3px
            const size = Math.random() * 2 + 1;
            
            // Position randomly
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random opacity
            const opacity = Math.random() * 0.5 + 0.3;
            const opacityMax = Math.min(opacity + 0.2, 1);
            
            // Random duration
            const duration = Math.random() * 5 + 3;
            
            // Apply styles
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${posX}%`;
            star.style.top = `${posY}%`;
            star.style.setProperty('--opacity', opacity);
            star.style.setProperty('--opacity-max', opacityMax);
            star.style.setProperty('--duration', `${duration}s`);
            
            // Add a subtle glow to brighter stars
            if (size > 2) {
                star.style.boxShadow = `0 0 ${size * 2}px rgba(255, 255, 255, 0.8)`;
            }
            
            backgroundAnimation.appendChild(star);
        }
    }
    
    // Create shooting stars
    function createShootingStars() {
        // Create multiple shooting stars with delays
        for (let i = 0; i < 15; i++) {
            const shootingStar = document.createElement('div');
            shootingStar.classList.add('shooting-star');
            
            // Random angle
            const angle = Math.random() * 20 - 10; // -10 to +10 degrees
            
            // Random position and timing
            const top = Math.random() * 70; // Top 70% of screen
            const delay = Math.random() * 15;
            const duration = Math.random() * 5 + 5; // 5-10 seconds
            
            // Apply styles
            shootingStar.style.setProperty('--angle', `${angle}deg`);
            shootingStar.style.setProperty('--top', `${top}%`);
            shootingStar.style.setProperty('--delay', `${delay}s`);
            shootingStar.style.setProperty('--duration', `${duration}s`);
            
            // Set length - longer tail for shooting stars
            shootingStar.style.width = `${Math.random() * 50 + 30}px`;
            
            backgroundAnimation.appendChild(shootingStar);
        }
    }
    
    // Create nebulae
    function createNebulae() {
        const colors = [
            'rgba(139, 92, 246, 0.5)',  // purple
            'rgba(217, 70, 239, 0.5)',  // pink
            'rgba(37, 99, 235, 0.5)',   // blue
            'rgba(16, 185, 129, 0.5)'   // green
        ];
        
        // Create a few nebula clouds
        for (let i = 0; i < 4; i++) {
            const nebula = document.createElement('div');
            nebula.classList.add('nebula');
            
            // Size and position
            const size = Math.random() * 400 + 300;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Movement parameters
            const translateX = (Math.random() - 0.5) * 20 + '%';
            const translateY = (Math.random() - 0.5) * 20 + '%';
            const scale = Math.random() * 0.5 + 0.8;
            
            // Opacity changes
            const opacityStart = Math.random() * 0.05 + 0.05;
            const opacityMid = Math.random() * 0.1 + 0.1;
            const opacityEnd = Math.random() * 0.05 + 0.05;
            
            // Apply styles
            nebula.style.width = `${size}px`;
            nebula.style.height = `${size}px`;
            nebula.style.left = `${posX}%`;
            nebula.style.top = `${posY}%`;
            nebula.style.setProperty('--color-center', colors[i % colors.length]);
            nebula.style.setProperty('--translate-x', translateX);
            nebula.style.setProperty('--translate-y', translateY);
            nebula.style.setProperty('--scale', scale.toString());
            nebula.style.setProperty('--opacity-start', opacityStart.toString());
            nebula.style.setProperty('--opacity-mid', opacityMid.toString());
            nebula.style.setProperty('--opacity-end', opacityEnd.toString());
            
            backgroundAnimation.appendChild(nebula);
        }
    }
    
    // Create floating particles (now used as distant galaxies)
    function createParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.classList.add('particle-container');
        particleContainer.style.position = 'fixed';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.pointerEvents = 'none';
        particleContainer.style.zIndex = '-1';
        
        document.body.appendChild(particleContainer);
        
        // Create particle styles
        const styleSheet = document.createElement('style');
        styleSheet.innerHTML = `
            .particle {
                position: absolute;
                width: 3px;
                height: 3px;
                background-color: rgba(255, 255, 255, 0.7);
                border-radius: 50%;
                pointer-events: none;
                box-shadow: 0 0 6px rgba(255, 255, 255, 0.6);
            }
            
            @keyframes floating {
                0% {
                    transform: translateY(0) translateX(0) scale(1);
                    opacity: 0;
                }
                50% {
                    opacity: var(--max-opacity);
                }
                100% {
                    transform: translateY(var(--move-y)) translateX(var(--move-x)) scale(var(--scale));
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styleSheet);
        
        // Create particles
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createDistantGalaxy(particleContainer);
            }, i * 300);
        }
        
        // Continuously create particles
        setInterval(() => {
            createDistantGalaxy(particleContainer);
        }, 2000);
    }
    
    function createDistantGalaxy(container) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 3 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.4 + 0.2;
        const duration = Math.random() * 20 + 20;
        const moveX = (Math.random() - 0.5) * 50;
        const moveY = (Math.random() - 0.5) * 50;
        const scale = Math.random() * 0.7 + 0.3;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.setProperty('--max-opacity', opacity);
        particle.style.setProperty('--move-x', `${moveX}px`);
        particle.style.setProperty('--move-y', `${moveY}px`);
        particle.style.setProperty('--scale', scale);
        particle.style.animation = `floating ${duration}s ease-in-out forwards`;
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    }
    
    // Confetti animation when key is revealed
    function createConfetti() {
        const colors = ['#7e22ce', '#ec4899', '#f59e0b', '#10b981'];
        
        for (let i = 0; i < 80; i++) {
            const confetti = document.createElement('div');
            const size = Math.random() * 10 + 5;
            
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.position = 'absolute';
            confetti.style.top = '0';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.opacity = Math.random() + 0.3;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            // Animation
            confetti.style.animation = `
                fall ${Math.random() * 3 + 4}s linear forwards,
                sway ${Math.random() * 3 + 4}s ease-in-out infinite alternate
            `;
            
            document.querySelector('.card').appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 8000);
        }
        
        // Add CSS for confetti animations if not exists
        if (!document.getElementById('confetti-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'confetti-styles';
            styleSheet.innerHTML = `
                @keyframes fall {
                    to {
                        top: 100%;
                        transform: translateY(0) rotate(${Math.random() * 1200}deg);
                    }
                }
                
                @keyframes sway {
                    from {
                        transform: translateX(-30px) rotate(${Math.random() * 360}deg);
                    }
                    to {
                        transform: translateX(30px) rotate(${Math.random() * 360}deg);
                    }
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }
    
    // Add shake animation to element
    function shakeElement(element) {
        element.classList.add('shake');
        setTimeout(() => {
            element.classList.remove('shake');
        }, 500);
        
        // Add CSS for shake animation if not exists
        if (!document.getElementById('shake-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'shake-styles';
            styleSheet.innerHTML = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
                
                .shake {
                    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }
    
    // Hover effect for key text
    document.querySelector('.key-text').addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
    
    document.querySelector('.key-text').addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
}); 