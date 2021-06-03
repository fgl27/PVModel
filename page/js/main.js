
let Main_obj = {
    pot: {
        type: 'input',
        innerHTML: 'Potência total',
        value: 1000
    },
    angulo: {
        type: 'input',
        innerHTML: 'Ângulo painel',
        value: 20
    },
    button: {
        type: 'button',
        innerHTML: 'Calcular'
    }
};

const Main_fun = {
    input: function(prop) {
        let obj = Main_obj[prop];

        const div_base = document.createElement('div');
        div_base.className = 'divBase';
        div_base.setAttribute('id', prop);

        const div_text = document.createElement('div');
        div_text.setAttribute('id', prop + '_Text');
        div_text.className = 'inputsText';
        div_text.textContent = obj.innerHTML;

        const div_input = document.createElement('input');
        div_input.className = 'inputsInput';
        if (obj.value) div_input.value = obj.value;
        div_input.setAttribute('id', prop + '_Input');
        div_input.onchange = function() {
            if (this.value !== '' && this.value) {
                if (!isNaN(this.value)) {

                    obj.value = parseInt(this.value);

                } else {

                    this.value = '';
                    alert('Entre com número');

                }
            }
        };

        div_base.appendChild(div_text);
        div_base.appendChild(div_input);

        inputsDiv.appendChild(div_base);
    },
    button: function(prop) {
        let obj = Main_obj[prop];

        const button = document.createElement('button');
        button.setAttribute('id', prop);
        button.className = 'inputsbutton';
        button.textContent = obj.innerHTML;
        button.onclick = function() {

            var obj = obj_temp,
                i = 0,
                len = obj.length,
                ang = Main_obj.angulo.value * (Math.PI / 180),
                pm0 = Main_obj.pot.value;

            for (i; i < len; i++) {

                resultObj[obj[i][0]][obj[i][1]][obj[i][2]] =
                    calcPot(
                        pm0,
                        ang,
                        obj[i][3],
                        obj[i][4],
                        obj[i][5],
                        obj[i][6]
                    );

            }

            console.log(resultObj);

        };

        inputsDiv.appendChild(button);
    }
};

let inputsDiv;
let resultDiv;
let resultObj = {};

Start();

function Start() {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function() {
            StartPage();
        });
    } else { // `DOMContentLoaded` already fired
        StartPage();
    }
}

function StartPage() {
    console.log('StartPage');

    inputsDiv = mgetElementById('inputs');
    resultDiv = mgetElementById('result');

    for (prop in Main_obj) {
        Main_fun[Main_obj[prop].type](prop)
    }

    var obj = obj_temp, i = 0, len = obj.length;

    for (i; i < len; i++) {

        if (!resultObj[obj[i][0]]) {

            resultObj[obj[i][0]] = {};
            resultObj[obj[i][0]][obj[i][1]] = {};

        } else if (!resultObj[obj[i][0]][obj[i][1]]) {

            resultObj[obj[i][0]][obj[i][1]] = {};

        }
    }
}

function mgetElementById(elemString) {
    return document.getElementById(elemString);
}

const a = -3.47;
const b = -0.0594;
const Delta_T = 3;
const k = 0.0015;
const gamma = -0.35 / 100;
const perda = 1 - 0.14;

function calcPot(PM0, AOI, DNI, EG_ED, TA, WS) {
    const eb = DNI;

    const POA = eb + EG_ED;

    const TM = (POA * (Math.exp(a + (b * WS)))) + TA;

    const TC = TM + ((POA / 1000) * Delta_T);

    const PPM = (POA / 1000) * (1 + (gamma * (TC - 25)));

    let PM = 0;

    if (POA > 200) PM = PM0 * (PPM - (k * (1000 - POA) / (800)));
    else PM = PM0 * (PPM - (k * (1 - (1 - Math.pow(POA / 200, 4)))));

    return PM * perda;
}
