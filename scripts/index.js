// Массивы
const initialCards = [
    {
        name: 'Самуи',
        link: 'images/samui-ivanov.jpg'
    },
    {
        name: 'Нижний Новгород',
        link: 'images/novgorod-ivanov.jpg'
    },
    {
        name: 'Усть-Каменогорск',
        link: 'images/oskemen-ivanov.jpg'
    },
    {
        name: 'Бангкок',
        link: 'images/bangkok-ivanov.jpg'
    },
    {
        name: 'Милан',
        link: 'images/milan-ivanov.jpg'
    },
    {
        name: 'Санкт-Петербург',
        link: 'images/spb-ivanov.jpg'
    }
];

// Модалки
const popup = document.querySelector('.popup')
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const addCardPopup = document.querySelector('.popup_type_add-card');
const imagePopup = document.querySelector('.popup_type_image-card');

// Кнопки
const profileEditButton = document.querySelector('.profile__btn-edit');
const closeProfileEditButton = editProfilePopup.querySelector('.popup__btn-close');
const popupSubmit = document.querySelector('.popup__btn-submit');
const cardAddButton = document.querySelector('.profile__btn-add');
const closeCardAddButton = addCardPopup.querySelector('.popup__btn-close');
const closeImagePopupButton = imagePopup.querySelector('.popup__btn-close');

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
const cardTemlate = document.querySelector('.template-element').content.querySelector('.element');
const elements = document.querySelector('.elements');

// Открывем закрываем модалки, проверяем есть ли класс заносим данные
function togglePopup(popup) {    
    if (!popup.classList.contains('popup_opened')){
        nameInput.value = nameProfile.textContent;
        occupationInput.value = occupationProfile.textContent;
    }
    popup.classList.toggle('popup_opened');     
}

// Функции
// Заполняем формы
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    nameProfile.textContent =  nameInput.value;
    occupationProfile.textContent = occupationInput.value;
    togglePopup(editProfilePopup);
}

function addCardSubmitHandler (evt) {
    evt.preventDefault(); 
    renderCard({name: placeInput.value, link: urlInput.value});    
    togglePopup(addCardPopup);
    addCardForm.reset();
}

// Клонируем карточки, события по клику внутри контейнера
function createCard(data) {
    const cardElement = cardTemlate.cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    const cardTitle = cardElement.querySelector('.element__title');        
    const cardLikeButton = cardElement.querySelector('.element__btn-like');
    const cardRemoveButton = cardElement.querySelector('.element__btn-remove');
        
    cardLikeButton.addEventListener('click', handleLikeClick);
    cardRemoveButton.addEventListener('click',handleRemoveClick);    
    cardImage.addEventListener('click', () => {    
        figurePopup.src = data.link;
        captionPopup.textContent = data.name;        
        togglePopup(imagePopup);
    });

    cardTitle.textContent = data.name;
    cardImage.src = data.link;

    return cardElement;    
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

initialCards.forEach((data) =>{
    renderCard(data);    
}); 
profileEditButton.addEventListener('click', () => {
    togglePopup(editProfilePopup)
});
closeProfileEditButton.addEventListener('click',  () => {
    togglePopup(editProfilePopup)
});
cardAddButton.addEventListener('click', () => {
    togglePopup(addCardPopup)
});
closeCardAddButton.addEventListener('click',  () => {
    togglePopup(addCardPopup)
});
closeImagePopupButton.addEventListener('click',  () => {
    togglePopup(imagePopup)
});
editForm.addEventListener('submit', formSubmitHandler);
addCardForm.addEventListener('submit', addCardSubmitHandler);