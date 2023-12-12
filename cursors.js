let cursor = Math.floor(Math.random()*13);
console.log(cursor);

let corps = document.querySelector("body");
corps.style.cursor = `url(cursors/Click${cursor}.svg)`;

document.body.style.cursor = url("cursors/Click${cursor}.svg");