// Modal do profile
function modalController(event) {
    const profile = document.querySelector('.modal');
    const avatar = event.target.className;
    
    if(avatar === 'avatar') {
        const open = profile.classList[1];
        profile.classList.add('open');

        if(open === "open") {
            profile.classList.remove('open');
        };
    };
};

function modalAddCollection() {
    const modal = document.querySelector('.modal-add-collection');
    modal.classList.add('open');
};

function modalCloseCollection() {
    const modal = document.querySelector('.modal-add-collection');
    modal.classList.remove('open');
};

function modalCollection() {
    const modal = document.querySelector('.modal-collection');
    const open = modal.classList[1];

    if(open === "open") return modal.classList.remove('open');
    
    modal.classList.add('open');
};

function modalTask() {
    const modal = document.querySelector('.modal-task');
    const open = modal.classList[1];

    modal.classList.add('open');
    
    if(open === "open") return modal.classList.remove('open');
};

function modalCompletedTask() {
    const modal = document.querySelector('.modal-completed-task');
    const open = modal.classList[1];
    
    modal.classList.add('open');
    
    if(open === "open") return modal.classList.remove('open');
};