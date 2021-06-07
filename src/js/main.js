
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
    modelo: {
        elem: 'select',
        innerHTML: 'Modelo de entrada de valores',
        value: 0,
        options: [
            'Potência nominal total',
            'Área total',
            'Quantidade painéis',
        ],
        values: [
            [
                'modelo',
                'regiao',
                'pot_nominal_array',
                'coef_temp',
                'superficie',
                'perda',
                'cc_ca',
                'button'
            ],
            [
                'modelo',
                'regiao',
                'area',
                'area_painel',
                'pot_nominal_painel',
                'quantidade',
                'pot_nominal_array',
                'coef_temp',
                'superficie',
                'perda',
                'cc_ca',
                'button'
            ],
            [
                'modelo',
                'regiao',
                'pot_nominal_painel',
                'quantidade',
                'pot_nominal_array',
                'coef_temp',
                'superficie',
                'perda',
                'cc_ca',
                'button'
            ]
        ],
        setValues: function(value) {
            value = parseInt(value);

            if (this.value !== value) {

                this.value = value;
                UpdatePm();
                StartInputs();

                const disabled = Boolean(value);
                mgetElementById(Elem_Ids.Input.Input + 'pot_nominal_array').disabled = disabled;

                if (disabled) {

                    mgetElementById(Elem_Ids.Input.Span + 'pot_nominal_array').className = 'tooltiptext tooltiptext_disabled';
                    mgetElementById(Elem_Ids.Input.Span + 'pot_nominal_array').innerHTML = 'Neste modo a potência nominal total é igual:<br><br>A potência nominal de um painel vezes a quatidade de painéis';

                }


                if (value === 1) {

                    mgetElementById(Elem_Ids.Input.Input + 'quantidade').disabled = true;
                    mgetElementById(Elem_Ids.Input.Span + 'quantidade').className = 'tooltiptext tooltiptext_disabled';
                    mgetElementById(Elem_Ids.Input.Span + 'quantidade').innerHTML = 'Neste modo a quantidade é igual:<br><br>A área total pela área de um painel';
                }


            }

        },
        help: 'Potência nominal total:<br><br>O cálculo é feito pela potência total nominal do conjunto de painéis<br><br>' +
            'Área total:<br><br>O cálculo é feito a determinar potência total nominal do conjunto de painéis em relação a quantos paines cabem na área total<br><br>' +
            'Quantidade painéis:<br><br>O cálculo é feito a determinar potência total nominal do conjunto de painéis em relação ao número total de painéis'
    },
    pot_nominal_array: {
        elem: 'input',
        innerHTML: 'Potência nominal total da matriz (W/m²)',
        value: 1000,
        type: 'number',
        step: '10',
        help: 'O valor nominal total da matriz fotovoltaica instalada em W/m²',
        UpdateValue: UpdatePm
    },
    pot_nominal_painel: {
        elem: 'input',
        innerHTML: 'Potência nominal de um painel (W/m²)',
        value: 300,
        type: 'number',
        step: '10',
        help: 'O valor nominal total de um painel usado em W/m² (assumindo que todos painéis são iguais)',
        UpdateValue: UpdatePm
    },
    area_painel: {
        elem: 'input',
        innerHTML: 'Área de um painel (m²)',
        value: 1.64,
        type: 'number',
        step: '0.01',
        help: 'A área de um painel comercial em m²',
        UpdateValue: UpdatePm
    },
    area: {
        elem: 'input',
        innerHTML: 'Área total utilizada (m²)',
        value: 6,
        type: 'number',
        step: '1',
        help: 'A máxima área que os painéis podem cobrir',
        UpdateValue: UpdatePm
    },
    quantidade: {
        elem: 'input',
        innerHTML: 'Quantidade painéis',
        value: 3,
        type: 'number',
        step: '1',
        help: 'A quantidade total de painéis possível',
        UpdateValue: UpdatePm
    },
    perda: {
        elem: 'input',
        innerHTML: 'Perdas do sistema (%)',
        value: 14,
        type: 'number',
        step: '1',
        help: 'As perdas no sistema que não são explicitamente modeladas, que incluem os impactos na potência final em relação a sujeira, sombreamento, cobertura de neve, incompatibilidade, fiação, conexões, degradação induzida pela luz, classificação da placa de identificação, idade do sistema e disponibilidade operacional'
    },
    coef_temp: {
        elem: 'input',
        innerHTML: 'Coeficiente de temperatura de potência (%/°C)',
        value: -0.35,
        type: 'number',
        step: '0.01',
        help: 'A eficiência da matriz diminua a uma taxa linear em função do aumento da temperatura, governada pelo coeficiente de temperatura do painel, para maioria dos painéis este valor varia de -0,5 ate 0,1'
    },
    cc_ca: {
        elem: 'input',
        innerHTML: 'Conversão CA-CC (Eficiencia %)',
        value: 96,
        type: 'number',
        step: '1',
        help: 'O modelo proposto utiliza uma simples conversão baseada na eficiência do inversor'
    },
    superficie: {
        elem: 'select',
        innerHTML: 'Superfície | Montagem do painel',
        value: 0,
        options: [
            'Vidro | Costas livre',
            'Vidro | Costas fechada',
            'Polímero | Costas livre',
            'Polímero | Costas fechada'
        ],
        values: {
            a: [-3.47, -2.98, -3.56, -2, 81],
            b: [-0.0594, -0.0471, -0.075, -0.0455],
            Delta_T: [3, 1, 3, 0],
        },
        setValues: function(value) {
            this.value = value;

            a = this.values.a[value];
            b = this.values.b[value];
            Delta_T = this.values.Delta_T[value];

        },
        help: 'Para calcular a temperatura de operação do painel é necessário determinar parâmetros que dependem da construção, materiais e montagem do painel<br><br>Costas livre um painel montado em um rack aberto<br><br>Costas fechada um painel montado sombre um telhado'
    },
    regiao: {
        elem: 'select',
        innerHTML: 'Região do Brasil',
        value: 4,
        options: [
            'Centro-Oeste',
            'Nordeste',
            'Norte',
            'Sudeste',
            'Sul'
        ],
        setValues: function(value) {
            this.value = value;
        },
        help: 'A região do país que deseja calcular os resultados'
    },
    button: {
        elem: 'button',
        innerHTML: 'Calcular'
    }
};

