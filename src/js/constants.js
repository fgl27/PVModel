let BackButtonClick = false;
let skipfirebase = false;

let zoomValueDiv;
let zoomMinusDiv;

let inputsDiv;
let resultDiv;
let appZoomLevel = 1.0;

let locale;

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

const default_value = [
    'cost_title',
    'kwh_consumption',
    'kwh',
    'kwhv',
    'cost_min',
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
