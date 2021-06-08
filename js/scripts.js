// Utility Logic

function noInputtedWord(word, text) {
  return ((text.trim().length === 0) || (word.trim().length === 0));
}

// Business Logic

function wordCounter(text) {
  if (text.trim().length === 0) {
    return 0;
  }
  let wordCount = 0;
  const wordArray = text.split(" ");
  wordArray.forEach(function(element) {
    if (!Number(element)) {
      wordCount++;
    }
  });
  return wordCount;
}

function numberOfOccurrencesInText(word, text) {
  if (noInputtedWord(word, text)) {
    return 0;
  }
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function(element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++;
    }
  });
  return wordCount;
}

function boldPassage(word, text) {
  let htmlString = "<p>";
  let textArray = text.split(" ");
  textArray.forEach(function(element, index) {
    if (word === element) {
      htmlString = htmlString.concat("<b>" + element + "</b>");
    } else {
      htmlString = htmlString.concat(element);
    }
    if (index !== (textArray.length - 1)) {
      htmlString = htmlString.concat(" ");
    }
  });
  return htmlString + "</p>";
}

function mostCommonWords(text) {
  //split passage into an array
  let textArray = text.split(" ");
  //count number of times each word is found in passage
  let words;
  let word1V = 0;
  let word1T;
  let word2V = 0;
  let word2T;
  let word3V = 0;
  let word3T;
  textArray.forEach(function(word) {
    words = numberOfOccurrencesInText(word, text);
    if (words > word1V) {
      word1V = words;
      word1T = word;
    }
    if (words > word2V && words < word1V)  {
      word2V = words;
      word2T = word;
    }
    if (words > word3V && words < word2V )  {
      word3V = words;
      word3T = word;
    }
  });
  return word1T+": "+word1V+" | "+word2T+": "+word2V+" | "+word3T+": "+word3V;
}

//mostCommonWords("green green green green blue blue blue red red yellow")
//mostCommonWords("red red green green blue yellow blue green")

// UI Logic

$(document).ready(function(){
  $("form#word-counter").submit(function(event){
    event.preventDefault();
    const passage = $("#text-passage").val();
    const word = $("#word").val();
    const wordCount = wordCounter(passage);
    const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
    $("#total-count").html(wordCount);
    $("#selected-count").html(occurrencesOfWord);
    $("#bolded-passage").html(boldPassage(word, passage));
  });
});