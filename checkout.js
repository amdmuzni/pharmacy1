document.addEventListener('DOMContentLoaded', () => {
    const resetButton = document.querySelector('input[type="reset"]');
    const submitButton = document.querySelector('input[type="submit"]');

    // Handle form reset
    resetButton.addEventListener('click', () => {
        document.querySelector('form').reset();
    });

    // Handle form submission
    submitButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default form submission
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 3);
        alert(`Your order has been placed successfully. Your order will be delivered on ${deliveryDate.toDateString()}.`);
    });
});
