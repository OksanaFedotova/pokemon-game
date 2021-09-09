import hs from './header.module.css';

const Header = ({title, description}) => {
  return (
    <div>
      <header className={hs.root}>
        <div className={hs.forest}></div>
        <div className={hs.container}>
          { title? <h1>{title}</h1>: null }
          { description? <p>{description}</p>: null } 
          </div>
      </header>
    </div>
  )
}

export default Header;