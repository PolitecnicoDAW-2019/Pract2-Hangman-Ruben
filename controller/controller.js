class Controller {
  words;
  word;
  lives;
  hits;
  constructor(view, service) {
    this.service = service;
    this.view = view;
    this.lives = 10;
    this.hits = 0;
    this.fetchWord();
    this.view.constructAlphabet(
      this.handleButtons,
      this.handleLives,
      this.handleHits
    );
    this.view.bindPlayAgain(this.handleGame);
  }

  handlerRandomWord = () => {
    const wordsArray = this.words['words'];
    this.word = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    return this.word.toUpperCase();
  };

  handleLives = () => {
    return this.lives;
  };

  handleHits = () => {
    return this.service.checkHits(this.hits, this.word);
  };

  handleButtons = letter => {
    const isInWord = this.service.checkWord(letter, this.word);
    if (!isInWord) {
      this.lives--;
    } else {
      this.hits++;
    }
    return isInWord;
  };

  handleGame = () => {
    this.lives = 10;
    this.hits = 0;
    this.fetchWord();
    this.view.constructAlphabet(
      this.handleButtons,
      this.handleLives,
      this.handleHits
    );
  };

  fetchWord() {
    fetch('../resources/words.json')
      .then(function(response) {
        return response.json();
      })
      .then(myJson => {
        this.words = myJson;
        this.view.drawLines(this.handlerRandomWord);
      });
  }
}
