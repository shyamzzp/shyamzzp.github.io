// Designed by: Crank 
// Original image: https://dribbble.com/shots/5707503-Reading-Application?utm_source=Pinterest_Shot&utm_campaign=crankwh&utm_content=Reading%20Application&utm_medium=Social_Share

"use strict";

gsap.registerPlugin(ScrollTrigger);

let info ;
let genre;
const request = "https://www.json-generator.com/api/json/get/cqyGXnDfjC?indent=2";
const html = document.documentElement;
const container = document.querySelector(".container")
const tabbarList = document.querySelector(".tabbar__list");
const main = container.querySelector(".main")
const productCard = main.querySelector(".product-card");
let productCardItems; 
const header = document.querySelector(".header");
const time = parseFloat( getComputedStyle(document.documentElement).getPropertyValue("--duration-header") ) * 1000;
const globalButton = document.querySelector(".global-button");
const globalButtonBack = globalButton.querySelector(".global-button__back");
let elements; 
let activeItem;
let isMove = false;
let startY;
let scrollTop;
let startX;
let scrollLeft;
let tabbarItemActive = tabbarList.querySelector(".tabbar__item.active");
const statusBar = document.querySelector(".status-bar");
const statusBarClock = document.querySelector(".status-bar__clock");
let progressScroll = 0;
let notScroll = false;

fetch(request)
.then(response => response.json())
.then(item => {
    info = item;
    booksGenre(info);
    setMaxHeight();
})

function setMaxHeight() {

    document.body.style.height = window.innerHeight + "px";
    const maxHeightItem = container.clientHeight - globalButton.offsetHeight - statusBar.offsetHeight;
    html.style.setProperty("--max-height-item", `${maxHeightItem}px`);
    html.style.setProperty("--height-body", `${window.innerHeight}px`);
}

function booksGenre(info){    

    const key = tabbarItemActive.textContent;
    genre = info[key];

    if (!genre) return;
    productCard.innerHTML = "";
    genre.forEach(book => {
        
        book.rank = `${book.rank}`.replace(/^\d$/, "$&.0");
        const width = 100 - book.rank * 20;
        
        book.keywords.forEach(word => {
            
            const regex = new RegExp(`${word}`, `i`);
            book.description = book.description.replace(regex, `<b style="color:black">${word}</b>`);
            
        })
        
        productCard.insertAdjacentHTML("beforeend", creatBook(book, width));
        
    })
    
    productCardItems = Array.from(productCard.children);
    const productCardHeight = (genre.length + 3) *  productCard.firstElementChild.offsetHeight;
    html.style.setProperty("--productCardHeight", `${productCardHeight}px`);

    main.scrollTop = 0;

    ScrollTrigger.getAll().forEach(item => {
        item.kill()
    });

    roll(productCardItems);

}

function creatBook(book, width) {

    const {picture, name, author, rank, view, description} = book;

    return `
    <li class="product-card__item">
        
        <div class="product-card__img">
            <img class="img" src="${picture}" alt="book">
        </div>

        <article class="product-card__content">

            <header class="product-card__info">

                <h2 class="product-card__product-name">${name}</h2>

                <footer class="product-card__product-author">${author}</footer>

                <div class="product-card__rank">

                    <div class="product-card__starts flex" style="--rank:${width}%;">

                        <img class="product-card__start-icon" src="http://utopian-drink.surge.sh/images/icon/star.svg" alt="star-icon">
                        <img class="product-card__start-icon" src="http://utopian-drink.surge.sh/images/icon/star.svg" alt="star-icon">
                        <img class="product-card__start-icon" src="http://utopian-drink.surge.sh/images/icon/star.svg" alt="star-icon">
                        <img class="product-card__start-icon" src="http://utopian-drink.surge.sh/images/icon/star.svg" alt="star-icon">
                        <img class="product-card__start-icon" src="http://utopian-drink.surge.sh/images/icon/star.svg" alt="star-icon">

                    </div>

                    <span class="product-card__rank-number">${rank}</span>
                    <span class="product-card__view-value hide">(${view})</span>

                </div>
                
                <div class="product-card__view">

                    <p class="product-card__view-number">${view}</p>
                    <p>views</p>

                </div>

            </header>  

            <div class="flex product-card__buttons">

                <button class="flex">

                    <img class="product-card__button-icon img" src="http://utopian-drink.surge.sh/images/icon/reviews.svg" alt="reviews">
                    <p class="product-card__button-text">see reviews</p>

                </button>

                <button class="flex">

                    <img class="product-card__button-icon img" src="http://utopian-drink.surge.sh/images/icon/heart.svg" alt="like">
                    <p class="product-card__button-text">like</p>

                </button>

                <button class="flex">

                    <img class="product-card__button-icon img" src="http://utopian-drink.surge.sh/images/icon/share.svg" alt="share">
                    <p class="product-card__button-text">share</p>

                </button>

            </div>

            <footer class="product-card__context">

                <h3>about the book</h3>
                <p class="product-card__description">${description}</p>

            </footer>

        </article>

        <button class="product-card__cta">read now</button>
       
    </li>`
}

