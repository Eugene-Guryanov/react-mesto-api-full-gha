

function InfoTooltip(props) {
  return (
    <div className={`popup popup-overlay ${props.isOpen ? 'popup_modal_is-opened' : ''}`}>
      <div className="popup__body">
        <button
          type="button"
          className="popup__exit"
          onClick={props.onClose}
        ></button>
        <img
          src={props.img}
          alt={props.img}
          className="popup__info-tooltip"
        />
        <h2 className="popup__title popup__title_type_tooltip">
          {props.title}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
