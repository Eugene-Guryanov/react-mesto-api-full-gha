import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import "../index.css";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as Auth from "../utils/Auth";
import Register from "./Register";
import Login from "./Login";
import ban from "../img/ban.svg";
import access from "../img/access.svg";
function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ img: "", title: "" });

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltip, setInfoTooltip] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      await Promise.all([api.getUser(), api.getInitialCards()])
        .then((items) => {
          setCurrentUser(items[0]);
          setCards(items[1]);
        })
        .catch((err) => console.log(err));
    }
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function onCardClick(card) {
    setSelectedCard(card);
  }

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(items) {
    api
      .setUserInfo(items)
      .then((item) => {
        setCurrentUser(item);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(items) {
    api
      .setAvatar(items)
      .then((item) => {
        setCurrentUser(item);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(items) {
    api
      .newCard(items)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(password, email) {
    Auth.register(password, email)
      .then((res) => {
        setEmail(res.data.email);
        setMessage(
          {
            img: access,
            title: "Вы успешно зарегистрировались!",
          },
          navigate("/")
        );
      })
      .catch(() =>
        setMessage(
          {
            img: ban,
            title: "Что-то пошло не так! Попробуйте еще раз.",
          },
          navigate("/signup")
        )
      )
      .finally(() => {
        setInfoTooltip(true);
      });
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltip(false);
  }

  function handleAuth(password, email) {
    Auth.login(password, email)
      .then((token) => {
        Auth.checkToken(token).then((res) => {
          setEmail(res.email);
          setLoggedIn(true);
          navigate("/");
        });
      })
      .catch(() =>
        setMessage(
          {
            img: ban,
            title: "Что-то пошло не так! Попробуйте еще раз.",
          },
          setInfoTooltip(true)
        )
      );
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    const jwt = localStorage.getItem("userId");

    if (jwt) {
      Auth.checkToken()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            navigate("/");
          }
        })
        .catch((err) => {
          localStorage.removeItem("userId");
          console.log(err);
        });
    }
  }

  function onSignOut() {
    localStorage.removeItem("userId");
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header loggedIn={isLoggedIn} email={email} onSignOut={onSignOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={isLoggedIn}
                component={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={onCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onInfoTooltip={handleInfoTooltip}
                cards={cards}
              />
            }
          />

          <Route
            path="/signup"
            element={
              <Register
                isOpen={isEditProfilePopupOpen}
                onRegister={handleRegister}
              />
            }
          />

          <Route
            path="/signin"
            element={
              <Login isOpen={isEditProfilePopupOpen} onAuth={handleAuth} />
            }
          />
        </Routes>
        <Footer />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          btnText="Да"
          onClose={closeAllPopups}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoTooltip}
          onClose={closeAllPopups}
          img={message.img}
          title={message.title}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
