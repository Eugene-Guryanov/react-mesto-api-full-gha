import React, { useState } from 'react';
import Auth from './AuthPage';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChange(e) {
    const { value } = e.target;
    e.target.name === 'Email' ? setEmail(value) : setPassword(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAuth(password, email);
  }
  return (
    <div className="Login">
      <Auth
        formName="Login"
        onSubmit={handleSubmit}
        title="Вход"
        btnText="Войти"
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

export default Login