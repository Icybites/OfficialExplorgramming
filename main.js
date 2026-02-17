// ===== JAVASCRIPT ===== //

// ======= GALLERY DATA BY YEAR ======= //
const galleryData = {
    2025: [
        { src: "images/gambar1.jpg", alt: "Event 2025", title: "Developer Team", desc: "Except for the songkok guy" },
        { src: "images/gambar2.jpg", alt: "Event 2025", title: "Fasilitator Team", desc: "Main crew for Explorgramming 2025" },
        { src: "images/gambar3.jpg", alt: "Event 2025", title: "Session 1 Closing", desc: "First Prototype" },
        { src: "images/gambar4.jpg", alt: "Event 2025", title: "Post Events", desc: "Roti Jala with Chicken Curry" },
        { src: "images/gambar5.jpg", alt: "Event 2025", title: "Participant Top View", desc: "First testing" },
        { src: "images/gambar6.jpg", alt: "Event 2025", title: "Winner", desc: "One of Explorgramming Winners" },
        { src: "images/gambar7.jpg", alt: "Event 2025", title: "Activities", desc: "Photo 1" },
        { src: "images/gambar9.jpg", alt: "Event 2025", title: "Activities", desc: "Photo 2" },
        { src: "images/gambar8.jpg", alt: "Event 2025", title: "Activities", desc: "Photo 3" },
        { src: "images/gambar10.jpg", alt: "Event 2025", title: "Activities", desc: "Photo 4" },
        { src: "images/gambar11.jpg", alt: "Event 2025", title: "Activities", desc: "Photo 5" },
        { src: "images/gambar12.jpg", alt: "Event 2025", title: "Activities", desc: "Photo 6" }

    ],
    2026: [
        { src: "placeholder.jpg", alt: "Event 2026", title: "Coming Soon", desc: "Coming Soon" },
        { src: "placeholder.jpg", alt: "Event 2026", title: "Coming Soon", desc: "Coming Soon" },
        { src: "placeholder.jpg", alt: "Event 2026", title: "Coming Soon", desc: "Coming Soon" },
        { src: "placeholder.jpg", alt: "Event 2026", title: "Coming Soon", desc: "Coming Soon" },
        { src: "placeholder.jpg", alt: "Event 2026", title: "Coming Soon", desc: "Coming Soon" },
        { src: "placeholder.jpg", alt: "Event 2026", title: "Coming Soon", desc: "Coming Soon" },
        { src: "placeholder.jpg", alt: "Event 2026", title: "Coming Soon", desc: "Coming Soon" },
        { src: "placeholder.jpg", alt: "Event 2026", title: "Coming Soon", desc: "Coming Soon" },
        { src: "placeholder.jpg", alt: "Event 2026", title: "Coming Soon", desc: "Coming Soon" },
        { src: "placeholder.jpg", alt: "Event 2026", title: "Coming Soon", desc: "Coming Soon" },
        { src: "placeholder.jpg", alt: "Event 2026", title: "Coming Soon", desc: "Coming Soon" },
        { src: "placeholder.jpg", alt: "Event 2026", title: "Coming Soon", desc: "Coming Soon" }
    ],
    2027: [
        { src: "placeholder.jpg", alt: "Event 2027", title: "Coming Soon", desc: "Coming Soon" },
        { src: "placeholder.jpg", alt: "Event 2027", title: "Coming Soon", desc: "Coming Soon" },
        { src: "placeholder.jpg", alt: "Event 2027", title: "Coming Soon", desc: "Coming Soon" },
        { src: "placeholder.jpg", alt: "Event 2027", title: "Coming Soon", desc: "Coming Soon" },
        { src: "placeholder.jpg", alt: "Event 2027", title: "Coming Soon", desc: "Coming Soon" },
        { src: "placeholder.jpg", alt: "Event 2027", title: "Coming Soon", desc: "Coming Soon" },
        { src: "placeholder.jpg", alt: "Event 2027", title: "Coming Soon", desc: "Coming Soon" },
        { src: "placeholder.jpg", alt: "Event 2027", title: "Coming Soon", desc: "Coming Soon" },
        { src: "placeholder.jpg", alt: "Event 2027", title: "Coming Soon", desc: "Coming Soon" },
        { src: "placeholder.jpg", alt: "Event 2027", title: "Coming Soon", desc: "Coming Soon" },
        { src: "placeholder.jpg", alt: "Event 2027", title: "Coming Soon", desc: "Coming Soon" },
        { src: "placeholder.jpg", alt: "Event 2027", title: "Coming Soon", desc: "Coming Soon" }
    ]
};

