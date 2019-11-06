class Service {
  checkWord = (letter, word) => word.toUpperCase().includes(letter);

  checkHits = (hits, word) => hits === Array.from(new Set(word.toUpperCase())).join('').length;
}
