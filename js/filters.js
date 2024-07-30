console.log('v2');

// function includeHTML() {
//   var z, i, elmnt, file, xhttp;
//   /* Loop through a collection of all HTML elements: */
//   z = document.getElementsByTagName("*");
//   for (i = 0; i < z.length; i++) {
//     elmnt = z[i];
//     /*search for elements with a certain atrribute:*/
//     file = elmnt.getAttribute("w3-include-html");
//     if (file) {
//       /* Make an HTTP request using the attribute value as the file name: */
//       xhttp = new XMLHttpRequest();
//       xhttp.onreadystatechange = function() {
//         if (this.readyState == 4) {
//           if (this.status == 200) {elmnt.innerHTML = this.responseText;}
//           if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
//           /* Remove the attribute, and call this function once more: */
//           elmnt.removeAttribute("w3-include-html");
//           includeHTML();
//         }
//       }
//       xhttp.open("GET", file, true);
//       xhttp.send();
//       /* Exit the function: */
//       return;
//     }
//   }
// }

function trim(s) { 
    s = s.replace(/(^\s*)|(\s*$)/gi,"");
    s = s.replace(/[ ]{2,}/gi," "); 
    s = s.replace(/\n /,"\n"); 
    return s;
}

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
var updateButton = document.querySelector('.update-results-button');
var selection = [];
var resorts;
var tabs = document.querySelectorAll('.tab');
var resortImages = document.querySelectorAll('.resort-images');
var flikbuttonIcon = document.querySelectorAll('.gallery .flickity-prev-next-button')
var suggestedImages = document.querySelectorAll('.resort-images.suggested');
var suggestedTab = document.querySelectorAll('.tab.suggested-tab');
var resetFilters = document.querySelector('.reset-filters-button');
var resortlisting = document.querySelectorAll('.resorts-list .gallery-cell')
var islands = document.querySelectorAll('.island-picker');

for(i=0; i < islands.length; i++) {
    islands[i].addEventListener('click', function(){
        console.log('islands')
        for(j=0; j < resortlisting.length; j++) {
            var resortsData = resortlisting[j].dataset.island.toLowerCase();
            console.log(resortsData,this.dataset.island.toLowerCase(), 'island')
            resortlisting[j].classList.remove('selected');
            if(resortsData == this.dataset.island.toLowerCase()) {
                console.log('found resort island', j);
                    resortlisting[j].classList.add('selected');
                    console.log(resortlisting[j]);
                    flkty.insert( resortlisting[j]);
                    flkty.reloadCells();
                    
                    setTimeout(() => {
                        flkty.resize();
                        console.log("resized");
                      }, "500");

                    gallery.classList.add('active');
                    map.classList.add('hide');
                    gallery.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
                    flkty.resize();
            }
        }
    });
}

console.log(resortlisting, 'listing');

resetFilters.addEventListener('click', function(){
    selection = []
    resorts.forEach((item,index) => {
        item.remove();
    })
    gallery.classList.remove('active');
    map.classList.remove('hide');

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
        this.classList.toggle('selected');
        console.log(this.innerText.toLowerCase());
        if(!this.parentNode.classList.contains('clicked') && this.innerText.toLowerCase() == 'adults only' || !this.parentNode.classList.contains('clicked') && this.innerText.toLowerCase() == 'families with kids' ){
            var topush = this.innerText.toLowerCase();
            console.log('topush');
            var triming = trim(topush);
            console.log('pushed');
            var clean = triming.replace(/\s+/g, '-');
            selection.push(clean);
            console.log('clean');
            console.log(selection.join());
            this.parentNode.classList.add('clicked');
        }
        updateButton.addEventListener('click', function(){
            console.log('click');
            console.log(resortlisting);

            for(j=0; j < resortlisting.length; j++) {
                var resortsData = resortlisting[j].dataset.tags;
                console.log(resortsData);
                resortlisting[j].classList.remove('selected');
                resorts = document.querySelectorAll('.flickity-slider .resort-selector');
                console.log(resortsData, '|||', selection.join(), 'this is important');
                if(resortsData.includes(selection.join())){
                    console.log('found resort', j);
                    console.log(resortlisting[j]);
                    resortlisting[j].classList.add('selected');
                    console.log(resortlisting[j]);
                    flkty.insert( resortlisting[j]);
                    flkty.reloadCells();
                    
                    setTimeout(() => {
                        flkty.resize();
                        console.log("resized");
                      }, "100");

                    gallery.classList.add('active');
                    map.classList.add('hide');
                    gallery.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
                    flkty.resize();
                }else {
                    console.log('no resorts found', j);
                }
            }
        });
    });
}