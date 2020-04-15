$( _ => {

    let introLogo = $('.intro-logo-display');
    let intro = $('.intro');

    let traversablePixels = intro.height() - 100;
    // this gives unit rotatable degree w.r.t any length
    let unitRot = 360 / traversablePixels;

    // code forr the rotating logo. REUSABLE
    $(this).scroll(function(event){
        introLogo.children().css({ 'transform': `rotateZ(${ $(this).scrollTop() * unitRot }deg)` });
    });
        

});