const tileImages = [
  'bamboo1.png', 'bamboo2.png', 'bamboo3.png',
  'circle1.png', 'circle2.png', 'circle3.png',
  'dragon_red.png', 'dragon_green.png'
];

// Double the array for matching pairs
let tileSet = [...tileImages, ...tileImages];
tileSet = shuffleArray(tileSet);

const board = document.getElementById('game-board');

let firstTile = null;

tileSet.forEach(img => {
  const tile = document.createElement('div');
  tile.classList.add('tile');
  tile.style.backgroundImage = `url(tiles/${img})`;
  tile.dataset.tile = img;
  tile.addEventListener('click', () => onTileClick(tile));
  board.appendChild(tile);
});

function onTileClick(tile) {
  if (tile.classList.contains('matched') || tile === firstTile) return;

  tile.classList.add('selected');

  if (!firstTile) {
    firstTile = tile;
  } else {
    if (firstTile.dataset.tile === tile.dataset.tile) {
      // Match!
      setTimeout(() => {
        firstTile.classList.add('matched');
        tile.classList.add('matched');
        firstTile.style.visibility = 'hidden';
        tile.style.visibility = 'hidden';
        firstTile.classList.remove('selected');
        tile.classList.remove('selected');
        firstTile = null;
      }, 500);
    } else {
      // No match
      setTimeout(() => {
        firstTile.classList.remove('selected');
        tile.classList.remove('selected');
        firstTile = null;
      }, 500);
    }
  }
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
