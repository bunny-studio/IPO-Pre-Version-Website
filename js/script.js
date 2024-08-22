window.addEventListener('contextmenu', (events) => {
    events.preventDefault();
}, false)

// ----- Cursor Animations Starts ----
document.addEventListener('mousemove', function (e) {
    const cursor = document.getElementById('custom-cursor');
    const isHovering = cursor.style.display === 'block';

    if (isHovering) {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    }
});
document.querySelectorAll('.special-section, .special-link').forEach(element => {
    element.addEventListener('mouseenter', () => {
        document.getElementById('custom-cursor').style.display = 'block';
    });

    element.addEventListener('mouseleave', () => {
        document.getElementById('custom-cursor').style.display = 'none';
    });
});
// ----- Cursor Animations Ends ----


// -----  Get the button - Go To Top Starts ----
const topUpBtn = document.getElementById("topupBtn");
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

const UnactiveNavlink = document.querySelectorAll(".unactive");
const sections = document.querySelectorAll(".section");

// Navigation Menu Toggle
// const navBarOpen = document.getElementById("navBtn");
// const navBarClose = document.getElementById("navBtnClose");
// const navBar = document.getElementById("sideMenu");
// const navLinks = navBar.querySelectorAll("a");

window.onscroll = () => {
    scrollFunction();
    highlightNavLinks();
};

function scrollFunction() {
    if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
    ) {
        topUpBtn.style.bottom = "7em";
    } else {
        topUpBtn.style.bottom = "-5em";
    }
}
// -----  Get the button - Go To Top Ends ----

// -----  Highlight Navigation Links Starts ----
function highlightNavLinks() {
    sections.forEach((sec) => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let offsetHeight = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + offsetHeight) {
            UnactiveNavlink.forEach((links) => {
                links.classList.remove("active");
                document.querySelector(".unactive[href*=" + id + "]").classList.add("active");
            });
        }
    });
}
// -----  Highlight Navigation Links Ends ----

// ----- Search Section Starts ----
const searchBtns = document.getElementById('searchBtns');
const searchBox = document.getElementById('search');
const closeBtn = document.getElementById('closeBtn');
searchBtns.addEventListener('click', () => {
    if (searchBox.style.display = 'none') {
        searchBox.style.top = '0';
        searchBox.style.display = 'block';
        document.body.classList.add("no-scroll");
    }
    closeBtn.addEventListener('click', () => {
        if (searchBox.style.display = 'block') {
            searchBox.style.top = '-90em';
            document.body.classList.remove("no-scroll");
        }
    })
})
// ----- Search Section Ends ----

// ----- About Section Starts ----
const aboutContent = document.querySelector('.about-content');
const scrollBar = document.querySelector('.scroll-bar');

aboutContent.addEventListener('scroll', () => {
    const maxScrollLeft = aboutContent.scrollWidth - aboutContent.clientWidth;
    const scrollLeft = aboutContent.scrollLeft;
    const scrollPercentage = (scrollLeft / maxScrollLeft) * 101;
    scrollBar.style.width = `${scrollPercentage}%`;
});

const cursorText = document.getElementById("textPath");
const hoverAbout = document.getElementById("aboutContent");
hoverAbout.addEventListener('mousemove', () => {
    cursorText.innerHTML = 'Swipe to Explore • Swipe to Explore •';
    cursorText.style.fontSize = '11.1px';
});
hoverAbout.addEventListener('mouseleave', () => {
    cursorText.innerHTML = 'Scroll to Explore • Scroll to Explore •';
    cursorText.style.fontSize = '10.4px';
});

// ----- About Section Ends ----
