// ¡Buena suerte!
/**
 * He d'implementar un joc en què l'usuari introdueixi un número a un input i quan apreti submit el programa verifiqui si aquest és igual o no a un número aleatori entre l'1 i el 100 generat prèviament. 
 * 
 * Si el número introduit és més gran que aquest valor predefinit, quan es cliqui submit guess s'ha de mostrar un missatge a #message dient "Too high! Try again!" i si és més petit "Too low! Try again!".
 * 
 * A més, a cada submit el p Previous guesses (id #previous-guesses) s'ha d'actualitzar amb els valors que introdueixi l'usuari.
 * Hem de tenir en compte que l'usuari tindrà 10 intents i, per tant, el p Guesses Remaining (id #remaining-guesses) també s'haurà d'actualitzar descomptant 1 a cada intent fins a arribar a 0
 * 
 * Quan s'acabi el joc si el jugador perd s'ha de mostrar el #message "You Lost! Better luck next time!", el botó de submit desapareix i l'input no permet introduïr més números.
 * Si guanya, passa el mateix però el missatge és "You Won! Congrats!".
 * 
 * El joc s'acaba quan l'usuari encerta el nombre o quan esgota els 10 intents.
 */
// Necessitem crear un número aleatori i guardar-lo en una variable de manera per poder verificar si l'introduït per l'usuari és el mateix o més alt o més baix.

const randomNumber = Math.floor(Math.random() * 100) + 1;


console.log(randomNumber);

// També hem de crear variables pels intents que queden i pels previous guesses.

let remainingGuesses = 10;

const previousGuesses = [];

// Guardem el valor de l'id guessField i el convertim a número.


const form = document.querySelector("form");

// Creem un event submit i comprovem el valor del número introduit a l'input
// Si aquest número és més petit/gran que randomNumber canvia #message i modifiquem previous guesses i guesses remaining

form.addEventListener("submit", function (event) {
    console.log("form submitted");
    event.preventDefault(); /** */
    let guessField = document.querySelector("#guessField"); /**Assignem id a una variable */
    let guessedValue = guessField.value; /**Assignem el valor de la variable que hem creat d'aquest ID a una altra variable*/
    let submitButton = document.querySelector("#subt"); /**Creem una variable amb el botó. Això ens servirà per desactivar-lo més endavant. */

    let guessNumber = Number(guessedValue); /**Transformem la string en número amb el mètode Number */
    console.log("Number guess:", guessNumber);

    guessField.value = ""; /**Fem que el valor de guessField desaparegui cada cop que apretem submit */

    if (guessNumber < randomNumber || guessNumber > randomNumber) {
        remainingGuesses-- /**Reduïm en 1 el valor de remainingGuesses a cada click */
        document.querySelector("#remaining-guesses").textContent = remainingGuesses; /**Modifiquem el textContent del span perquè aparegui */
        console.log(remainingGuesses);

        previousGuesses.push(guessNumber); /**Afegim el número que ha introduït l'usuari a l'array previous guesses*/
        console.log(previousGuesses);
        /**Amb el mètode join podem convertir els elements d'un array a string i mostrar-los units per el contingut que li indiquem (" - ")*/
        document.querySelector("#previous-guesses").textContent = previousGuesses.join(" - ");

        document.querySelector(".lowOrHi").style.backgroundColor = "#7B3056";

        if (guessNumber < randomNumber) {
            document.querySelector("#message").textContent = "Too low! Try again!"; /**Afegim el missatge corresponent a sota i li canviem el background color */
        } else if (guessNumber > randomNumber) {
            document.querySelector("#message").textContent = "Too high! Try again!";
        }
    } if (guessNumber === randomNumber) {
        document.querySelector("#message").textContent = "You won! Congrats!";
        document.querySelector(".lowOrHi").style.backgroundColor = "#7B3056";

        guessField.disabled = true; /**Desactivem l'input i li canviem el background color */
        guessField.style.backgroundColor = "#55BFC6";
        submitButton.disabled = true; /**Desactivem el submit button */

    } if (remainingGuesses === 0 && guessNumber !== randomNumber) { /**Si queden 0 intents o el número introduit no és igual al randomNumber, és a dir si l'usuari ha perdut els intents i no ha guanyat */
        document.querySelector("#message").textContent = "You lost! Better luck next time!";
        document.querySelector(".lowOrHi").style.backgroundColor = "#7B3056";

        guessField.disabled = true;
        guessField.style.backgroundColor = "#55BFC6";
        submitButton.disabled = true;
    }
});


