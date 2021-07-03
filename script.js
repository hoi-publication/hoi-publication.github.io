window.addEventListener('DOMContentLoaded', main);


async function main() {
    const TARGET = {
        name: document.getElementsByClassName('name'),
        form: document.getElementsByClassName('form'),
        description: document.getElementsByClassName('description'),
        reldate: document.getElementsByClassName('reldate'),
        code: document.getElementsByClassName('code')
    };
    const SOURCE = 'https://spreadsheets.google.com/feeds/list/1o0jmDO8pvUYujM6aLH7k86c5MQ6gs0gShXjDBPZ_pmU/1/public/full?alt=json';
    const COLUMNS = ['name', 'form', 'description', 'reldate', 'code'];
    const DATA = await separateRowFromJson(SOURCE, COLUMNS);
    for (let i = 0; i < DATA.length; i++) {


        TARGET['name'][i].textContent = DATA[i]['name'];
        TARGET['form'][i].textContent = DATA[i]['form'];
        TARGET['description'][i].textContent = DATA[i]['description'];
        TARGET['reldate'][i].textContent = DATA[i]['reldate'];
        TARGET['code'][i].textContent = DATA[i]['code'];


    }
}

async function separateRowFromJson(SOURCE, COLUMNS) {
    const FETCHED_SOURCE = await fetch(SOURCE);
    let temp = await FETCHED_SOURCE.json();
    temp = temp['feed']['entry'];

    let _DATA = [];
    for (var i = 0; i < Object.keys(temp).length; i++) {
        _DATA[i] = {};
        for (var k = 0; k < Object.keys(COLUMNS).length; k++) {;
            _DATA[i][COLUMNS[k]] = temp[i]['gsx$' + COLUMNS[k]]['$t'];

            var newDiv = document.createElement("div");
            newDiv.className = 'name';
            document.body.append(newDiv);
            var newDiv2 = document.createElement("div");
            newDiv2.className = 'form';
            document.body.append(newDiv2);
            var newDiv3 = document.createElement("div");
            newDiv3.className = 'description';
            document.body.append(newDiv3);
            var newDiv4 = document.createElement("div");
            newDiv4.className = 'reldate';
            document.body.append(newDiv4);
            var newDiv5 = document.createElement("div");
            newDiv5.className = 'code';
            document.body.append(newDiv5);

        }
    }

    return _DATA;

};