// MANAGEMENT //
const state = {
    isNavClickScrolling: false, // Smooth scrolling instead of instant jump
    currentGalleryIndex: 0,    // Track what images being shown
    itemsPerView: 3,            // Will update based on what orientation it is on (3 for desktop, 2 for mobile)
    autoPlayInterval: null,     // To control automatic sliding (interval)
    currentYear: 2025,          // Currently selected year
    isGalleryVisible: false,    // Whether gallery section is in the viewport
    isHoveringGallery: false,   // Whether user is hovering over gallery
    isLightboxOpen: false       // Whether lightbox is currently open
}

// INITIALIZATION //
document.addEventListener("DOMContentLoaded", () => { // Arrow function, a more simpler writing to write many functions at once
    initNavigation()
    initSmoothScroll();
    initActiveNavOnScroll();
    initYearFilter();
    initGallerySlider();
    initGalleryLightbox();
    initScrollEffects();
})

// ======= BURGER NAVIGATION ======= //
function initNavigation() {

    // FIRST PART - SCROLLING

    // Find HTML element button
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link"); // All navigation links (Home, Objective, Learn, Gallery, Contact)
    const body = document.body;

    if (!hamburger || !navMenu) return; // Avoid any missing .hamburger in HTML

    // Toggle Hamburger Toggla
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation(); // Avoid flickering
        toggleMobileMenu();
    })

    // Handle nav link clicks
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute('href'); // Reads where link is supposed to go

            if (!href || href === "#") return; // Avoid error

            e.preventDefault();
            state.isNavClickScrolling = true; // Tells the website that it currently scrolling to a destination

            const targetId = href.replace("#", "");
            scrollToSection(targetId)

            // Close menu
            if (navMenu.classList.contains("active")) {
                closeMobileMenu();
            }

            // Release scroll lock
            setTimeout(() => {
                state.isNavClickScrolling = false;
            }, 1000); // To make sure scrolling are finish before using the navigation again
        });
    });

    // SECOND PART - CLOSING AND HELPER FUNCTION //

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (navMenu.classList.contains("active")) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });

    // Handle window resize - distinguish functioning of dekstop and mobile
    window.addEventListener("resize", debounce(() => {
        if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
            closeMobileMenu();
        }
    }, 250));

    // Helper functions to avoid double scrolling - !! LATER !!
    function toggleMobileMenu() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");

        // When navigation is opened, it stop the scrolling on the main page behind to avoid double scrolling
        if (navMenu.classList.contains("active")) {
            body.style.overflow = "hidden";
        } else {
            body.style.overflow = "";
        }
    }

    // For closing the navigation menu
    function closeMobileMenu() {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        body.style.overflow = "";
    }

}

