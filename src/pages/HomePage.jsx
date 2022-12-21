/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import './HomePage.css';
import close from './Img/close.svg';
import illustration from './Img/illustration.svg';
import menu from './Img/menu.svg';
import logo2 from './Img/logo2.png';

export const HomePage = () => {
  return (
    <div className="App">
      <div className="nav-bar">
        <div className="container">
          <a className="logo-nav" href="">
            <img src={logo2} alt="logo" />
          </a>
          <img id="mobile-cta" className="mobile-menu" src={menu} alt="navigation" />
          <nav>
            <img id="mobile-exit" className="mobile-menu-exit" src={close} alt="close navigation" />
            <ul className="primary-nav" />

            <ul className="second-nav">
              <li />
              <li className="go-premium-cta">
                <a href="/">Sign up free</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <section className="hero">
        <div className="container">
          <div className="left-col">
            <p className="sub-head">Functional testing made fun!</p>
            <h1>A test management software that doesn't sink</h1>

            <div className="hero-cta">
              <a href="/" className="primery-cta">
                Try for free
              </a>
            </div>
          </div>

          <img src={illustration} alt="Illustration" className="hero-img" />
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <ul>
            <li>unlimited bug reports</li>
            <li>3 types of roles</li>
            <li>solid bug state machine</li>
            <li>test execution with interactive proceeding through steps</li>
            <li>informative dashboard</li>
            <li>intuitive interface</li>
          </ul>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-left">
            <h2>Contact</h2>
            <form action="#" method="post">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" />
              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" cols="30" rows="10" />

              <input type="submit" value="send message" className="send-message" />
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
