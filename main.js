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
const inputAccount = document.getElementById("input-account")
const inputPin = document.getElementById("input-pin")
const inputAmount = document.getElementById("input-amount")
const labelError = document.getElementById("text-error")
const displayBox = document.getElementById("display-box")

function getAccountInfo(){
    return accountList.find(acc => acc.accountNo == inputAccount.value && acc.pin == inputPin.value)
}

function searchAccount () {
    console.log("inside search account")
    return new Promise((resolve, reject) => {
        var account = getAccountInfo()
        console.log(account)
        if (account){
            resolve(account)
        }else{
            reject("account not found please check again account number/pin");
        }
    })
}

function withdraw() {
    searchAccount()
    .then((result)=>{
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
    })
    .then((result) => {
       displayInfo(result)
    })
    .catch((error)=> {
        labelError.textContent = error
    })
}

function deposit() {
    searchAccount()
    .then((result)=>{
        return new Promise((resolve,reject)=>{
            var amount = parseInt(inputAmount.value)
            if(!isNaN(amount)){
                result.balance += amount
                resolve(result)
            }else{
                reject("amount should a number")
            }
        })
    })
    .then((result) => {
       displayInfo(result)
    })
    .catch((error)=> {
        labelError.textContent = error
    })
}

function clearInput(){
    inputAccount.value = ''
    inputAmount.value = ''
    inputPin.value = ''
}

function displayInfo({accountNo, accountHolderName, balance}){
    displayBox.innerHTML = `
    <h3>Transaction Success!</h3>
    <p>
        Account holder name = ${accountHolderName} <br> 
        Account number = ${accountNo}<br>
        Balance = ${balance}<br>
    </p>`
    clearInput();
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

btnWithdraw.addEventListener('click', withdraw)
btnDeposit.addEventListener('click', deposit)
inputAccount.addEventListener('change',verifyCommon)
inputAmount.addEventListener('change', verifyCommon)
inputPin.addEventListener('change', verifyCommon)