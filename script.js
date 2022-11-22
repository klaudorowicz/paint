// let sheetSize = prompt('Size of worksheet:', 16);

// Query Selectors and Altering Elements
const paintContainer = document.querySelector('.paintContainer');
const divInPaint = document.createElement('div');
const setResolutionBtn = document.querySelector('#setResolutionBtn');
let sheetSize = 16;


// Set Resolution Button
  setResolutionBtn.addEventListener('click', function(e) {
  sheetSize = prompt('Size of worksheet:', 16);
});



