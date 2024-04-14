document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('taxForm');
    const modal = document.getElementById('modal');
    const resultElement = document.getElementById('result');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const incomeInput = document.getElementById('income');
        const extraIncomeInput = document.getElementById('extraIncome');
        const ageSelect = document.getElementById('age');
        const deductionsInput = document.getElementById('deductions');

        const income = parseFloat(incomeInput.value);
        const extraIncome = parseFloat(extraIncomeInput.value);
        const age = ageSelect.value;
        const deductions = parseFloat(deductionsInput.value) || 0;

        if (!validateInput(incomeInput) || !validateInput(extraIncomeInput) || !validateInput(ageSelect) || !validateInput(deductionsInput)) {
            return;
        }

        const taxRate = getTaxRate(age);
        const taxableIncome = Math.max(0, income + extraIncome - deductions - 800000); // Subtract 8 to adjust for the non-taxable portion
        let tax = 0;

        if (taxableIncome > 0) {
            tax = taxRate * taxableIncome;
        }

        showModal(tax);
    });

    function validateInput(input) {
        const value = input.value.trim();
        const errorTooltip = input.nextElementSibling;
        const errorMessage = errorTooltip.querySelector('.error-message');

        if (!value) {
            showError(errorTooltip, errorMessage, 'Field is required');
            return false;
        }

        if (input.type === 'text' && isNaN(value)) {
            showError(errorTooltip, errorMessage, 'Invalid input, must be a number');
            return false;
        }

        hideError(errorTooltip, errorMessage);
        return true;
    }

    function showError(errorTooltip, errorMessage, message) {
        errorTooltip.classList.add('error-tooltip');
        errorTooltip.querySelector('.error-icon').style.display = 'inline-block';
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function hideError(errorTooltip, errorMessage) {
        errorTooltip.classList.remove('error-tooltip');
        errorTooltip.querySelector('.error-icon').style.display = 'none';
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
    }

    function getTaxRate(age) {
        if (age === '<40') {
            return 0.3;
        } else if (age === '≥40&<60') {
            return 0.4;
        } else if (age === '≥60') {
            return 0.1;
        }
        return 0;
    }

    function showModal(tax) {
        modal.style.display = 'block';
        resultElement.textContent = `Tax to be paid: ${tax.toFixed(2)} `;
    }

    modal.querySelector('.close').addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
