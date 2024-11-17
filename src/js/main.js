const config = {
    type: 'bar',
    data: {},
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
input.addEventListener('change', event => {
    event.preventDefault();
    const length = input.files.length;
    
    if (length < 1) {
        console.warn('no file');
        return;
    }
    
    chart.data.datasets = [];
    
    const lastIndex = length - 1;
    Object.keys(input.files).forEach(index => {        
        const file = input.files[index];

        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
    
        reader.onload = function (event) {
            const data = JSON.parse(event.target.result);

            chart.data.datasets.push({
                label: file.name,
                data: Object.values(data),
            });

            chart.data.labels = Object.keys(data);
            if ( index == lastIndex ) chart.update();
        }
        
        reader.onerror = function (event) {
            console.error(event);
        }
    });
});
