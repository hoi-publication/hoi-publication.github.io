window.addEventListener('DOMContentLoaded', main);


async function main() {
    const TARGET = {
        date: document.getElementsByClassName('date'),
        name: document.getElementsByClassName('name'),
        form: document.getElementsByClassName('form'),
        description: document.getElementsByClassName('description'),
        //      reldate: document.getElementsByClassName('reldate'),

    };
    const SOURCE = 'https://spreadsheets.google.com/feeds/list/1o0jmDO8pvUYujM6aLH7k86c5MQ6gs0gShXjDBPZ_pmU/1/public/full?alt=json';
    const COLUMNS = ['date', 'name', 'form', 'description'];
    const DATA = await separateRowFromJson(SOURCE, COLUMNS);
    for (let i = 0; i < DATA.length; i++) {

        TARGET['date'][i].textContent = DATA[i]['date'];
        TARGET['name'][i].textContent = DATA[i]['name'];
        TARGET['form'][i].textContent = DATA[i]['form'];
        TARGET['description'][i].textContent = DATA[i]['description'];
        //      TARGET['reldate'][i].textContent = DATA[i]['reldate'];



    }
}

async function separateRowFromJson(SOURCE, COLUMNS) {
    const FETCHED_SOURCE = await fetch(SOURCE);
    let temp = await FETCHED_SOURCE.json();
    temp = temp['feed']['entry'];

    let _DATA = [];
    for (var i = 0; i < Object.keys(temp).length; i++) {
        _DATA[i] = {};

        var newDiv = document.createElement("div");
        newDiv.className = 'date';
        document.getElementById('content').append(newDiv);
        var newDiv2 = document.createElement("div");
        newDiv2.className = 'name';
        document.getElementById('content').append(newDiv2);
        var newDiv3 = document.createElement("div");
        newDiv3.className = 'form';
        document.getElementById('content').append(newDiv3);
        var newDiv4 = document.createElement("div");
        newDiv4.className = 'description';
        document.getElementById('content').append(newDiv4);
        //     var newDiv4 = document.createElement("div");
        //     newDiv4.className = 'reldate';
        //     document.getElementById('content').append(newDiv4);


        for (var k = 0; k < Object.keys(COLUMNS).length; k++) {;
            _DATA[i][COLUMNS[k]] = temp[i]['gsx$' + COLUMNS[k]]['$t'];



        }
    }

    return _DATA;

};

function info() {
    var element = document.getElementById("navbar");
    element.classList.toggle("navbarAfter");
}