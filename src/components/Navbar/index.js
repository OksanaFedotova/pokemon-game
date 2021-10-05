import cn from 'classnames';
import s from './style.module.css';

import {ReactComponent as LoginSVG} from './assets/login.svg'

const Navbar = ({isActive, bgActive = false, onClickButton, onClickLogin}) => {

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
                        LOGO
                    </p>
                    <div className={s.loginAndMenu}>
                        <div 
                            className={s.loginWrap}
                            onClick={onClickLogin}
                        >
                            <LoginSVG />
                        </div>
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