document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');

    expenseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const description = document.getElementById('description').value;
        const amount = document.getElementById('amount').value;

        try {
            const response = await fetch('/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ description, amount })
            });

            if (!response.ok) {
                throw new Error('Failed to add expense');
            }

            const expense = await response.json();
            appendExpenseToList(expense);
            expenseForm.reset();
        } catch (err) {
            console.error('Error:', err);
        }
    });

    async function fetchExpenses() {
        try {
            const response = await fetch('/expenses');
            const expenses = await response.json();
            expenses.forEach(expense => appendExpenseToList(expense));
        } catch (err) {
            console.error('Error:', err);
        }
    }

    function appendExpenseToList(expense) {
        const li = document.createElement('li');
        li.textContent = `${expense.description}: $${expense.amount}`;
        expenseList.appendChild(li);
    }

    fetchExpenses();
});
