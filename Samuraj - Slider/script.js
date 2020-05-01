const leftButton = document.getElementById("sliderLeftButton");
const rightButton = document.getElementById("sliderRighttButton");
const imageNumber = document.getElementById("current");
const image = document.getElementById("sliderImage");

let imageArray = [
    'drzewo.jpg',
    'klify.jpg',
    'magia.jpg',
    'paryz.jpg',
    'zachod.jpg',
];
let pointer = 0;


function nextImage() {
    pointer += 1;
    checkPointerValid(pointer);
    image.src = 'img/' + imageArray[pointer];
};

function previousImage() {
    pointer -= 1;
    checkPointerValid(pointer);
    image.src = 'img/' + imageArray[pointer];
};

function checkPointerValid(pointer) {
    if (pointer < 1) {
        leftButton.disabled = true;
    } else {
        leftButton.disabled = false;
    }

    if (pointer > (imageArray.length - 2)) {
        rightButton.disabled = true;
    } else {
        rightButton.disabled = false;
    }

    imageNumber.innerHTML = pointer + 1;
};
