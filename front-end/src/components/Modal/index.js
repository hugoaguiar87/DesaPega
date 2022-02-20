import React from 'react';
import { ModalArea } from './styled';

const Modal = ({children, onClose = () => {}, id = 'modal'}) => {
    const handleOutsideClick = (e) => {
        if(e.target.id === id) onClose()
    }   
    return (
        <ModalArea id={id} onClick={handleOutsideClick}>
            <div className='container'>
                <button className='close' onClick={onClose}>X</button>
                <div className='content'>
                    {children}
                </div>
            </div>            
        </ModalArea>
    )
}

export default Modal;