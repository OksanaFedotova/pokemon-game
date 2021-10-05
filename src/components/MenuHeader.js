import { useState } from "react";
import {Notification, NotificationManager} from 'react-notifications';

import LoginForm from "./LoginForm";
import Menu from "./Menu";
import Modal from "./Modal";
import Navbar from "./Navbar";

const MenuHeader = ({bgActive}) => {

   const [isActive, setActive] = useState(null);
   const [isOpenModal, setOpenModal] = useState(true);
   
   const handleActive = () => {
       setActive(prevState => !prevState)
    };

    const handleClickLogin = () => {
        setOpenModal(prevState => !prevState)
    };

    const handleSubmitLoginForm = async ({email, password}) => {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            })
        };
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAFfakVfKBqJlmGqcUJE7ar-UaarQuY4IY', requestOptions).then(res => res.json());
        console.log(response);
        if(response.hasOwnProperty('error')) {
            NotificationManager.error(response.error.message, 'Wrong!');
        } else {
            localStorage.setItem('idToken', response.idToken);
            NotificationManager.success('Success message');
        }
    }

    return (
        <div>
            <Menu isActive = {isActive}/>
            <Navbar 
                isActive = {isActive} 
                bgActive={bgActive} 
                onClickButton = {handleActive}
                onClickLogin={handleClickLogin}
            />
                    <Modal 
                    isOpen={isOpenModal}
                    title="Log in..."
                    onCloseModal={handleClickLogin}
                    >
                        <LoginForm
                            onSubmit={handleSubmitLoginForm}/>
                    </Modal>
        </div>

    );
}

export default MenuHeader;