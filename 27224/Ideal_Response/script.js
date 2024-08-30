$(document).ready(function() {
    // Dummy data for social media analytics
    const analyticsData = {
        labels: [
            moment().subtract(6, 'days').format('MMM D'),
            moment().subtract(5, 'days').format('MMM D'),
            moment().subtract(4, 'days').format('MMM D'),
            moment().subtract(3, 'days').format('MMM D'),
            moment().subtract(2, 'days').format('MMM D'),
            moment().subtract(1, 'days').format('MMM D'),
            moment().format('MMM D')
        ],
        datasets: [
            {
                label: 'Twitter Engagements',
                data: [120, 150, 170, 200, 180, 160, 190],
                backgroundColor: 'rgba(29, 161, 242, 0.2)',
                borderColor: 'rgba(29, 161, 242, 1)',
                borderWidth: 1
            },
            {
                label: 'Facebook Engagements',
                data: [100, 130, 140, 160, 170, 155, 165],
                backgroundColor: 'rgba(59, 89, 152, 0.2)',
                borderColor: 'rgba(59, 89, 152, 1)',
                borderWidth: 1
            },
            {
                label: 'Instagram Engagements',
                data: [150, 160, 180, 220, 210, 190, 230],
                backgroundColor: 'rgba(225, 48, 108, 0.2)',
                borderColor: 'rgba(225, 48, 108, 1)',
                borderWidth: 1
            }
        ]
    };

    // Create the chart
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: analyticsData,
        options: {
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
