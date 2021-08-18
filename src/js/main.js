
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
        UpdateValue: UpdatePotNominal
    },
    pot_nominal_painel: {
        elem: 'input',
        innerHTML: 'Potência nominal de um painel (W/m²)',
        value: 300,
        type: 'number',
        step: '10',
        help: 'O valor nominal total de um painel usado em W/m² (assumindo que todos painéis são iguais)',
        UpdateValue: UpdatePotNominal
    },
    area_painel: {
        elem: 'input',
        innerHTML: 'Área de um painel (m²)',
        value: 1.64,
        type: 'number',
        step: '0.01',
        help: 'A área de um painel comercial em m²',
        UpdateValue: UpdatePotNominal
    },
    area: {
        elem: 'input',
        innerHTML: 'Área total utilizada (m²)',
        value: 6,
        type: 'number',
        step: '1',
        help: 'A máxima área que os painéis podem cobrir',
        UpdateValue: UpdatePotNominal
    },
    quantidade: {
        elem: 'input',
        innerHTML: 'Quantidade painéis',
        value: 3,
        type: 'number',
        step: '1',
        help: 'A quantidade total de painéis possível',
        UpdateValue: UpdatePotNominal
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
        innerHTML: 'Conversão CC-CA (Eficiencia %)',
        value: 95,
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

                mes = meses[obj[i][0] - 1];
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


        //Adiciona a observação para meses e dias
        if (isMonth) {

            resultDiv.appendChild(
                mCreateElement(
                    'div',
                    Elem_Ids.Result.Note,
                    'result_note',
                    'Obs.: Clique no dia para ver o resultado por hora'
                )
            );

        } else if (!isDay) {

            resultDiv.appendChild(
                mCreateElement(
                    'div',
                    Elem_Ids.Result.Note,
                    'result_note',
                    'Obs.: Clique no mês para ver o resultado por dia'
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
                base_div_text + '<br>kWh (CA)'
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

    //Seta no nome no topo
    mgetElementById('page_title').innerHTML = 'PVModel';

    //Seta o about
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

    //Inicializa os inputs
    StartInputs();
    //Inicializa o analitics 
    Startfirebase();

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
    let text = ': Energia produzida total ';

    if (total > 1000000) {//Giga

        return text + (total / 1000000).toFixed(2) + ' GWh (CA)';

    } else if (total > 1000) {//Mega

        return text + (total / 1000).toFixed(2) + ' MWh (CA)';

    }//else quilo

    return text + (total).toFixed(2) + ' kWh (CA)';

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

Start();
