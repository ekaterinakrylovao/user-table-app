import React from 'react';
import Modal from 'react-modal';
import '../styles/UserModal.css';

const UserModal = ({ user, onClose }) => {
    return (
        <Modal
            isOpen={true}
            onRequestClose={onClose}
            className="user-modal"
            overlayClassName="user-modal-overlay"
        >
            <div className="modal-content">
                <h2>{`${user.firstName} ${user.lastName}`}</h2>
                <p>Возраст: {user.age}</p>
                <p>Адрес: {`${user.address.city}, ${user.address.address}`}</p>
                <p>Рост: {user.height} см</p>
                <p>Вес: {user.weight} кг</p>
                <p>Телефон: {user.phone}</p>
                <p>Email: {user.email}</p>
                <button className='close-button' onClick={onClose}>Закрыть</button>
            </div>
        </Modal>
    );
};

export default UserModal;