// ====== SMOOTH SCROLLING ====== //
function scrollToSection(sectionId) { // The engine to calculate excatly where to go
    if (sectionId === "contact") {
        window.scrollTo({
            top: document.documentElement.scrollHeight, // Force to scroll to the maximum height (max Y value) since contact is at the bottom
            behavior: "smooth"
        });
    } else {
        const target = document.getElementById(sectionId);
        if (target) {
            const headerOffset = 70; // Buffer to not touch the very top of the screen
            const elementPosition = target.getBoundingClientRect().top; // Tells the browser the position of the section relative to the user's current position
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset; 
            // window.pageYOffset: adds distance the user has already scrolled

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    }

    updateActiveNavLink(sectionId); // Update current active section
}

// The driver that ask to use above engine
// Make the website more luxury looking
function initSmoothScroll() {
    // Additional smooth scroll for any remaining anchor links - as if in contact section
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.classList.contains("nav-link")) return; // Skip navigation links from being stored

        anchor.addEventListener("click", function(e) {
            const href = this.getAttribute("href");
            if (href === "#") return;

            e.preventDefault(); // To avoid instant jump
            const targetId = href.replace("#", ""); // Help getElementById function to find correct section, #Learn > Learn
            scrollToSection(targetId);
        });
    });
}

// ======= ACTIVE NAVIGATION ON SCROLL ======= //
function initActiveNavOnScroll() { // Listener
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", debounce(() => {
        if (state.isNavClickScrolling) return;

        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Check if at the bottom (contact section)
        const isAtBottom = windowHeight + scrollY >= documentHeight - 70;

        let currentSection = "";

        if (isAtBottom) {
            currentSection = "contact";
        } else {
            // To find the section currently at
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150; // Basically browser detect the hero page when section is 150px from the top
                const sectionHeight = section.offsetHeight;
                const sectionBottom = sectionTop + sectionHeight;

                if (scrollY >= sectionTop && scrollY < sectionBottom) {
                    currentSection = section.getAttribute("id");
                }
            });
        }

        if (currentSection) {
            updateActiveNavLink(currentSection); // To mark the current section we are in
        }
    }, 100)); // Ensure calculation only runs once every 100ms, efficient to CPU
}

// The Painter after listener knows whichs section is active
function updateActiveNavLink(currentSection) {
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => { // Loops through every single link in menu
        link.classList.remove("active"); // Remove active from every link

        const href = link.getAttribute("href").replace("#", "");
        if (href === currentSection) { // Only add active to specifis one that needed
            link.classList.add("active");
        }
    });
}

// ======= SCROLL EFFECTS ======= // - !! LATER !!
function initScrollEffects() {
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", debounce(() => {
        if (window.pageYOffset > 70) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }, 50));
}

// ============================ //
// ======= YEAR FILTER ======== //
// ============================ //

function initYearFilter() {
    const filterContainer = document.querySelector('.gallery-year-filter');
    if (!filterContainer) return;

    const yearTabs = filterContainer.querySelectorAll('.year-tab');
    
    yearTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const year = parseInt(tab.dataset.year);
            
            // Update active state
            yearTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update state
            state.currentYear = year;
            state.currentGalleryIndex = 0;
            
            // Stop autoplay
            stopAutoPlay();
            
            // Rebuild gallery
            const track = document.getElementById("galleryTrack");
            if (track) {
                renderGalleryItems(track);
                
                // Re-create dots
                const dotsContainer = document.getElementById("galleryDots");
                if (dotsContainer) {
                    createDots(track, dotsContainer);
                }
                
                // Update display
                updateSlider(track);
                
                // Only restart autoplay if gallery is visible and not hovered
                if (state.isGalleryVisible && !state.isHoveringGallery && !state.isLightboxOpen) {
                    startAutoPlay();
                }
            }
        });
    });
}

