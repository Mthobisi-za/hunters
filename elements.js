function createElementsLeft({ firstname, lastname, score, index, link, daysAlive }) {
    var elemnt = `<div class="div-column-white">
    <p><span class="star"><img src="${link}" alt=""></span><span class="number">${index}</span></p>
    <p class="text">${firstname} ${lastname}</p>
    <p class="text">${score}</p>
    <p class="text">${daysAlive}</p>
    
</div>`;
    document.querySelector('.table-content-l').insertAdjacentHTML('beforeend', elemnt)

}

function createElementsRight({ firstname, lastname, score, index, daysAlive }) {
    var elemnt = `<div class="div-column-white">
    
    <p><span class="star"><img src="" alt=""></span><span class="number">${index}</span></p>
    <p class="text">${firstname} ${lastname}</p>
     <p class="text">${score}</p>
     <p class="text">${daysAlive}</p>
     </div>`;
    document.querySelector('.table-content-r').insertAdjacentHTML('beforeend', elemnt)

}

function createElementsForMobile({ firstname, lastname, score, index, link, daysAlive }) {
    var elemnt = `<div class="div-column-white">
    <p><span class="star"><img src="${link}" alt=""></span><span class="number">${index}</span></p>
    <p class="text">${firstname} ${lastname}</p>
    <p class="text">${score}</p>
    <p class="text">${daysAlive}</p>
    
</div>`;
    document.querySelector('.table-content-m').insertAdjacentHTML('beforeend', elemnt)

}

// var arg = [
//     { name: 'Mthobisi', surname: 'Ngubane', score: 20 },
//     { name: 'Mthobisi', surname: 'Ngubane', score: 20 },
//     { name: 'Mthobisi', surname: 'Ngubane', score: 20 },
//     { name: 'Mthobisi', surname: 'Ngubane', score: 20 },
//     { name: 'Mthobisi', surname: 'Ngubane', score: 20 }
// ];

// const half = Math.ceil(arg.length / 2);

// const firstHalf = arg.slice(0, half);
// const secondHalf = arg.slice(half);
// console.log(firstHalf, secondHalf);
// firstHalf.forEach(ele => {
//     createElementsLeft(ele);
// });
// secondHalf.forEach(ele => {
//     createElementsRight(ele)
// });