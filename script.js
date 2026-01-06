// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Sidebar Media Toggle
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebarMedia = document.querySelector('.sidebar-media');
const sidebarOverlay = document.querySelector('.sidebar-overlay');
const btnMediaSidebar = document.querySelector('.btn-media-sidebar');
const btnMediaFooter = document.querySelector('.btn-media-footer');

function toggleSidebar() {
    sidebarMedia.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');
    document.body.style.overflow = sidebarMedia.classList.contains('active') ? 'hidden' : '';
}

sidebarToggle.addEventListener('click', toggleSidebar);
btnMediaSidebar?.addEventListener('click', (e) => {
    e.preventDefault();
    toggleSidebar();
});
btnMediaFooter?.addEventListener('click', (e) => {
    e.preventDefault();
    toggleSidebar();
});

sidebarOverlay.addEventListener('click', toggleSidebar);

// Close sidebar when clicking ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebarMedia.classList.contains('active')) {
        toggleSidebar();
    }
});

// Form submission
document.getElementById('messageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validasi form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !subject || !message) {
        alert('Harap isi semua field yang diperlukan!');
        return;
    }
    
    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Harap masukkan alamat email yang valid!');
        return;
    }
    
    // Simulasi pengiriman data
    alert('Terima kasih! Pesan Anda telah berhasil dikirim. Saya akan menghubungi Anda segera.');
    
    // Reset form
    this.reset();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Tutup mobile menu jika terbuka
            navLinks.classList.remove('active');
        }
    });
});

// Animate skill bars on scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = width;
        }, 300);
    });
}

// Trigger animation when skills section is in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.getElementById('skills');
if(skillsSection) {
    observer.observe(skillsSection);
}

// Active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 100)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
    });
});

// Initialize LightGallery for image gallery
document.addEventListener('DOMContentLoaded', function() {
    // Add active class to home link initially
    const homeLink = document.querySelector('.nav-links a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
    
    // Initialize LightGallery if available
    if (typeof lightGallery !== 'undefined') {
        const galleryItems = document.querySelectorAll('.media-item');
        const galleryImages = Array.from(galleryItems).map(item => ({
            src: item.dataset.src,
            thumb: item.querySelector('img').src
        }));
        
        if (galleryImages.length > 0) {
            // Add click event to each media item
            galleryItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    const gallery = lightGallery(document.body, {
                        dynamic: true,
                        dynamicEl: galleryImages.map(img => ({
                            src: img.src,
                            thumb: img.thumb
                        })),
                        index: index
                    });
                    gallery.openGallery(index);
                });
            });
        }
    }
    
    // Preload images for better performance
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });
    
    // Scroll event listener for active nav links
    window.addEventListener('scroll', updateActiveNavLink);
});

// Add loading animation for images
const style = document.createElement('style');
style.textContent = `
    img {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    img.loaded {
        opacity: 1;
    }
    
    /* Custom scrollbar for sidebar */
    .sidebar-media::-webkit-scrollbar {
        width: 6px;
    }
    
    .sidebar-media::-webkit-scrollbar-track {
        background: var(--pink-light);
        border-radius: 10px;
    }
    
    .sidebar-media::-webkit-scrollbar-thumb {
        background: linear-gradient(var(--pink-medium), var(--purple-medium));
        border-radius: 10px;
    }
    
    .sidebar-media::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(var(--pink-dark), var(--purple-dark));
    }
`;
document.head.appendChild(style);

// Map Interaction
function initMapInteractions() {
    const mapIframe = document.querySelector('.map-wrapper iframe');
    if (mapIframe) {
        // Tambahkan event listener untuk interaksi map
        mapIframe.addEventListener('load', function() {
            console.log('Peta Tangerang Selatan telah dimuat');
        });
    }
}

// Panggil fungsi inisialisasi map
initMapInteractions();

// Download counter untuk dokumen PDF
document.querySelectorAll('.document-item').forEach(doc => {
    doc.addEventListener('click', function(e) {
        const docName = this.querySelector('strong').textContent;
        console.log(`Mengunduh dokumen: ${docName}`);
        // Di sini bisa ditambahkan tracking download
    });
});
// Timeline Animation
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item-main');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// Trigger timeline animation when in view
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            animateTimeline();
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const timelineSection = document.getElementById('info');
if(timelineSection) {
    timelineObserver.observe(timelineSection);
}

// Set initial state for timeline items
document.querySelectorAll('.timeline-item-main').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'all 0.6s ease';
});