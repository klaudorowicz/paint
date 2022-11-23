

// Query Selectors and Altering Elements
const paintContainer = document.querySelector('.paintContainer');
const setResolutionBtn = document.querySelector('#setResolutionBtn');
const clearBtn = document.querySelector('#clearBtn');
const colorBtn = document.querySelectorAll('#colorBtn');
const colorPicker = document.querySelector('#colorPicker');
const pickColor = document.querySelector('#pickColor');
let mode = 'black';
let colorRandom = 'pink';
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

// Choose mode

colorBtn.forEach((btn) => {
  btn.addEventListener('click', function chooseMode(e) {
    if (e.target.className == 'black') {
      mode = 'black';
  } else if (e.target.className == 'white') {
      mode = 'white';
    } else if (e.target.className == 'randomColor') {
      mode = 'randomColor'; randomColor();
    } else if (e.target.className == 'pickColor') {
      mode = 'pickColor';
    } else if (e.target.className == 'rainbow') {
      mode = 'rainbow';
    };
  });
});


// Draw(e)
let trigger = false;
document.addEventListener('mousedown', function(){
  trigger = true;
});
document.addEventListener('mouseup', function(){
  trigger = false;
});

function draw(e) {
  if (e.type === 'mouseover' && !trigger === true) return;
  if (mode === 'black') {
    e.target.style.backgroundColor = 'black';
  } else if (mode === 'white') {
    e.target.style.backgroundColor = 'white';
  } else if (mode === 'rainbow') { 
    e.target.style.backgroundColor = choiceRainbow(); 
  } else if (mode === 'randomColor') {
    e.target.style.backgroundColor = colorRandom;
  } else if (mode === 'pickColor') {
    e.target.style.backgroundColor = colorPicker.value;
  };
};

function choiceRainbow() {
  return `rgb(${(Math.random()*256).toFixed(0)}, ${(Math.random()*256).toFixed(0)}, ${(Math.random()*256).toFixed(0)}, ${Math.random().toFixed(3)})`;
};


// Pick random color
function randomColor() {
  return colorRandom = `hsl(${(Math.random()*360).toFixed(0)}, 100%, 50%)`;
};

// TEST 4 - Choose Color - don't work for rainbow
/* let mode = '';
colorBtn.forEach((btn) => {
  btn.addEventListener('click', function chooseColor(e) {
    if (e.target.className == 'black') color = 'black';
    else if (e.target.className == 'white') color = 'white';
    else if (e.target.className == 'randomColor') color = randomColor();
    else if (e.target.className == 'rainbow') {
      mode = e.target.className;
      color = rainbow(e);
    }
    return;
  });
}); */
