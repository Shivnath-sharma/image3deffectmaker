// Add click functionality to the upload button
document.getElementById('uploadButton').addEventListener('click', function () {
    document.getElementById('fileInput').click();
});

// Handle file input change and display multiple images
document.getElementById('fileInput').addEventListener('change', function (event) {
    const files = event.target.files; // Get all selected files
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

                // When image is clicked, select it for tilt effect
                img.addEventListener('click', function () {
                    applyTiltEffect(imageContainer);
                });

                imageContainer.appendChild(img);
                gallery.appendChild(imageContainer);

                // Initialize VanillaTilt for the newly added image
                VanillaTilt.init(img, {
                    max: 25, // Maximum tilt rotation
                    speed: 400, // Speed of the effect
                    glare: true, // Enable glare effect
                    "max-glare": 0.6 // Maximum glare opacity
                });
            };
            reader.readAsDataURL(file);
        }
    });
});

// Function to apply VanillaTilt effect only to the selected image
function applyTiltEffect(imageContainer) {
    const images = document.querySelectorAll('.uploaded-image');
    images.forEach((img) => {
        img.classList.remove('tilt-active');
        // Disable tilt effect for unselected images
        img.vanillaTilt && img.vanillaTilt.destroy(); // Remove tilt effect
    });

    const selectedImage = imageContainer.querySelector('img');
    selectedImage.classList.add('tilt-active');
    
    // Re-initialize VanillaTilt for the selected image (if needed)
    if (!selectedImage.vanillaTilt) {
        VanillaTilt.init(selectedImage, {
            max: 25, // Maximum tilt rotation
            speed: 400, // Speed of the effect
            glare: true, // Enable glare effect
            "max-glare": 0.6 // Maximum glare opacity
        });
    }
}

// Adjust size of selected image
document.getElementById('increaseSize').addEventListener('click', function () {
    adjustImageSize(1.1); // Increase by 10%
});

document.getElementById('decreaseSize').addEventListener('click', function () {
    adjustImageSize(0.9); // Decrease by 10%
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

// Delete the selected image
document.getElementById('deletePhoto').addEventListener('click', function () {
    const activeImage = document.querySelector('.uploaded-image.tilt-active');
    if (activeImage) {
        const imageContainer = activeImage.closest('.image-container');
        imageContainer.remove(); // Remove the entire image container (image and its wrapper)
    } else {
        alert('Select an image to delete.');
    }
});
