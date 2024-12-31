document.addEventListener('DOMContentLoaded', () => {
    const medicines = {
        paracetamol: { name: "Paracetamol", unitPrice: 500 / 100 }, // Price per mg
        ibuprofen: { name: "Ibuprofen", unitPrice: 800 / 100 },
        aspirin: { name: "Aspirin", unitPrice: 350 / 100 },
        paracodin: { name: "Paracodin", unitPrice: 220 / 50 },
        tramadol: { name: "Tramadol", unitPrice: 145 / 100 },
        codeine: { name: "Codeine", unitPrice: 115 }, // Price per card
        amoxicillin: { name: "Amoxicillin", unitPrice: 530 / 500 },
        penicillin: { name: "Penicillin", unitPrice: 155 / 25 },
        ciprofloxacin: { name: "Ciprofloxacin", unitPrice: 380 / 150 },
        doxycycline: { name: "Doxycycline", unitPrice: 265 / 100 },
        cephalexin: { name: "Cephalexin", unitPrice: 150 / 50 },
        clindamyacin: { name: "Clindamyacin", unitPrice: 180 / 100 },
    };
    const orderTableBody = document.getElementById('order-summary-body'); // Updated ID
    const grandTotalElem = document.getElementById('grand-total');
    const addFavouriteBtn = document.querySelector('.favourite');
    const applyFavouriteBtn = document.querySelector('.apply-favourite');
    const buyNowBtn = document.querySelector('.buy-now');

    // Update the order table dynamically
    const updateOrderTable = () => {
        orderTableBody.innerHTML = '';
        let grandTotal = 0;

        Object.keys(medicines).forEach((id) => {
            const quantity = parseFloat(document.getElementById(id).value) || 0;
            if (quantity > 0) {
                const price = (quantity * medicines[id].unitPrice).toFixed(2);
                const total = parseFloat(price);
                grandTotal += total;

                const row = `
                    <tr>
                        <td>${medicines[id].name}</td>
                        <td>${quantity} mg</td>
                        <td>Rs. ${medicines[id].unitPrice.toFixed(2)}</td>
                        <td>Rs. ${total.toFixed(2)}</td>
                    </tr>`;
                orderTableBody.insertAdjacentHTML('beforeend', row);
            }
        });

        grandTotalElem.textContent = `Total: Rs. ${grandTotal.toFixed(2)}`;
    };

    // Save favourites
    addFavouriteBtn.addEventListener('click', () => {
        const favourites = [];
        Object.keys(medicines).forEach((id) => {
            const quantity = parseFloat(document.getElementById(id).value) || 0;
            if (quantity > 0) {
                favourites.push({ id, quantity });
            }
        });
        localStorage.setItem('favourites', JSON.stringify(favourites));
        alert('Products added to favourites successfully!');
    });

    // Apply favourites
    applyFavouriteBtn.addEventListener('click', () => {
        const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        if (favourites.length === 0) {
            alert('No favourites found.');
            return;
        }

        favourites.forEach(({ id, quantity }) => {
            const inputElem = document.getElementById(id);
            if (inputElem) {
                inputElem.value = quantity;
            }
        });

        updateOrderTable();
    });

    // Navigate to checkout and handle payment
    buyNowBtn.addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });

    // Attach event listeners to input fields for dynamic table updates
    document.querySelectorAll('.quantity').forEach((input) => {
        input.addEventListener('input', updateOrderTable);
    });
});