const Elem_Ids = {
    Input: {
        Input: 'Input_',
        Container: 'Input_Container_',
        Tooltip: 'Input_Tooltip_',
        Span: 'Input_Tooltip_Span',
        Text: 'Input_Text_',
        Help: 'Input_Help_',
        Button: 'Input_Calc_Button_',
        Select: 'Input_Select_',
        Option: 'Input_Select_Option_',
    },
    Result: {
        Button: 'Result_Button_',
        Title: 'Result_Title_',
        Value_Container: 'Result_Value_Container_',
        Value: 'Result_Value_',
        Graf_Container: 'Result_Graf_Container_',
        Graf: 'Result_Graf_',
        Note: 'Result_Note_',
    },
    General: {
        About: 'About'
    },
};

const fun_obj = {
    input: function(prop) {
        let obj = Element_obj[prop];

        const Inputs_Container = mCreateElement(
            'div',
            Elem_Ids.Input.Container + prop,
            'inputsContainer'
        );

        const Input_Tooltip = mCreateElement(
            'div',
            Elem_Ids.Input.Tooltip + prop,
            'tooltip tooltip_disabled'
        );

        const Input = mCreateElement(
            'input',
            Elem_Ids.Input.Input + prop,
            'inputsInput'
        );

        Input.type = obj.type;
        Input.step = obj.step;
        if (obj.value) Input.value = obj.value;
        Input.onchange = function() {
            obj.value = this.value;

            if (obj.UpdateValue) {
                obj.UpdateValue();
            }
        };

        Inputs_Container.appendChild(
            mCreateElement(
                'div',
                Elem_Ids.Input.Text + prop,
                'inputsText',
                obj.innerHTML
            )
        );

        Input_Tooltip.appendChild(Input);
        Input_Tooltip.appendChild(
            mCreateElement(
                'span',
                Elem_Ids.Input.Span + prop,
                'hide'
            )
        );
        Inputs_Container.appendChild(Input_Tooltip);

        Inputs_Container.appendChild(
            mCreateElement(
                'div',
                Elem_Ids.Input.Help + prop,
                'tooltip ' + (obj.help ? '' : 'opacityZero'),
                '&nbsp;?&nbsp;<span class="tooltiptext">' + obj.help + '</span>'
            )
        );

        const container = mCreateElement(
            'div',
            prop
        );

        container.appendChild(Inputs_Container);
        inputsDiv.appendChild(container);
    },
    select: function(prop) {
        let obj = Element_obj[prop];

        const Inputs_Container = mCreateElement(
            'div',
            Elem_Ids.Input.Container + prop,
            'inputsContainer'
        );

        const Select = mCreateElement(
            'select',
            Elem_Ids.Input.Select + prop,
            'inputsSelect'
        );

        Select.type = obj.type;
        Select.step = obj.step;
        if (obj.value) Select.value = obj.value;

        Select.onchange = function() {
            obj.setValues(this.value);
        };

        for (const [idex, value] of obj.options.entries()) {

            const option = mCreateElement(
                'option',
                Elem_Ids.Input.Option + prop + idex
            );

            option.value = idex;
            option.text = value;
            Select.appendChild(option);

        }

        Select.selectedIndex = obj.value;

        Inputs_Container.appendChild(
            mCreateElement(
                'div',
                Elem_Ids.Input.Text + prop,
                'inputsText',
                obj.innerHTML
            )
        );

        Inputs_Container.appendChild(Select);

        Inputs_Container.appendChild(
            mCreateElement(
                'div',
                Elem_Ids.Input.Help + prop,
                'tooltip ' + (obj.help ? '' : 'opacityZero'),
                '&nbsp;?&nbsp;<span class="tooltiptext">' + obj.help + '</span>'
            )
        );

        const container = mCreateElement(
            'div',
            prop
        );

        container.appendChild(Inputs_Container);
        inputsDiv.appendChild(container);
    },
    button: function(prop) {
        let obj = Element_obj[prop];

        const button = mCreateElement(
            'button',
            Elem_Ids.Input.Button,
            'inputsbutton',
            obj.innerHTML
        );

        //Calcula o objeto com os valores de potencia e mostra
        button.onclick = function() {

            let obj = JSON.parse(obj_regiao[Element_obj.regiao.value]),
                ang = 20,//Element_obj.angulo.value * (Math.PI / 180),
                pm0 = Element_obj.pot_nominal_array.value,
                calcPotCC_Temp = 0.0,
                mes,
                dia,
                hora;

            resultObj = {};
            resultObj.total = 0;

            for (const i in obj) {

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

                calcPotCC_Temp = calcPotCC(
                    pm0,
                    ang,
                    obj[i][3],
                    obj[i][4],
                    obj[i][5],
                    obj[i][6]
                );

                hora = obj[i][2];

                resultObj[mes][dia][hora] = {};
                resultObj[mes][dia][hora].total = calcPotCC_Temp;
                resultObj[mes].total += calcPotCC_Temp;
                resultObj[mes][dia].total += calcPotCC_Temp;
                resultObj.total += calcPotCC_Temp;

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
            div_graf_container,
            div_result_note,
            div_value_container,
            total_max = 0,
            base_div_text = 'Mês',
            temp_total;


        if (isDay) {
            obj = resultObj[prop1][prop2];
        } else if (isMonth) {
            obj = resultObj[prop1];
        }

        const button = mCreateElement(
            'button',
            Elem_Ids.Result.Button + base_id,
            'inputsbutton'
        );

        const div_result_title = mCreateElement(
            'div',
            Elem_Ids.Result.Title + base_id,
            'result_title'
        );

        const resultado_total = GetTotal(obj.total * CC_CA);

        if (isDay) {

            div_result_title.innerHTML = 'Resultado ' + prop2 + ' de ' + mesesfull[prop1] + resultado_total;

            button.innerHTML = '<span>&#8592;</span> Voltar pro mês de ' + mesesfull[prop1];
            button.onclick = function() {
                monclick(prop1);
            };

            resultDiv.appendChild(button);

            base_div_text = 'Hora';

        } else if (isMonth) {

            div_result_title.innerHTML = 'Resultado ' + mesesfull[prop1] + resultado_total;
            button.innerHTML = '<span>&#8592;</span> Voltar pro ano';
            button.onclick = function() {
                monclick();
            };

            resultDiv.appendChild(button);

            base_div_text = 'Dia';

        } else {
            div_result_title.innerHTML = 'Resultado Ano' + resultado_total;
        }

        resultDiv.appendChild(div_result_title);

        div_value_container = mCreateElement(
            'div',
            Elem_Ids.Result.Value_Container + base_id,
            'result_holder'
        );
        resultDiv.appendChild(div_value_container);

        div_value_container.appendChild(
            mCreateElement(
                'div',
                Elem_Ids.Result.Value + base_id,
                'result_value',
                base_div_text + '<br>kWh (CA)'
            )
        );

        div_value_container = mCreateElement(
            'div',
            'result_holder_end',
            'result_holder'
        );

        resultDiv.appendChild(div_value_container);

        for (const prop in obj) {

            if (prop !== 'total') {

                div_value_container = mCreateElement(
                    'div',
                    Elem_Ids.Result.Value_Container + prop,
                    'result_holder'
                );

                const mprop = prop,
                    mprop1 = prop1,
                    mprop2 = prop2,
                    formonclick = monclick;

                div_value_container.onclick = function() {

                    if (!mprop1) {
                        formonclick(mprop);
                    } else if (!mprop2) {
                        formonclick(mprop1, mprop);
                    }

                };

                div_graf_container = mCreateElement(
                    'div',
                    Elem_Ids.Result.Graf_Container + prop,
                    'result_graf_holder'
                );
                div_value_container.appendChild(div_graf_container);

                div_graf_container.appendChild(
                    mCreateElement(
                        'div',
                        Elem_Ids.Result.Graf + prop,
                        'result_graf'
                    )
                );

                temp_total = obj[prop].total * CC_CA;
                if (temp_total > total_max) total_max = temp_total;

                div_value_container.appendChild(
                    mCreateElement(
                        'div',
                        Elem_Ids.Result.Value + prop,
                        'result_value',
                        prop + '<br>' + temp_total.toFixed(2)
                    )
                );

                resultDiv.appendChild(div_value_container);

            }
        }

        div_result_note = mCreateElement(
            'div',
            Elem_Ids.Result.Note,
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

                mgetElementById(Elem_Ids.Input.Button).scrollIntoView({behavior: "smooth"});

                for (const prop in obj) {

                    if (prop !== 'total')
                        mgetElementById(Elem_Ids.Result.Graf + prop).style.height = (((obj[prop].total * CC_CA) / total_max) * 100) + '%';

                }

            },
            100,
            resultObjID
        );

    }
};

function mCreateElement(type, id, className, innerHTML) {

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
    inputsDiv = mgetElementById('inputs');
    resultDiv = mgetElementById('result');

    mgetElementById('page_title').innerHTML = 'PVModel';

    const about_div = mgetElementById('page_about'),
        about_text = 'Este é um projeto em andamento da faculdade, com o objetivo de modelar painéis fotovoltaicos, esta página é usada para mostrar os resultados do modelo, para mais informações acesse o link abaixo:<br><br><a href="https://github.com/fgl27/PVModel" target="_blank">github.com/fgl27/PVModel</a>';

    about_div.appendChild(
        mCreateElement(
            'div',
            Elem_Ids.General.About,
            'tooltip_botton',
            'Sobre<span id="span_about" class="tooltiptextop">' + about_text + '</span>'
        )
    );

    StartInputs();
    Startfirebase();

}

function StartInputs() {
    inputsDiv.textContent = '';

    const obj = Element_obj.modelo;

    obj.values[obj.value].forEach(GenDiv);
}


function GetTotal(total) {
    let text = ': Energia produzida total ';

    if (total > 1000000) {

        return text + (total / 1000000).toFixed(2) + ' GWh';

    } else if (total > 1000) {

        return text + (total / 1000).toFixed(2) + ' MWh';

    }

    return text + (total).toFixed(2) + ' kWh';

}

function GenDiv(prop) {
    fun_obj[Element_obj[prop].elem](prop);
}

function UpdatePm() {
    const modelo = Element_obj.modelo,
        pot_nom = Element_obj.pot_nominal_array,
        pot_nominal_painel = Element_obj.pot_nominal_painel,
        quantidade = Element_obj.quantidade,
        area = Element_obj.area,
        area_painel = Element_obj.area_painel,
        elem_pot = mgetElementById(Elem_Ids.Input.Input + 'pot_nominal_array'),
        elem_quatidade = mgetElementById(Elem_Ids.Input.Input + 'quantidade');

    if (!modelo.value) {

        quantidade.value = parseInt(
            Math.ceil(pot_nom.value / pot_nominal_painel.value)
        );

        area.value = parseInt(
            Math.ceil(quantidade.value * area_painel.value)
        );

    } else {

        if (modelo.value === 1) {

            quantidade.value = parseInt(
                (area.value / area_painel.value)
            );

        } else {

            area.value = parseInt(
                Math.ceil(quantidade.value * area_painel.value)
            );

        }

        pot_nom.value = parseInt(
            quantidade.value *
            pot_nominal_painel.value
        );

    }

    if (elem_pot) {
        elem_pot.value = pot_nom.value;
    }

    if (elem_quatidade) {
        elem_quatidade.value = quantidade.value;
    }

}

function mgetElementById(elemString) {
    return document.getElementById(elemString);
}

let a = Element_obj.superficie.values.a[0];
let b = Element_obj.superficie.values.b[0];
let Delta_T = Element_obj.superficie.values.Delta_T[0];
const k = 0.0015;//Fator de correção de erro

//Função calcula o valor de potencia CC
function calcPotCC(PM0, AOI, DNI, EG_ED, TA, WS) {

    //Calcula o POA
    const eb = DNI,
        POA = eb + EG_ED;

    if (!POA) return 0;

    //Calcula a temperatura do modulo
    const TM = (POA * (Math.exp(a + (b * WS)))) + TA;

    //Calcula a temperatura da celula
    const TC = TM + ((POA / 1000) * Delta_T);

    //Calcula a potencia com erro
    const PPM = (POA / 1000) * (1 + ((Element_obj.coef_temp.value / 100) * (TC - 25)));

    let PM = 0;

    //Calcula a potencia sem erro
    if (POA > 200) PM = PM0 * (PPM - (k * (1000 - POA) / (800)));
    else PM = PM0 * (PPM - (k * (1 - (1 - Math.pow(POA / 200, 4)))));

    //Calcula a potencia CC já com as perdas
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

window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}

var skipfirebase = false;
function Startfirebase() {

    var firebaseConfig = {
        apiKey: "AIzaSyBu5Rs9_NVVHf4o43L79Nlbom0XTtsxC3o",
        authDomain: "pvmodel-131a9.firebaseapp.com",
        projectId: "pvmodel-131a9",
        storageBucket: "pvmodel-131a9.appspot.com",
        messagingSenderId: "564678824267",
        appId: "1:564678824267:web:07965a0c821d40b3da18ce",
        measurementId: "G-7CG8TMC0S5"
    };

    try {

        firebase.initializeApp(firebaseConfig);
        firebase.analytics();

        gtag('js', new Date());

    } catch (e) {
        console.log("Startfirebase e " + e);
        skipfirebase = true;
    }
}