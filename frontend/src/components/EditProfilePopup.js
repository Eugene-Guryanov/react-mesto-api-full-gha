import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup(props) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (

    <PopupWithForm name='edit' title="Редактировать профиль" btnText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <label className="popup__form-field">
        <input
          id="name-input"
          className="popup__input popup__input_type_name"
          placeholder="Имя"
          name="name"
          type="text"
          minLength={2}
          maxLength={40}
          required=""
          onChange={handleNameChange}
          value={name || ''}
        />
        <span className="popup__input-error name-input-error " />
      </label>
      <label className="popup__form-field">
        <input
          id="description-input"
          className="popup__input popup__input_type_description"
          placeholder="Описание"
          name="description"
          type="text"
          minLength={2}
          maxLength={200}
          required=""
          onChange={handleDescriptionChange}
          value={description || ''}
        />
        <span className="popup__input-error description-input-error " />
      </label>
    </PopupWithForm>
  )
};

export default EditProfilePopup