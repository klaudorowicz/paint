

// Query Selectors and Altering Elements
const paintContainer = document.querySelector('.paintContainer');
const setResolutionBtn = document.querySelector('#setResolutionBtn');
const clearBtn = document.querySelector('#clearBtn');
const colorBtn = document.querySelectorAll('#colorBtn');
let color = 'black'
let sheetSize = 16;
let sheetSize2 = 16 * 16;

// Start created worksheet
setWorksheet();

// Set Resolution Button
setResolutionBtn.addEventListener('click', function() {
  sheetSize = prompt('Size of worksheet:', 16);
  sheetSize2 = sheetSize * sheetSize;
  setWorksheet();
});

clearBtn.addEventListener('click', function() {
  removeAllChild();
  setWorksheet();
});


// Reset for paintContainer
function removeAllChild() {
  paintContainer.innerHTML = '';
};


// Create Worksheet
function setWorksheet() {
  removeAllChild();
  let numCell = 0;

  for (let i = 0; i < sheetSize; i++) { 
    let rowInPaint = document.createElement('div');
    rowInPaint.classList.add('rows');
    paintContainer.appendChild(rowInPaint);

    for(let j = 0; j < sheetSize; j++) {
      numCell += 1;
      let divInPaint = document.createElement('div');
      divInPaint.className = `cell`;
      divInPaint.addEventListener('mouseover', draw);
      divInPaint.addEventListener('mousedown', draw);
      rowInPaint.appendChild(divInPaint);
    };
  };
};


// TEST 1 - One point draw
/* paintedCell.forEach((cell) => {
  cell.addEventListener('mousedown', function() {
    cell.style.backgroundColor = 'black';
  });
}); */

// TEST 2 - Draw just wit mouse_enter
/* paintedCell.forEach((cell) => {
  cell.addEventListener('mouseenter', function() {
    cell.style.backgroundColor = 'black';
  });
}); */

// TEST 3 - Drawing with trigger
/* let trigger = false;

document.addEventListener('mousedown', function(){
  trigger = true;
});

document.addEventListener('mouseup', function(){
  trigger = false;
});

  paintedCell.forEach((cell) => {
    cell.addEventListener('mouseover', function() {
      if (trigger === true) {
        cell.style.backgroundColor = 'black';
      };
    });
  }); */

// All of above didn't work after use buttons

// Draw(e)
let trigger = false;
document.addEventListener('mousedown', function(){
  trigger = true;
});
document.addEventListener('mouseup', function(){
  trigger = false;
});

function draw(e) {
  if (e.type === 'mouseover' && trigger === true 
  || e.type === 'mousedown') {
    e.target.style.backgroundColor = color;
  };
};

// Change color
colorBtn.forEach((newColor) => {
  newColor.addEventListener('click', (e) => {
    color = e.target.className;
  })
});