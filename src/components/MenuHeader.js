import { useState } from "react";
import { NotificationManager } from 'react-notifications';
import { useDispatch } from "react-redux";
import { getUserUpdateAsync } from "../store/user";

import LoginForm from "./LoginForm";
import Menu from "./Menu";
import Modal from "./Modal";
import Navbar from "./Navbar";

const loginSignupUser = async ({email, password, type}) => {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
        })
    };
    switch (type) {
        case 'signup':
            return await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAFfakVfKBqJlmGqcUJE7ar-UaarQuY4IY', requestOptions).then(res => res.json());
        case 'login':
            return await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAFfakVfKBqJlmGqcUJE7ar-UaarQuY4IY', requestOptions).then(res => res.json());
        default:
            return 'error';
    }
}
const MenuHeader = ({bgActive}) => {

   const [isActive, setActive] = useState(null);
   const [isOpenModal, setOpenModal] = useState(false);
   const dispatch = useDispatch();
   
   const handleActive = () => {
       setActive(prevState => !prevState)
    };

    const handleClickLogin = () => {
        setOpenModal(prevState => !prevState)
    };

    const handleSubmitLoginForm = async ({email, password, type}) => {
        const response = await loginSignupUser({email, password, type});
        if(response.hasOwnProperty('error')) {
            NotificationManager.error(response.error.message, 'Wrong!');
        } else {
            if(type === 'signup') {
                const pokemonsStart = await fetch ('https://reactmarathon-api.herokuapp.com/api/pokemons/starter').then(res => res.json())
                for (const pokemon of pokemonsStart.data) {
                    await fetch(`https://pokemon-game-d7cd7-default-rtdb.firebaseio.com/${response.localId}/pokemons.json?auth=${response.idToken}`, {
                        method: "POST",
                        body: JSON.stringify(pokemon)

                    });
                }
            }
            localStorage.setItem('idToken', response.idToken);
            NotificationManager.success('Success message');
            dispatch(getUserUpdateAsync());
            handleClickLogin();
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
                            isResetField={!isOpenModal}
                            onSubmit={handleSubmitLoginForm}/>
                    </Modal>
        </div>

    );
}

export default MenuHeader;