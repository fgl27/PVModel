
function modeloSetValues(value, obj) {
    value = parseInt(value);

    if (obj.value !== value) {

        obj.value = value;
        UpdatePotNominal();
        StartInputs();

        const disabled = Boolean(value);
        let ele = mgetElementById(Elem_Ids.Input.Input + 'pot_nominal_array');
        ele.disabled = disabled;
        if (disabled) ele.classList.add('CursorDisable');

        //bloqueia que se altere os valores dos elementos que seu valor é calculado em relação a outros valores
        if (disabled) {

            mgetElementById(Elem_Ids.Input.Span + 'pot_nominal_array').className =
                'tooltiptext tooltiptext_disabled';
            mgetElementById(Elem_Ids.Input.Span + 'pot_nominal_array').innerHTML =
                Lang[appLang].pot_nominal_array.disabledHelp;

        }

        if (value === 1) {

            ele = mgetElementById(Elem_Ids.Input.Input + 'quantidade');
            ele.disabled = true;
            ele.classList.add('CursorDisable');
            console.log(ele)
            mgetElementById(Elem_Ids.Input.Span + 'quantidade').className =
                'tooltiptext tooltiptext_disabled';
            mgetElementById(Elem_Ids.Input.Span + 'quantidade').innerHTML =
                Lang[appLang].quantidade.disabledHelp;
        }

    }
}

function superficieSetValues(value, obj) {
    obj.value = value;

    a = obj.values.a[value];
    b = obj.values.b[value];
    Delta_T = obj.values.Delta_T[value];
}

const estacao_props = [
    [
        'estacao_ultra_quanti',
        'estacao_ultra_custo',
        'estacao_ultra_pot',
    ],
    [
        'estacao_fast_quanti',
        'estacao_fast_custo',
        'estacao_fast_pot',
    ],
    [
        'estacao_slow_quanti',
        'estacao_slow_custo',
        'estacao_slow_pot'
    ]
];

const estacao_lang_props = [
    'estacao_quanti',
    'estacao_custo',
    'estacao_pot'
];

function Set_Element_obj_Strings() {
    for (const prop in Lang[appLang]) {
        for (const value in Lang[appLang][prop]) {
            if (Element_obj.hasOwnProperty(prop)) {
                Element_obj[prop][value] = Lang[appLang][prop][value];
            }
        }
    }

    //Adiciona as strings das estações
    estacao_props.forEach(element => {

        for (let index = 0; index < estacao_lang_props.length; index++) {
            Element_obj[element[index]].innerHTML = Lang[appLang][estacao_lang_props[index]].innerHTML;
            Element_obj[element[index]].help = Lang[appLang][estacao_lang_props[index]].help;
        }

    });
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

//Retorna se o total esta em quilo, Mega ou Giga
function GetTotal(total) {
    let text = '';

    if (total > 1000000) {//Giga

        return text + formatNumber(total / 1000000.0, 4) + ' GWh ' + Lang[appLang].ac;

    } else if (total > 1000) {//Mega

        return text + formatNumber(total / 1000.0, 4) + ' MWh ' + Lang[appLang].ac;

    }//else quilo

    return text + formatNumber(total, 4) + ' kWh ' + Lang[appLang].ac;

}

//Retorna o valor financeiro total em relação aos kwh produzidos PV
function GetTotalkWhRetorno(total_kWh) {
    return formatNumber(total_kWh * Element_obj.kwh.value) + Lang[appLang].real;
}

//Retorna o valor financeiro total em relação aos kwh produzidos Estações de recarga
function GetTotalkWhRetornoEstacao(total_kWh) {
    let total_kw = 0;

    //custo ultrarapido
    total_kw += Element_obj.estacao_ultra_quanti.value * 50;

    //Custo rapido
    total_kw += Element_obj.estacao_fast_quanti.value * 25;

    //Custo lento
    total_kw += Element_obj.estacao_slow_quanti.value * 5;

    total_kw *= 365 * 5;

    return formatNumber(total_kw * Element_obj.kwh.value);
}

function GetCustoPV(total_kWh) {
    let total_cost = 0;

    //custo paineis
    total_cost += Element_obj.pot_nominal_array.value * Element_obj.custo_painel.value;

    //Custo inversores ou otimizadores
    total_cost += total_kWh / 1000 * Element_obj.custo_inv.value;

    //Custo extrutura
    if (Element_obj['tem_estrutura'].value === 1) {

        total_cost += Element_obj.quantidade_estrutura.value * Element_obj.custo_estrutura.value;

    } else if (Element_obj['tem_estrutura'].value === 2) {

        total_cost += Element_obj.quantidade_estrutura_garagem.value * Element_obj.custo_estrutura_garagem.value;

    } else if (Element_obj['tem_estrutura'].value === 3) {

        total_cost += Element_obj.quantidade_estrutura.value * Element_obj.custo_estrutura.value;
        total_cost += Element_obj.quantidade_estrutura_garagem.value * Element_obj.custo_estrutura_garagem.value;

    }

    return formatNumber(total_cost) + Lang[appLang].real;
}

function GetCustoEstação() {
    let total_cost = 0;

    //custo ultrarapido
    total_cost += Element_obj.estacao_ultra_quanti.value * Element_obj.estacao_ultra_custo.value;

    //Custo rapido
    total_cost += Element_obj.estacao_fast_quanti.value * Element_obj.estacao_fast_custo.value;

    //Custo lento
    total_cost += Element_obj.estacao_slow_quanti.value * Element_obj.estacao_slow_quanti.value;


    return formatNumber(total_cost) + Lang[appLang].real;
}

function formatNumber(number, max) {
    return number.toLocaleString(locale, {maximumFractionDigits: max ? max : 2})

}

