class View {
  constructor() { }

  DOM = {
    canvas: document.getElementById('canvas'),
    alphabetDiv: document.getElementById('alphabetDiv'),
    lives: document.getElementById('lives'),
    buttons: document.getElementsByName('alphabet'),
    playAgain: document.getElementById('playAgain'),
    lettersCoordinates: [],
    hangmanCoordinates: [
      { lives: 9, Xini: 200, Yini: 320, Xend: 400, Yend: 320 },
      { lives: 8, Xini: 300, Yini: 320, Xend: 300, Yend: 180 },
      { lives: 7, Xini: 300, Yini: 180, Xend: 500, Yend: 180 },
      { lives: 6, Xini: 500, Yini: 180, Xend: 500, Yend: 210 },
      { lives: 5, Xini: 500, Yini: 210, Xend: 500, Yend: 210 },
      { lives: 4, Xini: 500, Yini: 250, Xend: 500, Yend: 310 },
      { lives: 3, Xini: 500, Yini: 310, Xend: 490, Yend: 330 },
      { lives: 2, Xini: 500, Yini: 310, Xend: 510, Yend: 330 },
      { lives: 1, Xini: 500, Yini: 280, Xend: 470, Yend: 280 },
      { lives: 0, Xini: 500, Yini: 280, Xend: 530, Yend: 280 }
    ]
  };

  constructAlphabet(handler, handler2, handler3) {
    ALPHABET.forEach(element => {
      const button = document.createElement('button');
      button.innerHTML = element;
      button.className = 'btn btn-success';
      button.name = 'alphabet';
      button.style.backgroundColor = '#000';
      button.addEventListener('click', () => {
        let isOnWord = handler(element);
        if (isOnWord) {
          button.style.backgroundColor = '#2D5E2A';
          const letters = this.DOM.lettersCoordinates.filter(value => {
            return value['letter'] === element;
          });
          letters.forEach(item => {
            const ctx = this.DOM.canvas.getContext('2d');
            ctx.font = '20px Arial';
            ctx.fillStyle = '#FFF';
            ctx.fillText(item.letter, item.X, item.Y - 5);
          });
        } else {
          button.style.backgroundColor = 'red';
          this.drawHangman(handler2);
        }
        button.disabled = true;
        this.checkLives(handler2);
        this.checkHits(handler3);
      });
      this.DOM.alphabetDiv.appendChild(button);
    });
  }

  drawHangman = handler => {
    const ctx = this.DOM.canvas.getContext('2d');
    const draw = this.DOM.hangmanCoordinates.filter(value => {
      return value['lives'] === handler();
    });
    draw.forEach(item => {
      ctx.beginPath();
      ctx.strokeStyle = '#FFF';
      if (item.lives === 5) {
        ctx.arc(item.Xini, item.Yini + 20, 20, 0, 2 * Math.PI);
      } else {
        ctx.moveTo(item.Xini, item.Yini);
        ctx.lineTo(item.Xend, item.Yend);
      }
      ctx.stroke();
    });
  };

  drawLines = handler => {
    const ctx = this.DOM.canvas.getContext('2d');
    const word = handler();
    const wordArray = word.split('');
    let x = 200;
    const y = 100;
    wordArray.forEach(value => {
      this.DOM.lettersCoordinates.push({ letter: value, X: x, Y: y });
      ctx.beginPath();
      ctx.strokeStyle = '#FFF';
      ctx.moveTo(x, y);
      ctx.lineTo(x + 15, y);
      ctx.stroke();
      x = x + 35;
    });
  };

  checkLives = handler => {
    this.DOM.lives.innerHTML = 'lives left: ' + handler();
    if (handler() === 0) {
      const buttons = Array.prototype.slice.call(this.DOM.buttons);
      this.DOM.lives.innerHTML = 'YOU LOSE!';
      buttons.forEach(element => {
        element.disabled = true;
      });
    }
  };

  checkHits = handler => {
    if (handler()) {
      const buttons = Array.prototype.slice.call(this.DOM.buttons);
      this.DOM.lives.innerHTML = 'YOU WON!';
      buttons.forEach(element => {
        element.disabled = true;
      });
    }
  };

  bindPlayAgain = handler => {
    this.DOM.playAgain.addEventListener('click', () => {
      this.DOM.lives.innerHTML = '';
      this.DOM.lettersCoordinates = [];
      const ctx = this.DOM.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.DOM.canvas.width, this.DOM.canvas.height);
      const buttons = Array.prototype.slice.call(this.DOM.buttons);
      buttons.forEach(element => {
        element.remove();
      });
      handler();
    });
  };
}
