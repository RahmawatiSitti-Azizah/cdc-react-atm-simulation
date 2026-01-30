class Account{
    constructor(accountNo, accountHolderName, pin, balance) {
    this.accountNo = accountNo;
    this.accountHolderName = accountHolderName;
    this.pin = pin;
    this.balance = balance;
  }
}
let accountList = [new Account(11223344, "Rahmawati", 123123, 1000), new Account(11223355, "John Doe", 123123, 500)]
const btnWithdraw = document.getElementById("btn-withdraw")
const btnDeposit = document.getElementById("btn-deposit")
const btnCheckBalance = document.getElementById("btn-check-balance")
const inputAccount = document.getElementById("input-account")
const inputPin = document.getElementById("input-pin")
const inputAmount = document.getElementById("input-amount")
const labelError = document.getElementById("text-error")
const displayBox = document.getElementById("display-box")

function getAccountInfo(){
    return accountList.find(acc => acc.accountNo == inputAccount.value && acc.pin == inputPin.value)
}

async function searchAccount () {
    return new Promise((resolve, reject) => {
        var account = getAccountInfo()
        console.log(account)
        if (account){
            setTimeout(()=>
                resolve(account)
            ,3000)
        }else{
            console.log("in reject search account")
            reject("account not found please check again account number/pin");
        }
    })
}

async function menu(transaction){
    try{
        let result = await searchAccount();
        console.log("in menu log")
        transaction(result)
        .then((result) => {
            displayInfo(result,'Transaction Success!')
        }).catch((error) => {
            labelError.textContent = error
        })
    }catch(error){
        labelError.textContent = error
    }
    
}

let withdraw = async (result) => {
    return new Promise((resolve,reject)=>{
        var amount = parseInt(inputAmount.value)
        if(!isNaN(amount)){
            if(amount>result.balance){
                reject("amount exceeding balance")
            }else{
                result.balance -= amount
                resolve(result)
            }
        }else{
            reject("amount should a number")
        }
    })
}

let deposit = async (result) => {
    return new Promise((resolve,reject)=>{
        var amount = parseInt(inputAmount.value)
        if(!isNaN(amount)){
            result.balance += amount
            resolve(result)
        }else{
            reject("amount should a number")
        }
    })
}

function displayInfo({accountNo, accountHolderName, balance}, header){
    displayBox.innerHTML = `
    <h3>${header}</h3>
    <p>
        Account holder name = ${accountHolderName} <br> 
        Account number = ${accountNo}<br>
        Balance = ${balance}<br>
    </p>`;
}

let verifyCommon = (event) =>{
    let id = event.target.id
    const value = event.target.value
    const length = value.length
    if(id==="input-account"){
        if(!value){
            labelError.textContent = "account should have value"
        }else if(length != 8){
            labelError.textContent = "account length should 8"
        }else if(isNaN(parseInt(value))){
            labelError.textContent = "account should be digit only"
        }else if(parseInt(value)<1){
            labelError.textContent = "invalid value account"
        }else{
            labelError.textContent = ""
        }
    }else if(id==="input-pin"){
         if(!value){
            labelError.textContent = "pin should have value"
        }else if(length != 6){
            labelError.textContent = "pin length should 6"
        }else{
            labelError.textContent = ""
        }
    }else if(id === "input-amount"){
        if(!value){
            labelError.textContent = "amount should have value"
        }else if(isNaN(parseInt(value))){
            labelError.textContent = "amount should be digit only"
        }else if(parseInt(value)<1){
            labelError.textContent = "invalid value amount value : should be more than 0"
        }else{
            labelError.textContent = ""
        }
    }
}

btnCheckBalance.addEventListener('click', 
    () => searchAccount()
    .then((result) => {
       displayInfo(result, 'Current balance info!')
    })
    .catch((error)=> {
        labelError.textContent = error
    })
)

btnWithdraw.addEventListener('click', () => menu(withdraw))
btnDeposit.addEventListener('click', () => menu(deposit))
inputAccount.addEventListener('change',verifyCommon)
inputAmount.addEventListener('change', verifyCommon)
inputPin.addEventListener('change', verifyCommon)