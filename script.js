document.getElementById('uploadButton').addEventListener('click', function () {
    document.getElementById('fileInput').click();
});


document.getElementById('fileInput').addEventListener('change', function (event) {
    const files = event.target.files; 
    const gallery = document.getElementById('imageGallery');

    Array.from(files).forEach((file, index) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageContainer = document.createElement('div');
                imageContainer.classList.add('image-container');
                imageContainer.dataset.index = gallery.children.length;

                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = `Uploaded Image ${gallery.children.length + 1}`;
                img.classList.add('uploaded-image');
                img.style.width = "200px";
                img.style.cursor = "pointer";

                
                img.addEventListener('click', function () {
                    applyTiltEffect(imageContainer);
                });

                imageContainer.appendChild(img);
                gallery.appendChild(imageContainer);

                
                VanillaTilt.init(img, {
                    max: 25, 
                    speed: 400, 
                    glare: true, 
                    "max-glare": 0.6 
                });
            };
            reader.readAsDataURL(file);
        }
    });
});


function applyTiltEffect(imageContainer) {
    const images = document.querySelectorAll('.uploaded-image');
    images.forEach((img) => {
        img.classList.remove('tilt-active');
        
        img.vanillaTilt && img.vanillaTilt.destroy(); 
    });

    const selectedImage = imageContainer.querySelector('img');
    selectedImage.classList.add('tilt-active');
    
    
    if (!selectedImage.vanillaTilt) {
        VanillaTilt.init(selectedImage, {
            max: 25, 
            speed: 400, 
            glare: true, 
            "max-glare": 0.6 
        });
    }
}


document.getElementById('increaseSize').addEventListener('click', function () {
    adjustImageSize(1.1); 
});

document.getElementById('decreaseSize').addEventListener('click', function () {
    adjustImageSize(0.9); 
});

function adjustImageSize(scaleFactor) {
    const activeImage = document.querySelector('.uploaded-image.tilt-active');
    if (activeImage) {
        const currentWidth = activeImage.offsetWidth;
        activeImage.style.width = `${currentWidth * scaleFactor}px`;
    } else {
        alert('Select an image to adjust its size.');
    }
}


document.getElementById('deletePhoto').addEventListener('click', function () {
    const activeImage = document.querySelector('.uploaded-image.tilt-active');
    if (activeImage) {
        const imageContainer = activeImage.closest('.image-container');
        imageContainer.remove(); 
    } else {
        alert('Select an image to delete.');
    }
});