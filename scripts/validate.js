// Объект с классами
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-submit',
    inactiveButtonClass: 'popup__btn-submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible',
}

// Функция валидации всех форм
const enableValidation = (validationConfig) => {
    // Сброс дефолтного поведения
    const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
    forms.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });      
        setEventListeners(formElement, validationConfig);
    });
};

const setEventListeners = (formElement, validationConfig) => {
    // Нахождение полей внутри формы
    const inputs = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonSubmit = formElement.querySelector(validationConfig.submitButtonSelector);
  
    toggleButtonState(inputs, buttonSubmit, validationConfig);
  
    inputs.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValid(formElement, inputElement, validationConfig);
            toggleButtonState(inputs, buttonSubmit, validationConfig);
        });
    });
};

// Функция проверки полей при открытии модалки
const openPopupValidation = (formElement, validationConfig) => {
    const inputs = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonSubmit = formElement.querySelector(validationConfig.submitButtonSelector);
  
    inputs.forEach(inputElement => {
        checkInputValid(formElement, inputElement, validationConfig);
        toggleButtonState(inputs, buttonSubmit, validationConfig);
    });
  }



// Функция изменения состояния кнопки
const toggleButtonState = (inputs, buttonSubmit, validationConfig) => {
    // Проверка валиден ли импут
    if (isInputInvalid(inputs)) {
        buttonSubmit.classList.add(validationConfig.inactiveButtonClass);
        buttonSubmit.disabled = true;
    } else {
        buttonSubmit.classList.remove(validationConfig.inactiveButtonClass);
        buttonSubmit.disabled = false;
    }
};

const isInputInvalid = (inputs) => {
    return inputs.some((inputElement) => {     
        return !inputElement.validity.valid;
    })
};

// Функция проверки валидности поля
const checkInputValid = (formElement, inputElement, validationConfig) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
        hideInputError(formElement, inputElement, validationConfig);
    }
};

// Функции добавления и удаления класса кастомных полей ошибки
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
};
  
const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
};
  
enableValidation(validationConfig);

