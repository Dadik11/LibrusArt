var tables = document.querySelectorAll('tbody');
var table;

for(let i = 0; i < tables.length; i++) {
    let ta = tables[i];
    if(ta.querySelectorAll('tr').length > 10) {
        table = ta;
    }
}

var trs = table.querySelectorAll(':scope > tr');
var gradeTables = [];

for(let i = 0; i < trs.length; i++) {
    let tr = trs[i];
    if(tr.id) continue;
    if(tr.className != 'line0' && tr.className != 'line1') continue;
    gradeTables.push(tr);
}

var final = [];
for(let i = 0; i < gradeTables.length; i++) {
	let gTable = gradeTables[i];
    let trs = gTable.querySelectorAll(':scope > td');
	trs[2].innerHTML = ''; trs[5].innerHTML = '';
    final.push([trs[2], trs[5]]);
}

console.log('[+] wszystko git, rysowanko!');

/* drawing */ 

const gradeTemplate = '<span class="grade-box" style="background-color:{COLOR};"><a class="ocena">{GRADE}</a></span>';
function add(grade, color) {
	return gradeTemplate.replace('{COLOR}', color).replace('{GRADE}', grade);
}
function clr() {
    for(let i = 0; i < final.length; i++) {
        final[i][0].innerHTML = '';
        final[i][1].innerHTML = '';
    }
}

var i = 0;
function draw(width, height) {
    console.log('drawing frame', i);
    fetch('http://127.0.0.1:5000?frame='+i).then(res => res.json()).then(json => {
        var frame = json;
        var frameI = 0;
        clr();
        for(let y = 0; y < height; y++) {
            var toAdd = '';
            for(let x = 0; x < width; x++) {
                toAdd += add(Math.floor(3+frame[frameI][0]/80), 'rgb('+frame[frameI]+')');
                frameI++;
            }
            final[y][0].innerHTML = toAdd;
        }

        if(json.length>1) {
            i += 1;
            setTimeout(() => draw(width, height), 10);
        }
    });
}

// python-generated code starts here...

