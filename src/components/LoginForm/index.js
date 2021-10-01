import { useState } from "react";
import  Input from '../Input';

const LoginForm = ({onSubmit}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit && onSubmit({
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
                    type="text" 
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
            <button>
                Login
            </button>
            </form>
    )
}
export default LoginForm

