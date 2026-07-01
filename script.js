

const login = document.getElementById("login")
const register = document.getElementById("register")
const formCont = document.getElementById("formContainer")
const form = document.getElementById("tran-form")
const body = document.body
const nav = document.querySelector("nav")
const aside = document.querySelector("aside")
const chekin = document.getElementById("chekin")
const Username = document.getElementById("Username-h1")

const logBtn = document.getElementById("logBtn")
const regBtn = document.getElementById("regBtn")
const create = document.getElementById("create")
const Dashboard = document.getElementById("Dashboard")

const DashBtn = document.getElementById("Dash-btn")
const SettBtn = document.getElementById("Setting-btn")
const trans = document.getElementById("transaction-btn")
const darkbtn = document.getElementById("dark-btn")
const Reset = document.getElementById("Reset")
const checkOut = document.getElementById("check-out")
const formClose = document.getElementById("form-close")

const ProfileDetail = document.getElementById("Profile-Detail")
const mainContent = document.getElementById("main-content")
const profileSave = document.getElementById("profile-save")

const profileInp = document.getElementById("Profile-input")

const loginp = document.getElementById("login-input")
const logpass = document.getElementById("login-password")

const reginp = document.getElementById("reg-input")
const regpass = document.getElementById("reg-password")

const amountInput = document.getElementById("amount")
const typeInput = document.getElementById("type")
const descriptionInput = document.getElementById("description")
const categoryInput = document.getElementById("category")
const dateInput = document.getElementById("date")

const allTransactions = document.getElementById("allTransactions")

const balance = document.getElementById("balance")
const income = document.getElementById("income")
const expense = document.getElementById("expense")
const transactionCount = document.getElementById("transactionCount")


let transactions = JSON.parse(localStorage.getItem("transactions")) || []
let users = JSON.parse(localStorage.getItem("users")) || []


regBtn.addEventListener("click", () => {
    login.classList.add("hidden")
    register.classList.remove("hidden")
})

logBtn.addEventListener("click", () => {
    login.classList.remove("hidden")
    register.classList.add("hidden")
})

create.addEventListener("click", () => {

    if (reginp.value === "" || regpass.value === "") {
        alert("Enter Username and Password")
        return
    }

    let exists = users.find(u => u.username === reginp.value)

    if (exists) {
        alert("Username already exists")
        return
    }

    users.push({
        username: reginp.value,
        password: regpass.value
    })

    localStorage.setItem("users", JSON.stringify(users))

    alert("Registered Successfully")

    reginp.value = ""
    regpass.value = ""
})

Dashboard.addEventListener("click", () => {

    let user = users.find(u =>
        u.username === loginp.value &&
        u.password === logpass.value
    )

    if (!user) {
        alert("Invalid login")
        return
    }

    login.classList.add("hidden")
    chekin.classList.remove("hidden")

    Username.textContent = user.username
    profileInp.value = user.username

    loginp.value = ""
    logpass.value = ""

    updateDashboard()
    showTransactions()
})


darkbtn.addEventListener("click", () => {
    body.classList.toggle("dark")
    nav.classList.toggle("dark")
    aside.classList.toggle("dark")
})

const chart = new Chart(document.getElementById("incomeExpenseChart"), {
    type: "bar",
    data: {
        labels: ["Income", "Expense"],
        datasets: [{
            label: "Amount",
            data: [0, 0]
        }]
    }
})


form.addEventListener("submit", (e) => {
    e.preventDefault()

    const transaction = {
        type: typeInput.value,
        description: descriptionInput.value,
        category: categoryInput.value,
        amount: Number(amountInput.value),
        date: dateInput.value
    }

    transactions.push(transaction)

    localStorage.setItem("transactions", JSON.stringify(transactions))

    form.reset()
    formCont.classList.add("hidden")

    updateDashboard()
    showTransactions()
})


function showTransactions() {

    allTransactions.querySelectorAll(".transaction-row").forEach(e => e.remove())

    transactions.forEach((t, i) => {

        const row = document.createElement("div")
        row.classList.add("transaction-row")

        row.innerHTML = `
            <p>${t.date}</p>
            <p>${t.description}</p>
            <p>${t.category}</p>
            <p>${t.type === "Income" ? "+" : "-"}₹${t.amount}</p>
        `

        const btn = document.createElement("button")
        btn.textContent = "Delete"

        btn.addEventListener("click", () => {
            deleteTransaction(i)
        })

        row.appendChild(btn)
        allTransactions.appendChild(row)
    })
}

// ================= DELETE =================

function deleteTransaction(index) {

    transactions.splice(index, 1)

    localStorage.setItem("transactions", JSON.stringify(transactions))

    updateDashboard()
    showTransactions()
}


function updateDashboard() {

    let incomeTotal = 0
    let expenseTotal = 0

    transactions.forEach(t => {
        if (t.type === "Income") incomeTotal += t.amount
        else expenseTotal += t.amount
    })

    balance.textContent = `₹${incomeTotal - expenseTotal}`
    income.textContent = `₹${incomeTotal}`
    expense.textContent = `₹${expenseTotal}`
    transactionCount.textContent = transactions.length

    chart.data.datasets[0].data = [incomeTotal, expenseTotal]
    chart.update()
}


Reset.addEventListener("click", () => {
    transactions = []
    localStorage.removeItem("transactions")

    updateDashboard()
    showTransactions()

    chart.data.datasets[0].data = [0, 0]
    chart.update()
})


trans.addEventListener("click", () => {
    formCont.classList.remove("hidden")
})

formClose.addEventListener("click", () => {
    formCont.classList.add("hidden")
})

checkOut.addEventListener("click", () => {
    chekin.classList.add("hidden")
    login.classList.remove("hidden")
})

SettBtn.addEventListener("click", () => {
    mainContent.classList.add("hidden")
    ProfileDetail.classList.remove("hidden")
})

DashBtn.addEventListener("click", () => {
    mainContent.classList.remove("hidden")
    ProfileDetail.classList.add("hidden")
})

profileSave.addEventListener("click", () => {
    Username.textContent = profileInp.value
})

// ================= INIT =================

updateDashboard()
showTransactions()