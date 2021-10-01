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
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Input
                    type="text" 
                    name="Email"
                    value={email}
                    onChange={(val) => {console.log(val)}}
                />
            </div>
            <div>
                <Input 
                    value={password}
                    type="password" 
                    name="Password" 
                    onChange={(val) => {console.log(val)}}/>
            </div>
            <button>
                Login
            </button>
            </form>
    )
}
export default LoginForm

//(e) => setPassword(e.target.value)
//(event) => console.log(event)
//(e) => setEmail(e.target.value)