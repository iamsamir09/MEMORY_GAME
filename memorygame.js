const cardsArray = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', // 8 pairs
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'
  ];

  let grid = document.getElementById('grid');
  let moveCount = 0;
  let timer = 0;
  let flippedCards = [];
  let matchedCards = [];
  let gameInterval;

  // Shuffle the cards array
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Initialize the game
  function setupGame() {
    let shuffledCards = shuffle(cardsArray);
    shuffledCards.forEach(value => {
      let card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('data-value', value);
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    });
    startTimer();
  }

  // Flip the card
  function flipCard(event) {
    let card = event.target;

    if (flippedCards.length === 2 || card.classList.contains('flipped') || card.classList.contains('matched')) {
      return;
    }

    card.textContent = card.getAttribute('data-value');
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }

  // Check if the flipped cards match
  function checkForMatch() {
    moveCount++;
    document.getElementById('move-count').textContent = moveCount;

    if (flippedCards[0].getAttribute('data-value') === flippedCards[1].getAttribute('data-value')) {
      flippedCards[0].classList.add('matched');
      flippedCards[1].classList.add('matched');
      matchedCards.push(...flippedCards);
      flippedCards = [];

      if (matchedCards.length === cardsArray.length) {
        clearInterval(gameInterval);
        alert('Congratulations, you won!');
      }
    } else {
      setTimeout(() => {
        flippedCards[0].classList.remove('flipped');
        flippedCards[1].classList.remove('flipped');
        flippedCards[0].textContent = '';
        flippedCards[1].textContent = '';
        flippedCards = [];
      }, 1000);
    }
  }

  // Timer
  function startTimer() {
    gameInterval = setInterval(() => {
      timer++;
      document.getElementById('timer').textContent = timer;
    }, 1000);
  }

  // Reset the game
  function resetGame() {
    grid.innerHTML = '';
    moveCount = 0;
    timer = 0;
    document.getElementById('move-count').textContent = moveCount;
    document.getElementById('timer').textContent = timer;
    matchedCards = [];
    setupGame();
  }

  // Start the game
  setupGame();
  
