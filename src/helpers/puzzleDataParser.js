export function parsePuzzleData(puzzleHTML) {
  const validWords = getValidWords(puzzleHTML);
  
  let puzzleLetters = []
  validWords.map(word => {
    const lettersInWord = word.split('');
    for (let letter of lettersInWord) {
      puzzleLetters.push(letter);
    }
    
    return null;
  });
  puzzleLetters = [...new Set(puzzleLetters)]
  
  const centerLetter = getCenterLetter(validWords, puzzleLetters);
  const outerLetters = getOuterLetters(centerLetter, puzzleLetters);
  
  const pointsNeededForGenius = getPointsNeededForGenius(puzzleHTML);
  
  return {
    validWords: validWords,
    centerLetter: centerLetter,
    outerLetters: outerLetters,
    pointsNeededForGenius: pointsNeededForGenius,
  }
}

function getValidWords(puzzleHTML) {
  let wordsListString = puzzleHTML.match(/"words":\[\[(.*?)\]\]/)[0];
  return wordsListString.match(/\w+/g).slice(1);
}

function getCenterLetter(validWordsList, puzzleLetters) {
  let centerLetterCandidates = puzzleLetters.map(letter => letter);
  
  for (const word of validWordsList) {
    for (const letter of centerLetterCandidates) {
      if (word.indexOf(letter) === -1) {
        const indexForLetterToRemove = centerLetterCandidates.indexOf(letter); 
        centerLetterCandidates.splice(indexForLetterToRemove, 1);
      }
    }
  }
  
  return centerLetterCandidates[0];
}

function getOuterLetters(centerLetter, puzzleLetters) {
  let letters = puzzleLetters.map(letter => letter);
  const centerLetterIndex = puzzleLetters.indexOf(centerLetter);
  letters.splice(centerLetterIndex, 1);
  
  return letters;
}

function getPointsNeededForGenius(puzzleHTML) {
  return Number(puzzleHTML.match(/Points Needed for Genius: (\d*)/)[1]);
}