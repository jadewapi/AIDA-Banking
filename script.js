'use strict';

const loginArrow = document.querySelector('.loginArrow');
const userName = document.querySelector('.userName');
const pin = document.querySelector('.pin');
const displayTransactions = document.querySelector('.displayTransactions');
const accountName = document.querySelector('.accountName');
const sort = document.querySelector('.sort');
const transferArrow = document.querySelector('.transferArrow');
const to = document.querySelector('.to');
const amount = document.querySelector('.amount');
const currentBalance = document.querySelector('.currentBalance');
const logout = document.querySelector('.logout');
const inputCloseUserName = document.querySelector('.inputCloseUserName');
const inputClosePin = document.querySelector('.inputClosePin');
const closeArrow = document.querySelector('.closeArrow');
const dashboard = document.querySelector('.dashboard');
const loan = document.querySelector('.loan');
const requestArrow = document.querySelector('.requestArrow');
const dashboardDate = document.querySelector('.dashboardDate');


const allAccounts = [
    {
        owner: 'Jeet Pineda',
        movementInfo: [
            {
                movementAmount: 420,
                movementDate: '06/23/2022'
            },
            {
                movementAmount: -300,
                movementDate: '08/10/2022'
            },
            {
                movementAmount: 1000,
                movementDate: '11/05/2022'
            },
            {
                movementAmount: -750,
                movementDate: '03/17/2023'
            },
            {
                movementAmount: 800,
                movementDate: '09/30/2022'
            }
        ],
        interestRate: 1.2, 
        pin: 1111,
    },
    {
        owner: 'Samantha Mendoza',
        movementInfo: [
            {
                movementAmount: 550,
                movementDate: '02/15/2023'
            },
            {
                movementAmount: -400,
                movementDate: '07/08/2022'
            },
            {
                movementAmount: 1200,
                movementDate: '09/21/2022'
            },
            {
                movementAmount: -900,
                movementDate: '04/03/2023'
            },
            {
                movementAmount: 700,
                movementDate: '11/12/2022'
            },
            {
                movementAmount: -250,
                movementDate: '06/27/2022'
            },
            {
                movementAmount: 1500,
                movementDate: '10/05/2022'
            },
            {
                movementAmount: -600,
                movementDate: '03/18/2023'
            },
            {
                movementAmount: 950,
                movementDate: '08/30/2022'
            }
        ],
        interestRate: 3.5,
        pin: 2222,
    },
    {
        owner: 'Steven Thompson',
        movementInfo: [
            {
                movementAmount: 300,
                movementDate: '05/23/2023'
            },
            {
                movementAmount: -200,
                movementDate: '09/15/2022'
            },
            {
                movementAmount: 800,
                movementDate: '12/07/2022'
            },
            {
                movementAmount: -600,
                movementDate: '03/29/2023'
            },
            {
                movementAmount: 500,
                movementDate: '07/18/2022'
            },
            {
                movementAmount: -400,
                movementDate: '11/02/2022'
            },
            {
                movementAmount: 1000,
                movementDate: '02/14/2023'
            }
        ], 
        interestRate: 0.7,
        pin: 3333,
    },
    {
        owner: 'Capy Bloom',
        movementInfo: [
            {
                movementAmount: 750,
                movementDate: '06/08/2023'
            },
            {
                movementAmount: -500,
                movementDate: '10/20/2022'
            },
            {
                movementAmount: 1200,
                movementDate: '01/03/2023'
            }
        ],          
        interestRate: 1,
        pin: 4444,
    }
];

addUserName(allAccounts);
calculateCurrentBalance(allAccounts);


let currentAccount;

loginArrow.addEventListener('click', () => {
    currentAccount = allAccounts.find(ownerObj => {
        if (ownerObj?.userName === userName.value){
            return ownerObj;
        } else {
            clear();
        }
    })
    if (currentAccount && currentAccount.pin === Number(pin.value)){
        displayTransactionMovements(currentAccount);
        currentBalance.textContent = `$${currentAccount.currentBalance.toLocaleString()}`;
        sort.style.display = '';
        logout.style.display = '';
        clearInput();
    } else {
        clear();
    }
    if (currentAccount) {
        const date = new Date();
        const year = date.getFullYear();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        dashboardDate.textContent = `As of ${month}/${day}/${year}, ${hour}:${minute}`;
    }
})



