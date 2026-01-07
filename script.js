const items = document.querySelectorAll('#item-shelve .item.food');
const choppingArea = document.getElementById('chopping-area');
const choppingBoard = document.getElementById('chopping-board');
const plate = document.getElementById('plate-area');
const tooltip = document.getElementById('tooltip');
const menu = document.getElementById('menu');



let clickCount = 0; // Track chopping board clicks

const foodNames = ['Maso', 'Zelenina', 'Ryba', 'Ovoce', 'Chleb'];

// Populate tooltip with 3 random food images on page load
document.addEventListener('DOMContentLoaded', function() {
  const foodMap = {
    'Maso': 'hra_maso.svg',
    'Ryba': 'hra_ryba.svg',
    'Zelenina': 'hra_zelenina.svg'

  };
  

  
  // Generate 3 random foods (can be duplicates)
  for (let i = 0; i < 3; i++) {
    const randomFoodType = foodNames[Math.floor(Math.random() * foodNames.length)];
    const foodElement = foodMap[randomFoodType];
    
    if (foodElement) {
      const img = document.createElement('img');
      img.src = foodElement;
      img.alt = randomFoodType;
      img.id = randomFoodType;
      tooltip.appendChild(img);
    }

  }
});

function moveOffScreen(element) {
  menu.style.transform = '1s ease-in-out '; 
  menu.style.transform = 'translateY(-60%)'

  element.style.display = 'none'; 
}

function handleFoodClick(event) {
    // 1. Enlarge clicked item briefly
    enlarge(event);
    // 2. Create a new img element
    const newImg = document.createElement('img');
    newImg.src = event.src;
    newImg.alt = event.alt;
    newImg.classList.add('food');
    // Determine food type by ID
    let foodType = '';
    if (event.id.includes('Maso')) foodType = 'Maso';
    else if (event.id.includes('ryba')) foodType = 'Ryba';
    else if (event.id.includes('Zelenina')) foodType = 'Zelenina';
    else if (event.id.includes('ovoce')) foodType = 'Ovoce';
    else if (event.id.includes('chleb')) foodType = 'Chleb';
    
    newImg.id = foodType;
    
    const randomTop = Math.random() *100 -70; // 20% to 100%
    const randomLeft = Math.random() *100  -20; // 20% to 100%

    newImg.style.top = randomTop + '%';
    newImg.style.left = randomLeft + '%';

    choppingArea.appendChild(newImg);
  }
  function handleBinClick(event) {
    // 1. Enlarge clicked item briefly
    enlarge(event);
    // 2. remove all appended items in chopping area and plate
    const itemsInChoppingArea = choppingArea.querySelectorAll('img');
    itemsInChoppingArea.forEach(img => img.remove());
    const itemsInPlate = plate.querySelectorAll('img');
    itemsInPlate.forEach(img => img.remove());
  }

  function enlarge(event) {
    event.classList.add('enlarged');
    setTimeout(() => event.classList.remove('enlarged'), 300);
  }

choppingBoard.addEventListener('click', () => {
  choppingBoard.classList.add('shake');
  setTimeout(() => choppingBoard.classList.remove('shake'), 500);
  clickCount++;

  // 3. If clicked 10 times, move items to plate
  if (clickCount >= 2) {
    // Move items to plate
    const items = choppingArea.querySelectorAll('img');
    items.forEach(img => {
      const newImg = document.createElement('img');
      //change img source to  chopped one
      newImg.src = img.src.replace('.svg', '-nakrájená.svg');
      newImg.alt = img.alt;
      newImg.id = img.id;
      newImg.classList.add('food');

      plate.appendChild(newImg);
      const randomTop = Math.random() *40; // 20% to 100%
      const randomLeft = Math.random() *80; // 20% to 100%

      newImg.style.top = randomTop + '%';
      newImg.style.left = randomLeft + '%';

      img.remove(); // remove from chopping area

    })
    clickCount = 0; // reset counter if you want
  }
});

// Handle plate click - check if foods match speech bubble
document.getElementById('plate').addEventListener('click', () => {
  const plateImages = plate.querySelectorAll('img');
  const orderedImages = tooltip.querySelectorAll('img');

  
  if (plateImages.length === 0) return; // No food on plate
  
  // Extract food names from plate images using data attribute
  const plateItems = Array.from(plateImages).map(img => img.id).filter(name => name);
  
  const orderedItems = Array.from(orderedImages).map(img => img.id).filter(name => name);

  // Compare arrays
  const isMatch = plateItems.length === orderedItems.length && plateItems.every((value, index) => {
    // find id orderedItems orderedItems contains value at any position and remove item from orderedItems to prevent duplicate matching
    const orderedIndex = orderedItems.indexOf(value);
    if (orderedIndex > -1) {
      orderedItems.splice(orderedIndex, 1); // remove matched item
      return true;
    }
    return false;
  
  });

  clearFood()
  if (isMatch && orderedItems.length == 0) {
    alert('Correct! You prepared the right meal.');
    rankUp()
    resetOrderAndAnimal();
  } else {
    alert('Incorrect meal. Please try again.');
    rankDown()
  }
  
  
});

// clear all items from chopping area and plate
function clearFood() {
  const itemsInChoppingArea = choppingArea.querySelectorAll('img');
  itemsInChoppingArea.forEach(img => img.remove());
  const itemsInPlate = plate.querySelectorAll('img');
  itemsInPlate.forEach(img => img.remove());
}

function rankUp() {
  const stars = document.querySelectorAll('.star.transparent');
  // remove one transparent class from first star found
  if (stars.length > 0) {
    stars[0].classList.remove('transparent');
  }
}
function rankDown() {
  const stars = document.querySelectorAll('.star:not(.transparent)');
  // add one transparent class to last star found
  if (stars.length > 0) {
    stars[stars.length - 1].classList.add('transparent');
  }
}

function resetOrderAndAnimal() {
  // Remove current order
  while (tooltip.firstChild) {
    tooltip.removeChild(tooltip.firstChild);
  }

  // Generate new order
  const foodItems = Array.from(document.querySelectorAll('#item-shelve .item.food'));
  const foodMap = {
    'Maso': null,
    'Ryba': null,
    'Zelenina': null,
    'Ovoce': null,
    'Chleb': null
  };
  
  // Map food items by type
  foodItems.forEach(item => {
    if (item.id.includes('Maso')) foodMap['Maso'] = item;
    else if (item.id.includes('ryba')) foodMap['Ryba'] = item;
    else if (item.id.includes('Zelenina')) foodMap['Zelenina'] = item;
    else if (item.id.includes('ovoce')) foodMap['Ovoce'] = item;
    else if (item.id.includes('chleb')) foodMap['Chleb'] = item;
  });
  
  // Generate 3 random foods (can be duplicates)
  for (let i = 0; i < 3; i++) {
    const randomFoodType = foodNames[Math.floor(Math.random() * foodNames.length)];
    const foodElement = foodMap[randomFoodType];
    
    if (foodElement) {
      const clone = foodElement.cloneNode(true);
      clone.classList.remove('item'); 
      clone.id = randomFoodType;
      tooltip.appendChild(clone);
    }
  }

  // Change animal image randomly (for demonstration, we just toggle between two images)
  const animal = document.getElementById('animal');
    const animalMap = {
    'klokan': 'hra_KLOKAN.svg',
    'vydra': 'hra_VYDRA.svg',
    'lev': 'hra_LEV.svg',
  };
  
  const animalNames = Object.keys(animalMap);
  const randomAnimal = animalNames[Math.floor(Math.random() * animalNames.length)];
  animal.src = animalMap[randomAnimal];
} 

