export function sliderOn () {
    const sliderImages = document.querySelectorAll('.banner__img');
    const sliderLine = document.querySelector('.img__wrap');
    const dots = document.querySelectorAll('.dots');
    


    window.addEventListener('resize', showSlide);
    let sliderCount = 0;
    let sliderWidth;

    function showSlide() {
        sliderWidth = document.querySelector('.banner__wrapper').offsetWidth;
        sliderLine.style.width = sliderWidth * sliderImages.length + 'px';
        sliderImages.forEach(item => item.style.width = sliderWidth + 'px');

        rollSlider();
    }
    showSlide();

   


    
    const nextSlide = () => {
        sliderCount++;
        if(sliderCount >= sliderImages.length) sliderCount = 0;
        rollSlider();
        thisSlide(sliderCount);
        
    }
    
    const prevSlide = () => {
        sliderCount--;
        if(sliderCount < 0) sliderCount = sliderImages.length - 1;
        rollSlider();
        thisSlide(sliderCount);
       
    }

    function rollSlider() {
        sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
    }
    
    
    function thisSlide (index) {
        dots.forEach(item => item.classList.remove('active'));
        dots[index].classList.add('active');
    }
    
    
    dots.forEach ((dot, index) => {
        dot.addEventListener('click', () => {
            sliderCount = index;
            rollSlider();
            thisSlide(sliderCount);
        })
    })
    
    setInterval (() => {
        nextSlide()
    }, 5000)
}
