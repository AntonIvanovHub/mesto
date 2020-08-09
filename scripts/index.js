

// Модалки
const popup = document.querySelector('.popup')
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const addCardPopup = document.querySelector('.popup_type_add-card');
const imagePopup = document.querySelector('.popup_type_image-card');

// Кнопки
const profileEditButton = document.querySelector('.profile__btn-edit');
//const popupSubmit = document.querySelector('.popup__btn-submit');
const cardAddButton = document.querySelector('.profile__btn-add');

// Формы и данные форм
const editForm = editProfilePopup.querySelector('.popup__form');
const addCardForm = addCardPopup.querySelector('.popup__form');

const nameInput = editForm.querySelector('.popup__input_type_name');
const occupationInput = editForm.querySelector('.popup__input_type_occupation');

const placeInput = addCardForm.querySelector('.popup__input_type_place');
const urlInput = addCardForm.querySelector('.popup__input_type_url');

const nameProfile = document.querySelector('.profile__name');
const occupationProfile = document.querySelector('.profile__occupation');

const figurePopup = imagePopup.querySelector('.popup__image');
const captionPopup = imagePopup.querySelector('.popup__caption');

// Темплейты
const cardTemplate = document.querySelector('.template-element').content.querySelector('.element');
const elements = document.querySelector('.elements__list');

// Функции
// Закрытие и открытие модалки
function openPopup (popup) {
    popup.classList.add('popup_opened');  
    document.addEventListener('keydown', closePopupEscape);   
}
  
function closePopup (popup) {
    popup.classList.remove('popup_opened');  
    document.removeEventListener('keydown', closePopupEscape);
    
}  
  
// Закрытия модалок нажатием "Esc"  
const closePopupEscape = (evt) => {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
    }
}

// Заполняем формы
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    nameProfile.textContent =  nameInput.value;
    occupationProfile.textContent = occupationInput.value;
    closePopup(editProfilePopup);
}

function addCardSubmitHandler (evt) {
    evt.preventDefault(); 
    renderCard({name: placeInput.value, link: urlInput.value});    
    closePopup(addCardPopup);
    
}

// Клонируем карточки, события по клику внутри контейнера
function createCard(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    const cardTitle = cardElement.querySelector('.element__title');        
    const cardLikeButton = cardElement.querySelector('.element__btn-like');
    const cardRemoveButton = cardElement.querySelector('.element__btn-remove');
        
    cardLikeButton.addEventListener('click', handleLikeClick);
    cardRemoveButton.addEventListener('click',handleRemoveClick);    
    cardImage.addEventListener('click', openCardImage);

    cardTitle.textContent = data.name;
    cardImage.src = data.link;

    return cardElement;    
}

function openCardImage(evt) {
    figurePopup.src = evt.target.src;
    captionPopup.textContent = evt.target.closest('.element').querySelector('.element__title').textContent;        
    openPopup(imagePopup);
}

function renderCard(data) {
    elements.prepend(createCard(data));
}

function handleLikeClick(evt) {
    evt.target.classList.toggle('element__btn-like_active');
}

function handleRemoveClick(evt) {
    evt.target.closest('.element').remove();
}

// Слушатели и вызовы
profileEditButton.addEventListener('click', () => {
    if (!popup.classList.contains('popup_opened')){
        nameInput.value = nameProfile.textContent;
        occupationInput.value = occupationProfile.textContent;
    }
    openPopup(editProfilePopup)
    openPopupValidation(editProfilePopup, validationConfig);// Валидация при открытии
});

editProfilePopup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__btn-close')) { 
        closePopup(editProfilePopup)}
    });// Закрытие модалки по оверлей или крестику

cardAddButton.addEventListener('click', () => {
    openPopup(addCardPopup)
    addCardForm.reset();
    openPopupValidation(addCardPopup, validationConfig);// Валидация при открытии
});

addCardPopup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__btn-close')) { 
        closePopup(addCardPopup)}
    });// Закрытие модалки по оверлей или крестику

imagePopup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__btn-close')) { 
        closePopup(imagePopup)}
    });// Закрытие модалки по оверлей или крестику

editForm.addEventListener('submit', formSubmitHandler);
addCardForm.addEventListener('submit', addCardSubmitHandler);

initialCards.forEach((data) =>{
    renderCard(data);    
}); 