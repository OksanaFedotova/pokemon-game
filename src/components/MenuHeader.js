import { useState } from "react";
import Menu from "./Menu";
import Navbar from "./Navbar";

const MenuHeader = ({bgActive}) => {
   const [isActive, setActive] = useState(null);
   
   const handleActive = () => {
       setActive(prevState => !prevState)
    }
    return (
        <div>
            <Menu isActive = {isActive}/>
            <Navbar isActive = {isActive} bgActive={bgActive} onClickButton = {handleActive}/>
        </div>

    );
}

export default MenuHeader;