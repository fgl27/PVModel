
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

let inputsDiv;
let resultDiv;
let appZoomLevel = 1.0;
function StartPage() {
    //Inicializa os div de conteúdo
    inputsDiv = mgetElementById('inputs');
    resultDiv = mgetElementById('result');

    //Inicias as opções 3 pontos
    SetDotsOption();
    ChangeSize(localStorage.getItem('zoom_level') || appZoomLevel);

    //Seta no nome no topo
    mgetElementById('title').innerHTML = 'PVModel';

    //Atualiza as strings e inicia o site
    ReStartPage();

    //Show body only after page has loaded and content is created
    document.body.classList.remove('hide');
    //Inicializa o analitics 
    Startfirebase();


}

function ReStartPage() {
    Set_Element_obj_Strings();

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

function StartInputs() {
    //Limpa o div
    emptyEle(inputsDiv);
    emptyEle(resultDiv);

    const obj = Element_obj.modelo;
    const objArray = obj.values[obj.value];

    //Gera a lista de entradas em relação ao array Element_obj.modelo.values
    objArray.forEach(GenDiv);
    GenDivFinanceiro();
    //Aredonda os cantos do primeiro e ultimo elemento de entrada
    mgetElementById(Elem_Ids.Input.Container + objArray[0]).classList.add('inputsContainerTop');

    fun_obj[Element_obj.button.elem]('button');
}

const default_value = [
    'cost_title',
    'kwh',
    'custo_painel',
    'custo_inv'
];
const estacao_values = [
    'ultra_title',
    'estacao_ultra_quanti',
    'estacao_ultra_custo',
    'estacao_ultra_pot',

    'fast_title',
    'estacao_fast_quanti',
    'estacao_fast_custo',
    'estacao_fast_pot',

    'slow_title',
    'estacao_slow_quanti',
    'estacao_slow_custo',
    'estacao_slow_pot'
];

function GenDivFinanceiro() {

    default_value.forEach(GenDiv);

    GenDiv('tem_estrutura');

    if (Element_obj.tem_estrutura.value === 1) {

        GenDiv('quantidade_estrutura');
        GenDiv('custo_estrutura');

    } else if (Element_obj.tem_estrutura.value === 2) {

        GenDiv('quantidade_estrutura_garagem');
        GenDiv('custo_estrutura_garagem');

    } else if (Element_obj.tem_estrutura.value === 3) {

        GenDiv('quantidade_estrutura');
        GenDiv('custo_estrutura');
        GenDiv('quantidade_estrutura_garagem');
        GenDiv('custo_estrutura_garagem');

    }

    GenDiv('estacao_title');
    GenDiv('tem_estacao');

    if (Element_obj.tem_estacao.value === 1) {

        GenDiv('kwh_venda');
        GenDiv('days_active');
        GenDiv('hours_active');

        estacao_values.forEach(GenDiv);

        mgetElementById(
            Elem_Ids.Input.Container + estacao_values[estacao_values.length - 1]
        ).classList.add('inputsContainerBottom');

    } else {

        mgetElementById(
            Elem_Ids.Input.Container + 'tem_estacao'
        ).classList.add('inputsContainerBottom');

    }
}

function GenDiv(prop) {
    fun_obj[Element_obj[prop].elem](prop);
}

Start();
