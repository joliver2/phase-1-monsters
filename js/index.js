const URL_PREFIX = "http://localhost:3000/monsters"

let page = 1

function createMonsterForm () {

const monsterForm = document.createElement('form')
const monsterName = document.createElement('input')
const monsterAge = document.createElement('input')
const monsterBio = document.createElement('input')
const monsterCreateButton = document.createElement('button')
const formContainer = document.getElementById('create-monster')

formContainer.appendChild(monsterForm)
monsterForm.appendChild(monsterName)
monsterForm.appendChild(monsterAge)
monsterForm.appendChild(monsterBio)
monsterForm.appendChild(monsterCreateButton)

monsterName.placeholder = 'Name...'
monsterAge.placeholder = 'Age...'
monsterBio.placeholder = 'Description...'

monsterCreateButton.textContent = "Create"

monsterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const monsterObject = {
        name: monsterAge.value,
        age: monsterAge.value,
        description: monsterBio.value
    }
postMonster(monsterObject)
monsterForm.reset();
alert("Monster Created!")
})

}

function displayMonsters (pageNumber=1) {
    fetch(`http://localhost:3000/monsters?_limit=20&_page=${pageNumber}`)
    .then(response => response.json())
    .then(monsterData => {
        const monsterContainer = document.querySelector('#monster-container')
        monsterData.forEach(monster => {
            const monsterName = document.createElement('h2')
            const monsterAge = document.createElement('h4')
            const monsterBio = document.createElement('p')

            monsterName.textContent = monster.name
            monsterAge.textContent = "Age: " + monster.age
            monsterBio.textContent = "Bio: " + monster.description

            monsterContainer.appendChild(monsterName)
            monsterContainer.appendChild(monsterAge)
            monsterContainer.appendChild(monsterBio)
        })
    })
}

function postMonster (newMonster) {
    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            },
            body: JSON.stringify(newMonster)
    })
}

document.addEventListener("DOMContentLoaded", () => {
displayMonsters()
createMonsterForm()

const forward = document.querySelector('#back')
const back = document.querySelector('#forward')

forward.addEventListener('click', (page) => {
    page++
    getMonsters(page)
})


})