(function(){
const colors = palette('tol-dv', 8)
const bgColors = colors.map(v => hexToRgba(v, 0.6))

const data = {
    labels: ['Embodied', 'Operational'],
    datasets: [{
        data: [28, 72],
        backgroundColor: [bgColors[5], bgColors[7]],
        borderColor: [colors[5], colors[7]]
    }]
}

const options = {
    type: 'pie',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false,
    }
};

const ctx = document.getElementById('pie-chart').getContext('2d');
const chart = new Chart(ctx, options)
chart.render();
})();