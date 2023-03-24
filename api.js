const data = {
    "username": "foneworks",
    "password": "HuNterG@m3@2023!@"
};
const testUsers = ['Yokim Pillay', 'Craig Durrant', 'Garth Goodman', 'Kenton Vos', 'Nick Argyros', 'Thato Maloka', 'Aaron Roche', 'Alexandria Nice', 'Christian Ngubane', 'Samantha Slabbert', 'Bianca Hart', 'Brent Robinson', 'Craig Wells', 'Ignatius Mutizwa', 'Luke vd Walt', 'Mthobisi Ngubane', 'Tilesh Bhaga'];
//
function mobile(arg) {

    for (let i = 0; i < arg.length; i++) {
        let counter = i + 1;
        if (counter == 1 || counter == 2 || counter == 3) {
            createElementsForMobile({...arg[i], index: i + 1, link: './images/gold-start.ico' });
        } else {
            createElementsForMobile({...arg[i], index: i + 1 });
        }

    }
}

function desktop(arg) {
    const half = Math.ceil(arg.length / 2);

    const firstHalf = arg.slice(0, half);
    const secondHalf = arg.slice(half);

    for (let i = 0; i < firstHalf.length; i++) {
        let counter = i + 1;
        if (counter == 1 || counter == 2 || counter == 3) {
            createElementsLeft({...firstHalf[i], index: i + 1, link: './images/gold-start.ico' });
        } else {
            createElementsLeft({...firstHalf[i], index: i + 1 });
        }

    }
    let len = half;
    secondHalf.forEach(ele => {
        len++
        createElementsRight({...ele, index: len })
    });
    // for (let i = 0; i < secondHalf.length; i++) {
    //     let len = Number(half + 1);
    //     console.log(len);
    //     createElementsRight({...firstHalf[i], index: len });
    // }
}

function setScores(arg) {
    let newArray = [];
    arg.forEach(obj => {
        let score = 0;
        obj.mini_game_play_data.forEach(ele => {
            if (ele.final_status === 'Win') {
                score += 10;
            }
        });
        newArray.push({...obj, score });
    });
    newArray.sort((a, b) => (a.score > b.score ? -1 : 1));
    newArray.sort((a, b) => (a.daysAlive > b.daysAlive ? -1 : 1));

    desktop([newArray[0], newArray[1], newArray[2], newArray[3], newArray[4], newArray[5], newArray[6], newArray[7], newArray[8], newArray[9]]);
    mobile([newArray[0], newArray[1], newArray[2], newArray[3], newArray[4], newArray[5], newArray[6], newArray[7], newArray[8], newArray[9]]);
    document.querySelector('.loader').style.display = 'none';
    const labelEmail = document.querySelector('.loader-css');
    labelEmail.remove();
    console.log('Full list of sorted data with scores and added days alive to key property value', newArray);
}

function passData(dataArg) {
    var newFilteredData = [];
    dataArg.forEach(element => {
        var reference = Object.keys(element)[0];
        var id = element[reference]._id;
        var daysAlive = element[reference].days_alive;
        var playerGames = element[reference].mini_game_play_data;
        var resetsLoop = [];
        let userIfo = element[reference].foneworksUserData.message;


        element[reference].resets_data.forEach(ele => {
            var arg = ele['mini_game_play_data'];
            daysAlive = daysAlive + ele.days_alive;
            arg.forEach(ele => {
                resetsLoop.push(ele);
            })
        });
        let fullNames = userIfo.firstname + ' ' + userIfo.lastname;
        let tester = testUsers.indexOf(fullNames);

        if (tester !== -1) {
            console.log(userIfo, tester)
        } else {
            newFilteredData.push({ id, daysAlive, mini_game_play_data: [...playerGames, ...resetsLoop], ...userIfo })
        }
    });
    newFilteredData.sort((a, b) => a.daysAlive - b.daysAlive);

    setScores(newFilteredData);
}
//  else if (userIfo.firstname === 'Pula') {
//     console.log(userIfo)
// }

function getData(token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://api-services.injozitech.com/api/hunters/v1/getAllUsers", requestOptions)
        .then(response => response.json())
        .then(result => passData(result.all_users_data))
        .catch(error => console.log('error', error));
}
fetch("https://api-services.injozitech.com/api/hunters/v1/login", {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        // console.log("Success:", data.token);
        getData(data.token);
    })
    .catch((error) => {
        console.error("Error:", error);
    });