
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

function Set_Element_obj_Strings() {
    for (const prop in Lang[appLang]) {
        for (const value in Lang[appLang][prop]) {
            if (Element_obj.hasOwnProperty(prop)) {
                Element_obj[prop][value] = Lang[appLang][prop][value];
            }
        }
    }
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