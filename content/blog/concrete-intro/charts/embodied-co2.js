// Embodied CO2, from the statistical data in the Embodied Carbon database
var clay = {min: 0.179, q1:0.229, median: 0.243, q3: 0.296, max: 0.354};
var cement = {min: 0.278, q1: 0.661, median: 0.73, q3: 0.803, max: 0.912};
var concrete = {min: 0.047, q1: 0.081, median:0.106, q3:0.139, max:0.149};
var timber_nocc = {min: 0.263, q1:0.409, median:0.493, q3:0.693, max:0.856};
var timber_withcc = [-1.292, -1.162, -1.047, -0.844, -0.580];

// See https://google.github.io/palette.js/
var opacity = 0.6
var colors = palette('tol', 8)
var bgColors = colors.map(v => hexToRgba(v, opacity))
var colorIdx = [4, 7, 3, 6]

var data = {
    // define label tree
    labels: ['Clay', 'Concrete', 'Timber', 'Cement'],
    datasets: [
        {
            backgroundColor: colorIdx.map(i => bgColors[i]),
            borderColor: colorIdx.map(i => colors[i]),
            borderWidth: 2,
            itemRadius: 0,
            data: [clay, concrete, timber_nocc, cement]
        },
    ],
};

var indexAxis = window.innerWidth > 680 ? 'y' : 'x';
var displayXAxisLabel = window.innerWidth > 680 ? true : false;

var options = {
    type: 'boxplot',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: indexAxis,
        // Allows the whisker to extend all the way to min & max
        coef: 0,
        scales: {
            x: {
                title: {
                    display: displayXAxisLabel,
                    text: '(kgCO2e / kg)',
                    align: 'end'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Embodied emissions of common construction materials (kgCO2e / kg)',
            },
            tooltip: {
                enabled: true,
                displayColors: false,
                callbacks: {
                    label: function(context) {
                        var text = [`Average: ${context.raw.median} kgCO2e/kg`,
                                    `Normal range: ${context.raw.q1}-${context.raw.q3}`,
                                    `Extremes: ${context.raw.min}-${context.raw.max}`]
                        return text;
                    }
                }
            }
        },
    }
};