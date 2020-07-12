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
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    nameProfile.textContent =  nameInput.value;
    occupationProfile.textContent = occupationInput.value;
    togglePopup();
}

//я так понял, что toogle сам проверят есть ли класс или нет, а ошибка заключалась в том, что не заносились данные в форму при открытии попапа, но так как значения value у меня были прописаны в html этого момента я не заметил.// 
openPopupButton.addEventListener('click', () => {
    nameInput.value = nameProfile.textContent;
    occupationInput.value = occupationProfile.textContent;
    togglePopup();}
);
closePopupButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);




