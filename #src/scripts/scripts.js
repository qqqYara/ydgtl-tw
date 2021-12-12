
$(document).ready(function () {

    new WOW().init();
    
    
    // new-products swiper
    const casesSwiper = document.getElementsByClassName('swiper_new-products');

    if (casesSwiper){
        let mySwiper = new Swiper('#new-products', {
            // Optional parameters
            direction: 'horizontal',
            slidesPerView: 1,
            loop: true,
            spaceBetween: 15,
            navigation: {
                nextEl: '#new_products-list-next',
                prevEl: '#new_products-list-prev',
            },
            breakpoints: {
                0:{
                    slidesPerView: 1,
                    spaceBetween: 15,
                },
                576:{
                    slidesPerView: 2,
                },
                768:{
                    slidesPerView: 3,
                }
            }
        })
    }
    // featured-products swiper
    const casesSwiper = document.getElementsByClassName('swiper_featured-products');

    if (casesSwiper){
        let mySwiper = new Swiper('#featured-products', {
            // Optional parameters
            direction: 'horizontal',
            slidesPerView: 1,
            loop: true,
            spaceBetween: 15,
            navigation: {
                nextEl: '#featured-list-next',
                prevEl: '#featured-list-prev',
            },
            breakpoints: {
                0:{
                    slidesPerView: 1,
                    spaceBetween: 15,
                },
                576:{
                    slidesPerView: 2,
                },
                768:{
                    slidesPerView: 3,
                }
            }
        })
    }
});

