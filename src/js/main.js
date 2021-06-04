
let inputsDiv;
let resultDiv;
let resultObj = {};
let resultObjID;
const meses = ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const mesesfull = {
    Jan: 'Janeiro',
    Fev: 'Fevereiro',
    Mar: 'Março',
    Abr: 'Abril',
    Maio: 'Maio',
    Jun: 'Junho',
    Jul: 'Julho',
    Ago: 'Agosto',
    Set: 'Setembor',
    Out: 'Outubro',
    Nov: 'Novembro',
    Dez: 'Dezembro'
};

let Element_obj = {
    pot_nominal_array: {
        elem: 'input',
        innerHTML: 'Potência nominal da matriz (W/m²)',
        value: 1000,
        type: 'number',
        step: '10',
        help: 'O valor nominal total da matriz fotovoltaica instalada em W/m²'
    },
    perda: {
        elem: 'input',
        innerHTML: 'Perdas do sistema (%)',
        value: 14,
        type: 'number',
        step: '1',
        help: 'As perdas no sistema que não são explicitamente modeladas, que incluem os impactos na potência final de sujeira, sombreamento, cobertura de neve, incompatibilidade, fiação, conexões, degradação induzida pela luz, classificação da placa de identificação, idade do sistema e disponibilidade operacional'
    },
    coef_temp: {
        elem: 'input',
        innerHTML: 'Coeficiente de temperatura de potência (%/°C)',
        value: -0.35,
        type: 'number',
        step: '0.01',
        help: 'A eficiência da matriz diminua a uma taxa linear em função do aumento da temperatura, governada pelo coeficiente de temperatura do painel'
    },
    cc_ca: {
        elem: 'input',
        innerHTML: 'Conversão CA-CC (Eficiencia %)',
        value: 96,
        type: 'number',
        step: '1',
        help: 'O modelo proposto utiliza uma simples conversão baseada na eficiência do inversor'
    },
    angulo: {
        elem: 'input',
        innerHTML: 'Ângulo painel',
        value: 20
    },
    button: {
        elem: 'button',
        innerHTML: 'Calcular'
    },
    divider: {
        elem: 'divider',
    },
    order_base: [
        'pot_nominal_array',
        'divider',
        'coef_temp',
        'divider',
        'perda',
        'divider',
        'cc_ca',
        'button'
    ]
};

