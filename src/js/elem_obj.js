
let resultObj = {};
let resultObjID;
const question_icon = '<i class="icon icon-help-circled" style="-webkit-text-stroke-width:unset;"></i>';
const arrow = '<i class="icon icon-arrow-left"></i>';

let Element_obj = {
    modelo: {
        elem: 'select',
        value: 0,
        values: [
            [// os elementos disponíveis no modo Pot nominal
                'energi_title',
                'modelo',
                'regiao',
                'pot_nominal_array',
                'coef_temp',
                'superficie',
                'perda',
                'cc_ca'
            ],
            [// os elementos disponíveis no modo Área total
                'energi_title',
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
                'cc_ca'
            ],
            [// os elementos disponíveis no modo quantidade painéis
                'energi_title',
                'modelo',
                'regiao',
                'pot_nominal_painel',
                'quantidade',
                'pot_nominal_array',
                'coef_temp',
                'superficie',
                'perda',
                'cc_ca'
            ]
        ],
        setValues: function(value) {
            modeloSetValues(value, this);
        }
    },
    energi_title: {
        elem: 'title',
    },
    pot_nominal_array: {
        elem: 'input',
        value: 1000,
        min: 0,
        type: 'number',
        step: '10',
        UpdateValue: UpdatePotNominal
    },
    pot_nominal_painel: {
        elem: 'input',
        value: 300,
        min: 0,
        type: 'number',
        step: '10',
        UpdateValue: UpdatePotNominal
    },
    area_painel: {
        elem: 'input',
        value: 1.64,
        min: 0,
        type: 'number',
        step: '0.01',
        UpdateValue: UpdatePotNominal
    },
    area: {
        elem: 'input',
        value: 6,
        min: 0,
        type: 'number',
        step: '1',
        UpdateValue: UpdatePotNominal
    },
    quantidade: {
        elem: 'input',
        value: 3,
        min: 0,
        type: 'number',
        step: '1',
        UpdateValue: UpdatePotNominal
    },
    perda: {
        elem: 'input',
        value: 14,
        min: 0,
        type: 'number',
        step: '1',
    },
    coef_temp: {
        elem: 'input',
        value: -0.35,
        max: 0,
        type: 'number',
        step: '0.01',
    },
    cc_ca: {
        elem: 'input',
        value: 95,
        min: 0,
        max: 100,
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
    },
    cost_title: {
        elem: 'title',
    },
    kwh_consumption: {
        elem: 'input',
        value: 0,
        min: 0,
        type: 'number',
        step: '1',
    },
    kwh: {
        elem: 'input',
        value: 0.85,
        min: 0,
        type: 'number',
        step: '0.01',
    },
    custo_painel: {
        elem: 'input',
        value: 2.2,
        min: 0,
        type: 'number',
        step: '0.01',
    },
    custo_inv: {
        elem: 'input',
        value: 1000,
        min: 0,
        type: 'number',
        step: '1',
    },
    tem_estrutura: {
        elem: 'select',
        value: 0,
        setValues: function(value) {
            this.value = parseInt(value);
            StartInputs();
        }
    },
    custo_estrutura: {
        elem: 'input',
        value: 500,
        min: 0,
        type: 'number',
        step: '1',
    },
    quantidade_estrutura: {
        elem: 'input',
        value: 1,
        min: 0,
        type: 'number',
        step: '1',
    },
    custo_estrutura_garagem: {
        elem: 'input',
        value: 10000,
        min: 0,
        type: 'number',
        step: '1',
    },
    quantidade_estrutura_garagem: {
        elem: 'input',
        value: 1,
        min: 0,
        type: 'number',
        step: '1',
    },
    estacao_title: {
        elem: 'title',
    },
    tem_estacao: {
        elem: 'select',
        value: 0,
        setValues: function(value) {
            this.value = parseInt(value);
            StartInputs();
        }
    },
    ultra_title: {
        elem: 'title',
    },
    days_active: {
        elem: 'input',
        value: 7,
        min: 1,
        nax: 7,
        type: 'number',
        step: '1',
    },
    hours_active: {
        elem: 'input',
        value: 3,
        min: 0,
        max: 24,
        type: 'number',
        step: '1',
    },
    kwh_venda: {
        elem: 'input',
        value: 1.0,
        min: 0,
        type: 'number',
        step: '0.1',
    },
    estacao_ultra_quanti: {
        elem: 'input',
        value: 0,
        min: 0,
        type: 'number',
        step: '1',
    },
    estacao_ultra_custo: {
        elem: 'input',
        value: 100000,
        min: 0,
        type: 'number',
        step: '1',
    },
    estacao_ultra_pot: {
        elem: 'input',
        value: 100,
        min: 43,
        max: 200,
        type: 'number',
        step: '1',
    },
    fast_title: {
        elem: 'title',
    },
    estacao_fast_quanti: {
        elem: 'input',
        value: 0,
        min: 0,
        type: 'number',
        step: '1',
    },
    estacao_fast_custo: {
        elem: 'input',
        value: 30000,
        type: 'number',
        step: '1',
    },
    estacao_fast_pot: {
        elem: 'input',
        value: 22,
        min: 0,
        max: 20,
        type: 'number',
        step: '1',
    },
    slow_title: {
        elem: 'title',
    },
    estacao_slow_quanti: {
        elem: 'input',
        value: 0,
        min: 0,
        type: 'number',
        step: '1',
    },
    estacao_slow_custo: {
        elem: 'input',
        value: 8500,
        min: 0,
        type: 'number',
        step: '1',
    },
    estacao_slow_pot: {
        elem: 'input',
        value: 6,
        min: 0,
        max: 7.5,
        type: 'number',
        step: '0.1',
    },
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
    title: function(prop) {
        //cria o elemento de entrada de valor
        let obj = Element_obj[prop];

        const Inputs_Container = mCreateElement(
            'div',
            Elem_Ids.Input.Container + prop,
            'inputsContainer'
        );

        //cria os elementos de acordo com as entradas
        Inputs_Container.appendChild(
            mCreateElement(
                'div',
                Elem_Ids.Input.Text + prop,
                'inputsTitle',
                obj.innerHTML
            )
        );

        const container = mCreateElement(
            'div',
            prop
        );

        container.appendChild(Inputs_Container);
        inputsDiv.appendChild(container);
    },
    result: function(prop, extra_class, text, result, help) {
        const Inputs_Container = mCreateElement(
            'div',
            Elem_Ids.Input.Container + prop,
            'inputsContainer ' + (extra_class ? extra_class : '')
        );

        const Imput_Help_Container = mCreateElement(
            'div',
            Elem_Ids.Input.Imput_Help_Container + prop,
            'Imput_Help_Container'
        );

        const textDiv = mCreateElement(
            'div',
            Elem_Ids.Input.Text + prop,
            result || result === 0 ? 'inputsText' : 'inputsTitle',
            text
        );

        if (help) {

            const Input_Tooltip = mCreateElement(
                'div',
                Elem_Ids.Input.Tooltip + prop,
                'tooltip tooltip_disabled'
            );

            Input_Tooltip.appendChild(textDiv);
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
                    'tooltip ',
                    question_icon + '<span class="tooltiptext">' + help + '</span>'
                )
            );
            Inputs_Container.appendChild(Imput_Help_Container);

        } else {

            Inputs_Container.appendChild(
                textDiv
            );

        }
        Inputs_Container.appendChild(Imput_Help_Container);

        if (result || result === 0) {
            Imput_Help_Container.appendChild(
                mCreateElement(
                    'div',
                    Elem_Ids.Input.Help + prop,
                    'resultText',
                    result
                )
            );
        }

        const container = mCreateElement(
            'div',
            prop
        );

        container.appendChild(Inputs_Container);
        resultDiv.appendChild(container);
    },
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
        if (obj.value || obj.value === 0) Input.value = obj.value;

        //seta a função a ser chamada quando o valor muda
        Input.onchange = function() {
            obj.value = this.value;

            if (obj.UpdateValue) {
                obj.UpdateValue();
            }

            if (obj.min && this.value < obj.min) {
                this.value = obj.min;
            } else if (obj.max && this.value > obj.max) {
                this.value = obj.max;
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
                question_icon + '<span class="tooltiptext">' + obj.help + '</span>'
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
                question_icon + '<span class="tooltiptext">' + obj.help + '</span>'
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

            BackButtonClick = false;

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
                BackButtonClick = true;
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

        //obtem o valor total que vai no texto Resultado
        const total_kw = resultObj.total * CC_CA,
            resultado_total = GetTotal(total_kw),
            result_title = Lang[appLang].result_graf;

        let result_title_extra;

        //Seta o valor se é ano, mês ou dia
        //e adiciona um botão pra voltar ao resultado anterior caso seja mês ou dia
        if (isDay) {

            result_title_extra = prop2 + Lang[appLang].of + Lang[appLang].mesesfull[prop1];

            button.innerHTML = arrow + Lang[appLang].back_month + Lang[appLang].mesesfull[prop1];
            button.onclick = function() {
                monclick(prop1);
            };

            base_div_text = Lang[appLang].hour;

        } else if (isMonth) {

            result_title_extra = Lang[appLang].mesesfull[prop1];
            button.innerHTML = arrow + Lang[appLang].back_year;
            button.onclick = function() {
                monclick();
            };

            base_div_text = Lang[appLang].day;

        } else {
            result_title_extra = Lang[appLang].year;
        }

        const total_ret_kw = GetTotalkWhRetorno(total_kw),
            total_pv_custo = GetCustoPV(total_kw),
            ret_anos = total_pv_custo / total_ret_kw;

        if (total_kw > 0) {
            fun_obj.result('result_title', 'inputsContainerTop', Lang[appLang].pv_sys);
            fun_obj.result('result_total_pv', null, Lang[appLang].total_en, resultado_total);
            fun_obj.result('result_kwh_ret', null, Lang[appLang].ret_kwh, formatNumber(total_ret_kw) + Lang[appLang].real);
            fun_obj.result('result_custo_ret', null, Lang[appLang].ret_custo, formatNumber(total_pv_custo) + Lang[appLang].real);
            fun_obj.result('result_ret_ev', null, Lang[appLang].pv_paga, formatAnos(ret_anos));
        }

        const total_ev_kw = (Element_obj.tem_estacao.value ? GetConsumoEstacao() : 0),
            total_ev_custo = GetCustoEstação(),
            total_ev_ret = GetRetornoEstacao(total_ev_kw),
            ret_ev_anos = total_ev_custo / total_ev_ret,
            se_paga = formatAnos((total_ev_custo + total_pv_custo) / (total_ret_kw + total_ev_ret)),
            ret_ano_tot = formatNumber(total_ev_ret + total_ret_kw, 2) + Lang[appLang].real,
            kw_consumo = (Element_obj.tem_estacao.value ? total_ev_kw : 0) + (Element_obj.kwh_consumption.value * 12),
            kw_deficit = total_kw - kw_consumo,
            kw_pago = kw_deficit * Element_obj.kwh.value;

        if (Element_obj.tem_estacao.value) {
            fun_obj.result('result_ev_title', (!total_kw ? 'inputsContainerTop' : null), Lang[appLang].ev_sys);
            fun_obj.result('result_kwh_consumo', null, Lang[appLang].estacao_consumo, GetTotal(total_ev_kw));
            fun_obj.result('result_kwh_ev_ret', null, Lang[appLang].ret_estacao, formatNumber(total_ev_ret, 2) + Lang[appLang].real);
            fun_obj.result('result_custo_ev_ret', null, Lang[appLang].ret_estacao_custo, formatNumber(total_ev_custo, 2) + Lang[appLang].real);
            fun_obj.result('result_ret_ev', null, Lang[appLang].pv_paga, formatAnos(ret_ev_anos));
        }

        fun_obj.result(
            'result_title',
            (!total_kw && !Element_obj.tem_estacao.value ? 'inputsContainerTop' : null),
            Lang[appLang].result + Lang[appLang].total,
            null,
            Lang[appLang].result_tot
        );

        fun_obj.result('result_total_pv', null, Lang[appLang].total_year, resultado_total);
        fun_obj.result('result_kwh_consumo', null, Lang[appLang].consumo_tot, GetTotal(kw_consumo));

        fun_obj.result('result_kwh_consumo', null, kw_deficit >= 0 ? Lang[appLang].excedente : Lang[appLang].deficit, GetTotal(kw_deficit));
        fun_obj.result('result_kwh_consumo', null, (kw_pago >= 0 ? Lang[appLang].custo_re_energia : Lang[appLang].custo_pg_energia), formatNumber(kw_pago >= 0 ? kw_pago : Math.abs(kw_pago)) + Lang[appLang].real);

        fun_obj.result('custo_total', null, Lang[appLang].custo_total, formatNumber(total_ev_custo + total_pv_custo, 2) + Lang[appLang].real);
        fun_obj.result('ret_total', null, Lang[appLang].ret_total, ret_ano_tot);

        fun_obj.result('se_paga_total', 'inputsContainerBottom', Lang[appLang].sys_pago, se_paga);





        resultDiv.appendChild(
            mCreateElement(
                'div',
                Elem_Ids.Result.Note + '_Title',
                'result_note',
                result_title + result_title_extra + GetTotal(obj.total * CC_CA)
            )
        );

        //Adiciona a observação para meses e dias
        if (isMonth) {

            resultDiv.appendChild(
                mCreateElement(
                    'div',
                    Elem_Ids.Result.Note,
                    'result_note',
                    Lang[appLang].obs_day
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

        //Adiciona o botão retornar grafico
        if (isDay || isMonth)
            resultDiv.appendChild(button);

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
                mgetElementById((!isMonth && !isDay && !BackButtonClick) ? Elem_Ids.Input.Button : Elem_Ids.Result.Note + '_Title').scrollIntoView({behavior: "smooth"});

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