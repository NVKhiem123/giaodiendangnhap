// App Main Logic & Validation Engine for CowColap

// Global Toast Notification Helper
function showToast(message, type = 'success') {
    const existingToast = document.getElementById('cowToast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.id = 'cowToast';
    
    const bgColor = type === 'success' ? 'bg-black text-white border-white' : 'bg-red-600 text-white border-black';
    const icon = type === 'success' ? 'check_circle' : 'error';

    toast.className = `fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] ${bgColor} font-bold text-sm transition-all transform duration-300 translate-y-[-20px] opacity-0`;
    toast.innerHTML = `
        <span class="material-symbols-outlined text-[22px]">${icon}</span>
        <span>${message}</span>
    `;

    document.body.appendChild(toast);

    // Animate In
    setTimeout(() => {
        toast.classList.remove('translate-y-[-20px]', 'opacity-0');
    }, 50);

    // Animate Out & Remove
    setTimeout(() => {
        toast.classList.add('translate-y-[-20px]', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// Password Validation Rule Checker
// Requirements:
// 1. Min 8 characters
// 2. At least 1 uppercase letter
// 3. At least 1 lowercase letter
// 4. At least 1 special character
function validatePasswordRules(password) {
    if (!password || password.length < 8) {
        return { valid: false, message: "Password is too weak (tối thiểu 8 ký tự)" };
    }
    if (!/[A-Z]/.test(password)) {
        return { valid: false, message: "Password is too weak (cần ít nhất 1 chữ cái viết hoa)" };
    }
    if (!/[a-z]/.test(password)) {
        return { valid: false, message: "Password is too weak (cần ít nhất 1 chữ cái viết thường)" };
    }
    if (!/[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/]/.test(password)) {
        return { valid: false, message: "Password is too weak (cần ít nhất 1 ký tự đặc biệt)" };
    }
    return { valid: true };
}

// Email Validation Rule Checker
function validateEmailFormat(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase().trim());
}

// Initialize Password Toggle Visibility Buttons
function setupPasswordToggles() {
    const toggleButtons = document.querySelectorAll('button[type="button"]');
    toggleButtons.forEach(button => {
        const iconSpan = button.querySelector('.material-symbols-outlined');
        if (iconSpan && (iconSpan.textContent.trim() === 'visibility' || iconSpan.textContent.trim() === 'visibility_off')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const input = button.parentElement.querySelector('input');
                if (input) {
                    if (input.type === 'password') {
                        input.type = 'text';
                        iconSpan.textContent = 'visibility_off';
                    } else {
                        input.type = 'password';
                        iconSpan.textContent = 'visibility';
                    }
                }
            });
        }
    });
}

// Setup Cow Canvas Interactive Animation
function setupCowCanvas() {
    const canvas = document.getElementById('cowCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cowImg = new Image();
    cowImg.src = 'cow.png'; 

    let mouse = { x: null, y: null, radius: 180 };

    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener('mouseout', function() {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initCows();
    });

    class Cow {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = 40; 
            this.velocityX = (Math.random() - 0.5) * 1.5;
            this.velocityY = (Math.random() - 0.5) * 1.5;
            this.mass = 1.2;
        }

        draw() {
            if (cowImg.complete && cowImg.naturalWidth > 0) {
                ctx.drawImage(cowImg, this.x - this.size/2, this.y - this.size/2, this.size, this.size);
            }
        }

        update() {
            this.x += this.velocityX;
            this.y += this.velocityY;

            if (this.x > canvas.width || this.x < 0) this.velocityX *= -1;
            if (this.y > canvas.height || this.y < 0) this.velocityY *= -1;

            if (mouse.x !== undefined && mouse.y !== undefined) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let force = (mouse.radius - distance) / mouse.radius;
                    
                    let directionX = forceDirectionX * force * this.mass;
                    let directionY = forceDirectionY * force * this.mass;

                    this.x -= directionX * 6; 
                    this.y -= directionY * 6;
                }
            }
            this.draw();
        }
    }

    let cowArray = [];

    function initCows() {
        cowArray = [];
        let numberOfCows = 60; 
        for (let i = 0; i < numberOfCows; i++) {
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            cowArray.push(new Cow(x, y));
        }
    }

    function animateCows() {
        requestAnimationFrame(animateCows);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < cowArray.length; i++) {
            cowArray[i].update();
        }
    }

    cowImg.onload = () => {
        initCows();
        animateCows();
    };

    if (cowImg.complete) {
        initCows();
        animateCows();
    }
}
