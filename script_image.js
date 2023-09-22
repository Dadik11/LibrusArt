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
function template(grade, color) {
	return gradeTemplate.replace('{COLOR}', color).replace('{GRADE}', grade);
}

function grayScale(color) {
    return 0.299*color[0] + 0.587*color[1] + 0.114*color[2];
}

function draw(width, height) {
    var frame = data;
    var frameI = 0;
    for(let y = 0; y < height; y++) {
        var toAdd = '';
        for(let x = 0; x < width; x++) {
            toAdd += template(Math.floor(3+grayScale(frame[frameI])/80), 'rgb('+frame[frameI]+')');
            frameI++;
        }
        final[y][0].innerHTML = toAdd;
    }
}

// python-generated code starts here...