function openProductCard(e, productCardItems) {
    
    const target = e.target;
    activeItem = target.closest(".product-card__item");
    
    if ( target.closest(".product-card__img")) {
        activeItem.classList.remove("active");
        closeProductCard(elements);
        return;
        
    }
    
    if ( !target.closest(".product-card__content") ) return;

    const indexActiveItem = productCardItems.findIndex(item => item == activeItem);
    notScroll = true;
    main.scrollTo(0, indexActiveItem * productCardItems[0].offsetHeight);
    const productCardWrapperImg = activeItem.querySelector(".product-card__img"); 
    const productCardContent = activeItem.querySelector(".product-card__content"); 
    const productCardView = productCardContent.querySelector(".product-card__view"); 
    const productCardViewValue = productCardContent.querySelector(".product-card__view-value"); 

    elements = [
        activeItem, 
        productCardWrapperImg, 
        productCardContent, 
        productCard, 
        header, 
        container, 
        productCardView, 
        productCardViewValue,
    ];

    header.classList.add("hide");

    if (header.classList.contains("hide")) {
       
        productCard.style.paddingTop = `${globalButton.offsetHeight}px`;
        
    }

    activeItem.style.cssText = `
        --timeOut : 0s;
        --transform : none;
    
    `

    main.style.cssText = `
        pointer-events : none;
        overflow: hidden;

    `;
   
    container.classList.add("active");
    productCardView.classList.add("hide") ;
    productCardViewValue.classList.remove("hide");
    
    productCardContent.classList.add("open-content");
    productCardWrapperImg.classList.add("move-img");
    
    activeItem.classList.add("active");


}



function closeProductCard(elements) {
   
    const [
        activeItem, 
        productCardWrapperImg, 
        productCardContent, 
        productCard, 
        header, 
        container, 
        productCardView, 
        productCardViewValue,
    ] = elements;
    
    if (!activeItem.classList.contains("active")) {
        
        productCardWrapperImg.classList.add("back-img");
        productCardContent.classList.remove("open-content");
        container.classList.remove("active");
        productCardView.classList.remove("hide");
        productCardViewValue.classList.add("hide");
        productCardContent.style.opacity = 0;
        
        setTimeout(() => {
            productCard.style = "";
            header.classList.remove("hide");
        },time);
        
    }
    
    productCardWrapperImg.addEventListener("animationend", function(e) {
        
        if(e.animationName.includes("img-back")) {
            productCardItems.forEach(item => {
                item.style.removeProperty("--timeOut");
                item.classList.remove("hide");
            });

            this.classList.remove("move-img", "back-img");
            productCardContent.style = "";
            main.style = "";
            activeItem.style = "";
           
        }
        
    });


}

function showTime() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (hours == 0) {
        hours = 12;
    }
    
    if (hours > 12) {
        hours = hours - 12;
    }

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;

    statusBarClock.textContent = `${hours}:${minutes}`;
    setTimeout(showTime, 1000);
};

showTime();

