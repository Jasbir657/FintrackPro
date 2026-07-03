//main conatainer
 const login = document.getElementById("login")
 const register = document.getElementById("register") 
 const formCont = document.getElementById("formContainer")
 const form = document.getElementById("tran-form") 
const body = document.body 
 const nav = document.querySelector("nav") 
const aside = document.querySelector("aside")
const chekin = document.getElementById("chekin")
const Username = document.getElementById("Username-h1")
   // buttons
const logBtn = document.getElementById("logBtn")
const regBtn = document.getElementById("regBtn")
const create = document.getElementById("create")
const Dashboard = document.getElementById("Dashboard") // login ka btn

const DashBtn = document.getElementById("Dash-btn") 
        // Dashboard ka ander ka btn 
const SettBtn = document.getElementById("Setting-btn")
         // Dashboard 
const trans = document.getElementById("transaction-btn")
          // Dashboard 
const darkbtn = document.getElementById("dark-btn") // Darkmode btn
const ctx = document.getElementById("incomeExpenseChart") 
          // Graph 
const Reset = document.getElementById("Reset")
           //Reset btn 
const checkOut = document.getElementById("check-out")
            // Checkout btn 
 const formClose = document.getElementById("form-close")
 // form ka closing btn 
const ProfileDetail = document.getElementById("Profile-Detail") 
const mainContent = document.getElementById("main-content")
const profileSave = document.getElementById("profile-save")
  // input
const profileInp = document.getElementById("Profile-input")
const balance = document.getElementById("balance") 
const income = document.getElementById("income")
const expense = document.getElementById("expense")
const transactionCount = document.getElementById("transactionCount") 
let transactions = JSON.parse(localStorage.getItem("transactions")) || []

  // inputs
const loginp = document.getElementById("login-input")
const reginp = document.getElementById("reg-input") 
    // passwords 
const logpass = document.getElementById("login-password") 
const regpass = document.getElementById("reg-password") 
const descriptionInput = document.getElementById("description");
const categoryInput = document.getElementById("category"); 
const allTransactions = document.getElementById("allTransactions");

let users = JSON.parse(localStorage.getItem("users")) || []

 // Hide login and show register when click on Register 
 regBtn.addEventListener("click", ()=>{
     login.classList.add("hidden") 
     register.classList.remove("hidden")
     })

     // Hide register and show login when click on Login 
  logBtn.addEventListener("click" , () =>{ 
      login.classList.remove("hidden")
      register.classList.add("hidden")
         })

         // Register logic 
  create.addEventListener("click" , () => { 
      if (reginp.value === "" || regpass.value === "" ) 
        { alert("Enter Username and Password")
          return }
                     
    let username = reginp.value 
    let userpassword = regpass.value 
    let newUsers = {
        username : reginp.value,
         password : regpass.value 
                    }

    let exists = users.find(user => user.username === username); 
      if (exists) { 
      alert("Username already exists"); 
                return; 
                    }

    users.push(newUsers) 
    localStorage.setItem("users", JSON.stringify(users)); 
    alert("Registered Successfully");
    reginp.value = ""
    regpass.value = "" 
                   })
    Dashboard.addEventListener("click" , ()=> {
    let username = loginp.value; 
    let password = logpass.value; 
     if (username === "" || password === "")
      { alert("Enter Username and Password"); 
        return; 
           }

    let users = JSON.parse(localStorage.getItem("users")) || []; 
    let foundUser = users.find((user) => {
    return user.username === username && user.password === password;
          })


if (foundUser) { 
    alert("Login Successful");
     login.classList.add("hidden") 
     chekin.classList.remove("hidden") 
     Username.textContent = loginp.value
      profileInp.value = loginp.value 
      loginp.value = "" 
      logpass.value = ""

      }
       else {
         alert("Invalid Username or Password"); 
        }
     })

     trans.addEventListener("click" , ()=> { 
        formCont.classList.replace("hidden" , "hidden3")
     })

     darkbtn.addEventListener("click" , ()=> { 
        if(darkbtn.textContent === "Dark Mode On") 
            { darkbtn.textContent = "Dark Mode Off" }
        
  else { darkbtn.textContent = "Dark Mode On" }
  body.classList.toggle("dark")
  nav.classList.toggle("dark")
  aside.classList.toggle("dark")
         })
const amountInput = document.getElementById("amount");
         
const typeInput = document.getElementById("type"); 
 let totalIncome = 0; 
         
 let totalExpense = 0; 
          
 const chart = new Chart(ctx,{
           
   type:"bar",
           data:{ 
            labels:["Income","Expense"],
           datasets:[{ 
          label:"Amount", 
          data:[0,0] 
                }] 
            },

 options:{ 
   responsive:true,
   maintainAspectRatio:false 
         }
});

form.addEventListener("submit", (e) => { 
 e.preventDefault(); 
 const amount = Number(amountInput.value);
 const type = typeInput.value;
if (amount <= 0) { alert("Enter a valid amount"); 
  return;
                    
    }
                 
    const transaction = {
    type: type,
    amount: amount,
    description: descriptionInput.value,
    category: categoryInput.value,
    date: document.getElementById("date").value
                 }
       
     transactions.push(transaction);
     localStorage.setItem("transactions", JSON.stringify(transactions)); 
     updateDashboard(); 

   amountInput.value = ""; 
   descriptionInput.value = "";
   categoryInput.value = "Other";
                
   document.getElementById("date").value = "";
   typeInput.value = "Expense"; 
   formCont.classList.add("hidden");
                 });

   function updateDashboard() { 
      let totalIncome = 0; 
      let totalExpense = 0;
      transactions.forEach((transaction) => { 
  if (transaction.type === "Income")
    { totalIncome += transaction.amount; 

     } else { 
       totalExpense += transaction.amount;
         } 
      });

  const currentBalance = totalIncome - totalExpense; 
   balance.textContent = `₹${currentBalance}`; 
    income.textContent = `₹${totalIncome}`; 
 expense.textContent = `₹${totalExpense}`;
  transactionCount.textContent = transactions.length;

     chart.data.datasets[0].data = [ totalIncome, totalExpense ];
       chart.update(); 
      }

 updateDashboard();
           Reset.addEventListener("click", () => { 
   transactions = []; 
 localStorage.removeItem("transactions");
  updateDashboard();
 chart.data.datasets[0].data = [0, 0];
 chart.update();
 });

   checkOut.addEventListener ("click" , ()=> {
    chekin.classList.add("hidden")
  login.classList.remove("hidden") 
 })
 formClose.addEventListener ("click" , ()=> {
  formCont.classList.add("hidden")
   })

   SettBtn.addEventListener("click", ()=> { 
   mainContent.classList.add("hidden")
  ProfileDetail.classList.remove("hidden")
       })
  DashBtn.addEventListener("click" , ()=> {
  mainContent.classList.remove("hidden")
  ProfileDetail.classList.add("hidden")
        }) 
                                                     
  profileSave.addEventListener("click" , ()=> {
  Username.textContent = profileInp.value
          })