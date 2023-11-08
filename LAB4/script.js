function showInput (){
    var word = prompt("Введите слово", "");
    if (isPalindrome(word)){
        alert("Слово \"" + word + "\" палиндром");
    }
    else {
        alert("Слово \"" + word + "\" не палиндром");
    }
}

function isPalindrome(string) {
    string = string.toLowerCase().replaceAll("/\W/", '').replaceAll(" ", '')
    const stringArray = [...string];
    const newArray = [];
    stringArray.forEach(index => {
      newArray.unshift(index);
    });
    const reversedString = newArray.join('');
    console.log(string);
    return string === reversedString;
  }