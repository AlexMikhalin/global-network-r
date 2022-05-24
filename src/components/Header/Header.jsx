import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

const Header = (props) => {
    return <header className={s.header}>
      <img src='https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-logo-design-template-78655edda18bc1196ab28760f1535baa_screen.jpg?ts=1617645324' />
    
    <div className={s.loginBlock}>
      { props.isAuth ? 
      <div>{props.login} - 
      <buttion onClick={props.logout}>Log out</buttion></div>   
      : 
      <NavLink to='/login'>Login</NavLink> }
    </div>
    
    </header>
}

export default  Header;