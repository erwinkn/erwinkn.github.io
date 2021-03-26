// Units in Gt
// steel = 1.87
// concrete = 17.5
// wood = 3
// asphalt = 0.1
// glass = 0.2
// cement = 4.1
var labels = ['Asphalt', 'Glass', 'Steel', 'Wood', 'Cement', 'Concrete']
var values = [0.1, 0.2, 1.87, 3, 4.1, 17.5]
// See https://google.github.io/palette.js/
var opacity = 0.6
var colors = palette('tol', 8)
var bgColors = colors.map(v => hexToRgba(v, opacity))
var colorIdx = [4, 2, 0, 3, 6, 7]

var data = {
    labels: labels,
    datasets: [
        {
            label: 'Global production (Gt/yr)',
            backgroundColor: colorIdx.map(i => bgColors[i]),
            borderColor: colorIdx.map(i => colors[i]),
            borderWidth: 2,
            data: values
        }
    ]
}

var indexAxis = window.innerWidth > 680 ? 'y' : 'x';
var displayXAxisLabel = window.innerWidth > 680 ? true : false;

var options = {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: indexAxis,
        scales: {
            x: {
                title: {
                    display: displayXAxisLabel,
                    text: '(Gt / an)',
                    align: 'end'
                }
            }
        },
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Global production of common materials (2019, estimated)'
            },
            tooltip: {
                enabled: true,
                displayColors: false,

            }
        }
    }
}