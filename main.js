document.addEventListener('DOMContentLoaded', () => {
    const medicines = {
        paracetamol: { name: "Paracetamol", unitPrice: 500 / 100 },
        ibuprofen: { name: "Ibuprofen", unitPrice: 800 / 100 },
        aspirin: { name: "Aspirin", unitPrice: 350 / 100 },
        paracodin: { name: "Paracodin", unitPrice: 220 / 50 },
        tramadol: { name: "Tramadol", unitPrice: 145 / 100 },
        codeine: { name: "Codeine", unitPrice: 115 },
        amoxicillin: { name: "Amoxicillin", unitPrice: 530 / 500 },
        penicillin: { name: "Penicillin", unitPrice: 155 / 25 },
        ciprofloxacin: { name: "Ciprofloxacin", unitPrice: 380 / 150 },
        doxycycline: { name: "Doxycycline", unitPrice: 265 / 100 },
        cephalexin: { name: "Cephalexin", unitPrice: 150 / 50 },
        clindamycin: { name: "Clindamyacin", unitPrice: 180 / 100 },
        sertraline: { name: "Sertraline", unitPrice: 50 / 20 },
        fluoxetine: { name: "Fluoxetine", unitPrice: 140 / 100 },
        citalopram: { name: "Citalopram", unitPrice: 120 / 50 },
        escitalopram: { name: "Escitalopram", unitPrice: 120 / 50 },
        paroxetine: { name: "Paroxetine", unitPrice: 140 / 20 },
        duloxetine: { name: "Duloxetine", unitPrice: 210 / 150 },
        cetirizine: { name: "Cetirizine", unitPrice: 240 },
        loratadine: { name: "Loratadine", unitPrice: 650 / 10 },
        fexofenadine: { name: "Fexofenadine", unitPrice: 21.47 / 120 },
        desloratadine: { name: "Desloratadine", unitPrice: 10 / 5 },
        lisinopril: { name: "Lisinopril", unitPrice: 16.10 / 5 },
        amlodipine: { name: "Amlodipine", unitPrice: 150 / 100 },
        atenolol: { name: "Atenolol", unitPrice: 6 / 50 },
        metoprolol: { name: "Metoprolol", unitPrice: 847 / 50 },
        losartan: { name: "Losartan", unitPrice: 20.43 / 50 },
        verapamil: { name: "Verapamil", unitPrice: 63.13 / 240 },
    };

    const orderTableBody = document.getElementById('order-summary-body');
    const grandTotalElem = document.getElementById('grand-total');
    const addFavouriteBtn = document.querySelector('.favourite');
    const applyFavouriteBtn = document.querySelector('.apply-favourite');
    const buyNowBtn = document.querySelector('.buy-now');

    const updateOrderTable = () => {
        orderTableBody.innerHTML = '';
        let grandTotal = 0;

        document.querySelectorAll('.quantity').forEach((input) => {
            const id = input.id;
            const quantity = parseFloat(input.value) || 0;
            if (quantity > 0) {
                const medicine = medicines[id] || {
                    name: input.closest('.medicine').querySelector('label').textContent,
                    unitPrice: parseFloat(input.dataset.unitPrice),
                };
                const price = quantity * medicine.unitPrice;
                grandTotal += price;

                const row = `
                    <tr>
                        <td>${medicine.name}</td>
                        <td>${quantity} mg</td>
                        <td>Rs. ${medicine.unitPrice.toFixed(2)}</td>
                        <td>Rs. ${price.toFixed(2)}</td>
                    </tr>`;
                orderTableBody.insertAdjacentHTML('beforeend', row);
            }
        });

        grandTotalElem.textContent = `Total: Rs. ${grandTotal.toFixed(2)}`;
    };
    // Save favourites
    addFavouriteBtn.addEventListener('click', () => {
        const favourites = [];
        document.querySelectorAll('.quantity').forEach((input) => {
            const quantity = parseFloat(input.value) || 0;
            if (quantity > 0) {
                favourites.push({ id: input.id, quantity });
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
    // Navigate to checkout
    buyNowBtn.addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });
    // table updates
    document.querySelectorAll('.quantity').forEach((input) => {
        input.dataset.unitPrice = medicines[input.id]?.unitPrice || 0;
        input.addEventListener('input', updateOrderTable);
    });
});
