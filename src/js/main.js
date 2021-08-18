
let inputsDiv;
let resultDiv;
let resultObj = {};
let resultObjID;
let appLang = GetLAng();

let Element_obj;
Start_Element_obj();

function Start_Element_obj() {
    Element_obj = {
        modelo: {
            elem: 'select',
            innerHTML: Lang[appLang].modelo.innerHTML,
            value: 0,
            options: Lang[appLang].modelo.options,
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
                value = parseInt(value);

                if (this.value !== value) {

                    this.value = value;
                    UpdatePotNominal();
                    StartInputs();

                    const disabled = Boolean(value);
                    mgetElementById(Elem_Ids.Input.Input + 'pot_nominal_array').disabled = disabled;

                    //bloqueia que se altere os valores dos elementos que seu valor é calculado em relação a outros valores
                    if (disabled) {

                        mgetElementById(Elem_Ids.Input.Span + 'pot_nominal_array').className =
                            'tooltiptext tooltiptext_disabled';
                        mgetElementById(Elem_Ids.Input.Span + 'pot_nominal_array').innerHTML =
                            Lang[appLang].modelo.setValues[0];

                    }

                    if (value === 1) {

                        mgetElementById(Elem_Ids.Input.Input + 'quantidade').disabled = true;
                        mgetElementById(Elem_Ids.Input.Span + 'quantidade').className =
                            'tooltiptext tooltiptext_disabled';
                        mgetElementById(Elem_Ids.Input.Span + 'quantidade').innerHTML =
                            Lang[appLang].modelo.setValues[1];
                    }


                }

            },
            help: Lang[appLang].modelo.help
        },
        pot_nominal_array: {
            elem: 'input',
            innerHTML: Lang[appLang].pot_nominal_array.innerHTML,
            help: Lang[appLang].pot_nominal_array.help,
            value: 1000,
            type: 'number',
            step: '10',
            UpdateValue: UpdatePotNominal
        },
        pot_nominal_painel: {
            elem: 'input',
            innerHTML: Lang[appLang].pot_nominal_painel.innerHTML,
            help: Lang[appLang].pot_nominal_painel.help,
            value: 300,
            type: 'number',
            step: '10',
            UpdateValue: UpdatePotNominal
        },
        area_painel: {
            elem: 'input',
            innerHTML: Lang[appLang].area_painel.innerHTML,
            help: Lang[appLang].area_painel.help,
            value: 1.64,
            type: 'number',
            step: '0.01',
            UpdateValue: UpdatePotNominal
        },
        area: {
            elem: 'input',
            innerHTML: Lang[appLang].area.innerHTML,
            help: Lang[appLang].area.help,
            value: 6,
            type: 'number',
            step: '1',
            UpdateValue: UpdatePotNominal
        },
        quantidade: {
            elem: 'input',
            innerHTML: Lang[appLang].quantidade.innerHTML,
            help: Lang[appLang].quantidade.help,
            value: 3,
            type: 'number',
            step: '1',
            UpdateValue: UpdatePotNominal
        },
        perda: {
            elem: 'input',
            innerHTML: Lang[appLang].perda.innerHTML,
            help: Lang[appLang].perda.help,
            value: 14,
            type: 'number',
            step: '1',
        },
        coef_temp: {
            elem: 'input',
            innerHTML: Lang[appLang].coef_temp.innerHTML,
            help: Lang[appLang].coef_temp.help,
            value: -0.35,
            type: 'number',
            step: '0.01',
        },
        cc_ca: {
            elem: 'input',
            innerHTML: Lang[appLang].cc_ca.innerHTML,
            help: Lang[appLang].cc_ca.help,
            value: 95,
            type: 'number',
            step: '1',
        },
        superficie: {
            elem: 'select',
            innerHTML: Lang[appLang].superficie.innerHTML,
            help: Lang[appLang].superficie.help,
            options: Lang[appLang].superficie.options,
            value: 0,
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
        },
        regiao: {
            elem: 'select',
            innerHTML: Lang[appLang].regiao.innerHTML,
            help: Lang[appLang].regiao.help,
            options: Lang[appLang].regiao.options,
            value: 4,
            setValues: function(value) {
                this.value = value;
            }
        },
        button: {
            elem: 'button',
            innerHTML: Lang[appLang].button.innerHTML,
        }
    };
}

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
            'inputsbutton',
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
            'inputsbutton'
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
        if (isDay) {

            div_result_title.innerHTML = Lang[appLang].result + prop2 + Lang[appLang].of + Lang[appLang].mesesfull[prop1] + resultado_total;

            button.innerHTML = '<span>&#8592;</span>' + Lang[appLang].back_month + Lang[appLang].mesesfull[prop1];
            button.onclick = function() {
                monclick(prop1);
            };

            resultDiv.appendChild(button);

            base_div_text = Lang[appLang].hour;

        } else if (isMonth) {

            div_result_title.innerHTML = Lang[appLang].result + Lang[appLang].mesesfull[prop1] + resultado_total;
            button.innerHTML = '<span>&#8592;</span>' + Lang[appLang].back_year;
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
                    Lang[appLang].obs_dia
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

//Cria um elemento em relação aos valores passados
function mCreateElement(type, id, className, innerHTML) {

    const element = document.createElement(type);
    if (className) element.className = className;
    if (id) element.setAttribute('id', id);
    if (innerHTML) element.innerHTML = innerHTML;

    return element;
}

//Função que inicializa o aplicativo
function Start() {
    if (document.readyState === "loading") {
        //se o documento html ainda esta carregando adiciona um evento para iniciar somente apos ele terminar
        document.addEventListener("DOMContentLoaded", function() {
            StartPage();
        });
    } else { // `DOMContentLoaded` já foi chamado
        StartPage();
    }
}

function StartPage() {
    //Inicializa os div de conteúdo
    inputsDiv = mgetElementById('inputs');
    resultDiv = mgetElementById('result');

    mgetElementById('lang').onclick = showDropdown;
    mgetElementById('lang_pt').onclick = function() {
        SetLAng('pt');
    };
    mgetElementById('lang_en').onclick = function() {
        SetLAng('en');
    };

    //Seta no nome no topo
    mgetElementById('title').innerHTML = 'PVModel';

    //Show body only after page has loaded
    document.body.classList.remove('hide');
    ReStartPage();
    //Inicializa o analitics 
    Startfirebase();

}

function ReStartPage() {
    emptyEle(resultDiv);

    mgetElementById('lang_text').innerHTML = Lang[appLang].lang;

    SetLangText('lang_pt', Lang[appLang].langs[0], 'pt');
    SetLangText('lang_en', Lang[appLang].langs[1], 'en');

    //Seta o about
    const about_div = mgetElementById('page_about'),
        about_text = Lang[appLang].about_help +
            '<br><br><a href="https://github.com/fgl27/PVModel" target="_blank">github.com/fgl27/PVModel</a>';

    emptyEle(about_div);
    about_div.appendChild(
        mCreateElement(
            'div',
            Elem_Ids.General.About,
            'tooltip_botton',
            Lang[appLang].about + '<span id="span_about" class="tooltiptextop">' + about_text + '</span>'
        )
    );

    //Inicializa os inputs
    StartInputs();
}

function SetLangText(elem, lang, check) {
    const element = mgetElementById(elem);
    const enable = appLang.indexOf(check) !== -1;

    element.innerHTML = '&nbsp;' + lang +
        (enable ? '&nbsp;<i class="skipclick icon icon-check"></i>&nbsp;' : '');

    if (enable) {
        element.classList.add('lang_focus');
    } else {
        element.classList.remove('lang_focus');
    }
}

function StartInputs() {
    //Limpa o div
    emptyEle(inputsDiv);

    const obj = Element_obj.modelo;
    const objArray = obj.values[obj.value];

    //Gera a lista de entradas em relação ao array Element_obj.modelo.values
    objArray.forEach(GenDiv);

    //Aredonda os cantos do primeiro e ultimo elemento de entrada
    mgetElementById(Elem_Ids.Input.Container + objArray[0]).classList.add('inputsContainerTop');
    mgetElementById(Elem_Ids.Input.Container + objArray[objArray.length - 2]).classList.add('inputsContainerBottom');
}

function GenDiv(prop) {
    fun_obj[Element_obj[prop].elem](prop);
}

function emptyEle(el) {
    while (el.firstChild) el.removeChild(el.firstChild);
}

//Retorna se o total esta em quilo, Mega ou Giga
function GetTotal(total) {
    let text = Lang[appLang].total;

    if (total > 1000000) {//Giga

        return text + (total / 1000000).toFixed(2) + ' GWh ' + Lang[appLang].ac;

    } else if (total > 1000) {//Mega

        return text + (total / 1000).toFixed(2) + ' MWh ' + Lang[appLang].ac;

    }//else quilo

    return text + (total).toFixed(2) + ' kWh ' + Lang[appLang].ac;

}

//Atualiza o valor da potência nominal total da matriz em relação ao outros valores
function UpdatePotNominal() {

    //Inicializa os elementos e objetos locais
    const modelo = Element_obj.modelo,
        pot_nom = Element_obj.pot_nominal_array,
        pot_nominal_painel = Element_obj.pot_nominal_painel,
        quantidade = Element_obj.quantidade,
        area = Element_obj.area,
        area_painel = Element_obj.area_painel,
        elem_pot = mgetElementById(Elem_Ids.Input.Input + 'pot_nominal_array'),
        elem_quatidade = mgetElementById(Elem_Ids.Input.Input + 'quantidade');

    if (!modelo.value) {
        //Modo padram quando modelo e entradas = potência nominal

        quantidade.value = parseInt(
            Math.ceil(pot_nom.value / pot_nominal_painel.value)
        );

        area.value = parseInt(
            Math.ceil(quantidade.value * area_painel.value)
        );

    } else {

        // modelo e entradas = área total
        if (modelo.value === 1) {

            quantidade.value = parseInt(
                (area.value / area_painel.value)
            );

        } else {// modelo e entradas = quantidade paineis

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
function calcPotCC(PM0, DNI, EG_ED, TA, WS) {

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

//Funções usadas para analise de uso da pagina
//Quantidade de acessos e etc relacionado
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

function GetLAng() {
    const lang = localStorage.getItem('app_lang') ||
        window.navigator.userLanguage ||
        window.navigator.language;

    return lang.toLowerCase().indexOf('en') !== -1 ? 'en' : 'pt';
}

function SetLAng(newLang) {
    /* eslint-enable */
    localStorage.setItem('app_lang', newLang);
    appLang = newLang;
    Start_Element_obj();
    ReStartPage();
}

function showDropdown() {
    mgetElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.skipclick') &&
        mgetElementById("myDropdown").classList.contains('show')) {
        //console.log('asa')
        showDropdown();
    }
};

Start();
