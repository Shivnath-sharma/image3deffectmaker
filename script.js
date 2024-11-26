document.getElementById('uploadButton').addEventListener('click', function () {
    document.getElementById('fileInput').click();
});

let images = []; 
let currentIndex = 0;
const defaultImageSrc = "default.png"; 

document.addEventListener('DOMContentLoaded', function () {
    
    const gallery = document.getElementById('imageGallery');
    const defaultImage = createDefaultImage();
    gallery.appendChild(defaultImage);
});

document.getElementById('fileInput').addEventListener('change', function (event) {
    const files = event.target.files;
    const gallery = document.getElementById('imageGallery');

    const defaultImage = document.getElementById('defaultImage');
    if (defaultImage) {
        gallery.removeChild(defaultImage);
    }

    Array.from(files).forEach((file, index) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = `Uploaded Image ${index + 1}`;
                img.classList.add('uploaded-image');
                img.style.width = "200px";
                img.style.display = "none";

                images.push(img);

                VanillaTilt.init(img, {
                    max: 25, 
                    speed: 400, 
                    glare: true, 
                    "max-glare": 0.6 
                });

                gallery.appendChild(img);

                if (images.length === 1) {
                    img.style.display = "block";
                    currentIndex = 0;
                    updateNavigationButtons();
                }
            };
            reader.readAsDataURL(file);
        }
    });
});

document.getElementById('nextButton').addEventListener('click', function () {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        updateImageDisplay();
    }
});

document.getElementById('prevButton').addEventListener('click', function () {
    if (currentIndex > 0) {
        currentIndex--;
        updateImageDisplay();
    }
});

function updateImageDisplay() {
    const gallery = document.getElementById('imageGallery');
    images.forEach((img) => (img.style.display = 'none'));

    if (images[currentIndex]) {
        images[currentIndex].style.display = 'block';
    } else if (images.length === 0) {
        
        const defaultImage = createDefaultImage();
        gallery.appendChild(defaultImage);
    }

    updateNavigationButtons();
}

function updateNavigationButtons() {
    document.getElementById('prevButton').disabled = currentIndex === 0;
    document.getElementById('nextButton').disabled = currentIndex === images.length + 1;
}

document.getElementById('increaseSize').addEventListener('click', function () {
    adjustImageSize(1.1);
});

document.getElementById('decreaseSize').addEventListener('click', function () {
    adjustImageSize(0.9);
});

function adjustImageSize(scaleFactor) {
    const activeImage = images[currentIndex];
    if (activeImage) {
        const currentWidth = activeImage.offsetWidth;
        activeImage.style.width = `${currentWidth * scaleFactor}px`;
    } else {
        alert('No image to adjust size.');
    }
}

document.getElementById('deletePhoto').addEventListener('click', function () {
    if (images.length === 0) return;

    const gallery = document.getElementById('imageGallery');
    const imageToRemove = images[currentIndex];
    
    gallery.removeChild(imageToRemove);
    images.splice(currentIndex, 1);

    if (currentIndex >= images.length) {
        currentIndex = images.length - 1;
    }

    if (images.length === 0) {
        currentIndex = 0;
       
        const defaultImage = createDefaultImage();
        gallery.appendChild(defaultImage);
        updateNavigationButtons();
        return;
    }

    updateImageDisplay();
});


function createDefaultImage() {
    const defaultImage = document.createElement('img');
    defaultImage.src = defaultImageSrc;
    defaultImage.alt = "Default Image";
    defaultImage.id = "defaultImage";
    defaultImage.style.width = "1000px"
    defaultImage.style.height = "600px" ;

    
    VanillaTilt.init(defaultImage, {
        max: 25, 
        speed: 400, 
        glare: true, 
        "max-glare": 0.6 
    });

    return defaultImage;
}
