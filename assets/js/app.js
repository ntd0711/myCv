// ===================== SHOW MENU ===================

const showMenu = (toggleId, menuId) => {
    const toggleBtn = document.getElementById(toggleId);
    const nav = document.getElementById(menuId);

    if (toggleBtn && nav) {
        toggleBtn.addEventListener('click', () => {
            nav.classList.toggle('show-menu');
        });
    }
};

showMenu('nav-toggle', 'nav-menu');

// ===================== SHOW MENU ===================

const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const nav = document.getElementById('nav-menu');

    nav.classList.remove('show-menu');
}

navLink.forEach((item) => {
    item.addEventListener('click', linkAction);
});

// ================ SHOW ARROW SCROLL TOP ===============

function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    console.log(this);
    if (this.scrollY >= 560) {
        scrollTop.classList.add('show-scroll');
    } else {
        scrollTop.classList.remove('show-scroll');
    }
}

function throttle(callback, wait) {
    let isThrottleLing = false;

    return function () {
        if (isThrottleLing) return;

        isThrottleLing = true;
        setTimeout(() => {
            callback();
            isThrottleLing = false;
        }, wait);
    };
}

const throttleScroll = throttle(scrollTop, 300);

window.addEventListener('scroll', throttleScroll);

// ================ SHOW ARROW SCROLL TOP ===============

const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';

const selectedTheme = localStorage.getItem('selectedTheme');
const selectedIcon = localStorage.getItem('selectedIcon');

const getTheme = () => (document.body.classList.contains(darkTheme) ? 'dark' : 'light');
const getIcon = () => (themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun');

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    // console.log(e.target);
    localStorage.setItem('selectedTheme', getTheme());
    localStorage.setItem('selectedIcon', getIcon());
});

/*==================== REDUCE THE SIZE AND PRINT ON AN A4 SHEET ====================*/
function scaleCv() {
    document.body.classList.add('scale-cv');
}

/*==================== REMOVE THE SIZE WHEN THE CV IS DOWNLOADED ====================*/
function removeScaleCv() {
    document.body.classList.remove('scale-cv');
}

/*==================== GENERATE PDF ====================*/
// PDF generated area
const areaCv = document.getElementById('area-cv');
const resumeButton = document.getElementById('resume-button');

// Html2pdf options
let opt = {
    margin: [0, -0.07, 0, 0],
    filename: 'myCv.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 4 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
};

// Function to call areaCv and Html2Pdf options
function generateResume() {
    html2pdf(areaCv, opt);
}

// When the button is clicked, it executes the three functions
resumeButton.addEventListener('click', () => {
    // 1. The class .scale-cv is added to the body, where it reduces the size of the elements
    scaleCv();

    // 2. The PDF is generated
    generateResume();

    // 3. The .scale-cv class is removed from the body after 5 seconds to return to normal size.
    setTimeout(removeScaleCv, 3000);
});
