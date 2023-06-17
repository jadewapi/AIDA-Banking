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
const timerHTML = document.querySelector('.timer');
const greetingText = document.querySelector('.greetingText');




const allAccounts = [
    {
        owner: 'Jeet Pineda',
        movementInfo: [
            {
                movementAmount: 420,
                movementDate: '06/23/2022, 20:39:12'
            },
            {
                movementAmount: -300,
                movementDate: '08/10/2022, 19:10:02'
            },
            {
                movementAmount: 1000,
                movementDate: '11/05/2022, 18:01:01'
            },
            {
                movementAmount: -750,
                movementDate: '03/17/2023, 04:05:15'
            },
            {
                movementAmount: 800,
                movementDate: '09/30/2022, 20:21:02'
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
                movementDate: '02/15/2023, 10:11:02'
            },
            {
                movementAmount: -400,
                movementDate: '07/08/2022, 01:07:19'
            },
            {
                movementAmount: 1200,
                movementDate: '09/21/2022, 07:10:06'
            },
            {
                movementAmount: -900,
                movementDate: '04/03/2023, 12:12:01'
            },
            {
                movementAmount: 700,
                movementDate: '11/12/2022, 05:15:12'
            },
            {
                movementAmount: -250,
                movementDate: '06/27/2022, 23:11:56'
            },
            {
                movementAmount: 1500,
                movementDate: '10/05/2022, 20:21:02'
            },
            {
                movementAmount: -600,
                movementDate: '03/18/2023, 06:09:01'
            },
            {
                movementAmount: 950,
                movementDate: '08/30/2022, 17:19:20'
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
                movementDate: '05/23/2023, 01:12:12'
            },
            {
                movementAmount: -200,
                movementDate: '09/15/2022, 08:08:08'
            },
            {
                movementAmount: 800,
                movementDate: '12/07/2022, 20:12:53'
            },
            {
                movementAmount: -600,
                movementDate: '03/29/2023, 07:54:12'
            },
            {
                movementAmount: 500,
                movementDate: '07/18/2022, 12:23:53'
            },
            {
                movementAmount: -400,
                movementDate: '11/02/2022, 09:59:12'
            },
            {
                movementAmount: 1000,
                movementDate: '02/14/2023, 07:12:23'
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
                movementDate: '06/08/2023, 12:32:12'
            },
            {
                movementAmount: -500,
                movementDate: '10/20/2022, 23:27:23'
            },
            {
                movementAmount: 1200,
                movementDate: '01/03/2023, 15:12:05'
            }
        ],          
        interestRate: 1,
        pin: 4444,
    }
];

addUserName(allAccounts);
calculateCurrentBalance(allAccounts);

let initialTime = 10;
let time = initialTime;

let currentAccount, timer;

loginArrow.addEventListener('click', () => {
    currentAccount = allAccounts.find(ownerObj => {
        if (ownerObj.userName === userName.value){
            return ownerObj;
        }
    })
    if (currentAccount && currentAccount.pin === Number(pin.value)){
        displayTransactionMovements(currentAccount);
        calculateCurrentBalance(allAccounts);
        currentBalance.textContent = `$${currentAccount.currentBalance.toLocaleString()}`;
        dashboardDate.textContent = `As of ${getDateAndTime()}`;
        sort.style.display = '';
        logout.style.display = '';
        clearInput();
        if (timer) clearInterval(timer);
        timer = startLogoutTimer();
        const currentHour = new Date().getHours();
        greetingText.textContent = `Good, ${getTimeOfDay(currentHour)}`;
    }
})



transferArrow.addEventListener('click', () => {
    if (currentAccount) {
        const transferToAccount = allAccounts.find(obj => {
            return obj.userName === to.value;
        });
        if (currentAccount != transferToAccount) {
            if (Number(amount.value) <= currentAccount.currentBalance && amount.value != '' && amount.value > 0) {
                currentAccountPush(amount.value)
                transferToAccount.movementInfo.push(
                    {
                        movementAmount: Math.abs(Number(amount.value)),
                        movementDate: getDateAndTime()
                    }
                )
                calculateCurrentBalance(allAccounts);
                displayTransactionMovements(currentAccount);
                currentBalance.textContent = `$${currentAccount.currentBalance.toLocaleString()}`;
                clearInput();
            } else console.log('Insufficient Balance');
        };
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
            noCurrentAccount();
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
        const boolean = currentAccount.movementInfo.some(movementObj => movementObj.movementAmount >= Math.abs(Number(loan.value) * .10) && Math.abs(Number(loan.value) != 0)); 
        if (boolean) {
            currentAccountPush(loan.value);
            displayTransactionMovements(currentAccount);
            calculateCurrentBalance(allAccounts);
            currentBalance.textContent = `$${currentAccount.currentBalance.toLocaleString()}`
            clearInput();
        }
    } else console.log('PLEASE LOGIN')
})

logout.addEventListener('click', () => {
    noCurrentAccount();
});



function calculateCurrentBalance(allAccounts) {
    allAccounts.forEach(accountObj => {
        const movementAmountArray = accountObj.movementInfo.map(movementObj => movementObj.movementAmount);
        accountObj.currentBalance = movementAmountArray.reduce((a,b) => a + b, 0);
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
        movementInfo: currentAccount.movementInfo.slice().sort((a, b) => a.movementAmount - b.movementAmount)
    }
    const copiedOrOriginal = sort ? copiedObjectForSort : currentAccount;
    accountName.textContent = currentAccount.owner.split(' ')[0]; 
    copiedOrOriginal.movementInfo.forEach((movementObj, index)=> {
        const html = 
        `<div class="specificTransaction">
            <div class="transactionInfo">
                <p class="transactionType ${movementObj.movementAmount > 0 ? 'deposit' : 'withdraw'}">${index + 1}: ${movementObj.movementAmount > 0 ? 'DEPOSIT' : 'WITHDRAW'}</p>
                <p class="transactionDate">${movementObj.movementDate}</p>
            </div>
            <p class="transactionAmount">${movementObj.movementAmount.toLocaleString()}</p>
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

function getDateAndTime() {
    const date = new Date();
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const format = `${month}/${day}/${year}, ${hour}:${minute}:${seconds}`
    return format;
}

function getTimeOfDay(hour) {
    let timeOfDay;
    switch (true) {
        case hour >= 5 && hour < 12:
        timeOfDay = "morning";
        break;
        case hour >= 12 && hour < 18:
        timeOfDay = "afternoon";
        break;
        case hour >= 18 && hour < 22:
        timeOfDay = "evening";
        break;
        default:
        timeOfDay = "night";
    }
    return timeOfDay;
}


function currentAccountPush(inputValue) {
    currentAccount.movementInfo.push(
        {
            movementAmount: Math.abs(Number(inputValue)),
            movementDate: getDateAndTime()
        }
    );
}


const startLogoutTimer = function () {
    const tick = function() {
        const min = String(Math.trunc(time/60)).padStart(2,0);
        const sec = String(time % 60).padStart(2,0);
        timerHTML.textContent = `You will be logged out in ${min}:${sec}`;
        if (time === 0) {
            noCurrentAccount();
        }
        time--;
    }
    let time = 10;
    tick();
    const timer = setInterval(tick, 1000);
    return timer;
}

function noCurrentAccount() {
    clearInterval(timer);
    currentAccount = false;
    clearInput();
    clear();
    dashboardDate.textContent = 'As of --/--/--, --:--';
    greetingText.textContent = 'Please Login!'
    accountName.textContent = 'see read.me for login info';
    timerHTML.textContent = 'You will be logged out in 00:00';
}