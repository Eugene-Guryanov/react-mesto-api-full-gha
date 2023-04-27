import PopupWithForm from './PopupWithForm'
import React from 'react';


function AddPlacePopup(props) {

  const [link, setLink] = React.useState('');
  const [name, setName] = React.useState('');


  React.useEffect(() => {
    setName('');
    setLink(``);
  }, [props.isOpen]);

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleDescriptionChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm name='add' title="Новое место" btnText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <label className="popup__form-field">
        <input
          id="title-input"
          className="popup__input popup__input_type_title "
          placeholder="Название"
          name="title"
          type="text"
          minLength={2}
          maxLength={30}
          required=""
          onChange={handleDescriptionChange}
          value={name || ''}
        />
        <span className="popup__input-error title-input-error " />
      </label>
      <label className="popup__form-field">
        <input
          id="source-input"
          className="popup__input popup__input_type_source"
          placeholder="Ссылка на картинку"
          name="source"
          type="url"
          required=""
          onChange={handleLinkChange}
          value={link || ''}
        />
        <span className="popup__input-error source-input-error " />
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup