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
const elements = document.querySelector('.elements__list');

// Функции
// Закрытие и открытие модалки

function togglePopup(popup) {        
    popup.classList.toggle('popup_opened');
    document.addEventListener('keydown', closePopupEscape);     
}
// Закрытие по клавише Esc
function closePopupEscape(evt) {
    if (evt.key === 'Escape') {
        editProfilePopup.classList.remove('popup_opened');
        addCardPopup.classList.remove('popup_opened');
        imagePopup.classList.remove('popup_opened');
    }  
    document.removeEventListener('keydown', closePopupEscape);
  }

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
    cardImage.addEventListener('click', openCardImage);

    cardTitle.textContent = data.name;
    cardImage.src = data.link;

    return cardElement;    
}

function openCardImage(evt) {
    figurePopup.src = evt.target.src;
    captionPopup.textContent = evt.target.closest('.element').querySelector('.element__title').textContent;        
    togglePopup(imagePopup);
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
    }//Проверку добавил в обработчик клика редактирования профиля
    togglePopup(editProfilePopup)
});

editProfilePopup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__btn-close')) { 
        togglePopup(editProfilePopup)}
    });// Закрытие модалки по оверлей или крестику

cardAddButton.addEventListener('click', () => {
    togglePopup(addCardPopup)
});

addCardPopup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__btn-close')) { 
        togglePopup(addCardPopup)}
    });// Закрытие модалки по оверлей или крестику

imagePopup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__btn-close')) { 
        togglePopup(imagePopup)}
    });// Закрытие модалки по оверлей или крестику

editForm.addEventListener('submit', formSubmitHandler);
addCardForm.addEventListener('submit', addCardSubmitHandler);

initialCards.forEach((data) =>{
    renderCard(data);    
}); 