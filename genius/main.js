const divPontuacao = document.querySelector("div.pontuacao")
const divMain = document.querySelector("main")
const divs = Array.from(divMain.querySelectorAll("div"))

let btn = document.querySelector('button')
let divPerdeu = document.querySelector('div.perdeu')
let sequencia = []
let animatingColors = false
let currentColorPosition = 0

divMain.addEventListener("click", ev => {
    if (animatingColors) {
        alert("Espere a animação acabar")
        return
    }
    const idxClickedElement = divs.indexOf(ev.target)
    if (idxClickedElement !== sequencia[currentColorPosition]) {
        perdeste()
        divPontuacao.innerHTML = 0
        return
    }
    currentColorPosition++
    ev.target.classList.add("animating")

    if (currentColorPosition >= sequencia.length) {
        currentColorPosition = 0
        setTimeout(() => turno(), 1000 * 2)
    }
})



divPerdeu.style.display = 'none'

function perdeste() {
    if (divPerdeu.style.display === 'none') {
        divPerdeu.style.display = 'block';
        setTimeout(() => perdeste(), 1000 * 3)
    } else {
        divPerdeu.style.display = 'none';
    }
}



divs.forEach(div => {
    div.addEventListener("animationend", () => {
        div.classList.remove("animating")
    })
})

function playAnimationColors() {
    sequencia.forEach((current, index) => {
        setTimeout(() => {
            divs[current].classList.add("animating");
            animatingColors = index < sequencia.length - 1
        }, 1000 * index);
    })
}

function inicio() {
    let cnt = 3
    sequencia = []
    currentColorPosition = 0
    let idx = setInterval(() => {
        if (cnt <= 0) {
            turno()
            clearInterval(idx)
        }
    }, 1000)
    turno()
}

function turno() {
    divPontuacao.innerHTML = sequencia.length
    const rnd = Math.round(Math.random() * 3)
    sequencia.push(rnd)
        playAnimationColors()
}
