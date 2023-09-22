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

var i = 0;
var startedDraw = 0;
var drawingStarted = 0;

var lastDraw = 0;
var lastFrame = -1;
var current;
function draw() {
    if(i != lastFrame) {
        fetch('http://127.0.0.1:5000?frame='+i).then(res => res.json()).then(json => {
            current = json;
            lastFrame = i;
            requestAnimationFrame(draw);
        });
        return;
    }
    
    if(new Date().getTime() - drawingStarted < (1000/fps)*i) {
        requestAnimationFrame(draw); return;
    }
    lastDraw = new Date().getTime();
    
    console.log('[*] rysowanie klatki', i, 'delta t', new Date().getTime() - startedDraw, '/', 1000/fps);
    startedDraw = new Date().getTime();

    //fetch('http://127.0.0.1:5000?frame='+i).then(res => res.json()).then(json => {
        var frame = current;
        var frameI = 0;
        clr();
        for(let y = 0; y < height; y++) {
            var toAdd = '';
            for(let x = 0; x < width; x++) {
                toAdd += add(Math.floor(3+grayScale(frame[frameI])/80), 'rgb('+frame[frameI]+')');
                frameI++;
            }
            final[y][0].innerHTML = toAdd;
        }

        i++;

        /* if(json.length>1) {
            i += 1;
            setTimeout(draw, Math.max(0, 1000/fps - (new Date().getTime() - startedDraw)));
        } */
    //});

    
    requestAnimationFrame(draw);
}

// python-generated code starts here...

