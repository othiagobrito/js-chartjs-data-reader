const data = {
    datasets: [
        {
            label: 'Data',
            data: [],
        },
    ],
};

const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        x: {
            grid: {
                offset: false,
            },
        },
        y: {
          beginAtZero: true,
        },
      },
    },
};

const element = document.getElementById('chart');
const chart = new Chart(
    element,
    config,
);  

const input = document.getElementById('file');
input.addEventListener('input', event => {
    event.preventDefault();

    const file = input.files[0];

    if (! file) {
        console.log('no file');
        return;
    }
    
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    reader.onload = function (event) {
        const data = JSON.parse(event.target.result);

        chart.data.datasets[0].data = Object.values(data);
        chart.data.labels = Object.keys(data);
        chart.update();
    }

    reader.onerror = function (event) {
        console.error(event);
    }
});
