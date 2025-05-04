self.onmessage = function (e) {
  const { originalText, userInput } = e.data;
  let highlightedText = [];

  for (let i = 0; i < userInput.length; i++) {
    highlightedText.push({
      char: originalText[i],
      color: userInput[i] === originalText[i] ? "#4ade8055" : "#f8717155",
    });
  }

  postMessage(highlightedText);
};
