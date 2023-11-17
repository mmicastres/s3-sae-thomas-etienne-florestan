let cursor = Math.floor(Math.random()*13);
console.log(cursor);

let corps = document.querySelector("body");
corps.style.cursor = `url(cursors/click${cursor}.svg)`;

