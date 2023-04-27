import React from 'react';

function ImagePopup(props) {
    return (
        <div className={`popup popup-image ${props.card ? 'popup_modal_is-opened' : ''}`}>
            <div className='popup__body-image'>
                <button className="popup__exit" type="button" onClick={props.onClose} />
                <img className="popup__image" alt={props.card?.name} src={props.card?.link} />
                <p className="popup__description">{props.card?.name}</p>
            </div>
        </div>
    )
};

export default ImagePopup