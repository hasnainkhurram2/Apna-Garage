// JavaScript to make the banner slide every 3 seconds
let currentIndex = 0;
const images = document.querySelectorAll('.banner img');
const totalImages = images.length;

function changeImage() {
  // Remove 'active' class from the current image
  images[currentIndex].classList.remove('active');

  // Increment index to move to the next image, loop back if necessary
  currentIndex = (currentIndex + 1) % totalImages;

  // Add 'active' class to the new image
  images[currentIndex].classList.add('active');
}

// Change image every 3.5 seconds
setInterval(changeImage, 3500);



