
const Lang = {
    pt: {
        lang: "Idioma:",
        langs: [
            "🇧🇷 Português",
            "🇺🇸 Inglês"
        ],
        meses: [
            "Jan",
            "Fev",
            "Mar",
            "Abr",
            "Maio",
            "Jun",
            "Jul",
            "Ago",
            "Set",
            "Out",
            "Nov",
            "Dez"
        ],
        mesesfull: {
            Jan: 'Janeiro ',
            Fev: 'Fevereiro ',
            Mar: 'Março ',
            Abr: 'Abril ',
            Maio: 'Maio ',
            Jun: 'Junho ',
            Jul: 'Julho ',
            Ago: 'Agosto ',
            Set: 'Setembor ',
            Out: 'Outubro ',
            Nov: 'Novembro ',
            Dez: 'Dezembro '
        },
        modelo: {
            innerHTML: 'Modelo de entrada de valores',
            help: 'Potência nominal total:<br><br>O cálculo é feito pela potência total nominal do conjunto de painéis<br><br>' +
                'Área total:<br><br>O cálculo é feito a determinar potência total nominal do conjunto de painéis em relação a quantos paines cabem na área total<br><br>' +
                'Quantidade painéis:<br><br>O cálculo é feito a determinar potência total nominal do conjunto de painéis em relação ao número total de painéis',
            options: [
                'Potência nominal total',
                'Área total',
                'Quantidade painéis',
            ]
        },
        energi_title: {
            innerHTML: 'Entradas sistema PV',
        },
        pot_nominal_array: {
            innerHTML: 'Potência nominal total da matriz (W/m²)',
            help: 'O valor nominal total da matriz fotovoltaica instalada em W/m²',
            disabledHelp: 'Neste modo a potência nominal total é igual:<br><br>A potência nominal de um painel vezes a quatidade de painéis',
        },
        pot_nominal_painel: {
            innerHTML: 'Potência nominal de um painel (W/m²)',
            help: 'O valor nominal total de um painel usado em W/m² (assumindo que todos painéis são iguais)',
        },
        area_painel: {
            innerHTML: 'Área de um painel (m²)',
            help: 'A área de um painel comercial em m²'
        },
        area: {
            innerHTML: 'Área total utilizada (m²)',
            help: 'A máxima área que os painéis podem cobrir'
        },
        quantidade: {
            innerHTML: 'Quantidade painéis',
            help: 'A quantidade total de painéis possível',
            disabledHelp: 'Neste modo a quantidade é igual:<br><br>A área total pela área de um painel'
        },
        perda: {
            innerHTML: 'Perdas do sistema (%)',
            help: 'As perdas no sistema que não são explicitamente modeladas, que incluem os impactos na potência final devido: sujeira, sombreamento, cobertura de neve, incompatibilidade, fiação, conexões, degradação induzida pela luz, classificação da placa de identificação, idade do sistema e disponibilidade operacional'
        },
        coef_temp: {
            innerHTML: 'Coeficiente de temperatura (%/°C)',
            help: 'A eficiência da matriz diminua a uma taxa linear em função do aumento da temperatura, governada pelo coeficiente de temperatura do painel, para maioria dos painéis este valor varia de -0,5 ate -0,1'
        },
        cc_ca: {
            innerHTML: 'Conversão CC-CA (Eficiência %)',
            help: 'O modelo proposto utiliza uma simples conversão baseada na eficiência do inversor'
        },
        superficie: {
            innerHTML: 'Superfície | Montagem do painel',
            help: 'Para calcular a temperatura de operação do painel é necessário determinar parâmetros que dependem da construção, materiais e montagem do painel<br><br>Costas livre um painel montado em um rack aberto<br><br>Costas fechada um painel montado sombre um telhado',
            options: [
                'Vidro | Costas livre',
                'Vidro | Costas fechada',
                'Polímero | Costas livre',
                'Polímero | Costas fechada'
            ],
        },
        regiao: {
            innerHTML: 'Região do Brasil',
            help: 'A região do país que deseja calcular os resultados',
            options: [
                'Centro-Oeste',
                'Nordeste',
                'Norte',
                'Sudeste',
                'Sul'
            ]
        },
        cost_title: {
            innerHTML: 'Entradas sistema financeiro',
        },
        estacao_title: {
            innerHTML: 'Entradas sistema estações de recarga veicular',
        },
        kwh: {
            innerHTML: 'Custo do kWh (R$)',
            help: 'O custo do kWh cobrado pela concessionária, utilizado para calcular o retorno financeiro da produção ou consumo de energia'
        },
        custo_painel: {
            innerHTML: 'Custo Wp painel (R$)',
            help: 'Wp Watt-pico, Valor médio de um Wp, este valor é multiplicado pela potência nominal total da matriz para calcular o custo total dos painéis'
        },
        custo_inv: {
            innerHTML: 'Custo Inversor ou Otimizador (R$)',
            help: 'Valor médio por kW produzido'
        },
        tem_estrutura: {
            innerHTML: 'Estruturas de suporte',
            help: 'Caso seja necessario adquirir estruturas para suportar os paíneis',
            options: [
                'Sem',
                'Lage/telhado',
                'Garagem',
                'Com ambas'
            ]
        },
        custo_estrutura: {
            innerHTML: 'Custo estruturas de telhado (R$)',
            help: 'Custo por unidade de estrutura'
        },
        quantidade_estrutura: {
            innerHTML: 'Quantidade estruturas de telhado (R$)',
            help: 'Quantidade de estruturas, algumas são um painel por estrutura outras são multiplas'
        },
        custo_estrutura_garagem: {
            innerHTML: 'Custo estruturas de garagem (R$)',
            help: 'Custo por unidade de estrutura'
        },
        quantidade_estrutura_garagem: {
            innerHTML: 'Quantidade estruturas de garagem (Un)',
            help: 'Quantidade de estruturas, algumas são um painel por estrutura outras são multiplas'
        },
        tem_estacao: {
            innerHTML: 'Estações de recarga VE',
            help: 'Caso o estabelecimento implatar estações de recarga',
            options: [
                'Sem',
                'Com'
            ]
        },
        days_active: {
            innerHTML: 'Dias semana estações abertas (Un)',
            help: 'A quantidade de dias que o estabelecimento funciona em uma semana'
        },
        hours_active: {
            innerHTML: 'Média de Horas estações sadas (Un)',
            help: 'A quantidade de horas em medía que as estações premanecem ativas em uso'
        },
        kwh_venda: {
            innerHTML: 'kWh venda (BRL)',
            help: 'O valor de venda do kWh cobrado pela recarga'
        },
        ultra_title: {
            innerHTML: 'Estações de recarga ultrarrápidos',
        },
        fast_title: {
            innerHTML: 'Estações de recarga rápidas',
        },
        slow_title: {
            innerHTML: 'Estações de recarga lenta',
        },
        estacao_quanti: {
            innerHTML: 'Quantidade estações (Un)',
            help: 'Quantidade estações lentas a serem instaladas'
        },
        estacao_custo: {
            innerHTML: 'Custo estações (R$)',
            help: 'Custo de uma estações.'
        },
        estacao_pot: {
            innerHTML: 'Potência média de recarga (kW)',
            help: 'A potencia média que a estação carrega, alguns veiculos podem carregar a potencias maiores outros menores usar aqui um valor médio.'
        },
        button: {
            innerHTML: 'Calcular'
        },
        result: "Resultado ",
        result_graf: "Resultado grafico sistema PV ",
        total: "total ",
        of: " de ",
        year: " ano ",
        day: "dia",
        month: "Mês",
        hour: "hora",
        pv_sys: "Resultado sistema PV",
        obs_day: "Obs.: Clique no dia para ver o resultado da produção de energia por hora",
        obs_month: 'Obs.: Clique no mês para ver o resultado da produção de energia  por dia',
        back_year: "  Voltar pro ano",
        back_month: "  Voltar pro mês de ",
        total_en: "Energia produzida total ",
        ac: "(CA)",
        ret_kwh: "Retorno produção de energia",
        ret_custo: "Custo total do sistema PV",
        ret_estacao: "Retorno estações de recarga",
        ret_estacao_custo: "Custo total estações",
        real: " (R$)",
        about: "Sobre",
        about_help: "Este é um projeto em andamento da faculdade, com o objetivo de modelar painéis fotovoltaicos, esta página é usada para mostrar os resultados do modelo, para mais informações acesse o link abaixo:",
    },
    en: {
        lang: "Language:",
        langs: [
            "🇧🇷 Portuguese",
            "🇺🇸 English"
        ],
        meses: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec"
        ],
        mesesfull: {
            Jan: 'January ',
            Feb: 'February ',
            Mar: 'March ',
            Apr: 'April ',
            May: 'May ',
            June: 'June ',
            July: 'July ',
            Aug: 'August ',
            Sept: 'September ',
            Oct: 'October ',
            Nov: 'November ',
            Dec: 'December '
        },
        modelo: {
            innerHTML: 'Input values mddell',
            options: [
                'Full rated power',
                'Total area',
                'Amount of panels',
            ],
            help: 'Total rated power:<br><br>The calculation is made by the total rated power of the set of panels<br><br>' +
                'Total area:<br><br>The calculation is done by determining the total rated power of the set of panels in relation to how many panels fit in the total area<br><br>' +
                'Amount of panels:<br><br>The calculation is made to determine the total rated power of the set of panels in relation to the total number of panels'
        },
        energi_title: {
            innerHTML: 'PV system inputs',
        },
        pot_nominal_array: {
            innerHTML: 'Total nominal power of the array (W/m²)',
            help: 'The total nominal value of the installed photovoltaic array in W/m²',
            disabledHelp: 'In this mode the total rated power is equal:<br><br>The rated power of a panel times the quantity of panels',
        },
        pot_nominal_painel: {
            innerHTML: 'Rated power of a panel (W/m²)',
            help: 'The total power rating of a panel used in W/m² (assuming all panels are equal)',
        },
        area_painel: {
            innerHTML: 'Area of a panel (m²)',
            help: 'The area of a commercial panel in m²'
        },
        area: {
            innerHTML: 'Total used area (m²)',
            help: 'The maximum area the panels can cover'
        },
        quantidade: {
            innerHTML: 'Amount of panels',
            help: 'The total number of panels possible',
            disabledHelp: 'In this mode the amount is equal:<br><br>The total area divided by tye area of a panel'
        },
        perda: {
            innerHTML: 'System Losses (%)',
            help: 'System losses that are not explicitly modeled, which  impacts the panel nominal power due to: dirt, shading, snow cover, mismatch, wiring, connections, light-induced degradation, nameplate rating, system age and operational availability'
        },
        coef_temp: {
            innerHTML: 'Temperature coefficient (%/°C)',
            help: 'The matrix efficiency decreases at a linear rate as a function of temperature increase, governed by the panel temperature coefficient, for most panels this value ranges from -0.5 to -0.1'
        },
        cc_ca: {
            innerHTML: 'CC-CA Conversion (% Efficiency)',
            help: 'The proposed model uses a simple conversion based on the inverter efficiency'
        },
        superficie: {
            innerHTML: 'Surface | Panel assembly',
            help: 'To calculate the operating temperature of the panel it is necessary to determine parameters that depend on the construction, materials and assembly of the panel<br><br>Open back a panel mounted in an open rack<br><br>Closed back a panel mounted on a roof',
            options: [
                'Glass | Open back',
                'Glass | Closed back',
                'Polymer | Open back',
                'Polymer | Closed back'
            ],
        },
        regiao: {
            innerHTML: 'Region of Brazil',
            help: 'The region of the country you want to calculate the results',
            options: [
                'Midwest',
                'North East',
                'North',
                'Southeast',
                'South'
            ]
        },
        cost_title: {
            innerHTML: 'Financial system inputs',
        },
        estacao_title: {
            innerHTML: 'Vehicle charging station system inputs',
        },
        kwh: {
            innerHTML: 'kWh cost (BRL)',
            help: 'The cost of the kWh charged by the utility company, used to calculate the financial return on energy production or consumption'
        },
        custo_painel: {
            innerHTML: 'Wp Panel Cost (BRL)',
            help: 'Wp Watt-peak, Average value of a Wp, this value is multiplied by the total nominal power of the matrix to calculate the total cost of the panels'
        },
        custo_inv: {
            innerHTML: 'Inverter or Optimizer Cost (BRL)',
            help: 'Average value per kW produced'
        },
        tem_estrutura: {
            innerHTML: 'Support structures',
            help: 'If necessary to acquire structures to support the panels',
            options: [
                'Not',
                'Lage/roof',
                'Garage',
                'Both'
            ]
        },
        custo_estrutura: {
            innerHTML: 'Cost structures for slab or roof (R$)',
            help: 'Cost per structure unit'
        },
        quantidade_estrutura: {
            innerHTML: 'Amount of structures for slab or roof (R$)',
            help: 'Number of structures, some are one panel per structure others are multiple'
        },
        custo_estrutura_garagem: {
            innerHTML: 'Cost structures for slab or roof (R$)',
            help: 'Cost per structure unit'
        },
        quantidade_estrutura_garagem: {
            innerHTML: 'Amount of structures for slab or roof (R$)',
            help: 'Number of structures, some are one panel per structure others are multiple'
        },
        tem_estacao: {
            innerHTML: 'VE charging stations',
            help: 'If the establishment implements charging stations',
            options: [
                'Without',
                'With'
            ]
        },
        days_active: {
            innerHTML: 'Week days open (Un)',
            help: 'The amount of days the establishment works in a week.'
        },
        hours_active: {
            innerHTML: 'Average Hours of stations use (Un)',
            help: 'The number of hours on average that the stations remain active in use'
        },
        kwh_venda: {
            innerHTML: 'Sale kWh (BRL)',
            help: 'The sales value of the kWh charged for the recharge'
        },
        ultra_title: {
            innerHTML: 'Ultrafast charging stations',
        },
        fast_title: {
            innerHTML: 'Fast charging stations',
        },
        slow_title: {
            innerHTML: 'Slow charging stations',
        },
        estacao_quanti: {
            innerHTML: 'Amount of stations (Un)',
            help: 'How many slow stations to install'
        },
        estacao_custo: {
            innerHTML: 'Stations cost (R$)',
            help: 'Cost of one season.'
        },
        estacao_pot: {
            innerHTML: 'Average recharge power (kW)',
            help: 'The average power that the station loads, some vehicles can load at higher power others lower, use an average value here.'
        },
        button: {
            innerHTML: 'Calculate'
        },
        result: "Result ",
        result_graf: "Graphic result PV system",
        total: "total ",
        of: " of ",
        year: " year ",
        day: "day",
        month: "Month",
        hour: "hour",
        pv_sys: "PV system result",
        obs_day: "Note: Click on the day to see the result of energy production per hour",
        obs_month: 'Note: Click on the month to see the result of energy production per day',
        back_year: "Back to the year",
        back_month: " Back to month of ",
        total_en: "Total produced energy ",
        ac: "(AC)",
        ret_kwh: "Energy production return",
        ret_custo: "Total PV system cost",
        ret_estacao: "Return charging stations",
        ret_estacao_custo: "Total cost stations",
        real: " (BRL)",
        about: "About",
        about_help: "This is an ongoing college project, with the objective of modeling photovoltaic panels, this page is used to show the model results, for more information visit the link below:",
    }
};
