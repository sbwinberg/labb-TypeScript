"use strict";
const loanInput = document.getElementById('loan');
const interestInput = document.getElementById('interest');
const yearInput = document.getElementById('time');
const submitBtn = document.getElementById('submit');
const errorOutput = document.getElementById('error-output');
const initialLoanOutput = document.getElementById('initial-loan');
const initialInterestOutput = document.getElementById('initial-interest');
const initialTimeOutput = document.getElementById('initial-time');
const totalAmountOutput = document.getElementById('total-loan');
const totalInterestOutput = document.getElementById('total-interest');
const output = document.getElementById('monthly-payment');
submitBtn.addEventListener('click', getMonthly);
// Typescript interpreterar alla värden korrekti samspel med type='number' på inputs och parseInt i funktionen
function getMonthly() {
    const loan = parseInt(loanInput.value);
    const interest = parseInt(interestInput.value);
    const years = parseInt(yearInput.value);
    //dela med 100 för att få ut procentsatsen och dela med 12 för att få ut månatliga
    const interestMonthly = interest / 1200;
    const months = years * 12;
    const top = interestMonthly * (1 + interestMonthly) ** months;
    const bottom = ((1 + interestMonthly) ** months) - 1;
    const M = Math.round(loan * (top / bottom));
    const total = M * months;
    if (loan > 10000000) {
        errorOutput.innerText = 'You can not loan more than 10M';
    }
    else if (months > 600) {
        errorOutput.innerText = "That's a very long time for an old person... very optimistic";
    }
    else {
        initialLoanOutput.innerText = `${loan} SEK`;
        initialInterestOutput.innerText = `${interest}%`;
        initialTimeOutput.innerText = `${years} yrs`;
        totalAmountOutput.innerText = `${total} SEK`;
        totalInterestOutput.innerText = `${total - loan} SEK`;
        output.innerText = `${M} SEK`;
    }
}
