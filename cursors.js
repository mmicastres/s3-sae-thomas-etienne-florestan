// On randomize pour avoir un numéro différent à chaque actualisation
let cursor = Math.floor(Math.random() * 13);
console.log(cursor);
// Les liens avec le numéro random, pour rediriger vers un curseur différent à chaque fois
const urlDefault = `url('cursors/Click${cursor}.svg')`;
const urlGrab = `url('cursors/Grab${cursor}.svg')`;

// Pour définir le pointeur de base sur tout l'html en pointeur aléatoire
document.querySelector("html").style.cursor = urlDefault + ", default";


// On récupère tous les liens pour appliquer le cursor : pointer personnalisé
let liens = document.querySelectorAll("a");
let i = 0
console.log(liens)
// La boucle pour appliquer à tous 
while (i < liens.length) {
    liens[i].style.cursor = urlGrab + ", pointer"; //On focus uniquement les liens
    i++;
}

let buttons = document.querySelectorAll("button");
let j = 0
console.log(buttons)

// La boucle pour appliquer à tous 
while (j < buttons.length) {
    buttons[j].style.cursor = urlGrab + ", pointer"; //On focus uniquement les liens
    j++;
}

// window.onload = function() {
//     let cursor = Math.floor(Math.random() * 13);
//     const urlDefault = `url('cursors/Click${cursor}.svg'), default`;
//     const urlGrab = `url('cursors/Grab${cursor}.svg'), pointer`;

//     document.querySelector("html").style.cursor = urlDefault;

//     let links = document.querySelectorAll("a");
//     for (let i = 0; i < links.length; i++) {
//         links[i].style.cursor = urlGrab;
//     }
// }