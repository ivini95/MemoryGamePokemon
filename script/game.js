let game = {

  lockMode:false,
  firstCard: null,
  secondCard: null,

  pokemons: [
    'bulbasaur',
    'charmander',
    'dratini',
    'eevee',
    'jigglypuff',
    'meowth',
    'psyduck',
    'snorlax',
    'squirtle',
    'zubat'],

    cards : null,


  setCard:function(id){

    let card = this.cards.filter(card => card.id ===id)[0];

    if (this.lockMode) {
      return false;
    }

    if (!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    }else {
      this.secondCard = card;
      this.lockMode = true;
      this.secondCard.flipped = true;
      return true; 
    }
  },

  checkMatch:function(){
    if (!this.firstCard || !this.secondCard) {
      return false;
    }
    return this.firstCard.icon === this.secondCard.icon;
  },

  clearCards: function(){
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },

  unflippedCards: function(){
    this.secondCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },

  checkGameOver(){
    return this.cards.filter(card=>card.flipped).length == 20;
  },


      createCardFromPokemons : function(){
        this.cards = [];
      
        this.pokemons.forEach(pokemon => {
          this.cards.push(this.createPairFromPokemons(pokemon));
        });
      
        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards;
      },
      
      createPairFromPokemons : function (pokemon){
        return [
          {
            id:this.createIdWithPokemon(pokemon),
            icon:pokemon,
            flipped:false,
          },{
            id:this.createIdWithPokemon(pokemon),
            icon:pokemon,
            flipped:false,
          }
        ]
      },
      
      createIdWithPokemon : function (pokemon){
        return pokemon + parseInt(Math.random() * 1000);
      },

      shuffleCards : function (cards){

        let currentIndex = this.cards.length;
        let randomIndex = 0;
        
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);  
          currentIndex --;
          [this.cards[randomIndex],this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
      }
      

}