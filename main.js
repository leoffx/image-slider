const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const input = document.querySelector('input');

const base_url = 'http://www.brightdatasci.com/bonsai/images/acer_';
let number_of_images = 32;

let current_image = 0;
let prev_x = 0;

function loadImages() {
  const images = [];
  for (let i = 1; i <= number_of_images; i++) {
    images.push(new Image());
    images[i - 1].src = base_url + i + '.jpg';
  }

  // set canvas initial image
  images[0].onload = function () {
    canvas.width = images[0].width;
    canvas.height = images[0].height;
    ctx.drawImage(images[0], 0, 0);
  };

  return images;
}

function handleMove(e) {
  const x = e.offsetX || e.touches[0].clientX;

  if (Math.abs(prev_x - x) > Math.round(32 / number_of_images)) {
    if (prev_x > x) {
      current_image = (current_image + 1) % number_of_images;
    } else {
      current_image = (current_image - 1 + number_of_images) % number_of_images;
    }
  
    if (e.buttons === undefined || e.buttons === 1) {
      ctx.drawImage(images[current_image], 0, 0);
    }
  
    prev_x = x;
  }
}

function handleInput() {
  const files = input.files;
  images = [];

  for (let i = 0; i < files.length; i++) {
    images.push(new Image());
    images[i].src = URL.createObjectURL(files[i]);
  }

  images[0].onload = function () {
    canvas.width = images[0].width;
    canvas.height = images[0].height;
    ctx.drawImage(images[0], 0, 0);
  };

  number_of_images = images.length;
  current_image = 0;
}

function initializeListeners() {
  canvas.onmousemove = handleMove;
  canvas.ontouchmove = handleMove;
  input.onchange = handleInput;
}

let images = loadImages();
initializeListeners();
