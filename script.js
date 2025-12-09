const foodItems = document.querySelectorAll('#item-shelve .food-item');
const choppingArea = document.getElementById('chopping-area');
const choppingBoard = document.getElementById('chopping-board');
const plate = document.getElementById('plate');

let clickCount = 0; // Track chopping board clicks


for (let item of foodItems) {
  item.addEventListener('click', () => {
    // 1. Enlarge clicked item briefly
    item.classList.add('enlarged');
    setTimeout(() => item.classList.remove('enlarged'), 300);

    // 2. Create a new img element
    const newImg = document.createElement('img');
    newImg.src = item.src;
    newImg.alt = item.alt;
    newImg.style.height = '80%';
    newImg.style.position = 'absolute';

    // 3. Pick a random position in % (0-100)
    const maxXPercent = 100 - 20; // width % of image
    const maxYPercent = 100 - 80; // height % of image

    const randomX = Math.random() * maxXPercent;
    const randomY = Math.random() * maxYPercent;

    newImg.style.left = `${randomX}%`;
    newImg.style.top = `${randomY}%`;

    // 4. Append to chopping board
    choppingArea.appendChild(newImg);
  });
}

choppingBoard.addEventListener('click', () => {
  choppingBoard.classList.add('shake');
  setTimeout(() => choppingBoard.classList.remove('shake'), 500);
  clickCount++;

  // 3. If clicked 10 times, move items to plate
  if (clickCount >= 10) {
    const items = choppingArea.querySelectorAll('img'); // all food items in chopping area
    items.forEach(img => {
      // Reset positioning so items fit in plate
      img.style.position = 'absolute';
      img.style.left = `${Math.random() * 70}%`;  // random X inside plate
      img.style.top = `${Math.random() * 70}%`;   // random Y inside plate
      img.style.width = '30%';                     // scale down for plate
      img.style.height = '30%';
      plate.appendChild(img);                      // move item
    });

    clickCount = 0; // reset counter if you want
  }
});
