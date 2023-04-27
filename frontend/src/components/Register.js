import React, { useState } from 'react';
import Auth from './AuthPage';

export default function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChange(e) {
    const { value } = e.target;
    e.target.name === 'Email' ? setEmail(value) : setPassword(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(password, email);
  }

  return (
    <div className="register">
      <Auth
        formName="register"
        onSubmit={handleSubmit}
        title="Регистрация"
        btnText="Зарегистрироваться"
      >
        <label className="popup__form-field">
          <input
            type="email"
            id="email"
            name="Email"
            className="popup__input popup__input_type_reg"
            placeholder="Email"
            required
            minLength="6"
            maxLength="40"
            onChange={handleChange}
            value={email || ''}
          />
          <span className="popup__input-error name-input-error "></span>
        </label>
        <label className="popup__form-field">
          <input
            type="password"
            id="password"
            name="Password"
            className="popup__input popup__input_type_reg"
            placeholder="Пароль"
            required
            minLength="6"
            maxLength="40"
            onChange={handleChange}
            value={password || ''}
          />
          <span className="popup__input-error name-input-error "></span>
        </label>
      </Auth>
    </div>
  );
}
