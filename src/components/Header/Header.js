import { useHistory } from 'react-router';
import hs from './header.module.css';

const Header = ({title, description}) => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/game');
}
  return (
    <div>
      <header className={hs.root}>
        <div className={hs.forest}></div>
        <div className={hs.silhouette}></div>
        <div className={hs.moon}></div>
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