function renderGalleryItems(track) {
    const data = galleryData[state.currentYear] || [];
    
    track.innerHTML = '';
    
    data.forEach((item) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${item.src}" alt="${item.alt}">
            <div class="gallery-caption">
                <h4>${item.title}</h4>
                <p>${item.desc}</p>
            </div>
        `;
        track.appendChild(galleryItem);
    });
}

// - NEXT PROBLEM - NEXT PROBLEM - //
// =============================== //
// ======== GALLERY SLIDER ======= //
// =============================== //

function initGallerySlider() {
    const track = document.getElementById("galleryTrack"); // Identifies count of row holding all images based on screen size
    const prevBtn = document.getElementById("galleryPrev");
    const nextBtn = document.getElementById("galleryNext");
    const dotsContainer = document.getElementById("galleryDots");
    const gallerySection = document.getElementById("gallery");
    const galleryContainer = document.querySelector('.gallery-container');

    if (!track) return; // Ensure no error

    // Render initial gallery items
    renderGalleryItems(track);

    // Update items per view based on screen size, this is basically the brain
    function updateItemsPerView() {
        if (window.innerWidth <= 480) {
            state.itemsPerView = 1; // Mobile: 2 per row (so 6 total with 3 rows visible)
        } else if (window.innerWidth <= 768) {
            state.itemsPerView = 1;
        } else if (window.innerWidth <= 992){
            state.itemsPerView = 2;
        } else if (window.innerWidth <= 1200){
            state.itemsPerView = 3;
        } else {
            state.itemsPerView = 3; // Desktop: 3 per row
        }
    }

    // Create navigation dots
    function createDots(trackEl, container) {
        if(!container) return; // Avoid error

        const itemsInTrack = trackEl.querySelectorAll(".gallery-item");
        const totalItemsInTrack = itemsInTrack.length;
        
        container.innerHTML = "";
        const numDots = Math.ceil(totalItemsInTrack / state.itemsPerView); // Rounds up, use ceiling

        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement("button");
            dot.classList.add("gallery-dot");
            dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            container.appendChild(dot);
        }
    }

    // Update active dot
    function updateDots() {
        if (!dotsContainer) return; // Avoid error

        const dots = dotsContainer.querySelectorAll(".gallery-dot");
        const activeIndex = Math.floor(state.currentGalleryIndex / state.itemsPerView); // Redifine again

        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === activeIndex);
        });
    }

    // Go to specific slide
    function goToSlide(index) {
        state.currentGalleryIndex = index * state.itemsPerView;
        updateSlider(track);
        resetAutoPlay();
    }

    // Update slider position
    function updateSlider(trackEl) {
        const itemsInTrack = trackEl.querySelectorAll(".gallery-item");
        if (!itemsInTrack.length) return; // Avoid error

        const itemWidth = itemsInTrack[0].offsetWidth;
        const gap = parseFloat(getComputedStyle(trackEl).gap) || 32; // To avoid off centered
        const offset = -(state.currentGalleryIndex * (itemWidth + gap));

        trackEl.style.transform = `translateX(${offset}px)`; // Update the css setted previously
        updateDots();
    }

    // === Next & Previous === //
    // Next button
    function nextSlide() {
        const currentItems = track.querySelectorAll(".gallery-item");
        const currentTotal = currentItems.length;
        
        state.currentGalleryIndex += state.itemsPerView;

        if (state.currentGalleryIndex >= currentTotal) {
            state.currentGalleryIndex = 0;
        }

        updateSlider(track);
    }

    // Previous button
    function prevSlide() {
        const currentItems = track.querySelectorAll(".gallery-item");
        const currentTotal = currentItems.length;
        
        state.currentGalleryIndex -= state.itemsPerView;

        if (state.currentGalleryIndex < 0) {
            const lastGroupStart = Math.floor((currentTotal - 1) / state.itemsPerView) * state.itemsPerView;
            state.currentGalleryIndex = lastGroupStart;
        }

        updateSlider(track);
    }

    // =============================== //
    // === AUTO-PLAY — SMART LOGIC === //
    // =============================== //
    // Central check: only slide if ALL conditions are met
    function canAutoPlay() {
        return (
            state.isGalleryVisible &&   // Gallery is on screen
            !state.isHoveringGallery && // User is not hovering over it
            !state.isLightboxOpen &&    // Lightbox is not open
            !document.hidden            // Browser tab is active
        );
    }

    // Start auto-play
    window.startAutoPlay = function() {
        stopAutoPlay(); // Clear any existing interval first
        if (!canAutoPlay()) return; // Don't start if conditions aren't met
        state.autoPlayInterval = setInterval(() => {
            if (canAutoPlay()) {
                nextSlide();
            } else {
                stopAutoPlay(); // Kill interval if conditions changed mid-tick
            }
        }, 5000);
    }

    // Stop auto-play
    window.stopAutoPlay = function() {
        if (state.autoPlayInterval) {
            clearInterval(state.autoPlayInterval);
            state.autoPlayInterval = null;
        }
    }

    // Reset auto-play (used after manual navigation)
    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // === Intersection Observer: start/stop based on gallery visibility === //
    // Fires when gallery section enters or leaves the viewport
    const visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            state.isGalleryVisible = entry.isIntersecting;

            if (state.isGalleryVisible) {
                startAutoPlay(); // Gallery scrolled into view — start
            } else {
                stopAutoPlay();  // Gallery scrolled out of view — stop
            }
        });
    }, {
        threshold: 0.2 // Trigger when at least 20% of the gallery section is visible
    });

    if (gallerySection) {
        visibilityObserver.observe(gallerySection);
    }

    // === Hover: pause while mouse is inside gallery === //
    if (galleryContainer) {
        galleryContainer.addEventListener('mouseenter', () => {
            state.isHoveringGallery = true;
            stopAutoPlay();
        });

        galleryContainer.addEventListener('mouseleave', () => {
            state.isHoveringGallery = false;
            startAutoPlay(); // Resume only if all other conditions still pass
        });
    }

    // === Tab visibility: stop when user switches tabs === //
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay(); // Resume only if canAutoPlay() passes
        }
    });

    // !! IMPORTANT !! - Event Listeners for buttons //
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            prevSlide();
            resetAutoPlay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            nextSlide();
            resetAutoPlay();
        });
    }

    // Initialize
    updateItemsPerView();
    createDots(track, dotsContainer);
    updateSlider(track);
    // Note: autoplay starts via IntersectionObserver when user scrolls to gallery

    // Handle window resize
    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const oldItemsPerView = state.itemsPerView;
            updateItemsPerView();

            if (oldItemsPerView !== state.itemsPerView) {
                state.currentGalleryIndex = 0;
                createDots(track, dotsContainer);
                updateSlider(track);
            } else {
                updateSlider(track);
            }
        }, 250);
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            prevSlide();
            resetAutoPlay();
        } else if (e.key === "ArrowRight") {
            nextSlide();
            resetAutoPlay();
        }
    });

    // Expose createDots and updateSlider for year filter to call
    window.createDots = createDots;
    window.updateSlider = updateSlider;
}

// ======= GALLERY LIGHTBOX ======= //

function initGalleryLightbox() {
    const lightbox = document.getElementById("galleryLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeBtn = lightbox?.querySelector(".lightbox-close");

    if (!lightbox || !lightboxImage) return; // Avoid error

    // Use event delegation for dynamically created gallery items
    document.addEventListener('click', (e) => {
        const galleryItem = e.target.closest('.gallery-item');
        if (!galleryItem) return;

        const img = galleryItem.querySelector('img');
        if (!img) return;

        // Copy source and alternative
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden"; // Avoid user from accidently scroll down the background page

        // Pause autoplay while lightbox is open
        state.isLightboxOpen = true;
        stopAutoPlay();
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";

        // Resume autoplay if gallery is still visible and not hovered
        state.isLightboxOpen = false;
        startAutoPlay();
    }

    // Close on background click
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            closeLightbox();
        });
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

}

// ======= OTHER UTILITY FUNCTIONS ======= //
// For more efficiency!
// Limit how often a function can be fire
function debounce(func, wait) {
    let timeout;

    // debounce waits for user to stop scrolling or resizing for "wait" ms before running heavy code
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle forward & back navigation
window.addEventListener('pageshow', (event) => {
    if (event.persisted) { // event.persisted = true, only if the page was loaded from the browser's cache
        // Page was restored from cache
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        const body = document.body;
        
        if (navMenu?.classList.contains('active')) {
            hamburger?.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        }
    }

});

