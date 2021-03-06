import { useEffect, useState } from "react";
import  Input from '../Input';

import s from './style.module.css';

const LoginForm = ({onSubmit, isResetField = false}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setLogin] = useState(true);

    useEffect(() => {
        setEmail('');
        setPassword('');
    }, [isResetField])

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit && onSubmit({
            type: isLogin ? 'login' : 'signup',
            email, 
            password
        });
        setEmail('');
        setPassword('');
    }
    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Input
                    type="email" 
                    name="Email"
                    value={email}
                    onChange={handleEmail}
                />
            </div>
            <div>
                <Input 
                    value={password}
                    type="password" 
                    name="Password" 
                    onChange={handlePassword}/>
            </div>
            <div className={s.flex}>
                <button>
                    { isLogin? 'Login': 'Signup' }
                </button>
                <div 
                    className={s.link}
                    onClick={() => setLogin(!isLogin)}
                >
                    { isLogin? 'Register': 'Login'}
                </div>
                </div>
            </form>
    )
}
export default LoginForm

