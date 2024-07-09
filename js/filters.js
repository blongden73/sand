var flkty = new Flickity('.js-flickity');
var gallery = document.querySelector('.gallery');
var map = document.querySelector('.map');
var tags = document.querySelectorAll('.tag');
var resorts = document.querySelectorAll('.resort-selector');
var updateButton = document.querySelector('.update-results-button');
var selection = [];

for(i=0; i < tags.length; i++) {
    tags[i].addEventListener('click', function(){
        for(g=0; g < resorts.length; g++) {
        var resortsData = resorts[g].dataset.tags;
        }
        this.classList.toggle('selected');
        selection.push(this.innerText.toLowerCase().replace(/\s+/g, '-'))
        console.log(selection.join());

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