// let sheetSize = prompt('Size of worksheet:', 16);

// Query Selectors and Altering Elements
const paintContainer = document.querySelector('.paintContainer');
const setResolutionBtn = document.querySelector('#setResolutionBtn');
let sheetSize = 16;
let sheetSize2 = 16* 16;

// Set Resolution Button
  setResolutionBtn.addEventListener('click', function() {
  sheetSize = prompt('Size of worksheet:', 16);
  sheetSize2 = sheetSize * sheetSize;
});

/* function sizeArray() {
  let sheetSizeArray = [];
  for(let i = 0; i < sheetSize; i++) {
  sheetSizeArray.push('');
}}; */

let num = 0;

// Create Worksheet
// paintContainer.setAttribute('grid-template-columns', auto);
for (let i = 0; i < sheetSize; i++) { 
  let rowInPaint = document.createElement('div');
  rowInPaint.classList.add('rows');
  paintContainer.appendChild(rowInPaint);
  for(let j = 0; j < sheetSize; j++) {
    num += 1;
    let divInPaint = document.createElement('div');
    divInPaint.innerHTML = '';
    divInPaint.className = `cell`;
    rowInPaint.appendChild(divInPaint);
  }
};


