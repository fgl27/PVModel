
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

Start();
