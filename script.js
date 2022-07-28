let searchParams = location.search.split('=').pop();

const apiKey = 'nKp4NhX4CPRBxP8gvNQC6sop_Un33tALyVJceCRbRNg';

const randomImg = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=30`;
const searchImg = `https://api.unsplash.com/search/photos?client_id=${apiKey}&query=${searchParams}&per_page=50`;


const gallery = document.querySelector('.gallery');

let currentImage = 0;

let images; //this will store all the images

const getImages = () => {
    fetch(randomImg)
    .then(response => response.json())
    .then(data => {
        images = data;
        makeImages(images);
    });
}

const searchImages = () => {
    fetch(searchImg)
    .then(response => response.json())
    .then(data => {
        images = data.results;
        makeImages(images);
    });
}

const makeImages = (data) => {
    console.log(data)
    data.forEach((item, index) => {
        
        let img = document.createElement('img');
        img.className = 'gallery_img';
        img.src = item.urls.regular;

        gallery.appendChild(img);

        //popup image
        img.addEventListener('click', () => {
            currentImage = index;
            showPopup(item);
        })
    });
}

const showPopup = (item) => {
    let popup = document.querySelector('.image_popup');
    const download = document.querySelector('.download_btn');
    const closePop = document.querySelector('.close_btn');
    const image = document.querySelector('.img_pop');

    popup.classList.remove('hide');
    download.href = item.links.html;
    download.target = '_blank';
    image.src = item.urls.regular;
    closePop.addEventListener('click', () => {
        popup.classList.add('hide');
    })
}

if(searchParams == ''){
    getImages();
} else {
    searchImages();
}


//controls

const preBtn = document.querySelector('.pre_btn');
const nxtBtn = document.querySelector('.nxt_btn');

preBtn.addEventListener('click', () => {
    if(currentImage > 0){
        currentImage--;
        showPopup(images[currentImage]);
        console.log(currentImage)
    }
    
});

nxtBtn.addEventListener('click', () => {
    if(currentImage < images.length -1){
        currentImage++;
        showPopup(images[currentImage]);
    }
});