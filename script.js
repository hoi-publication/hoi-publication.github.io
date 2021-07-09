window.addEventListener('DOMContentLoaded', main);


async function main() {
    const TARGET = {
        date: document.getElementsByClassName('date'),
        name: document.getElementsByClassName('name'),
        form: document.getElementsByClassName('form'),
        description: document.getElementsByClassName('description'),
        link: document.getElementsByClassName('link'),

    };
    const SOURCE = 'https://spreadsheets.google.com/feeds/list/1o0jmDO8pvUYujM6aLH7k86c5MQ6gs0gShXjDBPZ_pmU/1/public/full?alt=json';
    const COLUMNS = ['date', 'name', 'form', 'description', 'link'];
    const DATA = await separateRowFromJson(SOURCE, COLUMNS);
    for (let i = 0; i < DATA.length; i++) {

        TARGET['date'][i].textContent = DATA[i]['date'];
        TARGET['name'][i].textContent = DATA[i]['name'];
        TARGET['form'][i].textContent = DATA[i]['form'];
        TARGET['description'][i].textContent = DATA[i]['description'];
        TARGET['link'][i].textContent = DATA[i]['link'];



    }
}

async function separateRowFromJson(SOURCE, COLUMNS) {
    const FETCHED_SOURCE = await fetch(SOURCE);
    let temp = await FETCHED_SOURCE.json();
    temp = temp['feed']['entry'];

    let _DATA = [];
    // 이하 2개의 반복문은 JSON에서 행과 열을 각각 불러내는 부분인 것 같음
    for (var i = 0; i < Object.keys(temp).length; i++) {
        _DATA[i] = {};

        //행을 기준으로 DIV를 연속으로 생성
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

        var newDiv5 = document.createElement("div");
        newDiv5.className = 'link';
        document.getElementById('content').append(newDiv5);

        for (var k = 0; k < Object.keys(COLUMNS).length; k++) {;

            _DATA[i][COLUMNS[k]] = temp[i]['gsx$' + COLUMNS[k]]['$t'];
            // 반복문 안에서 (i,1) div 호출, (i,4)div '내용'으로 a href를 거는 방법...을...생각해보자...

        }
    }

    return _DATA;

};

function info() {
    var element = document.getElementById("navbar");
    element.classList.toggle("navbarAfter");
};