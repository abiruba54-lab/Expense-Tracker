let transactions = [];

function addTransaction() {

    let text = document.getElementById("text").value;
    let amount = Number(document.getElementById("amount").value);

    if (text === "" || amount === 0) {
        alert("Please enter valid details");
        return;
    }

    let transaction = {
        id: Date.now(),
        text: text,
        amount: amount
    };

    transactions.push(transaction);

    updateUI();

    document.getElementById("text").value = "";
    document.getElementById("amount").value = "";
}

function updateUI() {

    let list = document.getElementById("list");
    list.innerHTML = "";

    let balance = 0;
    let income = 0;
    let expense = 0;

    transactions.forEach(function(transaction) {

        balance += transaction.amount;

        if (transaction.amount > 0) {
            income += transaction.amount;
        } else {
            expense += Math.abs(transaction.amount);
        }

        let li = document.createElement("li");

        li.innerHTML =
            transaction.text +
            " : ₹" +
            transaction.amount +
            ' <button onclick="deleteTransaction(' +
            transaction.id +
            ')">Delete</button>';

        list.appendChild(li);
    });

    document.getElementById("balance").innerText = balance;
    document.getElementById("income").innerText = "₹" + income;
    document.getElementById("expense").innerText = "₹" + expense;
}

function deleteTransaction(id) {

    transactions = transactions.filter(function(transaction) {
        return transaction.id !== id;
    });

    updateUI();
}