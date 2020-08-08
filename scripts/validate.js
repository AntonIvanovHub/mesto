// Объект с классами
const object = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-submit',
    inactiveButtonClass: 'popup__btn-submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible',
}

// Функция валидации всех форм
const enableValidation = (object) => {
    // Сброс дефолтного поведения
    const forms = Array.from(document.querySelectorAll(object.formSelector));
    forms.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });      
        setEventListeners(formElement, object);
    });
};

const setEventListeners = (formElement, object) => {
    // Нахождение полей внутри формы
    const inputs = Array.from(formElement.querySelectorAll(object.inputSelector));
    const buttonSubmit = formElement.querySelector(object.submitButtonSelector);
  
    toggleButtonState(inputs, buttonSubmit, object);
  
    inputs.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValid(formElement, inputElement, object);
            toggleButtonState(inputs, buttonSubmit, object);
        });
    });
};

// Функция изменения состояния кнопки
const toggleButtonState = (inputs, buttonSubmit, object) => {
    // Проверка валиден ли импут
    if (isInputInvalid(inputs)) {
        buttonSubmit.classList.add(object.inactiveButtonClass);
        buttonSubmit.disabled = true;
    } else {
        buttonSubmit.classList.remove(object.inactiveButtonClass);
        buttonSubmit.disabled = false;
    }
};

const isInputInvalid = (inputs) => {
    return inputs.some((inputElement) => {     
        return !inputElement.validity.valid;
    })
};

// Функция проверки валидности поля
const checkInputValid = (formElement, inputElement, object) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, object);
    } else {
        hideInputError(formElement, inputElement, object);
    }
};

// Функции добавления и удаления класса кастомных полей ошибки
const showInputError = (formElement, inputElement, errorMessage, object) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(object.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(object.errorClass);
};
  
const hideInputError = (formElement, inputElement, object) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(object.inputErrorClass);
    errorElement.classList.remove(object.errorClass);
    errorElement.textContent = '';
};
  
enableValidation(object);