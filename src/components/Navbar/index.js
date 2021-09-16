import cn from 'classnames';
import s from './style.module.css';

const Navbar = ({isActive, onClickButton}) => {

    const changeNavBar = () => {
        console.log(onClickButton);
        console.log(isActive);
        onClickButton && onClickButton();
    }

    return (
        <div>
            <nav className={s.root}>
                <div className={s.navWrapper}>
                    <p className={s.brand}>
                        LOGO
                    </p>
                    <a className={cn(s.menuButton, {[s.active]: isActive})} onClick={changeNavBar} href='#s'>
                    <span/>
                    </a>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;