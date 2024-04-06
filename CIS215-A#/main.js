function submitTransaction() {
    const amount = document.getElementById('amount').value;
    const type = document.getElementById('type').value;

    const date = new Date().toISOString().split('T')[0];

    // Send a POST request to the backend API endpoint
    fetch('/api/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date, amount, type }) // Send transaction data as JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to submit transaction'); // Throw error if response is not OK
        }
        return response.json(); // Parse response JSON
    })
    .then(data => {
        console.log('Transaction submitted successfully:', data);
        // After successful submission, refresh the transaction list
        renderTransactions();
    })
    .catch(error => {
        console.error('Error submitting transaction:', error.message);
    });
}


function renderTransactions() {
    // Fetch transactions from the backend
    fetch('/api/transactions')
    .then(response => response.json())
    .then(transactions => {
        // Get reference to the table body
        const tableBody = document.querySelector('#transactionTable tbody');
        // Clear existing rows
        tableBody.innerHTML = '';

        // Iterate over transactions and append rows to the table
        transactions.forEach(transaction => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transaction.id}</td>
                <td>${transaction.date}</td>
                <td>${transaction.amount}</td>
                <td>${transaction.type}</td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching transactions:', error.message);
    });
}

// Initial rendering of transactions
renderTransactions();
