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
    cellAlign: 'left',
    wrapAround: true,
    pageDots: false
});

const slideshowImages = document.querySelectorAll(".intro-slideshow img");

const nextImageDelay = 3000;
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
var clicks = 0;
var limit = 0;
var tagOne = '';
var tagTwo = '';
var tagThree = '';
var tagFour = '';
var tagFive = '';
var tagSix = '';
var resorts;
var tabs = document.querySelectorAll('.tab');
var resortImages = document.querySelectorAll('.resort-images');
var flikbuttonIcon = document.querySelectorAll('.gallery .flickity-prev-next-button')
var suggestedImages = document.querySelectorAll('.resort-images.suggested');
var suggestedTab = document.querySelectorAll('.tab.suggested-tab');
var resetFilters = document.querySelector('.reset-filters-button');
var refineFilters = document.querySelector('.refine');
var filtersSection = document.querySelector('.filters');
var resortlisting = document.querySelectorAll('.resorts-list .gallery-cell')
var islands = document.querySelectorAll('.island-picker');
var hero = document.querySelector('.hero');
var noresults = document.querySelector('.no-results');

for(i=0; i < islands.length; i++) {
    islands[i].addEventListener('click', function(){
        console.log('islands')
        reset();
        for(j=0; j < resortlisting.length; j++) {
            var resortsData = resortlisting[j].dataset.island.toLowerCase().replace(/\s+/g, '-');
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
                        gallery.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                      }, "1000");
                    
                    setTimeout(() => {
                        flkty.resize();
                        console.log("resized");
                    }, "2000");

                    gallery.classList.add('active');
                    map.classList.add('hide');
                    flkty.resize();
            }
        }
    });
}

console.log(resortlisting, 'listing');


refineFilters.addEventListener('click', function(){
    resorts = document.querySelectorAll('.flickity-slider .resort-selector');
    console.log('clicked reset');
    clicks = 0;
    limit = 0;
    tagOne = '';
    tagTwo = '';
    tagThree = '';
    tagFour = '';
    tagFive = '';
    tagSix = '';
    console.log(tagOne, 'reset');
    resorts.forEach((item,index) => {
        item.remove();
    })
    gallery.classList.remove('active');
    map.classList.remove('hide');
    noresults.classList.remove('active');

    tags.forEach((item,index) => {
        item.classList.remove('selected');
    })
    var rowWrappers = document.querySelectorAll('.tag-wrapper');
    rowWrappers.forEach((item,index) => {
        item.classList.remove('clicked');
    })
    console.log(selection, 'selection removed');
    filtersSection.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" }); 
})


resetFilters.addEventListener('click', function(){
    resorts = document.querySelectorAll('.flickity-slider .resort-selector');
    console.log('clicked reset');
    clicks = 0;
    limit = 0;
    tagOne = '';
    tagTwo = '';
    tagThree = '';
    tagFour = '';
    tagFive = '';
    tagSix = '';
    console.log(tagOne, 'reset');
    resorts.forEach((item,index) => {
        item.remove();
    })
    gallery.classList.remove('active');
    map.classList.remove('hide');
    noresults.classList.remove('active');

    tags.forEach((item,index) => {
        item.classList.remove('selected');
    })
    var rowWrappers = document.querySelectorAll('.tag-wrapper');
    rowWrappers.forEach((item,index) => {
        item.classList.remove('clicked');
    })
    for(j=0; j<tabs.length; j++){
        tabs[j].classList.remove('active-tab');
        resortImages[j].classList.remove('active');
    }
    for(k=0; k<suggestedImages.length; k++){
        suggestedImages[k].classList.add('active');
        suggestedTab[k].classList.add('active-tab');
    }
    console.log(selection, 'selection removed');
})

