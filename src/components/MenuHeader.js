import { useState } from "react";
import Menu from "./Menu";
import Navbar from "./Navbar";

const MenuHeader = () => {
    const [isActive, setActive] = useState(null);

    const handleActive = () => {
        setActive(!isActive)
    }
    return (
        <div>
            <Menu isActive = {isActive}/>
            <Navbar isActive = {isActive} onClickButton = {handleActive}/>
        </div>

    );
}

export default MenuHeader;