let change = document.querySelector('.change');
let sfx = document.querySelectorAll('audio');
let bg = document.querySelector('.container');
let palette = document.querySelector('.control-palette');
let color = palette.querySelectorAll('span');


// random color generator
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let colorcode = '#';
    for (let i = 0; i < 6; i++) {
      colorcode += letters[Math.floor(Math.random() * 16)];
    }
    return colorcode;
  }
  

console.log(sfx);
let firstTsuzumi = true;
let firstSlash = true;

change.addEventListener('click', _ => {
    sfx[0].play();
    bg.style.background = getRandomColor();   
});

palette.addEventListener('mouseenter', e => {
    palette.children[0].style.display = 'none'; 
    setTimeout(() => {
        palette.children[0].style.display = 'block';
        let colors = palette.children[0].children;
        for(let color of colors){
            color.style.background =  getRandomColor();
        }
        // console.log(colors);
    }, 200);
   
});


palette.addEventListener('mouseleave', e => {     
    palette.children[0].style.display = 'none'; 
});

for (let selectable of color){
    selectable.addEventListener('mouseenter', e => {
        let selected = e.target.style.background;
        sfx[0].play();
        bg.style.background = selected;        
    });
}
