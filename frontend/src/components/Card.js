import React, { useContext } from 'react';
import Delete from '../img/delete.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  function handleCardClick() {
    onCardClick(card);
  };

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_active'}`
  );;

  return (
    <li className="element">
      <img className="element__image" alt={`${card.name}`} id="source" src={card.link} onClick={handleCardClick} />
      {isOwn && <img className='element__delete' onClick={handleDeleteClick} src={Delete} />}
      <div className="element__content">
        <h2 className="element__title" id="title">{card.name}</h2>
        <div className="element__like-container">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>)
}

export default Card