import React, { useContext } from 'react';
import api from '../utils/Api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {
    console.log(cards)
    const currentUser = useContext(CurrentUserContext)


    return (
        <main>
            <section className="profile">
                <div className="profile__image">
                    <img className="profile__avatar" src={`${currentUser.avatar}`} alt={`${currentUser.name}`} />
                    <button className="profile__avatar-button" onClick={onEditAvatar} />
                </div>
                <div className="profile__content">
                    <h1 className="profile__name" id="name">
                        {`${currentUser.name}`}
                    </h1>
                    <button className="profile__edit-button" type="button" onClick={onEditProfile} />
                    <p className="profile__description" id="description">
                        {`${currentUser.about}`}
                    </p>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace} />
            </section>
            <section>
                <ul className="elements">{cards.map((card) => {
                    return (
                        <Card key={card._id} card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete} />)
                })}</ul>
            </section>
        </main>)
}

export default Main