let cursor = Math.floor(Math.random() * 13);
console.log(cursor);

const urlDefault = `url('cursors/Click${cursor}.svg')`;
const urlGrab = `url('cursors/Grab${cursor}.svg')`;

document.querySelector("html").style.cursor = urlDefault + ", default";
// document.querySelector("html").style.cursor = urlGrab + ", pointer";


document.querySelector("html").addEventListener('mouseover', () => { document.querySelector("html").style.cursor = urlGrab + ", pointer"; })



