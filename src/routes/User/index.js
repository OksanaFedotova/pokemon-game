import { useSelector, useDispatch } from "react-redux";
import { removeUser, selectUser } from '../../store/user';
import { useHistory } from 'react-router-dom';

const User = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const date = new Date(+user.createdAt).toLocaleDateString();
    const history = useHistory();

    const handleClick = () => {
        dispatch(removeUser());
        history.push('/')
    }
    return (
        <>
         <ul>
          <li>Email: {user.email}</li>
          <li>CreatedAt: {date}</li>
          </ul>
          <button onClick={handleClick}>Logout</button>
        </>
    );

};

export default User;