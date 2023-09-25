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
function grayScale(color) {
    return 0.299*color[0] + 0.587*color[1] + 0.114*color[2];
}
function clr() {
    for(let i = 0; i < final.length; i++) {
        final[i][0].innerHTML = '';
        final[i][1].innerHTML = '';
    }
}

// const: width, height, fps - added later by python

var i = 0;
var lastDraw = 0;
var drawingStarted = 0;

var frames = [];
function draw() {
    if(frames.length < fps*2) {
        fetch(`http://127.0.0.1:5000?index=${i}&count=${fps*3}`).then(res => res.json()).then(json => {
            if(json['end']) {
                console.log('[+] zakonczono sukcesem!');
                return;
            }
            json.forEach((frame) => {
                frames.push(frame);
            });
            requestAnimationFrame(draw);
        });
        return;
    }
    
    const diff = new Date().getTime() - drawingStarted;
    if(diff < (1000/fps)*i) {
        requestAnimationFrame(draw); return;
    }
    
    console.log('[*] rysowanie klatki', i, 'delta t', new Date().getTime() - lastDraw, '/', Math.round(100/fps)*10, 'offset', Math.round(1000/fps)*i - diff);
    lastDraw = new Date().getTime();

    var current = frames[0];
    frames.shift();

    var frameI = 0;
    clr();
    for(let y = 0; y < height; y++) {
        var toAdd = '';
        for(let x = 0; x < width; x++) {
            toAdd += add(Math.floor(3+grayScale(current[frameI])/80), 'rgb('+current[frameI]+')');
            frameI++;
        }
        final[y][0].innerHTML = toAdd;
    }

    i++;
    requestAnimationFrame(draw);
}

// python-generated code starts here...

