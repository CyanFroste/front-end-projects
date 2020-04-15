$(_ => {

    let pfContainer = $('.portfolio-container');
    let scrollableContentBox = $('.portfolio-content');
    let page = $('.pfpg');
    let progressbar = $('.pf-progressbar');
    let pfNavLinks = $('.portfolio-container nav ul')
    let currWidth = $(pfContainer[0]).width();
    let maxScrollable = -4 * 1368 + currWidth;
    let minScrollable = scrolled = progressed = 0;
    let timer;

    // makes the progressbar go from max to zero - aesthetics
    progressbar.addClass('init');
    timer = setTimeout(() => {
        progressbar.removeClass('init');
        progressbar.css({ 'transform': `scaleX(${progressed})` });
    }, 2000);


    $(window).resize(function () {
        currWidth = $(pfContainer[0]).width();
        currHeight = $(page[0]).height();
        maxScrollable = -4 * 1368 + currWidth;
    });

    // CODE TO SCROLL THE STORIES GALLEY SIDEWAYS USING A PLUGIN - REUSABLE, IMPORTANT
    scrollableContentBox.mousewheel(function (event) {
        event.preventDefault();
        clearTimeout(timer);       
        scrolled += event.deltaFactor * event.deltaY;
        if (scrolled < maxScrollable) {
            page.css({ 'transform': `translateX(${scrolled}px)` });
            scrolled = maxScrollable;
            timer = setTimeout(function () {
                page.css({ 'transform': `translateX(${scrolled}px)` });
            }, 400);
        } else if (scrolled > 0) {
            page.css({ 'transform': `translateX(${scrolled}px)` });
            scrolled = minScrollable;
            timer = setTimeout(function () {
                page.css({ 'transform': `translateX(${0}px)` });
            }, 400);
        } else {
            page.css({ 'transform': `translateX(${scrolled}px)` });
        }
        progressed = scrolled / maxScrollable;
        progressbar.css({ 'transform': `scaleX(${progressed})` });
    });

    // CODE TO SHOW NAME/LINK ON HOVER ON GALLERY ITEM
    page.children().hover(function(event){
        event.stopPropagation();        
        $(event.target.getElementsByTagName('a')[0]).animate({ 'opacity': '1' });
        
    }, function(event){
        event.stopPropagation();        
        $(event.target.getElementsByTagName('a')[0]).animate({ 'opacity': '0' });
    });

    // CODE TO SCROLL WHEN CLICKED ON LINKS ON SECTION
    pfNavLinks.click(function(event){
        event.preventDefault();
        scrolled = $(event.target).attr('href') * -1368;
        page.css({ 'transform': `translateX(${scrolled}px)` });
        progressed = scrolled / maxScrollable;
        progressbar.css({ 'transform': `scaleX(${progressed})` });
        
    });

});