$( _ =>{

    let serContentBox = $('.services-content');
    let serFG = $('.serone');
    let serBG = $('.sertwo');
    let serBoxWidth = serContentBox.width();
    let serBoxHeight = serContentBox.height();
    let serTimer;    

    // CODE TO MOVE THE FG AND BG based on MOUSE POSITION - REUSABLE 
    serContentBox.mousemove(function(event){
        event.stopPropagation()
        clearTimeout(serTimer);
        
        let left = event.pageX - serContentBox.offset().left - serBoxWidth/2;
        let top = event.pageY - serContentBox.offset().top - serBoxHeight/2;
       
        serFG.css({ 'transform': `translate(${-left}px, ${-top}px)`, 'transition': 'transform ease-out 14s' });
        serBG.css({ 'transform': `translate(${-left}px, ${-top}px)`, 'transition': 'transform ease-out 18s' });

       
    });
    // CODE TO REVERT BACK TO INIT POS
    serContentBox.mouseleave(function(event){         
        serTimer = setTimeout(() => {
            serFG.css({ 'transform': `translate(0, 0)`, 'transition': 'transform ease-in-out 1s' });
            serBG.css({ 'transform': `translate(0, 0)`, 'transition': 'transform ease-in-out 1s' });
        }, 3000);
    });
});

