const loanInput = document.getElementById('loan') as HTMLInputElement
const interestInput = document.getElementById('interest') as HTMLInputElement
const yearInput = document.getElementById('time') as HTMLInputElement
const submitBtn = document.getElementById('submit') as HTMLButtonElement
const errorOutput = document.getElementById('error-output') as HTMLParagraphElement

const initialLoanOutput = document.getElementById('initial-loan') as HTMLTableCellElement
const initialInterestOutput = document.getElementById('initial-interest') as HTMLTableCellElement
const initialTimeOutput = document.getElementById('initial-time') as HTMLTableCellElement
const totalAmountOutput = document.getElementById('total-loan') as HTMLTableCellElement
const totalInterestOutput = document.getElementById('total-interest') as HTMLTableCellElement
const output = document.getElementById('monthly-payment') as HTMLTableCellElement

submitBtn.addEventListener('click', getMonthly);

// Typescript interpreterar alla värden korrekti samspel med type='number' på inputs och parseInt i funktionen
function getMonthly() {
    const loan = parseInt(loanInput.value);
    const interest = parseInt(interestInput.value)
    const years = parseInt(yearInput.value);
    //dela med 100 för att få ut procentsatsen och dela med 12 för att få ut månatliga
    const interestMonthly = interest / 1200;
    const months = years * 12;

    const top = interestMonthly * (1 + interestMonthly) ** months;
    const bottom = ((1 + interestMonthly) ** months) -1;
    const M = Math.round(loan * (top / bottom));
    const total = M * months;

    if(loan > 10000000){
        errorOutput.innerText = 'You can not loan more than 10M'
    } else if(months > 600) {
        errorOutput.innerText = "That's a very long time for an old person... very optimistic"
    } else if (interest < 1){
        errorOutput.innerText = "No can do, señor! I got babies to feed!"
    } else {
        initialLoanOutput.innerText = `${loan} SEK`
        initialInterestOutput.innerText = `${interest}%`
        initialTimeOutput.innerText = `${years} yrs`
        totalAmountOutput.innerText = `${total} SEK`
        totalInterestOutput.innerText = `${total - loan} SEK`
        output.innerText = `${M} SEK`
    }
}