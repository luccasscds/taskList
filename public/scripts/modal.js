function openController(classModal) {
    const modais = document.querySelectorAll('.open');

    modais.forEach( modal => {
        modal.classList.remove('open');
    });
    
    const newModais = document.querySelectorAll('.open');
    if(newModais.length == 0) classModal.classList.add('open');
}

// Modal do profile
function modalController(event) {
    const profile = document.querySelector('.modal');
    const avatar = event.target.className;
    
    if(avatar === 'avatar') {
        const open = profile.classList[1];
        openController(profile);

        if(open === "open") profile.classList.remove('open');
    };
};

function modalAddCollection() {
    const modal = document.querySelector('.modal-add-collection');
    openController(modal);
};

function modalCloseCollection() {
    const modal = document.querySelector('.modal-add-collection');
    modal.classList.remove('open');
};

function modalCollection() {
    const modal = document.querySelector('.modal-collection');
    const open = modal.classList[1];

    if(open === "open") return modal.classList.remove('open');
    
    openController(modal);
};

function modalTask(event) {
    const divs = document.querySelectorAll('.modal-task');
    divs.forEach( modal => {
        const id = modal.dataset.id;
        if(id == event){
            const open = modal.classList[1];
            if(open === "open") return modal.classList.remove('open');
            openController(modal);
        };
    });
};

function modalCompletedTask() {
    const modal = document.querySelector('.modal-completed-task');
    const open = modal.classList[1];
    
    openController(modal);
    
    if(open === "open") return modal.classList.remove('open');
};

function modalEditTask(id) {
    if(id !== undefined) {
        const form = document.querySelector('.modal-edit-task .main-form');
        const newUrl = form.action.replace(":index", id);

        form.action = newUrl;
    }
    const modal = document.querySelector('.modal-edit-task');
    const open = modal.classList[1];
    
    openController(modal);
    
    if(open === "open") return modal.classList.remove('open');
};