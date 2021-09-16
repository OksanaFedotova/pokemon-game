import cn from 'classnames';
import s from './style.module.css';

const Navbar = ({isActive, bgActive = false, onClickButton}) => {

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
                    <a className={cn(s.menuButton, {[s.active]: isActive}, s.bgActive)} onClick={changeNavBar} href='#s'>
                    <span/>
                    </a>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;