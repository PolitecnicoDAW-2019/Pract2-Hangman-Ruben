class Service {
  checkWord = (letter, word) => word.toUpperCase().includes(letter);

  checkHits = (hits, word) => hits === word.length;
}
