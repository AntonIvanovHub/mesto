const openPopupButton = document.querySelector('.profile__btn-edit');
const closePopupButton = document.querySelector('.popup__btn-close');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const popupSubmit = document.querySelector('.popup__btn-submit');
const nameInput = formElement.querySelector('.popup__input_type_name');
const occupationInput = formElement.querySelector('.popup__input_type_occupation');
const nameProfile = document.querySelector('.profile__name');
const occupationProfile = document.querySelector('.profile__occupation');

function togglePopup() {    
     popup.classList.toggle('popup_opened');  
     if (popup.classList.contains('popup_opened')){
        nameInput.value = nameProfile.textContent;
        occupationInput.value = occupationProfile.textContent;
     }   
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    nameProfile.textContent =  nameInput.value;
    occupationProfile.textContent = occupationInput.value;
    togglePopup();
}
 
openPopupButton.addEventListener('click',togglePopup);
closePopupButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);