const fun_obj = {
    divider: function() {
        inputsDiv.appendChild(
            mcreateElement(
                'div',
                null,
                'divider'
            )
        );
    },
    input: function(prop) {
        let obj = Element_obj[prop];

        const div_base = mcreateElement(
            'div',
            prop
        );

        const div_input = mcreateElement(
            'input',
            prop + '_Input',
            'inputsInput'
        );

        div_input.type = obj.type;
        div_input.step = obj.step;
        if (obj.value) div_input.value = obj.value;
        div_input.onchange = function() {
            obj.value = this.value;
        };

        div_base.appendChild(
            mcreateElement(
                'div',
                prop + '_Text',
                'inputsText',
                obj.innerHTML
            )
        );

        div_base.appendChild(div_input);

        div_base.appendChild(
            mcreateElement(
                'div',
                prop + '_Help',
                'tooltip ' + (obj.help ? '' : 'opacityZero'),
                '&nbsp;?&nbsp;<span class="tooltiptext">' + obj.help + '</span>'
            )
        );

        inputsDiv.appendChild(div_base);
    },
    button: function(prop) {
        let obj = Element_obj[prop];

        const button = mcreateElement(
            'button',
            prop,
            'inputsbutton',
            obj.innerHTML
        );

        //Calcula o objeto com os valores de potencia e mostra
        button.onclick = function() {

            let obj = obj_temp,
                i = 0,
                len = obj.length,
                ang = 20,//Element_obj.angulo.value * (Math.PI / 180),
                pm0 = Element_obj.pot_nominal_array.value,
                calcPot_Temp = 0.0,
                mes,
                dia,
                hora;

            resultObj = {};
            resultObj.total = 0;

            for (i; i < len; i++) {

                mes = meses[obj[i][0] - 1];
                dia = obj[i][1];

                if (!resultObj[mes]) {

                    resultObj[mes] = {};
                    resultObj[mes].total = 0;
                    resultObj[mes][dia] = {};
                    resultObj[mes][dia].total = 0;

                } else if (!resultObj[mes][dia]) {

                    dia = obj[i][1];
                    resultObj[mes][dia] = {};
                    resultObj[mes][dia].total = 0;

                }

                calcPot_Temp = calcPot(
                    pm0,
                    ang,
                    obj[i][3],
                    obj[i][4],
                    obj[i][5],
                    obj[i][6]
                );

                hora = obj[i][2];

                resultObj[mes][dia][hora] = {};
                resultObj[mes][dia][hora].total = calcPot_Temp;
                resultObj[mes].total += calcPot_Temp;
                resultObj[mes][dia].total += calcPot_Temp;
                resultObj.total += calcPot_Temp;

            }

            //console.log(resultObj);

            fun_obj.Resultado();
        };

        inputsDiv.appendChild(button);
    },
    Resultado: function(prop1, prop2) {

        resultDiv.textContent = '';

        const base_id = 'base',
            isDay = Boolean(prop1 && prop2),
            isMonth = Boolean(prop1 && !prop2),
            CC_CA = Element_obj.cc_ca.value / 100000,
            monclick = function(prop1, prop2) {
                fun_obj.Resultado(prop1, prop2);
            };

        let obj = resultObj,
            div_result_graf_holder,
            div_result_note,
            div_result_holder,
            total_max = 0,
            base_div_text = 'Mês',
            temp_total;


        if (isDay) {
            obj = resultObj[prop1][prop2];
        } else if (isMonth) {
            obj = resultObj[prop1];
        }

        const button = mcreateElement(
            'button',
            'button' + base_id,
            'inputsbutton'
        );

        const div_result_title = mcreateElement(
            'div',
            'result_title_' + base_id,
            'result_title'
        );

        if (isDay) {

            div_result_title.textContent = 'Resultado ' + prop2 + ' de ' + mesesfull[prop1];

            button.innerHTML = '<span>&#8592;</span> Voltar pro mês de ' + mesesfull[prop1];
            button.onclick = function() {
                monclick(prop1);
            };

            resultDiv.appendChild(button);

            base_div_text = 'Hora';

        } else if (isMonth) {

            div_result_title.textContent = 'Resultado ' + mesesfull[prop1];
            button.innerHTML = '<span>&#8592;</span> Voltar pro ano';
            button.onclick = function() {
                monclick();
            };

            resultDiv.appendChild(button);

            base_div_text = 'Dia';

        } else {
            div_result_title.textContent = 'Resultado Ano';
        }

        resultDiv.appendChild(div_result_title);

        div_result_holder = mcreateElement(
            'div',
            'result_holder_' + base_id,
            'result_holder'
        );
        resultDiv.appendChild(div_result_holder);

        div_result_holder.appendChild(
            mcreateElement(
                'div',
                'result_value' + base_id,
                'result_value',
                base_div_text + '<br>kWh (CA)'
            )
        );

        for (let prop in obj) {

            if (prop !== 'total') {

                div_result_holder = mcreateElement(
                    'div',
                    'result_holder_' + prop,
                    'result_holder'
                );

                const mprop = prop,
                    mprop1 = prop1,
                    mprop2 = prop2,
                    formonclick = monclick;

                div_result_holder.onclick = function() {

                    if (!mprop1) {
                        formonclick(mprop);
                    } else if (!mprop2) {
                        formonclick(mprop1, mprop);
                    }

                };

                div_result_graf_holder = mcreateElement(
                    'div',
                    'graf_holder_' + prop,
                    'result_graf_holder'
                );
                div_result_holder.appendChild(div_result_graf_holder);

                div_result_graf_holder.appendChild(
                    mcreateElement(
                        'div',
                        'graf_' + prop,
                        'result_graf'
                    )
                );

                temp_total = obj[prop].total * CC_CA;
                if (temp_total > total_max) total_max = temp_total;

                div_result_holder.appendChild(
                    mcreateElement(
                        'div',
                        'result_value' + prop,
                        'result_value',
                        prop + '<br>' + temp_total.toFixed(2)
                    )
                );

                resultDiv.appendChild(div_result_holder);

            }
        }

        div_result_holder = mcreateElement(
            'div',
            'result_holder_end',
            'result_holder'
        );

        resultDiv.appendChild(div_result_holder);

        div_result_holder.appendChild(
            mcreateElement(
                'div',
                'result_value_end',
                'result_value',
                'Total<br>' + (obj.total * CC_CA).toFixed(2)
            ));

        div_result_note = mcreateElement(
            'div',
            'result_note_div',
            'result_note'
        );

        if (isMonth) {

            div_result_note.textContent = 'Obs.: Clique no dia para ver o resultado por hora';
            resultDiv.appendChild(div_result_note);

        } else if (!isDay) {
            div_result_note.textContent = 'Obs.: Clique no mês para ver o resultado por dia';
            resultDiv.appendChild(div_result_note);
        }

        total_max = total_max * 1.1;

        resultObjID = msetTimeout(
            function() {

                window.scrollTo(0, document.body.scrollHeight);

                for (let prop in obj) {

                    if (prop !== 'total')
                        mgetElementById('graf_' + prop).style.height = (((obj[prop].total * CC_CA) / total_max) * 100) + '%';

                }

            },
            100,
            resultObjID
        );

    }
};

function mcreateElement(type, id, className, innerHTML) {

    const element = document.createElement(type);
    if (className) element.className = className;
    if (id) element.setAttribute('id', id);
    if (innerHTML) element.innerHTML = innerHTML;

    return element;
}

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

    mgetElementById('page_title').innerHTML = 'PVModel';

    StartInputs();

}

function StartInputs() {
    Element_obj.order_base.forEach(GenDiv);
}

function GenDiv(prop) {
    fun_obj[Element_obj[prop].elem](prop);

}

function mgetElementById(elemString) {
    return document.getElementById(elemString);
}

const a = -3.47;
const b = -0.0594;
const Delta_T = 3;
const k = 0.0015;

function calcPot(PM0, AOI, DNI, EG_ED, TA, WS) {
    const eb = DNI;

    const POA = eb + EG_ED;

    const TM = (POA * (Math.exp(a + (b * WS)))) + TA;

    const TC = TM + ((POA / 1000) * Delta_T);

    const PPM = (POA / 1000) * (1 + ((Element_obj.coef_temp.value / 100) * (TC - 25)));

    let PM = 0;

    if (POA > 200) PM = PM0 * (PPM - (k * (1000 - POA) / (800)));
    else PM = PM0 * (PPM - (k * (1 - (1 - Math.pow(POA / 200, 4)))));

    return PM * (1 - (Element_obj.perda.value / 100));
}

function msetTimeout(fun, timeout, id) {
    mclearTimeout(id);
    if (timeout && timeout > 0) return window.setTimeout(fun, timeout);
    else return window.setTimeout(fun);
}

function mclearTimeout(id) {
    window.clearTimeout(id);
}
