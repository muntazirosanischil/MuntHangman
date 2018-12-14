//the words that user will guess
wordsFood = ["macaroniandcheese","oreamcflurry","poop","mayonnaise","cheese","turkeysandwich","boiledeggs","bread","dog"];
wordsMood = ["angry","mad","poopy","ecstatic","donkey","mood","happy","pooping","peeing","aroused"];
wordsSammi = ["nahmsayin","itslit","fourteenhunned","treywey","musake","sauce","supreme","bape","stoopid"];
//letters
letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];


function startGame() {
    guessedLetters = [];
    wrongLetters = [];
    selectBox();
    lives = 7;
    y = parseInt(document.getElementById("difficulty").value);
    if(y === 1){
        rand = wordsFood[Math.floor(Math.random() * wordsFood.length)];
    }else if(y===2){
        rand = wordsMood[Math.floor(Math.random() * wordsMood.length)];
    }else if(y===3){
        rand = wordsSammi[Math.floor(Math.random() * wordsSammi.length)];
    }
    document.getElementById("word").innerHTML = clearBoard();
    console.log(rand);
    clearBoard();
    rand1 = "";
    for(var i = 0; i<rand.length; i++){
        rand1 = rand1 + rand[i] + " ";
    }
    console.log(rand1)
    document.getElementById("lives").innerHTML = " life counter: " + lives;
    document.getElementById("picture").innerHTML = picture();
    document.getElementById("graveyard").innerHTML = wrongLetters;
}
/*
This function determines what happens after the user chooses a letter: whether they
lose a life or if they reveal a part of the hidden message
*/
function guessLetter() {
    x = document.getElementById("selectLetter").value;
    guessedLetters += x;
    selectBox();
    var z = 0;
    for(var i = 0; i <rand.length; i++){
        if(rand[i]===x){
            z++;
        }
    }
    if(z===0){
        wrongLetters += x;
        lives = lives - 1;
    }
    document.getElementById("picture").innerHTML = picture();
    document.getElementById("lives").innerHTML = " life counter: " + lives;
    if(lives <= 0){
        document.getElementById("lives").innerHTML = "Game over, you poopoo brain! Click 'New Game' to play again.";
    }
    console.log(lives);
    console.log(wrongLetters);
    document.getElementById("word").innerHTML = printWord();
    document.getElementById("graveyard").innerHTML = wrongLetters;
}
/*
This function is needed in order to give the user the letters they select when guessing the hidden message
 */
function selectBox() {
    result = "";
    for(var i = 0; i< letters.length;i++){
        if(guessedLetters.indexOf(letters[i]) === -1){
            result += "<option value='" + letters[i] + "'>" + letters[i] + "</option>";
        }
        if(guessedLetters.indexOf(letters[i]) !== -1){
            result += "<option disabled='true' value='" + letters[i] + "'>" + letters[i] + "</option>";
        }
    }
    console.log(result);
    document.getElementById("selectLetter").innerHTML = result;
}
/*
This function gives the user the length of the hidden message, by printing underscores
*/
function clearBoard() {
    print ="";
    for(var i = 0; i< rand.length; i++){
        print += "_ ";
    }
    return print;
}
/*
Prints a part of the hangman for every life the user loses
 */
function picture() {
    if(lives ===7){
        return "Select a letter!";
    }
    if(lives ===6){
        return "<img src='img/hangman1.png'/>";
    }
    if(lives ===5){
        return "<img src='img/hangman2.png'/>";
    }
    if(lives ===4){
        return "<img src='img/hangman3.png'/>";
    }
    if(lives ===3){
        return "<img src='img/hangman4.png'/>";
    }
    if(lives ===2){
        return "<img src='img/hangman5.png'/>";
    }
    if(lives ===1){
        return "<img src='img/hangman6.png'/>";
    }
    if(lives <= 0){
        return "<img src='img/shrek.webp'/>";
    }
}
/*
Whenever the users guesses a correct letter, this function prints out that piece of the hidden message
*/
function printWord() {
    var semiWord = "";
    for(var i = 0; i < rand1.length; i++) {
        if (guessedLetters.indexOf(rand1[i])> -1) {
            semiWord += rand1[i];
        }else{
            semiWord += print[i];
        }
    }
    console.log(semiWord);
    var f = 0;
    for(var i = 0; i < rand1.length;i++){
        if(semiWord[i] !== rand1[i]){
            f= f-1
        }
    }
    if(f===0){
        return "Correct! The word is: " + '"' + rand + '"' +  ", Congratulations";
    }
    return semiWord;
}