tabbarList.addEventListener("click", function(e) {

    if (tabbarItemActive == e.target) return;

    if (e.target.tagName != "LI") return;
        
    tabbarItemActive = e.target;
    booksGenre(info);
    
    if (!genre) return;

    tabbarItemActive.classList.add("active");


    gsap.to(".product-card__content", {
        duration: .4,
        rotationY : -180,
        scaleX: -1,
    });

    gsap.fromTo(".product-card__img", 
    {duration : .75 ,filter: "brightness(.5)"}, 
    {duration : .75 ,filter: "brightness(1)"});

    gsap.to(".product-card__content", {clearProps:"all"});

    tabbarList.querySelectorAll(".tabbar__item").forEach(item => {

        if (item != tabbarItemActive) {
            item.classList.remove("active");
        }

    });

});

tabbarList.addEventListener("pointerdown", function(e) {


    isMove = true;
    startX = Math.floor(e.pageX - this.getBoundingClientRect().left);
    scrollLeft = this.scrollLeft;

});

tabbarList.addEventListener("pointermove", function(e) {

    if (!isMove) return;

    this.style.cssText = `
        --pointer-event: none;
        cursor : grabbing;

    `
    const lastX = Math.floor(e.pageX - this.getBoundingClientRect().left);
    const walk = lastX - startX; 
    this.scrollLeft = scrollLeft - walk;
    
});

tabbarList.addEventListener("pointerup", function() {
    isMove = false;
    this.style = "";

});

tabbarList.addEventListener("pointerleave", function() {
    isMove = false;
    this.style = "";

});

header.addEventListener("transitionend", function() {

    if (this.classList.contains("hide")) {

        globalButton.classList.add("show");

    }
    
});

header.addEventListener("transitionstart", () => {
    globalButton.classList.remove("show");

});

globalButtonBack.addEventListener("click", () => {
    activeItem.classList.remove("active");
    closeProductCard(elements);
    
});

productCard.addEventListener("click", (e) => openProductCard(e, productCardItems) );

function roll(productCardItems) {
    
    productCardItems.forEach((item, index) => {

        gsap.set(item ,{transformPerspective : 1000,});
        
        const animation = gsap.to(item, {
            
            rotationX : 95,
            y : 70,
            opacity : 0,
            
        });

        ScrollTrigger.create({

            animation: animation,
            trigger : item,
            scroller : main,
            start : `top+=5 top`,
            end : `bottom-=5 top`,
            scrub : true,
            
            onEnter : progress => {
                progressScroll = progress.end + 5;
            },
            
            onLeaveBack : progress => {
                progressScroll = progress.start - 5;
            },
            
            onEnterBack : progress => {
                progressScroll = progress.start - 5;
            },

            onUpdate: ({direction ,isActive}) => {
                
                productCardItems.forEach(item => {
                    
                    if (index == productCardItems.length - 1) return;
                    
                    if (isActive) item.style.marginBottom = direction * .25 + "em";
                    else item.style.removeProperty("margin-bottom");
                    
                });

            },

        }); 
    })

    
}


function scrollInMain() {
    
    if (notScroll) return

    main.scroll({
        top : progressScroll,
        behavior : "smooth"
    });

}

main.addEventListener("pointerdown", function(e) {
    
    if (activeItem && activeItem.classList.contains("active")) return;

    isMove = true;
    startY = Math.floor(e.pageY - this.getBoundingClientRect().top);
    scrollTop = this.scrollTop;
    
});

main.addEventListener("pointermove", function(e) {
    
    if (!isMove) return;

    notScroll = false;
    const lastY = Math.floor(e.pageY - this.getBoundingClientRect().top);
    const walk = lastY - startY;
    this.scrollTop = scrollTop - walk;
    this.style.setProperty("--pointer-event", "none");

});

main.addEventListener("pointerup", function() {
    
    isMove = false;
    this.style.removeProperty("--pointer-event");
    scrollInMain();
    
});

main.addEventListener("pointerleave", function() {
    isMove = false;
    this.style.removeProperty("--pointer-event");

});

window.addEventListener("resize", setMaxHeight);

document.ondragstart = () => {
    return false;
};