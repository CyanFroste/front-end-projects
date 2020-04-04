const portfolioContainer = document.querySelector('.portfolio-items');

portfolioContainer.addEventListener('click', evt => {

    evt.preventDefault();
    let modalToggle = evt.target.closest('.portfolio-link');

    if(!modalToggle) return;
    
    let modal = modalToggle.parentNode.nextElementSibling;

    let modalPopup = modal.querySelector('.pm-content-container');
    
    let closeModal = modal.querySelector('.modal-close');

    // modal control functions

    let modalOpen = _ => {
        modal.classList.add('view-modal');
        modal.style.animation = 'FadeIn 400ms forwards';
        document.body.style.overflowY = 'hidden';
    };

    let modalClose = _ => {
        modal.style.animation = 'FadeOut 400ms forwards';
        document.body.style.overflowY = 'auto';
        setTimeout( _ => {
            modal.classList.remove('view-modal'); 
        }, 400);
    };

    modalOpen();

    closeModal.addEventListener('click', _ => {
        modalClose();        
    });

    modal.addEventListener('click', evt => {
        if(evt.target == modal) 
            modalClose();
        else
            return;
    });

    document.addEventListener('keydown', evt => {
        if(evt.keyCode === 27){
            modalClose();
        }
    });


});