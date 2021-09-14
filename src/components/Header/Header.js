import hs from './header.module.css';

const Header = ({title, description, onClickButton}) => {
  const handleClick = () => {
    console.log('<Header/>');
    onClickButton && onClickButton('game');
  }
  return (
    <div>
      <header className={hs.root}>
        <div className={hs.forest}></div>
        <div className={hs.container}>
          { title? <h1>{title}</h1>: null }
          { description? <p>{description}</p>: null } 
          <button onClick={handleClick}>
            Start Game
          </button>
          </div>
      </header>
    </div>
  )
}

export default Header;