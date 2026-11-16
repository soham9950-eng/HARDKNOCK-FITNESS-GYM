
/* ==========================================
   HARDKNOCK FITNESS GYM
   COMPLETE WEBSITE JAVASCRIPT
========================================== */

(function () {

    // Prevent duplicate initialization
    if (window.hardknockInitialized) {
        return;
    }

    window.hardknockInitialized = true;


    /* ==================================
       1. MOBILE HAMBURGER MENU
    ================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {

            mainNav.classList.toggle("active");

            const isOpen = mainNav.classList.contains("active");

            menuToggle.innerHTML = isOpen ? "&times;" : "☰";

            menuToggle.setAttribute("aria-expanded", String(isOpen));

        });

    }


    /* ==================================
       2. CLOSE MENU AFTER LINK CLICK
    ================================== */

    if (mainNav && menuToggle) {

        mainNav.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                mainNav.classList.remove("active");

                menuToggle.innerHTML = "☰";

                menuToggle.setAttribute("aria-expanded", "false");

            });

        });

    }


    /* ==================================
       3. SMOOTH SCROLL
    ================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetSection = document.querySelector(targetId);

            if (targetSection) {

                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* ==================================
       4. SCROLL REVEAL ANIMATION
    ================================== */

const revealSections = document.querySelectorAll(
    ".about, .programs, .stats, .trainers, .membership, .gallery, .contact"
);

revealSections.forEach(function(section) {
    section.classList.add("reveal");
});

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.01
    });

    revealSections.forEach(function(section) {
        observer.observe(section);
    });

    document.body.classList.add("js-ready");

} else {

    revealSections.forEach(function(section) {
        section.classList.add("active");
    });

}


/* ==================================
   5. GALLERY LIGHTBOX NAVIGATION
================================== */

const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("galleryLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentImageIndex = 0;

function showGalleryImage(index) {

    const img = galleryItems[index].querySelector("img");

    lightboxImage.src = img.currentSrc || img.src;
    lightboxImage.alt = img.alt;

    currentImageIndex = index;
}

if (lightbox && lightboxImage && lightboxClose &&
    lightboxPrev && lightboxNext) {

    galleryItems.forEach(function(item, index) {

        item.style.cursor = "pointer";

        item.addEventListener("click", function() {

            showGalleryImage(index);

            lightbox.classList.add("active");
            document.body.style.overflow = "hidden";

        });

    });

    lightboxNext.addEventListener("click", function() {

        let nextIndex = (currentImageIndex + 1) % galleryItems.length;

        showGalleryImage(nextIndex);

    });

    lightboxPrev.addEventListener("click", function() {

        let prevIndex =
            (currentImageIndex - 1 + galleryItems.length) %
            galleryItems.length;

        showGalleryImage(prevIndex);

    });

    function closeLightbox() {

        lightbox.classList.remove("active");
        document.body.style.overflow = "";
        lightboxImage.removeAttribute("src");

    }

    lightboxClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", function(event) {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });

    document.addEventListener("keydown", function(event) {

        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") closeLightbox();

        if (event.key === "ArrowRight") lightboxNext.click();

        if (event.key === "ArrowLeft") lightboxPrev.click();

    });

}


    /* ==================================
       5. WHATSAPP ENQUIRY FORM
    ================================== */

    const enquiryForm = document.getElementById("enquiryForm");

    if (enquiryForm) {

        enquiryForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("name").value.trim();

            const phone = document.getElementById("phone").value.trim();

            const plan = document.getElementById("plan").value;

            const message = document.getElementById("message").value.trim();


            if (!name || !phone || !plan) {

                alert("Please fill all required fields.");

                return;

            }


            if (!/^[0-9]{10}$/.test(phone)) {

                alert("Please enter a valid 10-digit mobile number.");

                return;

            }


            // Replace with actual gym WhatsApp number
            const whatsappNumber = "918287429887";


            const whatsappMessage =
                "Hello HARDKNOCK FITNESS GYM!" +
                "\n\nName: " + name +
                "\nMobile: " + phone +
                "\nMembership: " + plan +
                "\nFitness Goal: " + message;


            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(whatsappMessage);


            window.location.href = whatsappURL;

        });

    }


    console.log("HARDKNOCK FITNESS GYM website JavaScript loaded successfully!");

})();
