let area = document.getElementById('area') // поле
let cells = document.getElementsByClassName('cell') // ячейка
let whoWins = document.getElementById('whoWins') // кто выиграл
let currentPlayer = document.getElementById('currentPl') // азыркы игрок
let roundHistory = [] // история раунда сохр
let root = document.getElementsByClassName("root")
let player = 'X'

let stat = {
    'X': 0,
    'O': 0,
    'D': 0
} // статистиканын объект шаблону

let winCombination = [ // утуу комбинациялары
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
]

for (let i = 1; i <= 9; i++) { // 9 ЯЧЕЙка открыто
    area.innerHTML += `<div class="cell" pos="${i}"></div>`//добавляем к полю класс и с помощью pos связывем i 
}

for (let i = 0; i < cells.length; i++) { // цикл что индекс должен быть меньше,при нажатии на ячейки
    cells[i].addEventListener('click', cellOnclick)
}
// функция проверяет ячейку то есть клик X OR O
function cellOnclick() {
    let data = []

    if (!this.innerHTML) { // ячейканы проверяем
        this.innerHTML = player 
    } else {
        alert('The cell has already been occupied!')
        return;
    }

    for (let i in cells) {
        if (cells[i].innerHTML == player) {
            data.push(parseInt(cells[i].getAttribute('pos')))
        }
    }

    if (checkWinner(data)) {
        stat[player] += 1 // статистика озгормону жанылатабыз
        whoWins.innerHTML = 'Victory is ' + [player]
        roundHistory.push(whoWins.innerHTML)
        refresh()
    } else {
        let draw = true
        for (let i in cells) {
            if (cells[i].innerHTML == '') draw = false;
        }

        if (draw) {
            stat.D += 1
            refresh()
            whoWins.innerHTML = 'Game Over'
            roundHistory.push(whoWins.innerHTML)
        }
    }

    // =, ==, ===
    player = player === "X" ? "O" : "X"//после х сразу о после х
    currentPlayer.innerHTML = player.toLocaleLowerCase()//делает нижний регистр текущего игрока
}

function checkWinner(data) {
    for (let i in winCombination) {
        let win = true;//  true - утту
      
        for (let j in winCombination[i]) {
            let id = winCombination[i][j];
            let ind = data.indexOf(id)

            if (ind == -1) {
                win = false // false - утулду
            }
        
        }
        if (win) return true
    }
    return false
}

function refresh() {
        for(let i =0;i<cells.length;i++){
            cells[i].innerHTML = ''
        }
        updateStat()
        updateRoundHistory()
        gameOver()

}

function updateStat() {
    document.getElementById('sX').innerHTML = stat.X
    document.getElementById('sO').innerHTML = stat.O
    document.getElementById('sD').innerHTML = stat.D
}

function updateRoundHistory() {
    document.getElementById('roundHistory').innerHTML = roundHistory
}

function gameOver() {
    console.log(whoWins.innerHTML)
    if(whoWins.innerHTML == "Victory is X") {
        document.getElementById('root').style.backgroundColor = "red" //цвет крестика
    }  else if(whoWins.innerHTML == "Victory is O") {
        document.getElementById('root').style.backgroundColor = "rgb(230, 16, 201)" //цвет нолика
    } else if(whoWins.innerHTML = 'Game Over'){
        document.getElementById('root').style.backgroundColor = "yellow"
    }
}