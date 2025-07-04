const slidesContainer = document.getElementById('slides');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dots');

let currentIndex = 0;
let slides = [];
const slideCount = 5;

async function fetchCatImages() {
    try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${slideCount}`);
        const data = (await response.json()).slice(0, slideCount);
        
        console.log(data);                



        data.forEach((cat, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.innerHTML = `<img src="${cat.url}" alt="Cat ${index + 1}">`;
            slidesContainer.appendChild(slide);
        });
        
        updateDots  ();
        
    } catch (error) {
        console.error('Error fetching cat images:', error);
        slidesContainer.innerHTML = '<div class="loading">Failed to load images. Please try again later.</div>';
    }
}

function addPortfolioComponents(){ 
        var temp = document.createElement('div');
        temp.className = 'slide';
        temp.innerHTML = `<a href="biography.html"><img src="images/biography/cat.jpg" alt="Biography cat"></a>`;
        slidesContainer.appendChild(temp);    

        temp = document.createElement('div');
        temp.className = 'slide';
        temp.innerHTML = `<a href="resume.html"><img src="images/resume/cat.jpg" alt="Resume"></a>`;
        slidesContainer.appendChild(temp);   

        updateDots();
}

function updateSlider() {
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function updateDots(){
        slides = document.querySelectorAll('.slide');
    
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }

        updateSlider();
}

function goToSlide(index) {
    currentIndex = index;
    updateSlider();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

slidesContainer.innerHTML = '';
dotsContainer.innerHTML = '';
//addPortfolioComponents();
fetchCatImages();

let slideInterval = setInterval(nextSlide, 5000);

prevBtn.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

prevBtn.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

nextBtn.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

nextBtn.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

slidesContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

slidesContainer.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});