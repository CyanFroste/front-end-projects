$( _ => {

    let intro = $('.intro');
    let navToggleWrap = $('.nav-toggle-wrap');
    let navToggle = $('.nav-toggle');
    let navInflater = $('.nav-inflater');
    let mainMenu = $('.main-menu');
    let menuPreview = $('.menu-preview');
    let menuNav = $('.menu-content nav');
    let introNav = $('.intro-navbar');
    let introLogo = $('.intro-logo-display');

    // CODE TO MAKE THE NAV TOGGLE STAY NEAR THE RIGHT EDGE OF THE CONTAINER

    // navToggleWrap.css({ 'right': `calc(${($('body').width() - $('body').data('conWidth'))/2}px + 1em)` });
    navToggleWrap.css({ 'transform': `translateX(${(($('body').width() - $('body').data('conWidth'))/2) + $('body').data('conWidth') - navToggleWrap.width() - 16}px)` });    
    $(this).resize(function(event){
        // navToggleWrap.css({ 'right': `calc(${($('body').width() - $('body').data('conWidth'))/2}px + 1em)` });        
        navToggleWrap.css({ 'transform': `translateX(${(($('body').width() - $('body').data('conWidth'))/2) + $('body').data('conWidth') - navToggleWrap.width() - 16}px)` });
        
    });

    // CODE TO HIDE / UNHIDE nav toggler and intro navigation links
    // check if navtoggle is floating
    let floatNav = false;
    $(this).scroll(function(event){
        event.stopPropagation();        

        if(pageYOffset > intro.height()/10) {
            if (navToggleWrap.hasClass('visible')) return;
            navToggleWrap.addClass('visible'); 
            introNav.removeClass('visible');          
            // console.log('hidden');
            if(!floatNav){
                floatNav = true;
                introLogo.animate({ 'opacity': '1' }, 400);
            }                     
        }
        else {
            navToggleWrap.removeClass('visible');     
            introNav.addClass('visible');                               
            if(floatNav){
                introLogo.animate({ 'opacity': '0' }, 400);
                floatNav = false;  
            }                   
        }        
    });


    // ALL THE ANIMATION CONTROLS
    navToggle.click(function(event){

        if(navToggle.hasClass('active')) {
            // DEFLATE
            navToggle.addClass('inactive');
            navToggle.removeClass('active');
            navToggle.children().addClass('inactive');
            navToggle.children().removeClass('active');

            navInflater.addClass('deflated');
            navInflater.removeClass('inflated');
            
            mainMenu.removeClass('inflated');
            mainMenu.addClass('deflated');

            menuPreview.removeClass('inflated');
            menuNav.removeClass('inflated');

            $('body').data('inMenu', false);
            $('body').css({ 'overflow': 'auto' });
            
        }
        else {
            // INFLATE
            navToggle.addClass('active');
            navToggle.removeClass('inactive');
            navToggle.children().addClass('active');
            navToggle.children().removeClass('inactive');

            navInflater.addClass('inflated');
            navInflater.removeClass('deflated');

            mainMenu.addClass('inflated');
            mainMenu.removeClass('deflated');

            menuPreview.addClass('inflated');
            menuNav.addClass('inflated');

            $('body').data('inMenu', true);
            $('body').css({ 'overflow': 'hidden' });

        }
    });

});