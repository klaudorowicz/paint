

// Query Selectors and Altering Elements
const paintContainer = document.querySelector('.paintContainer');
const clearBtn = document.querySelector('#clearBtn');
const colorBtn = document.querySelectorAll('#colorBtn');
const colorPicker = document.querySelector('#colorPicker');
let sizeText = document.querySelector('#sizeText');
let sizeSlider = document.querySelector('#sizeSlider');
let iconUp = document.querySelector('.icon-up');
let iconBeaker = document.querySelector('.icon-beaker');
const pencil = document.querySelector('.black');
const grid = document.querySelector('#grid');
pencil.classList.add('active');
const inputs = document.querySelectorAll('input');
let lastRecognitionOfChoice = pencil;
let mode = 'black';
let colorRandom = 'pink';
let sheetSize = sizeSlider.value;

// Start created worksheet
setWorksheet();


// Set Resolution
sizeText.addEventListener('change', (e) => {
  if (e.target.value > 0 && e.target.value < 100 && Number.isInteger(+e.target.value)) {
    sheetSize = e.target.value;
    sizeSlider.value = sheetSize;
    setWorksheet();
  }
  else if (+e.target.value < 1 || +e.target.value > 99) {
    e.target.value = 'From 1 to 99.';
  } 
  else if ( isNaN(+e.target.value) ) {
    e.target.value = `It's not No.`;
  } 
  else if ( !Number.isInteger(+e.target.value) ) {
    e.target.value = `Just Integer.`;
  }
  else {
    e.target.value = `Error.`;
  }
  return;
});

// Focus all content in input sizeText
sizeText.addEventListener('click', (e) => {
  e.target.focus();
  e.target.select();
});

sizeSlider.addEventListener('change', (e) => {
  sheetSize = e.target.value;
  sizeText.value = sheetSize;
  validate(sizeText, patterns["range"]);
  setWorksheet();
});


// Clear Button
clearBtn.addEventListener('click', function() {
  removeAllChild(paintContainer);
  setWorksheet();
});


// Reset for paintContainer
function removeAllChild(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    };
};

// Change color for pick selector icon
colorPicker.addEventListener('change', (e) => {
  iconUp.style.color = e.target.value;
});


// Create Worksheet
function setWorksheet() {
  removeAllChild(paintContainer);

  for (let i = 0; i < sheetSize; i++) { 
    let rowInPaint = document.createElement('div');
    rowInPaint.classList.add('row');
    paintContainer.appendChild(rowInPaint);

    for(let j = 0; j < sheetSize; j++) {
      let divInPaint = document.createElement('div');
      divInPaint.className = `cell`;
      // divInPaint.classList.add('no-border');
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
  } else if (btn.className == 'randomColor' || mode == 'randomColor') {
    mode = 'randomColor'; 
    randomColor(); 
    iconBeaker.style.color = colorRandom;
  } else if (btn.className == 'pickColor') {
    mode = 'pickColor';
  };
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


// Regex for input sizeText
const patterns = {
  range:/^(0{1,})?([1-9][0-9]{0,1})$/,
}

inputs.forEach((input) => {
  input.addEventListener('keyup',(e) => {
    validate(e.target, patterns[e.target.attributes.name.value]);
  });
});

function validate(field, regex){
  if( regex.test(field.value) ) {
    field.className = 'valid';
  } else {
    field.className = 'invalid';
  }
}

// Grid button
const cells = document.querySelectorAll('.cell');
grid.addEventListener('click', () => {
  grid.classList.toggle('active');
  cells.forEach((cell) => {
    if (cell.className == 'cell') {
      cell.classList.add('border');
    } else {
      cell.classList.remove('border');
    }
  });
});