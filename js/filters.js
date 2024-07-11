var flkty = new Flickity('.js-flickity', {
    draggable: false
});

var flktyIsland = new Flickity('.carousel-island', {
    draggable: false,
    cellAlign: 'left'
});

const slideshowImages = document.querySelectorAll(".intro-slideshow img");

const nextImageDelay = 2000;
let currentImageCounter = 0; // setting a variable to keep track of the current image (slide)

// slideshowImages[currentImageCounter].style.display = "block";
slideshowImages[currentImageCounter].style.opacity = 1;

setInterval(nextImage, nextImageDelay);

function nextImage() {
  // slideshowImages[currentImageCounter].style.display = "none";
  slideshowImages[currentImageCounter].style.opacity = 0;

  currentImageCounter = (currentImageCounter+1) % slideshowImages.length;

  // slideshowImages[currentImageCounter].style.display = "block";
  slideshowImages[currentImageCounter].style.opacity = 1;
}

var gallery = document.querySelector('.gallery');
var map = document.querySelector('.map');
var tags = document.querySelectorAll('.tag');
var resorts = document.querySelectorAll('.resort-selector');
var updateButton = document.querySelector('.update-results-button');
var selection = [];
var tabs = document.querySelectorAll('.tab');
var resortImages = document.querySelectorAll('.resort-images');
var flikbuttonIcon = document.querySelectorAll('.gallery .flickity-prev-next-button')
var suggestedImages = document.querySelectorAll('.resort-images.suggested');
var suggestedTab = document.querySelectorAll('.tab.suggested-tab');
var resetFilters = document.querySelector('.reset-filters-button');

console.log(suggestedImages);

resetFilters.addEventListener('click', function(){
    selection = []
    tags.forEach((item,index) => {
        item.classList.remove('selected');
    })
    var rowWrappers = document.querySelectorAll('.tag-wrapper');
    rowWrappers.forEach((item,index) => {
        item.classList.remove('clicked');
    })
    console.log(selection, 'selection removed');
})

flikbuttonIcon.forEach((item,index) => {
    item.addEventListener('click', function(){
        for(j=0; j<tabs.length; j++){
            tabs[j].classList.remove('active-tab');
            resortImages[j].classList.remove('active');
        }
        for(k=0; k<suggestedImages.length; k++){
            suggestedImages[k].classList.add('active');
            suggestedTab[k].classList.add('active-tab');
        }
    })
})

tabs.forEach((item,index) => {
    item.addEventListener('click', function(){
        for(j=0; j<tabs.length; j++){
            tabs[j].classList.remove('active-tab');
            resortImages[j].classList.remove('active');
        }
        this.classList.add('active-tab');
        console.log(resortImages, index);
        resortImages[index].classList.add('active');
    })
})

for(i=0; i < tags.length; i++) {
    tags[i].addEventListener('click', function(){
        // for(g=0; g < resorts.length; g++) {
        // var resortsData = resorts[g].dataset.tags;
        // }
        if(!this.parentNode.classList.contains('clicked')){
            this.classList.toggle('selected');
            this.parentNode.classList.add('clicked');
            selection.push(this.innerText.toLowerCase().replace(/\s+/g, '-'))
            console.log(selection.join());
        }
        updateButton.addEventListener('click', function(){
            for(j=0; j < resorts.length; j++) {
                var resortsData = resorts[j].dataset.tags;
                resorts[j].classList.remove('selected');
                if(resortsData.includes(selection.join())){
                    console.log('found resort', j);
                    resorts[j].classList.add('selected');
                    gallery.classList.add('active');
                    map.classList.add('hide');
                    gallery.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
                    flkty.resize();
                    flkty.reloadCells();
                }else {
                    console.log('no resorts found', j);
                }
            }
        });
    });
}