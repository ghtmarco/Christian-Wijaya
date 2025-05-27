document.addEventListener('DOMContentLoaded', function() {
    setupFormCheck();
});

function setupFormCheck() {
    var theForm = document.getElementById('registration-form');
    if (!theForm) return;
    
    var checkers = {
        email: checkEmail,
        fullName: checkName,
        birthDate: checkDate,
        gender: checkSelect,
        terms: checkCheckbox
    };
    
    for (var whichField in checkers) {
        var inputElement = theForm.querySelector('[name="' + whichField + '"]');
        if (inputElement) {
            inputElement.addEventListener('blur', function() {
                var fieldName = this.name;
                var fieldValue = (this.type === 'checkbox' ? this.checked : this.value);
                doCheckField(fieldName, fieldValue, checkers[fieldName]);
            });
            
            inputElement.addEventListener('input', function() {
                clearErrors(this.name);
            });
            
            if (inputElement.type === 'checkbox' || inputElement.tagName.toLowerCase() === 'select') {
                inputElement.addEventListener('change', function() {
                    var fieldName = this.name;
                    var fieldValue = (this.type === 'checkbox' ? this.checked : this.value);
                    doCheckField(fieldName, fieldValue, checkers[fieldName]);
                });
            }
        }
    }
    
    theForm.addEventListener('submit', function(eventData) {
        eventData.preventDefault();
        whenFormSubmits(theForm, checkers);
    });
}

function checkEmail(emailVal) {
    var problemList = [];
    
    if (!emailVal || emailVal.trim().length === 0) {
        problemList.push('Email is needed.');
        return { isValid: false, errors: problemList };
    }
    
    emailVal = emailVal.trim();
    
    var atPos = emailVal.indexOf('@');
    var lastDot = emailVal.lastIndexOf('.');
    
    if (atPos === -1 || lastDot === -1 || atPos > lastDot) {
        problemList.push('Email is not very good.');
    }
    
    if (problemList.length === 0 && emailVal.length < 5) {
        problemList.push('Email is too short.');
    }
    
    return {
        isValid: problemList.length === 0,
        errors: problemList
    };
}

function checkName(nameText) {
    var problemList = [];
    
    if (!nameText || nameText.trim().length === 0) {
        problemList.push('Name cannot be empty.');
        return { isValid: false, errors: problemList };
    }
    
    nameText = nameText.trim();
    
    if (nameText.length < 2) {
        problemList.push('Name is too short.');
    }
    
    return {
        isValid: problemList.length === 0,
        errors: problemList
    };
}

function checkDate(dateInput) {
    var problemList = [];
    
    if (!dateInput || dateInput.trim().length === 0) {
        problemList.push('Date is needed.');
        return { isValid: false, errors: problemList };
    }
    
    var dateParts = dateInput.split('/');
    if (dateParts.length !== 3) {
        problemList.push('Use MM/DD/YYYY format.');
        return { isValid: false, errors: problemList };
    }
    
    var monthNum = parseInt(dateParts[0], 10);
    var dayNum = parseInt(dateParts[1], 10);
    var yearNum = parseInt(dateParts[2], 10);
    
    if (isNaN(monthNum) || isNaN(dayNum) || isNaN(yearNum)) {
        problemList.push('Date must have numbers.');
        return { isValid: false, errors: problemList };
    }
    
    if (monthNum < 1 || monthNum > 12) {
        problemList.push('Month is wrong.');
    }
    
    if (dayNum < 1 || dayNum > 31) {
        problemList.push('Day is wrong.');
    }
    
    var thisYear = new Date().getFullYear();
    if (yearNum < 1900 || yearNum > thisYear) {
        problemList.push('Year is not good.');
    }
    
    var dateObj = new Date(yearNum, monthNum - 1, dayNum);
    if (dateObj.getFullYear() !== yearNum || dateObj.getMonth() !== monthNum - 1 || dateObj.getDate() !== dayNum) {
        problemList.push('Date is not valid.');
    }
    
    if (problemList.length === 0) {
        var todayDate = new Date();
        var userBirthDate = new Date(yearNum, monthNum - 1, dayNum);
        var userAge = todayDate.getFullYear() - userBirthDate.getFullYear();
        var monthDiffValue = todayDate.getMonth() - userBirthDate.getMonth();
        
        if (monthDiffValue < 0 || (monthDiffValue === 0 && todayDate.getDate() < userBirthDate.getDate())) {
            userAge--;
        }
        
        if (userAge < 16) {
            problemList.push('Too young.');
        }
    }
    
    return {
        isValid: problemList.length === 0,
        errors: problemList
    };
}

function checkSelect(fieldValue) {
    var problemList = [];
    
    if (!fieldValue || fieldValue === '') {
        problemList.push('Please pick one.');
    }
    
    return {
        isValid: problemList.length === 0,
        errors: problemList
    };
}

function checkCheckbox(boxIsChecked) {
    var problemList = [];
    
    if (!boxIsChecked) {
        problemList.push('You must agree.');
    }
    
    return {
        isValid: problemList.length === 0,
        errors: problemList
    };
}

function doCheckField(whichField, fieldValue, checkerFn) {
    var checkResult = checkerFn(fieldValue);
    
    if (checkResult.isValid) {
        showOkMsg(whichField);
    } else {
        showErrorMsg(whichField, checkResult.errors);
    }
    
    return checkResult.isValid;
}

function showErrorMsg(whichField, problemList) {
    clearErrors(whichField);
    
    var inputElement = document.querySelector('[name="' + whichField + '"]');
    if (!inputElement) return;
    
    inputElement.classList.add('form-field-error');
    
    var errorDiv = document.createElement('div');
    errorDiv.className = 'form-error-message-text';
    
    problemList.forEach(function(errorText) {
        var errorP = document.createElement('p');
        errorP.textContent = errorText;
        errorDiv.appendChild(errorP);
    });
    
    inputElement.parentNode.appendChild(errorDiv);
}

function showOkMsg(whichField) {
    clearErrors(whichField);
    
    var inputElement = document.querySelector('[name="' + whichField + '"]');
    if (!inputElement) return;
    
    inputElement.classList.add('form-field-success');
    inputElement.classList.remove('form-field-error');
}

function clearErrors(whichField) {
    var inputElement = document.querySelector('[name="' + whichField + '"]');
    if (!inputElement) return;
    
    inputElement.classList.remove('form-field-error', 'form-field-success');
    
    var existingError = inputElement.parentNode.querySelector('.form-error-message-text');
    if (existingError) {
        existingError.parentNode.removeChild(existingError);
    }
}

function whenFormSubmits(theForm, checkers) {
    var formIsGood = true;
    var formInfo = new FormData(theForm);
    
    for (var whichField in checkers) {
        var inputElement = theForm.querySelector('[name="' + whichField + '"]');
        var fieldValue;
        
        if (inputElement.type === 'checkbox') {
            fieldValue = inputElement.checked;
        } else {
            fieldValue = formInfo.get(whichField) || '';
        }
        
        var fieldIsGood = doCheckField(whichField, fieldValue, checkers[whichField]);
        if (!fieldIsGood) {
            formIsGood = false;
        }
    }
    
    if (formIsGood) {
        showFormSuccess();
        theForm.reset();
        for (var whichField in checkers) {
            clearErrors(whichField);
        }
    } else {
        showFormError();
        var firstBadField = theForm.querySelector('.form-field-error');
        if (firstBadField) {
            firstBadField.focus();
        }
    }
}

function showFormSuccess() {
    alert('OK! Application sent. We will call you soon.');
}

function showFormError() {
    alert('Something is wrong. Check fields and try again.');
}