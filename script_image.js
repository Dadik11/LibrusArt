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

console.log('[+] wszystko git, rysowanko! (to moze chwile zajac)');

/* drawing */ 

const gradeTemplate = '<span class="grade-box" style="background-color:{COLOR};"><a class="ocena">{GRADE}</a></span>';
function add(table, grade, color) {
	if(table.innerText == 'Brak ocen') table.innerHTML = '';
	table.innerHTML += gradeTemplate.replace('{COLOR}', color).replace('{GRADE}', grade);
}

// python-generated code starts here...

