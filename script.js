

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader')

let ready = false;
let imagesLoaded = 0;
let totalImages =0;
let photosArray = [];

// unsplash API

const count = 30;

const apiKey ='Dqx1gfXvOQ6-gPyCNnOvGc8lDzfJYYkl3P_Me2vdKUo';

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images were loaded
function imageLoaded(){
    
    imagesLoaded++;
    
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        
    }
}

//helper function to set attributes on DOM elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

//create elements for links & photos, add to DOM

function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    
    
    // run function for each object in photos
    photosArray.forEach( (photo) => {
        // to create a <a> to link to unsplash
        const item = document.createElement('a');
       

        setAttributes(item, {
            href:photo.links.html,
            target: '_blank',
            
        });

        //create <image> for photo
        const img = document.createElement('img');
       

        setAttributes(img, {
            src:photo.urls.regular,
            title:photo.alt_description,
            alt:photo.alt_description
        });

        //event listener, check when is finished loading
        img.addEventListener('load', imageLoaded);
        
       // put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
        
        
    });
}

// get photos from unplash api

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();

        displayPhotos();

        //console.log(photosArray);
        
    }catch(error){
        console.log(error);
        
    }
}

//check to see if scrolling near bootm of page, load more fotos
window.addEventListener('scroll', () => {
    //console.log('scrolled');
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

// on load

getPhotos();