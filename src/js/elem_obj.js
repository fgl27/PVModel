
let resultObj = {};
let resultObjID;

let Element_obj = {
    modelo: {
        elem: 'select',
        value: 0,
        values: [
            [// os elementos disponíveis no modo Pot nominal
                'modelo',
                'regiao',
                'pot_nominal_array',
                'coef_temp',
                'superficie',
                'perda',
                'cc_ca',
                'button'
            ],
            [// os elementos disponíveis no modo Área total
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
            [// os elementos disponíveis no modo quantidade painéis
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
            modeloSetValues(value, this);
        }
    },
    pot_nominal_array: {
        elem: 'input',
        value: 1000,
        type: 'number',
        step: '10',
        UpdateValue: UpdatePotNominal
    },
    pot_nominal_painel: {
        elem: 'input',
        value: 300,
        type: 'number',
        step: '10',
        UpdateValue: UpdatePotNominal
    },
    area_painel: {
        elem: 'input',
        value: 1.64,
        type: 'number',
        step: '0.01',
        UpdateValue: UpdatePotNominal
    },
    area: {
        elem: 'input',
        value: 6,
        type: 'number',
        step: '1',
        UpdateValue: UpdatePotNominal
    },
    quantidade: {
        elem: 'input',
        value: 3,
        type: 'number',
        step: '1',
        UpdateValue: UpdatePotNominal
    },
    perda: {
        elem: 'input',
        value: 14,
        type: 'number',
        step: '1',
    },
    coef_temp: {
        elem: 'input',
        value: -0.35,
        type: 'number',
        step: '0.01',
    },
    cc_ca: {
        elem: 'input',
        value: 95,
        type: 'number',
        step: '1',
    },
    superficie: {
        elem: 'select',
        value: 0,
        values: {
            a: [-3.47, -2.98, -3.56, -2, 81],
            b: [-0.0594, -0.0471, -0.075, -0.0455],
            Delta_T: [3, 1, 3, 0],
        },
        setValues: function(value) {
            superficieSetValues(value, this);
        },
    },
    regiao: {
        elem: 'select',
        value: 4,
        setValues: function(value) {
            this.value = value;
        }
    },
    button: {
        elem: 'button',
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
        Imput_Help_Container: 'Input_Imput_Help_Container_',
        Button: 'Input_Calc_Button_',
        Select: 'Input_Select_',
        Option: 'Input_Select_Option_',
    },
    Result: {
        Button: 'Result_Button_',
        Title: 'Result_Title_',
        Value_Container: 'Result_Value_Container_',
        Results_container: 'Result_results_Container_',
        Results_inner_container: 'Result_results_inner_Container_',
        Value: 'Result_Value_',
        Graf_Container: 'Result_Graf_Container_',
        Graf: 'Result_Graf_',
        Note: 'Result_Note_',
    },
    General: {
        About: 'About'
    },
};

let appLang = GetLAng();
let a = Element_obj.superficie.values.a[0];
let b = Element_obj.superficie.values.b[0];
let Delta_T = Element_obj.superficie.values.Delta_T[0];
const k = 0.0015;//Fator de correção de erro

const fun_obj = {
    input: function(prop) {
        //cria o elemento de entrada de valor
        let obj = Element_obj[prop];

        const Inputs_Container = mCreateElement(
            'div',
            Elem_Ids.Input.Container + prop,
            'inputsContainer'
        );

        const Imput_Help_Container = mCreateElement(
            'div',
            Elem_Ids.Input.Imput_Help_Container + prop,
            'Imput_Help_Container'
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

        //seta o seu tipo
        Input.type = obj.type;
        //seta o seu passo se é numero de 0.1 em 0.1 por ex.
        Input.step = obj.step;
        //seta o valor inicial
        if (obj.value) Input.value = obj.value;

        //seta a função a ser chamada quando o valor muda
        Input.onchange = function() {
            obj.value = this.value;

            if (obj.UpdateValue) {
                obj.UpdateValue();
            }
        };

        //cria os elementos de acordo com as entradas
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
        Imput_Help_Container.appendChild(Input_Tooltip);

        //Seta a ajuda quando o mouse fica sobre ?
        Imput_Help_Container.appendChild(
            mCreateElement(
                'div',
                Elem_Ids.Input.Help + prop,
                'tooltip ' + (obj.help ? '' : 'opacityZero'),
                '&nbsp;?&nbsp;<span class="tooltiptext">' + obj.help + '</span>'
            )
        );
        Inputs_Container.appendChild(Imput_Help_Container);

        const container = mCreateElement(
            'div',
            prop
        );

        container.appendChild(Inputs_Container);
        inputsDiv.appendChild(container);
    },
    select: function(prop) {
        //cria o elemento de seleção
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

        const Select_Help_Container = mCreateElement(
            'div',
            Elem_Ids.Input.Imput_Help_Container + prop,
            'Imput_Help_Container'
        );

        //seta o tipo
        Select.type = obj.type;
        //seta o valor padram
        if (obj.value) Select.value = obj.value;

        //Seta a função chamada quando o valor muda
        Select.onchange = function() {
            obj.setValues(this.value);
        };

        //seta os possíveis valores de seleção
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

        Select_Help_Container.appendChild(Select);

        //Seta a ajuda quando o mouse fica sobre ?
        Select_Help_Container.appendChild(
            mCreateElement(
                'div',
                Elem_Ids.Input.Help + prop,
                'tooltip ' + (obj.help ? '' : 'opacityZero'),
                '&nbsp;?&nbsp;<span class="tooltiptext">' + obj.help + '</span>'
            )
        );

        Inputs_Container.appendChild(Select_Help_Container);

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
            'inputsbutton text_shadown',
            obj.innerHTML
        );

        //Calcula o objeto com os valores de potencia e mostra quando clicado
        button.onclick = function() {

            let obj = JSON.parse(obj_regiao[Element_obj.regiao.value]),
                pm0 = Element_obj.pot_nominal_array.value,
                calcPotCC_Temp = 0.0,
                mes,
                dia,
                hora;

            resultObj = {};
            resultObj.total = 0;

            //Loopa no obj e calcula a potencia para cada hora do ano
            for (const i in obj) {

                mes = Lang[appLang].meses[obj[i][0] - 1];
                dia = obj[i][1];

                //Inicializa o resultObj de acordo com cada referencia
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

                //calcula a potencia
                calcPotCC_Temp = calcPotCC(
                    pm0,
                    obj[i][3],
                    obj[i][4],
                    obj[i][5],
                    obj[i][6]
                );

                hora = obj[i][2];

                //cria o objeto hora
                resultObj[mes][dia][hora] = {};
                //adiciona o valor calculado para hora
                resultObj[mes][dia][hora].total = calcPotCC_Temp;
                //adiciona o valor calculado ao total do mes
                resultObj[mes].total += calcPotCC_Temp;
                //adiciona o valor calculado ao total do dia
                resultObj[mes][dia].total += calcPotCC_Temp;
                //adiciona o valor calculado ao total do ano
                resultObj.total += calcPotCC_Temp;

            }

            //console.log(resultObj);

            fun_obj.Resultado();
        };

        inputsDiv.appendChild(button);
    },
    Resultado: function(prop1, prop2) {
        //apaga o conteúdo do div resultado
        emptyEle(resultDiv);

        //inicializa as constantes locais
        const base_id = 'base',
            isDay = Boolean(prop1 && prop2),
            isMonth = Boolean(prop1 && !prop2),
            CC_CA = Element_obj.cc_ca.value / 100000,
            monclick = function(prop1, prop2) {
                fun_obj.Resultado(prop1, prop2);
            };

        //inicializa as variavies locais
        let obj = resultObj,
            div_graf_container,
            div_value_container,
            maior_total = 0,
            base_div_text = 'Mês',
            temp_total;

        //seta o obj local em relação se é mês ou dia
        if (isDay) {
            obj = resultObj[prop1][prop2];
        } else if (isMonth) {
            obj = resultObj[prop1];
        }

        //adiciona o botão
        const button = mCreateElement(
            'button',
            Elem_Ids.Result.Button + base_id,
            'inputsbutton Result_Button text_shadown'
        );

        //adiciona o div titulo "Resultado ___: etc..."
        const div_result_title = mCreateElement(
            'div',
            Elem_Ids.Result.Title + base_id,
            'result_title'
        );

        //obtem o valor total que vai no texto Resultado
        const resultado_total = GetTotal(obj.total * CC_CA);

        //Seta o valor se é ano, mês ou dia
        //e adiciona um botão pra voltar ao resultado anterior caso seja mês ou dia
        const arrow = '<i class="icon icon-arrow-left"></i>';
        if (isDay) {

            div_result_title.innerHTML = Lang[appLang].result + prop2 + Lang[appLang].of + Lang[appLang].mesesfull[prop1] + resultado_total;

            button.innerHTML = arrow + Lang[appLang].back_month + Lang[appLang].mesesfull[prop1];
            button.onclick = function() {
                monclick(prop1);
            };

            resultDiv.appendChild(button);

            base_div_text = Lang[appLang].hour;

        } else if (isMonth) {

            div_result_title.innerHTML = Lang[appLang].result + Lang[appLang].mesesfull[prop1] + resultado_total;
            button.innerHTML = arrow + Lang[appLang].back_year;
            button.onclick = function() {
                monclick();
            };

            resultDiv.appendChild(button);

            base_div_text = Lang[appLang].day;

        } else {
            div_result_title.innerHTML = Lang[appLang].result + Lang[appLang].year + resultado_total;
        }

        resultDiv.appendChild(div_result_title);


        //Adiciona a observação para meses e dias
        if (isMonth) {

            resultDiv.appendChild(
                mCreateElement(
                    'div',
                    Elem_Ids.Result.Note,
                    'result_note',
                    Lang[appLang].obs_month
                )
            );

        } else if (!isDay) {

            resultDiv.appendChild(
                mCreateElement(
                    'div',
                    Elem_Ids.Result.Note,
                    'result_note',
                    Lang[appLang].obs_month
                )
            );
        }

        const Results_container = mCreateElement(
            'div',
            Elem_Ids.Result.Results_container + base_id,
            'Results_container'
        );

        const Results_inner_container = mCreateElement(
            'div',
            Elem_Ids.Result.Results_inner_container + base_id,
            'Results_inner_container'
        );
        Results_container.appendChild(Results_inner_container);

        //cria o elemento que indica se é mes e kwh
        div_value_container = mCreateElement(
            'div',
            Elem_Ids.Result.Value_Container + base_id,
            'result_holder'
        );
        Results_inner_container.appendChild(div_value_container);

        div_value_container.appendChild(
            mCreateElement(
                'div',
                Elem_Ids.Result.Value + base_id,
                'result_value',
                base_div_text + '<br>kWh ' + Lang[appLang].ac
            )
        );

        //Cria cada um dos elementos que tem um gráfico
        for (const prop in obj) {

            if (prop !== 'total') {

                //inicializa os div que contem os elementos
                div_value_container = mCreateElement(
                    'div',
                    Elem_Ids.Result.Value_Container + prop,
                    'result_holder'
                );

                //adiciona a função de onclick para meses e  dias
                if (!prop1 || !prop2) {

                    //inicializa constantes locais para serem usadas na função onclick
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
                }

                //inicializa os gráficos individuais
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

                //calcula qual elemento é o maior
                temp_total = obj[prop].total * CC_CA;
                if (temp_total > maior_total) maior_total = temp_total;

                //se o elemento tem potencia igual a zero, diminui a sua altura para 1vh
                //Para que no celular não tome tanto espaço quando possivel
                if (!temp_total) div_graf_container.style.height = '1vh';

                //Adiciona o valor individual de potencia para cada mes dia hora
                div_value_container.appendChild(
                    mCreateElement(
                        'div',
                        Elem_Ids.Result.Value + prop,
                        'result_value',
                        prop + '<br>' + temp_total.toFixed(2)
                    )
                );

                Results_inner_container.appendChild(div_value_container);

            }

            resultDiv.appendChild(Results_container);
        }

        //Seta o valor da altura de cada elemento gráfico em relação ao maior que é igual maior_total
        //Aumenta o valor total referencia para que nenhum gráfico de resultado fique maior que o seu container
        maior_total *= 1.05;
        for (const prop in obj) {

            if (prop !== 'total')
                mgetElementById(Elem_Ids.Result.Graf + prop).style.height = (((obj[prop].total * CC_CA) / maior_total) * 100) + '%';

        }

        resultObjID = msetTimeout(
            function() {

                //Desloca a pagina para baixo, para mostrar os gráficos
                mgetElementById(Elem_Ids.Input.Button).scrollIntoView({behavior: "smooth"});

                //Anima os gráficos
                for (const prop in obj) {

                    if (prop !== 'total')
                        mgetElementById(Elem_Ids.Result.Graf + prop).style.transform = 'translate(-50%, 2%)';

                }

            },
            100,
            resultObjID
        );

    }
};