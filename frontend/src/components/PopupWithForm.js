function PopupWithForm(props) {
  return (
    <div
      className={`popup popup-overlay popup-${props.name} ${props.isOpen ? 'popup_modal_is-opened' : ''
        }`}
    >
      <div className="popup__body">
        <button
          type="button"
          className="popup__exit"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          name={`${props.name}-form`}
          className={`popup__form popup__form_type_${props.name}`}
          noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button type="submit" className="popup__button">
            {props.btnText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;