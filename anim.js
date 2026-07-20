(function() {
    'use strict';

    // ============================================
    // 0. LOADER HACKER STYLE
    // ============================================
    const loader = document.getElementById('loader');
    const loaderBar = document.getElementById('loaderBar');
    const loaderPercent = document.getElementById('loaderPercent');
    const loaderMatrix = document.getElementById('loaderMatrix');

    let progress = 0;
    const matrixChars = '01001000 01100101 01101100 01101100 01101111 00100000 01010111 01101111 01110010 01101100 01100100 00100000 01001000 01100001 01100011 01101011 01100101 01110010 00100000 01010011 01110100 01111001 01101100 01100101';

    function simulateLoader() {
        const interval = setInterval(() => {
            progress += Math.random() * 8 + 2;
            if (progress > 100) progress = 100;

            loaderBar.style.width = progress + '%';
            loaderPercent.textContent = Math.floor(progress) + '%';

            const display = matrixChars.split('').map(char => {
                return Math.random() > 0.7 ? String.fromCharCode(33 + Math.random() * 90) : char;
            }).join('');
            loaderMatrix.textContent = display;

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loader.classList.add('hidden');
                    initTypewriter();
                    initCarousel();
                    initAboutCarousel();
                    initStatsCounter();
                    initThemeToggle();
                    initContactForm();
                    initHackerCanvas();
                    initNavActive();
                }, 300);
            }
        }, 150);
    }

    simulateLoader();

    // ============================================
    // 1. CANVAS HACKER
    // ============================================
    function initHackerCanvas() {
        const canvas = document.getElementById('hackerCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let w, h;

        function resizeCanvas() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const ICONS = [
            { icon: '\uf17c', name: 'Linux', color: '#00ff41' },
            { icon: '\uf132', name: 'Lock', color: '#00ff41' },
            { icon: '\uf1eb', name: 'Wifi', color: '#00ff41' },
            { icon: '\uf0ac', name: 'Globe', color: '#00ff41' },
            { icon: '\uf17c', name: 'Packet Tracer', color: '#00ff41' },
            { icon: '\uf1c0', name: 'Database', color: '#00ff41' },
            { icon: '\uf1e6', name: 'Malware', color: 'rgba(255, 0, 0, 0.3)' },
            { icon: '\uf21b', name: 'Spyware', color: 'rgba(255, 34, 34, 0.3)' },
            { icon: '\uf09c', name: 'Unlock', color: 'rgba(255, 0, 0, 0.3)' },
            { icon: '\uf21b', name: 'User Secret', color: 'rgba(255, 0, 0, 0.3)' },
            { icon: '\uf17a', name: 'Windows', color: 'rgba(255, 0, 0, 0.3)' },
            { icon: '\uf3a9', name: 'Kali', color: 'rgba(255, 0, 0, 0.3)' },
            { icon: '\uf17a', name: 'Cisco', color: 'rgba(255, 0, 0, 0.3)' },
            { icon: '\uf084', name: 'Key', color: 'rgba(255, 0, 0, 0.3)' },
            { icon: '\uf3c5', name: 'Robot', color: 'rgba(255, 0, 0, 0.3)' },
        ];

        const elements = [];
        const ELEMENT_COUNT = 50;

        class HackerElement {
            constructor() {
                const type = Math.random();
                if (type < 0.45) {
                    this.type = 'icon';
                    const iconData = ICONS[Math.floor(Math.random() * ICONS.length)];
                    this.char = iconData.icon;
                    this.name = iconData.name;
                    this.color = iconData.color;
                    this.size = 24 + Math.random() * 26;
                } else if (type < 0.7) {
                    this.type = 'binary';
                    this.char = Math.random() > 0.5 ? '0' : '1';
                    this.color = Math.random() > 0.5 ? '#00ff41' : '#ff0000';
                    this.size = 18 + Math.random() * 24;
                    this.name = '';
                } else {
                    this.type = 'text';
                    const texts = ['ROOT', 'ADMIN', 'HACK', 'SECURE', 'FIREWALL', 'FTP', 'HTTP', 'KALI', 'LINUX', 'WINDOWS',
                        'MALWARE', 'SPYWARE'
                    ];
                    this.char = texts[Math.floor(Math.random() * texts.length)];
                    this.color = Math.random() > 0.5 ? '#00ff41' : '#ff0000';
                    this.size = 16 + Math.random() * 20;
                    this.name = '';
                }

                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.speedX = (Math.random() - 0.5) * 3.0;
                this.speedY = (Math.random() - 0.5) * 3.0;
                this.opacity = 0.4 + Math.random() * 0.5;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.025;
                this.pulse = Math.random() * Math.PI * 2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.pulse += 0.04;
                this.rotation += this.rotationSpeed;

                if (Math.random() < 0.005) {
                    this.speedX += (Math.random() - 0.5) * 0.5;
                    this.speedY += (Math.random() - 0.5) * 0.5;
                    const maxSpeed = 4.0;
                    if (Math.abs(this.speedX) > maxSpeed) this.speedX = Math.sign(this.speedX) * maxSpeed;
                    if (Math.abs(this.speedY) > maxSpeed) this.speedY = Math.sign(this.speedY) * maxSpeed;
                }

                if (this.x < -80) this.x = w + 80;
                if (this.x > w + 80) this.x = -80;
                if (this.y < -80) this.y = h + 80;
                if (this.y > h + 80) this.y = -80;
            }

            draw() {
                const alpha = this.opacity * (0.6 + 0.4 * Math.sin(this.pulse));
                const glow = 15 + Math.sin(this.pulse) * 8;

                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);

                if (this.type === 'icon') {
                    ctx.font = `${this.size}px 'Font Awesome 6 Free'`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.shadowColor = this.color + '99';
                    ctx.shadowBlur = glow;
                    ctx.fillStyle = this.color + Math.floor(alpha * 230).toString(16).padStart(2, '0');
                    ctx.fillText(this.char, 0, 0);

                    if (this.name && this.size > 26) {
                        ctx.font = `bold ${this.size * 0.22}px 'Inter', sans-serif`;
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'top';
                        ctx.shadowBlur = 5;
                        ctx.fillStyle = this.color + Math.floor(alpha * 180).toString(16).padStart(2, '0');
                        ctx.fillText(this.name, 0, this.size * 0.5);
                    }
                } else if (this.type === 'binary') {
                    ctx.font = `bold ${this.size}px 'Share Tech Mono', monospace`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.shadowColor = this.color + '88';
                    ctx.shadowBlur = glow;
                    ctx.fillStyle = this.color + Math.floor(alpha * 220).toString(16).padStart(2, '0');
                    ctx.fillText(this.char, 0, 0);
                } else {
                    ctx.font = `bold ${this.size}px 'Share Tech Mono', monospace`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.shadowColor = this.color + '88';
                    ctx.shadowBlur = glow;
                    ctx.fillStyle = this.color + Math.floor(alpha * 220).toString(16).padStart(2, '0');
                    ctx.fillText(this.char, 0, 0);
                }

                ctx.restore();
                ctx.shadowBlur = 0;
            }
        }

        for (let i = 0; i < ELEMENT_COUNT; i++) {
            elements.push(new HackerElement());
        }

        function animateHacker() {
            ctx.clearRect(0, 0, w, h);

            for (let i = 0; i < 50; i++) {
                const x = (i / 50) * w;
                const y = (Math.sin(Date.now() / 3000 + i * 0.5) + 1) * h * 0.3 + h * 0.1;
                const color = Math.random() > 0.5 ? 'rgba(0, 255, 65, 0.02)' : 'rgba(255, 0, 0, 0.02)';
                ctx.fillStyle = color;
                ctx.font = '10px monospace';
                ctx.fillText(Math.random() > 0.5 ? '0' : '1', x, y);
            }

            elements.forEach(el => {
                el.update();
                el.draw();
            });

            requestAnimationFrame(animateHacker);
        }

        animateHacker();

        window.addEventListener('resize', function() {
            resizeCanvas();
            elements.forEach(el => {
                el.x = Math.random() * w;
                el.y = Math.random() * h;
            });
        });
    }

    // ============================================
    // 2. TYPEWRITER
    // ============================================
    function initTypewriter() {
        const texts = ['Full-Stack Developer', 'Network Enthusiast', 'Cybersecurity Learner', 'Tech Explorer'];
        const targetElement = document.getElementById('typewriter-text');
        if (!targetElement) return;
        let textIndex = 0,
            charIndex = 0,
            isDeleting = false,
            currentText = '';

        function typeWriter() {
            const fullText = texts[textIndex];
            if (isDeleting) {
                currentText = fullText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = fullText.substring(0, charIndex + 1);
                charIndex++;
            }
            targetElement.textContent = currentText;
            let speed = isDeleting ? 40 : 70;
            if (!isDeleting && charIndex === fullText.length) {
                speed = 100;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                speed = 300;
            }
            setTimeout(typeWriter, speed);
        }

        setTimeout(typeWriter, 500);
    }

    // ============================================
    // 3. MENU MOBILE
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            const icon = this.querySelector('i');
            if (icon) icon.classList.toggle('fa-times');
        });
    }
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            const icon = menuToggle?.querySelector('i');
            if (icon) icon.classList.remove('fa-times');
        });
    });

    // ============================================
    // 4. HEADER SCROLL
    // ============================================
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ============================================
    // 5. NAV ACTIVE LINK
    // ============================================
    function initNavActive() {
        const sections = document.querySelectorAll('section[id]');
        const navLinksAll = document.querySelectorAll('.nav-links a:not(.nav-cta)');

        function updateActiveLink() {
            let current = '';
            sections.forEach(section => {
                if (window.scrollY >= section.offsetTop - 120) current = section.id;
            });
            navLinksAll.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + current);
            });
        }

        window.addEventListener('scroll', updateActiveLink);
        window.addEventListener('load', updateActiveLink);
    }

    // ============================================
    // 6. CARROUSEL PROJETS
    // ============================================
    function initCarousel() {
        const track = document.getElementById('carouselTrack');
        const slides = document.querySelectorAll('.carousel-slide');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const dotsContainer = document.getElementById('carouselDots');

        if (!track || !slides.length) return;

        let currentIndex = 0,
            slidesPerView = 3;

        function getSlidesPerView() {
            if (window.innerWidth < 768) return 1;
            if (window.innerWidth < 992) return 2;
            return 3;
        }

        function getSlideWidth() {
            const container = document.querySelector('.carousel-container');
            if (!container) return 0;
            const containerWidth = container.offsetWidth;
            const gap = 24;
            const count = getSlidesPerView();
            return (containerWidth - (count - 1) * gap) / count;
        }

        function updateCarousel() {
            slidesPerView = getSlidesPerView();
            const totalSlides = slides.length;
            const maxIndex = Math.max(0, totalSlides - slidesPerView);
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            const slideWidth = getSlideWidth();
            if (slideWidth > 0) {
                slides.forEach(slide => {
                    slide.style.flex = `0 0 ${slideWidth}px`;
                    slide.style.minWidth = `${slideWidth}px`;
                    slide.style.maxWidth = `${slideWidth}px`;
                });
            }
            const offset = currentIndex * (slideWidth + 24);
            track.style.transform = `translateX(-${offset}px)`;
            document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function initDots() {
            const totalSlides = slides.length;
            slidesPerView = getSlidesPerView();
            const dotCount = Math.max(1, totalSlides - slidesPerView + 1);
            dotsContainer.innerHTML = '';
            for (let i = 0; i < dotCount; i++) {
                const dot = document.createElement('button');
                dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
                dot.dataset.index = i;
                dot.addEventListener('click', function() {
                    currentIndex = parseInt(this.dataset.index);
                    updateCarousel();
                });
                dotsContainer.appendChild(dot);
            }
        }

        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => { initDots();
                updateCarousel(); }, 200);
        });

        prevBtn?.addEventListener('click', function() {
            if (currentIndex > 0) { currentIndex--;
                updateCarousel(); }
        });

        nextBtn?.addEventListener('click', function() {
            const totalSlides = slides.length;
            slidesPerView = getSlidesPerView();
            const maxIndex = Math.max(0, totalSlides - slidesPerView);
            if (currentIndex < maxIndex) { currentIndex++;
                updateCarousel(); }
        });

        initDots();
        setTimeout(updateCarousel, 100);
        setTimeout(updateCarousel, 300);
        window.addEventListener('load', function() { setTimeout(updateCarousel, 200); });
    }

    // ============================================
    // 7. CARROUSEL À PROPOS - AUTO
    // ============================================
    function initAboutCarousel() {
        const aboutPhotos = [
            'image/me.png',
            'image/me2.jpg',
            'image/me3.jpg',
            'image/me4.png',
            'image/me5.png',
            'image/me6.jpg',
            'image/me7.jpg'
        ];

        const aboutSlider = document.getElementById('aboutSlider');
        if (!aboutSlider) return;

        let currentAboutIndex = 0;
        let aboutInterval = null;

        function initAboutSlider() {
            aboutSlider.innerHTML = '';
            aboutPhotos.forEach((url, index) => {
                const img = document.createElement('img');
                img.src = url;
                img.alt = 'Photo ' + (index + 1);
                if (index === 0) img.classList.add('active');
                img.style.opacity = index === 0 ? '1' : '0';
                aboutSlider.appendChild(img);
            });
        }

        function changeAboutImage(index) {
            const images = aboutSlider.querySelectorAll('img');
            images.forEach((img, i) => {
                img.classList.remove('active');
                img.style.opacity = i === index ? '1' : '0';
            });
            currentAboutIndex = index;
        }

        function startAboutAutoSlide() {
            if (aboutInterval) clearInterval(aboutInterval);
            aboutInterval = setInterval(() => {
                const nextIndex = (currentAboutIndex + 1) % aboutPhotos.length;
                changeAboutImage(nextIndex);
            }, 2500);
        }

        initAboutSlider();
        setTimeout(startAboutAutoSlide, 500);

        window.addEventListener('beforeunload', function() {
            if (aboutInterval) clearInterval(aboutInterval);
        });
    }

    // ============================================
    // 8. STATISTIQUES - COMPTEUR ANIMÉ
    // ============================================
    function initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        if (!statNumbers.length) return;

        let animated = false;

        function animateNumbers() {
            if (animated) return;

            const statsSection = document.querySelector('.stats-container');
            if (!statsSection) return;

            const rect = statsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                animated = true;

                statNumbers.forEach(stat => {
                    const target = parseInt(stat.dataset.count);
                    let current = 0;
                    const increment = Math.ceil(target / 40);
                    const duration = 1500;
                    const stepTime = duration / 40;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        stat.textContent = current;
                    }, stepTime);
                });
            }
        }

        window.addEventListener('scroll', animateNumbers);
        window.addEventListener('load', function() {
            setTimeout(animateNumbers, 1000);
        });
    }

    // ============================================
    // 9. THEME TOGGLE (Mode sombre/clair) + CHANGEMENT PHOTO
    // ============================================
    function initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const profileImage = document.getElementById('profileImage');
        if (!themeToggle) return;

        // Images
        const darkImage = 'image/me5.png';
        const lightImage = 'image/dragon.jpg';

        // Vérifier si un thème est sauvegardé
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            if (profileImage) {
                profileImage.src = lightImage;
                profileImage.alt = 'Dragon';
            }
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }

        themeToggle.addEventListener('click', function() {
            const isLight = document.body.classList.toggle('light-mode');
            const icon = this.querySelector('i');

            if (isLight) {
                // Mode clair → dragon.jpg
                if (profileImage) {
                    profileImage.classList.add('fade-transition');
                    setTimeout(() => {
                        profileImage.src = lightImage;
                        profileImage.alt = 'Dragon';
                        setTimeout(() => {
                            profileImage.classList.remove('fade-transition');
                        }, 50);
                    }, 300);
                }
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                // Mode sombre → me5.png
                if (profileImage) {
                    profileImage.classList.add('fade-transition');
                    setTimeout(() => {
                        profileImage.src = darkImage;
                        profileImage.alt = 'MIARINDRANTO Diarizo Alinjaka';
                        setTimeout(() => {
                            profileImage.classList.remove('fade-transition');
                        }, 50);
                    }, 300);
                }
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // ============================================
    // 10. FORMULAIRE DE CONTACT
    // ============================================
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        const formSuccess = document.getElementById('formSuccess');

        if (!contactForm) return;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name && email && message) {
                const subject = encodeURIComponent('Message de ' + name + ' - Portfolio');
                const body = encodeURIComponent('Nom: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);
                window.open('mailto:miarindrantodiarizoalinjaka@gmail.com?subject=' + subject + '&body=' + body,
                    '_blank');
                formSuccess.classList.add('show');
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                    contactForm.reset();
                }, 4000);
            }
        });
    }

    console.log('✅ Portfolio chargé avec succès !');
    console.log('🚀 Mode sombre, compteur de visites et loader hacker activés !');
    console.log('🖼️ Changement de photo : me5.png ↔ dragon.jpg');

})();