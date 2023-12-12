let cursor = Math.floor(Math.random()*13);
console.log(cursor);

const urlCursor = `url('cursors/Click${cursor}.svg')`;

document.querySelector("html").style.cursor = urlCursor+", default";