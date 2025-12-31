const items = document.querySelectorAll('#item-shelve .item.food');
const choppingArea = document.getElementById('chopping-area');
const choppingBoard = document.getElementById('chopping-board');
const plate = document.getElementById('plate-area');
const speechText = document.getElementById('speech-text');
const tooltip = document.getElementById('tooltip');

let clickCount = 0; // Track chopping board clicks

const foodNames = ['Maso', 'Zelenina', 'Ryba', 'Ovoce', 'Chleb'];

// Populate tooltip with 3 random food images on page load
document.addEventListener('DOMContentLoaded', function() {
  const foodItems = Array.from(document.querySelectorAll('#item-shelve .item.food'));
  
  // Shuffle and get 3 random food items
  const shuffled = foodItems.sort(() => Math.random() - 0.5);
  const selectedFoods = shuffled.slice(0, 3);
  
  // Insert cloned images into tooltip
  selectedFoods.forEach(food => {
    const clone = food.cloneNode(true);
    clone.style.height = '79%';
    clone.style.margin = '1%';
    tooltip.appendChild(clone);
  });
});

function updateSpeechBubble() {
  // Random number 1-3 for how many items to order
  const numItems = Math.floor(Math.random() * 3) + 1;
  const orderedFoods = [];
  
  // Randomly select up to 3 different foods
  const foodSet = new Set();
  while (foodSet.size < numItems) {
    const randomFood = foodNames[Math.floor(Math.random() * foodNames.length)];
    foodSet.add(randomFood);
  }
  
  const message = Array.from(foodSet).join(', ') + '!';
  speechText.textContent = message;
}



function handleFoodClick(event) {
    // 1. Enlarge clicked item briefly
    enlarge(event);
    // 2. Create a new img element
    const newImg = document.createElement('img');
    newImg.src = event.src;
    newImg.alt = event.alt;
    const randomTop = Math.random() *100 -70; // 20% to 100%
    const randomLeft = Math.random() *100  -20; // 20% to 100%

    newImg.style.top = randomTop + '%';
    newImg.style.left = randomLeft + '%';

    choppingArea.appendChild(newImg);
    // 3. Update speech bubble with random food
    updateSpeechBubble();
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
      newImg.src = img.src;
      newImg.alt = img.alt;
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
