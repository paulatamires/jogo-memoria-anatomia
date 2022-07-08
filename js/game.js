const grid = document.querySelector('.grid')
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')


const sistemas = [
    'anatomia',
    'sistema-circulatorio',
    'sistema-digestorio',    
    'sistema-endocrino',
    'sistema-esqueletico',
    'sistema-linfatico',
    'sistema-muscular',
    'sistema-nervoso',
    'sistema-respiratorio',
    'sistema-urinario',
]

const createElement = (tag, className) => {
    const element = document.createElement(tag)
    element.className = className
    return element
}

let firstCard = ''
let secondCard = ''

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card')

    if(disabledCards.length == 20){
        clearInterval(this.loop)
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML} segundos`)
    }
}

const checkCards = () => {
    const primeiroSistema = firstCard.getAttribute('data-sistema')
    const segundoSistema = secondCard.getAttribute('data-sistema')

    if(primeiroSistema == segundoSistema){
        firstCard.firstChild.classList.add('disabled-card')
        secondCard.firstChild.classList.add('disabled-card')
        firstCard = ''
        secondCard = ''

        checkEndGame()

    } else{
        setTimeout(() => {
           firstCard.classList.remove('reveal-card')
           secondCard.classList.remove('reveal-card')
           firstCard = '' 
           secondCard = ''
        }, 700)
        
    }
}

const revealCard = ({target}) =>{

    if(target.parentNode.className.includes('reveal-card')){
        return
    }

    if(firstCard == ''){
       target.parentNode.classList.add('reveal-card')
       firstCard = target.parentNode 
    }else if(secondCard == ''){
        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode
    }
    
    checkCards()
}

const createCard = (sistema) => {

    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')

    front.style.backgroundImage = `url('../img/${sistema}.jpg')`
    
    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener('click', revealCard)
    card.setAttribute('data-sistema', sistema)
    
    return card

}

const loadGame = () =>{

    const sistemasDuplicado = [... sistemas, ... sistemas]

    const shuffledArray = sistemasDuplicado.sort(() => Math.random() - 0.5)

    sistemasDuplicado.forEach((sistema) =>{

        const card = createCard(sistema)
        grid.appendChild(card)

    })
}

const startTimer = () => {
    this.loop = setInterval(() =>{
        const currentTime = +timer.innerHTML
        timer.innerHTML = currentTime +1
    }, 1000)
}

window.onload = () =>{    
    spanPlayer.innerHTML = localStorage.getItem('player')
    startTimer()
    loadGame()
}


