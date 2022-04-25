(function(){
var lifetime = 80
var embodied = new Array(lifetime + 1)
var operational = new Array(lifetime+1)
var years = new Array(lifetime+1)

var embodied_total = 28 / (28 + 36)
var operational_total = 36 / (28 + 36)
var op_step = operational_total / (lifetime - 1)

for(var i = 0; i < lifetime+1; i++)
{
    embodied[i] = i == 0 ? 0 : embodied_total;
    operational[i] = i == 0 ? 0 : embodied_total + (i - 1) * op_step
    years[i] = 2020 + i;
}

var colors = palette('tol-dv', 8)
var bgColors = colors.map(v => hexToRgba(v, 0.6))

var data = {
    labels: years,
    
    datasets: [
        {
            label: 'Embodied emissions',
            data: embodied,
            borderColor: colors[5],
            backgroundColor: bgColors[5],
            pointRadius: 0,
            fill: 'origin',
        },
        {
            label: 'Operational emissions',
            data: operational,
            borderColor: colors[7],
            backgroundColor: bgColors[7],
            pointRadius: 0,
            fill: 'origin'
        }
    ]
}

var options = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x:{
                
            },
            y: {
                ticks: {
                    callback: () => ''
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: ''
            },
            legend: {
                onClick: null
            }
        }
    }
}

var ctx = document.getElementById('stacked-chart2').getContext('2d');
var chart = new Chart(ctx, options)
chart.render()
})();