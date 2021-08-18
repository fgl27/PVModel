const Lang = {
    pt: {
        lang: "Lingua:",
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
            ],
            setValues: [
                'Neste modo a potência nominal total é igual:<br><br>A potência nominal de um painel vezes a quatidade de painéis',
                'Neste modo a quantidade é igual:<br><br>A área total pela área de um painel'
            ]
        },
        pot_nominal_array: {
            innerHTML: 'Potência nominal total da matriz (W/m²)',
            help: 'O valor nominal total da matriz fotovoltaica instalada em W/m²',
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
            help: 'A quantidade total de painéis possível'
        },
        perda: {
            innerHTML: 'Perdas do sistema (%)',
            help: 'As perdas no sistema que não são explicitamente modeladas, que incluem os impactos na potência final devido: sujeira, sombreamento, cobertura de neve, incompatibilidade, fiação, conexões, degradação induzida pela luz, classificação da placa de identificação, idade do sistema e disponibilidade operacional'
        },
        coef_temp: {
            innerHTML: 'Coeficiente de temperatura de potência (%/°C)',
            help: 'A eficiência da matriz diminua a uma taxa linear em função do aumento da temperatura, governada pelo coeficiente de temperatura do painel, para maioria dos painéis este valor varia de -0,5 ate 0,1'
        },
        cc_ca: {
            innerHTML: 'Conversão CC-CA (Eficiencia %)',
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
        button: {
            innerHTML: 'Calcular'
        },
        result: "Resultado ",
        of: " de ",
        year: " ano ",
        day: "dia",
        month: "Mês",
        hour: "hora",
        obs_day: "Obs.: Clique no dia para ver o resultado por hora",
        obs_month: 'Obs.: Clique no mês para ver o resultado por dia',
        back_year: "  Voltar pro ano",
        back_month: "  Voltar pro mês de ",
        total: ": Energia produzida total ",
        ac: "(CA)",
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
            Jan: 'January',
            Feb: 'February',
            Mar: 'March',
            Apr: 'April',
            May: 'May',
            June: 'June',
            July: 'July',
            Aug: 'August',
            Sept: 'September',
            Oct: 'October',
            Nov: 'November',
            Dec: 'December'
        },
        modelo: {
            innerHTML: 'Input values mddell',
            options: [
                'Full rated power',
                'Total area',
                'Amount of panels',
            ],
            setValues: [
                'In this mode the total rated power is equal:<br><br>The rated power of a panel times the quantity of panels',
                'In this mode the amount is equal:<br><br>The total area divided by tye area of a panel'
            ],
            help: 'Total rated power:<br><br>The calculation is made by the total rated power of the set of panels<br><br>' +
                'Total area:<br><br>The calculation is done by determining the total rated power of the set of panels in relation to how many panels fit in the total area<br><br>' +
                'Amount of panels:<br><br>The calculation is made to determine the total rated power of the set of panels in relation to the total number of panels'
        },
        pot_nominal_array: {
            innerHTML: 'Total nominal power of the array (W/m²)',
            help: 'The total nominal value of the installed photovoltaic array in W/m²',
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
            help: 'The total number of panels possible'
        },
        perda: {
            innerHTML: 'System Losses (%)',
            help: 'System losses that are not explicitly modeled, which  impacts the panel nominal power due to: dirt, shading, snow cover, mismatch, wiring, connections, light-induced degradation, nameplate rating, system age and operational availability'
        },
        coef_temp: {
            innerHTML: 'Power temperature coefficient (%/°C)',
            help: 'The matrix efficiency decreases at a linear rate as a function of temperature increase, governed by the panel temperature coefficient, for most panels this value ranges from -0.5 to 0.1'
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
        button: {
            innerHTML: 'Calculate'
        },
        result: "Result ",
        of: " of ",
        year: " year ",
        day: "day",
        month: "Month",
        hour: "hour",
        obs_day: "Note: Click on the day to see the hourly result",
        obs_month: 'Note: Click on the month to see the result by day',
        back_year: "Back to the year",
        back_month: " Back to month of ",
        total: ": Total produced energy ",
        ac: "(AC)",
        about: "About",
        about_help: "This is an ongoing college project, with the objective of modeling photovoltaic panels, this page is used to show the model results, for more information visit the link below:",
    }
};
