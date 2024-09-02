document.getElementById('travelPlanForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const response = await fetch('/getSafetyData', {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        console.error('Failed to fetch safety data');
        return;
    }

    const safetyData = await response.json();

    const ctx = document.getElementById('safetyRatingChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(safetyData),
            datasets: [{
                label: 'Safety Rating',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                data: Object.values(safetyData),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
