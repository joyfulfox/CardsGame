class Cards {
    constructor(pic) {
        this.pic = pic;
    }
}
const heart = new Cards('&#9825');
const diamond = new Cards('&#x2662');
const club = new Cards('&clubs;');
const spade = new Cards('&spades;');
const tColumns = 6;
const tRows = 7;

const arr = [heart, diamond, club, spade];
let array = [];
function render() {
    for (let i = 0; i < tRows; i++) {
        const row = document.createElement('tr');
        document.querySelector('table').appendChild(row);
        array.push([]);
        for (let j = 0; j < tColumns; j++) {
            let index = Math.floor(Math.random() * 4);
            array[i].push({ 'row': i, 'cell': j, 'value': arr[index].pic, 'checked': 'empty' })
            let cell = document.createElement('td');
            cell.innerHTML = arr[index].pic;
            cell.setAttribute('row', i);
            cell.setAttribute('cell', j);
            cell.setAttribute('checked', 'empty');
            cell.setAttribute('name', arr[index].pic);
            cell.setAttribute('width', '50px');
            cell.setAttribute('height', '50px');
            cell.addEventListener('click', validNearest, false);
            row.appendChild(cell);
        }
    }
}
render();

function validNearest(e) {
    const row = e.target.getAttribute('row');
    const cell = e.target.getAttribute('cell');
    let target = array[row][cell];
    target.checked = true;
    let top = (row - 1) >= 0 ? array[row - 1][cell] : false;
    let bot = row < tRows - 1 ? array[Number(row) + 1][cell] : false;
    let left = (cell - 1) >= 0 ? array[row][cell - 1] : false;
    let right = cell < tColumns - 1 ? array[row][Number(cell) + 1] : false;
    let validCounter = 0;

    target.value === top.value && top.value !== false && top.checked === 'empty' ? (
        top.checked = true, validEachNear(top)) : validCounter++;
    target.value === bot.value && bot.value !== false && bot.checked === 'empty' ?
        validEachNear(bot) : validCounter++;
    target.value === left.value && left.value !== false && left.checked === 'empty' ?
        validEachNear(left) : validCounter++;
    target.value === right.value && right.value !== false && right.checked === 'empty' ?
        validEachNear(right) : validCounter++;
    validCounter == 4 ? (
        validCounter = 0,
        target.checked = false,
        e.target.classList.add('aloneCell'),
        setTimeout(() => {
            e.target.classList.remove('aloneCell');
        }, 1000)
    ) : deleteElements(array);
}

function validEachNear(e) {
    const { row, cell, value } = e;
    e.checked = true;
    let top = (row - 1) >= 0 ? array[row - 1][cell] : false;
    let bot = row < tRows - 1 ? array[Number(row) + 1][cell] : false;
    let left = (cell - 1) >= 0 ? array[row][cell - 1] : false;
    let right = cell < tColumns - 1 ? array[row][Number(cell) + 1] : false;

    value === top.value && top.value !== false && top.checked === 'empty' ?
        validEachNear(top) : false;
    value === bot.value && bot.value !== false && bot.checked === 'empty' ?
        validEachNear(bot) : false;
    value === left.value && left.value !== false && left.checked === 'empty' ?
        validEachNear(left) : false;
    value === right.value && right.value !== false && right.checked === 'empty' ?
        validEachNear(right) : false;
}

function deleteElements(arr) {
    let allSaeElems = document.querySelectorAll('td');
    arr.forEach(e => {
        e.forEach(el => {
            if (el.checked === true) {
                allSaeElems.forEach(tag => {
                    let delRow = tag.getAttribute('row');
                    let delCell = tag.getAttribute('cell');
                    if (delRow == el.row && delCell == el.cell) {
                        el.checked = false;
                        tag.classList.add('removing');
                        setTimeout(() => {
                            tag.classList.remove('removing');
                            tag.innerHTML = '';
                        }, 1000);
                    }
                })
            }

        })
    })
}

const btnRefresh = document.querySelector('#refresher');
btnRefresh.addEventListener('click', function () {
    let table = document.querySelector('table')
    table.classList.toggle('refresh');
    array = [];
    setTimeout(() => {
        table.innerHTML = '';
        render();
    }, 600);
    setTimeout(() => {
        table.classList.toggle('refresh');
    }, 1200);
}, false);