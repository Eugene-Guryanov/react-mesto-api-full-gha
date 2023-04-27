import React from 'react';
import { Link } from 'react-router-dom';

function authPage({
    formName,
    onSubmit,
    title,
    btnText,
    children
}) {
    return (
        <div className="auth">
            <form className="auth__form" name={formName}
                noValidate
                onSubmit={onSubmit}>
                <h1 className="auth__title">{title}</h1>
                {children}
                <button className="auth__button">{btnText}</button>
                {formName === 'register' && (
                    <Link className="auth__button-enter" to="/sign-in">Уже зарегистрированы? Войти</Link>
                )}
            </form>
        </div>
    )
}

export default authPage
