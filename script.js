document.getElementById('uploadButton').addEventListener('click', function () {
    document.getElementById('fileInput').click();
});

let images = [];
let currentIndex = 0;
const defaultImageSrc = "default4.png";


const validFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.getElementById('imageGallery');
    const defaultImage = createDefaultImage();
    gallery.appendChild(defaultImage);
    updateNavigationButtons();
});

document.getElementById('fileInput').addEventListener('change', function (event) {
    const files = Array.from(event.target.files);
    const gallery = document.getElementById('imageGallery');

    // Remove default image if it exists
    const defaultImage = document.getElementById('defaultImage');
    if (defaultImage) gallery.removeChild(defaultImage);

    files.forEach((file, index) => {
        if (!validFileTypes.includes(file.type)) {
            alert("Unsupported file type. Please upload a valid image.");
            return;
        }

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
            }

            updateNavigationButtons();
        };
        reader.readAsDataURL(file);
    });

    // Reset the file input after file selection
    event.target.value = '';
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
    const hasMultipleImages = images.length > 1;
    document.getElementById('prevButton').disabled = currentIndex === 0 || !hasMultipleImages;
    document.getElementById('nextButton').disabled = currentIndex === images.length - 1 || !hasMultipleImages;
}

document.getElementById('increaseSize').addEventListener('click', function () {
    adjustImageSize(1.1);
});

document.getElementById('decreaseSize').addEventListener('click', function () {
    adjustImageSize(0.9);
});

function adjustImageSize(scaleFactor) {
    const activeImage = images[currentIndex];
    const minWidth = 50; // Minimum width in pixels
    const maxWidth = 1000; // Maximum width in pixels

    if (activeImage) {
        const currentWidth = activeImage.offsetWidth;
        const newWidth = currentWidth * scaleFactor;
        if (newWidth < minWidth || newWidth > maxWidth) {
            alert("Image size limit reached.");
            return;
        }
        activeImage.style.width = `${newWidth}px`;
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

    if (images.length === 0) {
        currentIndex = 0;
        const defaultImage = createDefaultImage();
        gallery.appendChild(defaultImage);
    } else {
        currentIndex = Math.min(currentIndex, images.length - 1);
        updateImageDisplay();
    }

    updateNavigationButtons();
});

function createDefaultImage() {
    const defaultImage = document.createElement('img');
    defaultImage.src = defaultImageSrc;
    defaultImage.alt = "Default Image";
    defaultImage.id = "defaultImage";
    defaultImage.style.width = "100%";
    defaultImage.style.maxWidth = "600px";
    defaultImage.style.height = "auto";

    VanillaTilt.init(defaultImage, {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.6
    });

    return defaultImage;
}


