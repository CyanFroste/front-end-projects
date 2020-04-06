const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove',  e => {
    cursor.setAttribute('style', `top:  ${e.pageY}px; left: ${e.pageX}px; transform: translate(-50%, -50%);`)
});
document.addEventListener('click', () => {
    cursor.classList.add('clicked');
    // console.log('clicked');
    setTimeout(() => {
        cursor.classList.remove('clicked');
    }, 500);
});

// scrolling controls

/*
css: transform: translate(-50%, -50%);position: fixed;
js: cursor.setAttribute("style","top: "+(e.pageY - scrollY)+"px; left: "+(e.pageX)+"px")
*/