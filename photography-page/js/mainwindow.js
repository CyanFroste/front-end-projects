$( _ => {

    let intro = $('.intro');
    let portfolio = $('.portfolio');
    let services = $('.services');
    let contact = $('.contact');
    let loadingscreen = $('.loading-screen');
    let loadTimer;

    $('body').data('conWidth',  intro.children().width());

    // saving current x and y co ordinates to body as an object
    $(this).mousemove(function (event) {        
        $('body').data('mouseX', event.pageX);
        $('body').data('mouseY', event.pageY);
    });

    // SAVING current intro container width to body as an object
    $(this).resize(function(){
        $('body').data('conWidth', intro.children().width());
    });

    // CODES TO ANIMATE MAIN LOADING SCREEN
    clearTimeout(loadTimer);
    loadTimer = setTimeout(() => {
        loadingscreen.animate({'opacity': '0'}, 2000);        
    }, 2000);
    
    loadTimer = setTimeout(() => {       
        loadingscreen.addClass('loaded')
    }, 4000);
    
    // console.log(intro.position(), portfolio.position(), services.position());    

    // CODE TO ANIMATE LOADING OF SECTIONS
    $(this).scroll(function(event){
        
        // console.log(pageYOffset)

        if(pageYOffset > portfolio.height()/4) portfolio.addClass('sectionloaded'); 
        else portfolio.removeClass('sectionloaded');

        if(pageYOffset - portfolio.height() > services.height()/4 ) services.addClass('sectionloaded');
        else services.removeClass('sectionloaded');

        if(pageYOffset - portfolio.height() - services.height() > contact.height()/4 ) contact.addClass('sectionloaded');
        else contact.removeClass('sectionloaded');

    });

});