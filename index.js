   
        // Three.js Background with Enhanced Particles
        function initThreeJS() {
            const container = document.getElementById('threejs-container');
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ 
                alpha: true, 
                antialias: true,
                powerPreference: "high-performance"
            });
            
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);
            
            // Enhanced lighting
            const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
            scene.add(ambientLight);
            
            const directionalLight1 = new THREE.DirectionalLight(0x00ffff, 0.8);
            directionalLight1.position.set(1, 1, 1);
            scene.add(directionalLight1);
            
            const directionalLight2 = new THREE.DirectionalLight(0x0066ff, 0.5);
            directionalLight2.position.set(-1, -1, -1);
            scene.add(directionalLight2);
            
            // Enhanced particles
            const particlesGeometry = new THREE.BufferGeometry();
            const particleCount = 500;
            
            const posArray = new Float32Array(particleCount * 3);
            const sizeArray = new Float32Array(particleCount);
            
            for(let i = 0; i < particleCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 10;
                if(i % 3 === 0) {
                    sizeArray[i/3] = Math.random() * 0.2 + 0.05;
                }
            }
            
            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));
            
            const particlesMaterial = new THREE.PointsMaterial({
                color: 0x00ffff,
                size: 0.1,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending
            });
            
            const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particlesMesh);
            
            camera.position.z = 5;
            
            // Animation loop with enhanced effects
            function animate() {
                requestAnimationFrame(animate);
                
                particlesMesh.rotation.x += 0.001;
                particlesMesh.rotation.y += 0.002;
                
                // Pulsing effect for particles
                const time = Date.now() * 0.001;
                particlesMaterial.size = 0.1 + Math.sin(time) * 0.05;
                
                renderer.render(scene, camera);
            }
            
            animate();
            
            // Responsive handling
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        }
        
        // Initialize Three.js when the page loads
        window.addEventListener('DOMContentLoaded', initThreeJS);
        
        // Fixed Mobile Menu Toggle - Fixed Version
        document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            const body = document.body;
            
            // Toggle menu visibility
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
            
            // Toggle hamburger to X animation
            const svg = this.querySelector('svg');
            if (navLinks.classList.contains('active')) {
                // Change to X icon
                svg.innerHTML = `
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                `;
                body.classList.add('menu-open');
            } else {
                // Change back to hamburger icon
                svg.innerHTML = `
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                `;
                body.classList.remove('menu-open');
            }
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if(window.innerWidth <= 768) {
                    document.querySelector('.nav-links').classList.remove('active');
                    document.querySelector('.mobile-menu-btn').classList.remove('active');
                    document.body.classList.remove('menu-open');
                    
                    // Reset hamburger icon
                    const svg = document.querySelector('.mobile-menu-btn svg');
                    svg.innerHTML = `
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    `;
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const navLinks = document.querySelector('.nav-links');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            
            if (window.innerWidth <= 768 && 
                navLinks.classList.contains('active') && 
                !navLinks.contains(event.target) && 
                !menuBtn.contains(event.target)) {
                
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                // Reset hamburger icon
                const svg = menuBtn.querySelector('svg');
                svg.innerHTML = `
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                `;
            }
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            });
        });
        
        // Scroll animation for elements
        function animateOnScroll() {
            const elements = document.querySelectorAll('.panel-3d, .section-title, .work-card, .skill-item, .contact-form');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if(elementPosition < screenPosition) {
                    element.classList.add('animate-in');
                }
            });
        }
        
        // Initialize scroll animation
        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if(window.scrollY > 50) {
                document.getElementById('navbar').classList.add('scrolled');
            } else {
                document.getElementById('navbar').classList.remove('scrolled');
            }
        });
        
        // Create floating cubes in footer
        function createFloatingCubes() {
            const footerCubes = document.querySelector('.footer-cubes');
            const cubeCount = 15;
            
            for(let i = 0; i < cubeCount; i++) {
                const cube = document.createElement('div');
                cube.classList.add('footer-cube');
                
                // Random position
                const left = Math.random() * 100;
                const bottom = -50 - (Math.random() * 100);
                cube.style.left = `${left}%`;
                cube.style.bottom = `${bottom}px`;
                
                // Random size
                const size = 20 + (Math.random() * 30);
                cube.style.width = `${size}px`;
                cube.style.height = `${size}px`;
                
                // Random delay and duration
                const delay = Math.random() * 5;
                const duration = 10 + (Math.random() * 20);
                cube.style.animationDelay = `${delay}s`;
                cube.style.animationDuration = `${duration}s`;
                
                footerCubes.appendChild(cube);
            }
        }
        
        // Initialize floating cubes
        window.addEventListener('load', createFloatingCubes);
        
        // Enhanced 3D Tilt Effect for Work Cards
        document.querySelectorAll('.work-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const angleX = (y - centerY) / 20;
                const angleY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-15px)`;
                card.style.boxShadow = `0 20px 50px rgba(0, 255, 255, ${Math.min(0.3 + (Math.abs(angleX + angleY) / 20), 0.6)})`;
            });
            
            card.addEventListener('mouseleave', () => {
                if(card.classList.contains('animate-in')) {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
                }
                card.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
            });
        });
        
        // Enhanced 3D Tilt Effect for other panels
        document.querySelectorAll('.panel-3d:not(.work-card)').forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const angleX = (y - centerY) / 20;
                const angleY = (centerX - x) / 20;
                
                item.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
                item.style.boxShadow = `0 20px 50px rgba(0, 255, 255, ${Math.min(0.3 + (Math.abs(angleX + angleY) / 20), 0.6)})`;
            });
            
            item.addEventListener('mouseleave', () => {
                if(item.classList.contains('animate-in')) {
                    item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
                }
                item.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
            });
        });
        
        // Form submission
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if(name && email && message) {
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success';
                successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
                successMessage.style.position = 'fixed';
                successMessage.style.top = '20px';
                successMessage.style.right = '20px';
                successMessage.style.zIndex = '1000';
                successMessage.style.padding = '15px';
                successMessage.style.borderRadius = '8px';
                successMessage.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
                successMessage.style.border = '1px solid rgba(0, 255, 0, 0.5)';
                successMessage.style.color = '#fff';
                
                document.body.appendChild(successMessage);
                
                // Reset form
                this.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });

const counters = document.querySelectorAll(".counter");
let counted = false;

function startCounting() {
    counters.forEach(counter => {
        let target = +counter.getAttribute("data-target");
        let count = 0;
        let speed = 30;

        function update() {
            if (count < target) {
                count++;
                counter.innerText = count;
                setTimeout(update, speed);
            } else {
                counter.innerText = target;
            }
        }
        update();
    });
}

// Observe when .about-stats comes into view
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
            counted = true;
            startCounting();
        }
    });
});

observer.observe(document.querySelector(".about-stats"));
