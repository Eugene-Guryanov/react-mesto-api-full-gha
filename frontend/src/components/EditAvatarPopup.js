import PopupWithForm from "./PopupWithForm";
import React from 'react';

function EditAvatarPopup(props) {

  const avatarRef = React.useRef('');

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm name='update' title="Обновить аватар" btnText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <label className="popup__form-field">
        <input
          id="update-input"
          className="popup__input popup__input_type_update"
          placeholder="Ссылка на картинку"
          name="avatar"
          type="url"
          required=""
          ref={avatarRef}
        />
        <span className="popup__input-error update-input-error " />
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup