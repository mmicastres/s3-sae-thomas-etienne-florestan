let cursor = Math.floor(Math.random() * 13);
console.log(cursor);

const urlDefault = `url('cursors/Click${cursor}.svg')`;
const urlGrab = `url('cursors/Grab${cursor}.svg')`;

// Pour définir le pointeur de base sur tout l'html en pointeur aléatoire
document.querySelector("html").style.cursor = urlDefault + ", default";



// Pour *essayer* définir le pointeur sur tous les liens en pointer personnalisé 
let liens = document.querySelectorAll("a");
let i = 0

while (i<liens.length) {
    liens[i].addEventListener('mouseover', () => { document.querySelector("html").style.cursor = urlGrab + ", pointer"; })  
    liens[i].addEventListener('mouseleave', () => { document.querySelector("html").style.cursor = urlDefault + ", default"; }) 
    i++;
}


// PROBLEME : ON A LA PRIO SUR LHTML MAIS PAS SUR LES NAV A, CAR LE POINTEUR N'A PAS PLUSIEURS STATUS
// LE A A DONC UNE CLASSE QUI DEFINI SON POINTEUR EN CHANGEANT LIMAGE
// COMMENT PRENDRE LA PRIO SUR LE A ???
