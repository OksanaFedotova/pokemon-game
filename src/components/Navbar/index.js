import cn from 'classnames';
import s from './style.module.css';

import {ReactComponent as LoginSVG} from './assets/login.svg';
import {ReactComponent as UserSVG} from './assets/user.svg';
import { useSelector } from 'react-redux';
import { selectUserLoading, selectLocalId } from '../../store/user';
import { Link } from 'react-router-dom';
import  logo  from './assets/logo.png'

const Navbar = ({isActive, bgActive = false, onClickButton, onClickLogin}) => {
    const isLoadingUser = useSelector(selectUserLoading);
    const localId = useSelector(selectLocalId);

    const changeNavBar = () => {
        onClickButton && onClickButton();
    }
    return (
        <div>
            <nav id={s.Navbar} className={cn(s.root, {
                [s.bgActive]: bgActive
            })}>
                <div className={s.navWrapper}>
                    <p className={s.brand}>
                        <img className={s.logo} src={logo} alt={"logo"}/> 
                    </p>
                    <div className={s.loginAndMenu}>
                        {(!isLoadingUser && !localId) && (
                            <div 
                            className={s.loginWrap}
                            onClick={onClickLogin}
                        >
                            <LoginSVG />
                        </div>
                        )}
                        {(!isLoadingUser && localId) && (
                            <Link 
                            className={s.loginWrap}
                            to="/user"
                        >
                            <UserSVG />
                        </Link>
                        )}
                        <a className={cn(s.menuButton, {[s.active]: isActive}, s.bgActive)} onClick={changeNavBar} href='#s'>
                        <span/>
                    </a>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;