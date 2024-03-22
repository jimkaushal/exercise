// Checker function to check the pair of parenthesis in a given string
function checkParenthesisPair (givenString) {
  const arr = []
  const parenthesisPairs = {
    '(': ')',
    '[': ']',
    '{': '}'
  }

  for (let character of givenString) {
    if (parenthesisPairs[character]) {
      arr.push(character)
    } else if (character === ')' || character === ']' || character === '}') {
      if (parenthesisPairs[arr.pop()] !== character) {
        return false
      }
    }
  }

  return arr.length === 0
}

const inputString = '({()})'
console.log(
  `Are all parenthesis pairs have been closed in the string "${inputString}" valid? ${checkParenthesisPair(inputString)}`
)
