document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const generateBtn = document.getElementById('generateBtn');
    const keyContainer = document.getElementById('keyContainer');
    const countdown = document.getElementById('countdown');
    const keyDisplay = document.getElementById('keyDisplay');
    const keyText = document.getElementById('keyText');
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
        generateBtn.disabled = true;
        copyBtn.disabled = true;
        document.querySelector('.container').style.opacity = '0.5';
        document.querySelector('.container').style.pointerEvents = 'none';
    }
    
    // Enable all interactive elements
    function enablePage() {
        generateBtn.disabled = false;
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
    
    // Create animated background elements
    createBackgroundElements();
    
    // Hide key display initially
    keyDisplay.style.display = 'none';
    keyContainer.style.display = 'none';
    
    // Button hover effect
    generateBtn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / this.offsetWidth) * 100;
        const y = ((e.clientY - rect.top) / this.offsetHeight) * 100;
        
        this.style.background = `radial-gradient(circle at ${x}% ${y}%, var(--accent) 0%, var(--primary) 50%, var(--primary-dark) 100%)`;
    });
    
    generateBtn.addEventListener('mouseleave', function() {
        this.style.background = 'linear-gradient(45deg, var(--primary), var(--primary-dark))';
    });
    
    // Generate key with countdown
    generateBtn.addEventListener('click', function() {
        generateBtn.disabled = true;
        generateBtn.classList.remove('pulse');
        keyContainer.style.display = 'block';
        generateBtn.style.opacity = '0.5';
        
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
                
                // Generate and display the key
                const key = generateRandomKey(30);
                keyText.textContent = key;
                
                // Add confetti animation
                createConfetti();
                
                // Enable copy button
                copyBtn.disabled = false;
            }
        }, 1000);
    });
    
    // Copy button functionality with animation
    copyBtn.addEventListener('click', function() {
        const keyString = keyText.textContent;
        navigator.clipboard.writeText(keyString).then(function() {
            successMessage.innerHTML = '<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg> Key copied to clipboard!';
            successMessage.classList.add('visible');
            
            // Flash effect on copy
            const keyValue = document.querySelector('.key-value');
            keyValue.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
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
    
    // Generate random alphanumeric key
    function generateRandomKey(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return result;
    }
    
    // Background animations
    function createBackgroundElements() {
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
            shootingStar.style.setProperty('--top', `${top}%`);
            shootingStar.style.setProperty('--angle', `${angle}deg`);
            shootingStar.style.setProperty('--delay', `${delay}s`);
            shootingStar.style.setProperty('--duration', `${duration}s`);
            
            backgroundAnimation.appendChild(shootingStar);
        }
    }
    
    // Create nebulae
    function createNebulae() {
        const colors = [
            'rgba(139, 92, 246, 0.05)', // Purple
            'rgba(236, 72, 153, 0.05)', // Pink
            'rgba(16, 185, 129, 0.05)', // Green
            'rgba(59, 130, 246, 0.05)'  // Blue
        ];
        
        for (let i = 0; i < 4; i++) {
            const nebula = document.createElement('div');
            nebula.classList.add('nebula');
            
            // Random size between 30% and 70% of viewport
            const size = Math.random() * 40 + 30;
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random transformation parameters
            const translateX = (Math.random() * 40 - 20) + 'vw';
            const translateY = (Math.random() * 40 - 20) + 'vh';
            const scale = Math.random() * 0.5 + 0.7;
            
            // Random opacity settings
            const opacityStart = Math.random() * 0.05 + 0.02;
            const opacityMid = Math.random() * 0.07 + 0.03;
            const opacityEnd = Math.random() * 0.04 + 0.01;
            
            // Apply styles
            nebula.style.width = `${size}vw`;
            nebula.style.height = `${size}vw`;
            nebula.style.left = `${posX}%`;
            nebula.style.top = `${posY}%`;
            nebula.style.setProperty('--color-center', colors[i]);
            nebula.style.setProperty('--translate-x', translateX);
            nebula.style.setProperty('--translate-y', translateY);
            nebula.style.setProperty('--scale', scale);
            nebula.style.setProperty('--opacity-start', opacityStart);
            nebula.style.setProperty('--opacity-mid', opacityMid);
            nebula.style.setProperty('--opacity-end', opacityEnd);
            
            backgroundAnimation.appendChild(nebula);
        }
    }
    
    // Create confetti celebration
    function createConfetti() {
        const confettiCount = 100;
        const colors = ['#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ffffff'];
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = `${Math.random() * 5 + 2}px`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.opacity = Math.random() + 0.5;
            confetti.style.borderRadius = '2px';
            confetti.style.zIndex = '1000';
            confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
            
            // Position around the key
            const keyRect = keyDisplay.getBoundingClientRect();
            const documentRect = document.documentElement.getBoundingClientRect();
            
            const left = (keyRect.left + Math.random() * keyRect.width - documentRect.left) + 'px';
            const top = (keyRect.top + Math.random() * 50 - 100 - documentRect.top) + 'px';
            
            confetti.style.left = left;
            confetti.style.top = top;
            
            // Set animation
            const animationDuration = Math.random() * 3 + 2;
            const keyframes = `
                @keyframes confettiAnimation${i} {
                    0% {
                        transform: translateY(0) rotate(${Math.random() * 360}deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(${Math.random() * 200 + 100}px) translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg);
                        opacity: 0;
                    }
                }
            `;
            
            const styleElement = document.createElement('style');
            styleElement.textContent = keyframes;
            document.head.appendChild(styleElement);
            
            confetti.style.animation = `confettiAnimation${i} ${animationDuration}s ease-out forwards`;
            
            document.body.appendChild(confetti);
            
            // Clean up after animation
            setTimeout(() => {
                document.body.removeChild(confetti);
                document.head.removeChild(styleElement);
            }, animationDuration * 1000);
        }
    }
    
    // Shake element animation
    function shakeElement(element) {
        element.classList.remove('shake');
        void element.offsetWidth; // Trigger reflow
        element.classList.add('shake');
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