import React from 'react'
import Popup from 'reactjs-popup'
import './foodModal.css'
import {FaChevronRight} from 'react-icons/fa'

export default ({foodName}) => (
    <Popup
    trigger={<div className="openModal"><div className="icon-container"><FaChevronRight /><FaChevronRight /></div></div>}
    modal
    closeOnDocumentClick
  >
  {close => (
      <div className="reactjs-modal">
        <a className="modalClose" onClick={close}>
          &times;
        </a>
        <div className="modalHeader"> {foodName} </div>
        <div className="modalContent">
          {' '}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
          Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
          delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
          <br />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
          commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
          explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
        </div>
        <div className="modalActions">
          <Popup
            trigger={<button className="modalButton"> Trigger </button>}
            position="top center"
            closeOnDocumentClick
          >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
            </span>
          </Popup>
          <button
            className="modalButton"
            onClick={() => {
              console.log('modal closed ')
              close()
            }}
          >
            close modal
          </button>
        </div>
      </div>
    )}
  </Popup>
)
