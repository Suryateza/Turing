document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const checkinDate = new Date(document.getElementById('checkin').value);
    const checkoutDate = new Date(document.getElementById('checkout').value);
    const roomType = document.getElementById('room').value;

    // Validate dates
    if (checkoutDate <= checkinDate) {
        alert('Check-out date must be after check-in date.');
        return;
    }

    // Calculate cost
    const nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
    const rates = { 'standard': 100, 'deluxe': 150, 'suite': 200 };
    const totalCost = nights * rates[roomType];

    document.getElementById('totalCost').innerText = `Total Cost: $${totalCost}`;
});

document.getElementById('likeRoomBtn').addEventListener('click', function() {
    const roomType = document.getElementById('room').value;
    const savedRoomsList = document.getElementById('savedRoomsList');
    const li = document.createElement('li');
    li.textContent = roomType.charAt(0).toUpperCase() + roomType.slice(1) + ' Room';
    savedRoomsList.appendChild(li);
});

document.getElementById('likeFoodBtn').addEventListener('click', function() {
    const foodType = document.getElementById('food').value;
    const savedFoodList = document.getElementById('savedFoodList');
    const li = document.createElement('li');
    li.textContent = foodType.charAt(0).toUpperCase() + foodType.slice(1);
    savedFoodList.appendChild(li);
});