function reset(){
    resorts = document.querySelectorAll('.flickity-slider .resort-selector');
    console.log('clicked reset');
    clicks = 0;
    limit = 0;
    tagOne = '';
    tagTwo = '';
    tagThree = '';
    tagFour = '';
    tagFive = '';
    tagSix = '';
    console.log(tagOne, 'reset');
    resorts.forEach((item,index) => {
        item.remove();
    })
    gallery.classList.remove('active');
    map.classList.remove('hide');
    noresults.classList.remove('active');

    tags.forEach((item,index) => {
        item.classList.remove('selected');
    })
    var rowWrappers = document.querySelectorAll('.tag-wrapper');
    rowWrappers.forEach((item,index) => {
        item.classList.remove('clicked');
    })
    console.log(selection, 'selection removed');
    for(j=0; j<tabs.length; j++){
        tabs[j].classList.remove('active-tab');
        resortImages[j].classList.remove('active');
    }
    for(k=0; k<suggestedImages.length; k++){
        suggestedImages[k].classList.add('active');
        suggestedTab[k].classList.add('active-tab');
    }
}


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
        console.log(this.innerText.toLowerCase());
        if(!this.parentNode.classList.contains('clicked') && clicks <= 1 ){
            // this.classList.toggle('selected');
            // var topush = this.innerText.toLowerCase();
            // console.log('topush');
            // var triming = trim(topush);
            // console.log('pushed');
            // var clean = triming.replace(/\s+/g, '-');
            // selection.push(clean);
            // console.log('clean');
            // console.log(selection.join());
            // this.parentNode.classList.add('clicked');

            console.log('CLIcKS', clicks)

            if(clicks === 0) {
                this.classList.toggle('selected');
                var topush = this.innerText.toLowerCase();
                var triming = trim(topush);
                var clean = triming.replace(/\s+/g, '-');
                tagOne = clean;
                console.log('what');
                console.log('tagone: ', tagOne, clicks);
            }
            if(clicks === 1) {
                this.classList.toggle('selected');
                var topush = this.innerText.toLowerCase();
                var triming = trim(topush);
                var clean = triming.replace(/\s+/g, '-');
                tagTwo = clean;
                console.log('tagtwo: ', tagTwo, clicks);
            }
            if(clicks === 2) {
                this.classList.toggle('selected');
                var topush = this.innerText.toLowerCase();
                var triming = trim(topush);
                var clean = triming.replace(/\s+/g, '-');
                tagThree = clean;
                console.log('tagthree: ', tagThree, clicks);
            }
            if(clicks === 3) {
                this.classList.toggle('selected');
                var topush = this.innerText.toLowerCase();
                var triming = trim(topush);
                var clean = triming.replace(/\s+/g, '-');
                tagFour = clean;
                console.log('tagfour: ', tagFour, clicks);
            }
            if(clicks === 4) {
                this.classList.toggle('selected');
                var topush = this.innerText.toLowerCase();
                var triming = trim(topush);
                var clean = triming.replace(/\s+/g, '-');
                tagFive = clean;
                console.log('tagfive: ', tagFive, clicks);
            }
            if(clicks === 5) {
                this.classList.toggle('selected');
                var topush = this.innerText.toLowerCase();
                var triming = trim(topush);
                var clean = triming.replace(/\s+/g, '-');
                tagSix = clean;
                console.log('tagsix: ', tagSix, clicks);
            }
            clicks++;
        }
        updateButton.addEventListener('click', function(){
            for(j=0; j < resortlisting.length; j++) {
                var resortsData = resortlisting[j].dataset.tags;
                resortlisting[j].classList.remove('selected');
                resorts = document.querySelectorAll('.flickity-slider .resort-selector');
                if(resortsData.includes(tagOne) && resortsData.includes(tagTwo)){
                        console.log('found resort 3 tag');
                        console.log(resortlisting[j]);
                        resortlisting[j].classList.add('selected');
                        console.log(resortlisting[j]);
                        flkty.insert( resortlisting[j]);
                        flkty.reloadCells();
                        
                        setTimeout(() => {
                            flkty.resize();
                            console.log("resized");
                        }, "100");

                        setTimeout(() => {
                            gallery.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" }); 
                        }, "1000"); 

                        setTimeout(() => {
                            flkty.resize();
                            console.log("resized");
                        }, "1000");

                        gallery.classList.add('active');
                        map.classList.add('hide');
                        flkty.resize();
                        noresults.classList.remove('active');
                    }   
                else if(resortsData.includes(tagOne) && !resortsData.includes(tagTwo) && !resortsData.includes(tagThree)){
                        console.log('1 match');
                        console.log(resortlisting[j]);
                        resortlisting[j].classList.add('selected');
                        console.log(resortlisting[j]);
                        flkty.insert( resortlisting[j]);
                        flkty.reloadCells();
                        
                        setTimeout(() => {
                            flkty.resize();
                            console.log("resized");
                        }, "100");

                        setTimeout(() => {
                            flkty.resize();
                            console.log("resized");
                        }, "1000");

                        setTimeout(() => {
                            gallery.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" }); 
                        }, "1000"); 

                        gallery.classList.add('active');
                        map.classList.add('hide');
                        flkty.resize();
                        break;
                } else {
                    console.log('no resorts');
                    noresults.classList.add('active');
                    noresults.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" }); 
                }
            }
        });

    });
}

setTimeout(() => {
    var description = document.querySelectorAll('.resort-description-list');
    for(i=0; i<description.length; i++) {
        var html = description[i].innerText.trim().replace(/[^\r\n]+/g, '<li>$&</li>');
        console.log(html);
        description[i].innerHTML = html;
    }
}, "500");

if (window.location.href.indexOf("?") > -1) {
    var url = window.location.href;
    var urlSplit = url.split('?');
    var urlfound = urlSplit[1];
    console.log(urlfound)

    for(j=0; j < resortlisting.length; j++) {
        var resortsName = resortlisting[j].dataset.resortname;
        resortlisting[j].classList.remove('selected');
        resorts = document.querySelectorAll('.flickity-slider .resort-selector');
        if(resortsName.includes(urlfound)){
            console.log('query map found');
            console.log('found resort 3 tag');
            console.log(resortlisting[j]);
            resortlisting[j].classList.add('selected');
            console.log(resortlisting[j]);
            flkty.insert( resortlisting[j]);
            flkty.reloadCells();
            
            setTimeout(() => {
                flkty.resize();
                console.log("resized");
            }, "100");

            setTimeout(() => {
                gallery.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" }); 
            }, "1000"); 

            setTimeout(() => {
                flkty.resize();
                console.log("resized");
            }, "1000");

            gallery.classList.add('active');
            map.classList.add('hide');
            flkty.resize();
            noresults.classList.remove('active');
        }
    }

}