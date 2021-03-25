// Units in Gt
// steel = 1.87
// concrete = 17.5
// wood = 3
// asphalt = 0.1
// glass = 0.2
// cement = 4.1
var labels = ['Asphalt', 'Glass', 'Steel', 'Wood', 'Cement', 'Concrete']
var values = [0.1, 0.2, 1.87, 3, 4.1, 17.5]
var colors = palette('tol', 6)

var data = {
    labels: labels,
    datasets: [
        {
            label: 'Global production (Gt/yr)',
            backgroundColor: colors,
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