document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const revealBtn = document.getElementById('revealBtn');
    const keyContainer = document.getElementById('keyContainer');
    const countdown = document.getElementById('countdown');
    const keyDisplay = document.getElementById('keyDisplay');
    const copyBtn = document.getElementById('copyBtn');
    const successMessage = document.getElementById('successMessage');
    const backgroundAnimation = document.querySelector('.background-animation');
    
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
            successMessage.innerHTML = '<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg> Key in Zwischenablage kopiert!';
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
        const colors = [
            'rgba(67, 97, 238, 0.3)',
            'rgba(114, 9, 183, 0.3)',
            'rgba(247, 37, 133, 0.2)',
            'rgba(255, 158, 0, 0.2)'
        ];
        
        for (let i = 0; i < 6; i++) {
            const circle = document.createElement('div');
            circle.classList.add('floating-circle');
            
            // Randomize properties
            const size = Math.random() * 200 + 100;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Position randomly
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Set animation properties
            const translateX = (Math.random() - 0.5) * 50;
            const translateY = (Math.random() - 0.5) * 50;
            const rotation = Math.random() * 360;
            const duration = Math.random() * 20 + 15;
            
            // Apply styles
            circle.style.width = `${size}px`;
            circle.style.height = `${size}px`;
            circle.style.backgroundColor = color;
            circle.style.left = `${posX}%`;
            circle.style.top = `${posY}%`;
            circle.style.setProperty('--translate-x', `${translateX}px`);
            circle.style.setProperty('--translate-y', `${translateY}px`);
            circle.style.setProperty('--rotate', `${rotation}deg`);
            circle.style.animation = `floatingCircle ${duration}s ease-in-out infinite alternate`;
            
            backgroundAnimation.appendChild(circle);
        }
    }
    
    // Confetti animation when key is revealed
    function createConfetti() {
        const colors = ['#4361ee', '#7209b7', '#f72585', '#ff9e00'];
        
        for (let i = 0; i < 60; i++) {
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
                fall ${Math.random() * 3 + 3}s linear forwards,
                sway ${Math.random() * 2 + 3}s ease-in-out infinite alternate
            `;
            
            document.querySelector('.card').appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 6000);
        }
        
        // Add CSS for confetti animations if not exists
        if (!document.getElementById('confetti-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'confetti-styles';
            styleSheet.innerHTML = `
                @keyframes fall {
                    to {
                        top: 100%;
                        transform: translateY(0) rotate(${Math.random() * 1000}deg);
                    }
                }
                
                @keyframes sway {
                    from {
                        transform: translateX(-20px) rotate(${Math.random() * 360}deg);
                    }
                    to {
                        transform: translateX(20px) rotate(${Math.random() * 360}deg);
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