transferArrow.addEventListener('click', () => {
    if (currentAccount) {
        const transferToAccount = allAccounts.find(obj => {
            return obj.userName === to.value;
        });
        if (currentAccount != transferToAccount) {
            if (Number(amount.value) <= currentAccount.currentBalance && amount.value != '' && amount.value > 0) {
                currentAccount.movements.push(-Math.abs(Number(amount.value)));
                transferToAccount.movements.push(Math.abs(Number(amount.value)))
                calculateCurrentBalance(allAccounts);
                displayTransactionMovements(currentAccount);
                currentBalance.textContent = `$${currentAccount.currentBalance.toLocaleString()}`;
                clearInput();
            } else console.log('Insufficient Balance');
        }
    } else console.log('PLEASE LOGIN');
})


closeArrow.addEventListener('click', () => {
    const closeAccountObj = allAccounts.find(obj => {
        if (inputCloseUserName.value === obj.userName) {
            return obj;
        }
    })
    if (Number(inputClosePin.value) === closeAccountObj.pin){
        console.log('Before', allAccounts);
        const accountIndex = allAccounts.findIndex(obj => {
            return obj === closeAccountObj;
        })
        if (currentAccount === allAccounts[accountIndex]){
            clear();
            clearInput();
            currentAccount = '';
        }
        allAccounts.splice(accountIndex, 1);
        console.log('After', allAccounts);
    }
})

let isSorted = false;

sort.addEventListener('click', () => {
    isSorted = !isSorted;
    displayTransactionMovements(currentAccount, isSorted)
    !isSorted;
})


if (!currentAccount) {
    sort.style.display = 'none';
    logout.style.display = 'none';
}


requestArrow.addEventListener('click', () => {
    if (currentAccount) {
        const boolean = currentAccount.movements.some(movement => movement >= Math.abs(Number(loan.value) * .10) && Math.abs(Number(loan.value) != 0)); 
        if (boolean) {
            currentAccount.movements.push(Math.abs(Number(loan.value)));
            displayTransactionMovements(currentAccount);
            calculateCurrentBalance(allAccounts);
            currentBalance.textContent = `$${currentAccount.currentBalance.toLocaleString()}`
            clearInput();
        }
    } else console.log('PLEASE LOGIN')
})

logout.addEventListener('click', () => {
    clear();
    clearInput();
    currentAccount = false;
})

function calculateCurrentBalance(allAccounts) {
    allAccounts.forEach(obj => {
        obj.currentBalance = obj.movements.reduce((curr, acc) => {
            return curr + acc
        })
    })
}

function addUserName(allAccounts) {
    allAccounts.forEach(obj => {
        const ownerName = obj.owner;
        obj.userName = ownerName
            .split(' ')
            .map(word => word[0])
            .join('')
            .toLowerCase()
    })
}

function displayTransactionMovements(currentAccount, sort = false){
    displayTransactions.innerHTML = '';
    const copiedObjectForSort = {
        ...currentAccount,
        movements: currentAccount.movements.slice().sort((a,b) => a - b),
    }
    const copiedOrOriginal = sort ? copiedObjectForSort : currentAccount;
    console.log(copiedOrOriginal);
    accountName.textContent = currentAccount.owner.split(' ')[0]; 
    copiedOrOriginal.movements.forEach((amount, index)=> {
        const html = 
        `<div class="specificTransaction">
            <div class="transactionInfo">
                <p class="transactionType ${amount > 0 ? 'deposit' : 'withdraw'}">${index + 1}: ${amount > 0 ? 'DEPOSIT' : 'WITHDRAW'}</p>
            </div>
            <p class="transactionAmount">${amount.toLocaleString()}</p>
        </div>`
        displayTransactions.insertAdjacentHTML('afterbegin', html);
    })
}

function clear() {
    currentBalance.innerHTML = '';
    displayTransactions.innerHTML = '';
}

function clearInput() {
    userName.value = '';
    pin.value = '';
    to.value = '';
    amount.value = '';
    inputCloseUserName.value = '';
    inputClosePin.value = '';
    loan.value = '';
}
