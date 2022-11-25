

// Query Selectors and Altering Elements
const paintContainer = document.querySelector('.paintContainer');
const clearBtn = document.querySelector('#clearBtn');
const colorBtn = document.querySelectorAll('#colorBtn');
const colorPicker = document.querySelector('#colorPicker');
let sizeText = document.querySelector('#sizeText');
let sizeSlider = document.querySelector('#sizeSlider');
let iconUp = document.querySelector('.icon-up');
let iconBeaker = document.querySelector('.icon-beaker');
const pencil = document.querySelector('.black')
pencil.classList.add('active');
let lastRecognitionOfChoice = pencil;
let mode = 'black';
let colorRandom = 'pink';
let sheetSize = sizeSlider.value;

// Start created worksheet
setWorksheet();


// Set Resolution

sizeText.addEventListener('change', (e) => {
  sheetSize = e.target.value;
  sizeSlider.value = sheetSize;
  setWorksheet();
});

sizeSlider.addEventListener('change', (e) => {
  sheetSize = e.target.value;
  sizeText.value = sheetSize;
  setWorksheet();
});


// Clear Button
clearBtn.addEventListener('click', function() {
  removeAllChild();
  setWorksheet();
});


// Reset for paintContainer
function removeAllChild() {
  paintContainer.innerHTML = '';
};

// Change color for pick selector icon
colorPicker.addEventListener('change', (e) => {
  iconUp.style.color = e.target.value;
});


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


// Action when some button was clicked
colorBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    chooseMode(e.target)
    recognitionOfChoice(e.target);
  });
});

// Choose mode
function chooseMode(btn) {
  if (btn.className == 'black') {
    mode = 'black';
} else if (btn.className == 'white') {
    mode = 'white';
  } else if (btn.className == 'rainbow') {
    mode = 'rainbow';
  } else if (btn.className == 'prettyRainbow') {
    mode = 'prettyRainbow';
  } else if (btn.className == 'randomColor') {
    mode = 'randomColor'; 
    randomColor(); 
    iconBeaker.style.color = colorRandom;
  } else if (btn.className == 'pickColor') {
    mode = 'pickColor';
  };
  return;
}

// Change class 'active' to current mode
function recognitionOfChoice (btn) {
  lastRecognitionOfChoice.classList.remove('active');
  btn.classList.add('active');
  lastRecognitionOfChoice = btn;
}


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
  } else if (mode === 'prettyRainbow') { 
    e.target.style.backgroundColor = randomColor(); 
  } else if (mode === 'randomColor') {
    e.target.style.backgroundColor = colorRandom;
  } else if (mode === 'pickColor') {
    e.target.style.backgroundColor = colorPicker.value;
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


// Rainbow function = all color is heavy random (full scope/range)
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
