// Modal do profile
function modalController() {
    const button = document.querySelector('.profile')
    let open = false

    button?.addEventListener('click', event =>{
        const avatar = event.target.className
        const profile = document.querySelector('.modal')
        
        if(avatar === 'avatar') {
            if(open === false) {
                profile.classList.add('open')
                open = true
            }else {
                profile.classList.remove('open')
                open = false
            }
        }
    })
}
modalController()

function modalAddCollection() {
    const button = document.querySelector('.add-collection')

    button?.addEventListener('click', event =>{
        const button = event.target.className

        const modal = document.querySelector('.modal-add-collection')
        
        if(button === 'add-collection') modal.classList.add('open')
    })
}

function modalCloseCollection() {
    const button = document.querySelector('.modal-add-collection')

    button?.addEventListener('click', event =>{
        const click = event.target.className

        if(click === "cancel" || click === "close") {
            const modal = document.querySelector('.modal-add-collection')
            modal.classList.remove('open')
        }
    })
}

function modalCollection() {
    const button = document.querySelector('.button-modal')
    let press = 0

    button?.addEventListener('click', event =>{
        const click = event.target.className
        const modal = document.querySelector('.modal-collection')
        if(press === 0) {
            modal.classList.add('open')
            press = 1
        }else{
            if(click.baseVal === "text-xl") modal.classList.remove('open')
            press = 0
        }
    })
}

function modalTask() {
    const button = document.querySelector('.task-button')
    let press = 0

    button?.addEventListener('click', event =>{
        const click = event.target.className
        const modal = document.querySelector('.modal-task')
        if(press === 0) {
            modal.classList.add('open')
            press = 1
        }else{
            if(click.baseVal === "text-xl") modal.classList.remove('open')
            press = 0
        }
    })
}

function modalCompletedTask() {
    const button = document.querySelector('.completed-task')
    let press = 0

    button?.addEventListener('click', event =>{
        const click = event.target.className
        const modal = document.querySelector('.modal-completed-task')
        if(press === 0) {
            modal.classList.add('open')
            press = 1
        }else{
            if(click.baseVal === "text-xl") modal.classList.remove('open')
            press = 0
        }
    })
}

modalAddCollection()
modalCloseCollection()
modalCollection()
modalTask()
modalCompletedTask()