const FRONT = 'card-front';
const BACK = 'card-back';
const CARD = 'card';
const ICON = 'icon';


startGame();

function startGame(){
  
  createCardsInBoardGame(game.createCardFromPokemons());
}

function createCardsInBoardGame(){
 
  let boardGame = document.getElementById('boardGame');
  boardGame.innerHTML = '';
  
  game.cards.forEach(card => {
      let cardPokemon = document.createElement('div');
      cardPokemon.id = card.id;
      cardPokemon.classList.add(CARD);
      cardPokemon.dataset.icon = card.icon;

      createCardContent(card, cardPokemon);

      cardPokemon.addEventListener('click', flipCard);

      boardGame.appendChild(cardPokemon);
  });
}

function createCardContent(card, cardPokemon){
  
  createCardFace(FRONT,card,cardPokemon);
  createCardFace(BACK,card,cardPokemon);
  
}

function createCardFace(face, card, element){

  let cardElementFace = document.createElement('div');

  cardElementFace.classList.add(face);
  if (face === FRONT) {
    let iconElement = document.createElement('img');
    iconElement.classList.add(ICON);
    iconElement.src = './assets/images/' + card.icon + '.png';
    cardElementFace.appendChild(iconElement);
      
  } else {
    let iconPokebolaElement = document.createElement('img');
      
      iconPokebolaElement.src = './assets/images/pokebola.png';
      cardElementFace.appendChild(iconPokebolaElement);
    
  }

  element.appendChild(cardElementFace);  
}

function flipCard(){
  
  if (game.setCard(this.id)) {

      this.classList.add('flip');  
      if (game.secondCard) {
      if (game.checkMatch()) {
          game.clearCards();
          
            if (game.checkGameOver()) {
              let gameOverLayer = document.getElementById('gameOver');
              setTimeout(() => {
                gameOverLayer.style.display = 'flex';
              }, 1500);
              
            }
          
          
      }else{
          setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id);
          let secondCardView = document.getElementById(game.secondCard.id);

          firstCardView.classList.remove('flip');
          secondCardView.classList.remove('flip');
          game.unflippedCards();
          }, 1000);
        };
      }
  }
  
}

function restart(){
  game.clearCards();
  startGame();

  let gameOverLayer = document.getElementById('gameOver');
  gameOverLayer.style.display = 'none';
}