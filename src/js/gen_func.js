
function ChangeSize(zoom_level) {
    if (isNaN(zoom_level)) zoom_level = 1;

    appZoomLevel = parseFloat(zoom_level);
    document.body.style.fontSize = (16 * appZoomLevel) + 'px';
    zoomValueDiv.textContent = Math.round(appZoomLevel * 100) + '%';

    localStorage.setItem('zoom_level', appZoomLevel);
}

function SetDotsOption() {
    //tree dots options
    //lang
    mgetElementById('settings').onclick = showDropdown;
    mgetElementById('lang_pt').onclick = function() {
        SetLAng('pt');
    };
    mgetElementById('lang_en').onclick = function() {
        SetLAng('en');
    };
    //zoom
    mgetElementById('zoom_reset').onclick = function() {
        zoomMinusDiv.classList = 'optionButton skipclick';
        ChangeSize(1);
    };

    mgetElementById('zoom_plus').onclick = function() {
        UpdateZoom(0.05);
    };

    mgetElementById('zoom_minus').onclick = function() {
        UpdateZoom(-0.05);
    };

    zoomMinusDiv = mgetElementById('zoom_minus');
    zoomValueDiv = mgetElementById('zoom_value');
}

function UpdateZoom(adder) {
    let currentValue = appZoomLevel + adder;

    if (currentValue <= 0.1) {
        zoomMinusDiv.classList = 'optionButtonDisabled skipclick';
        currentValue = 0.1;
    } else if (currentValue < 0.2) {
        zoomMinusDiv.classList = 'optionButton skipclick';
    }

    ChangeSize(currentValue);
}

//Se o elemente settings estiver visivel e o usuario clicar fora do elemente esconde ele
window.onclick = function(event) {
    if (!event.target.matches('.skipclick') &&
        mgetElementById("Dropdown").classList.contains('show')) {
        showDropdown();
    }
};

function GetLAng() {
    const lang = localStorage.getItem('app_lang') ||
        window.navigator.userLanguage ||
        window.navigator.language;

    if (lang.toLowerCase().indexOf('en') !== -1) {
        locale = 'en-EN';

        return 'en';
    } else {
        locale = 'pt-BR';

        return 'pt';
    }

}

function SetLAng(newLang) {
    /* eslint-enable */
    localStorage.setItem('app_lang', newLang);
    appLang = newLang;
    Set_Element_obj_Strings();
    ReStartPage();
}

function showDropdown() {
    mgetElementById("Dropdown").classList.toggle("show");
}

//Cria um elemento em rela????o aos valores passados
function mCreateElement(type, id, className, innerHTML) {

    const element = document.createElement(type);
    if (className) element.className = className;
    if (id) element.setAttribute('id', id);
    if (innerHTML) element.innerHTML = innerHTML;

    return element;
}

function SetLangText(elem, lang, check) {
    const element = mgetElementById(elem);
    const enable = appLang.indexOf(check) !== -1;

    element.innerHTML = '&nbsp;' + lang +
        (enable ? '&nbsp;<i class="skipclick icon icon-check"></i>&nbsp;' : '');

    if (enable) {
        element.classList.add('options_item_focus');
    } else {
        element.classList.remove('options_item_focus');
    }
}

function emptyEle(el) {
    while (el.firstChild) el.removeChild(el.firstChild);
}


function mgetElementById(elemString) {
    return document.getElementById(elemString);
}

function msetTimeout(fun, timeout, id) {
    mclearTimeout(id);
    if (timeout && timeout > 0) return window.setTimeout(fun, timeout);
    else return window.setTimeout(fun);
}

function mclearTimeout(id) {
    window.clearTimeout(id);
}

//Fun????es usadas para analise de uso da pagina
//Quantidade de acessos e etc relacionado
window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}

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