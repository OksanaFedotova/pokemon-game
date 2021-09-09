import hs from './header.module.css';

const Header = ({title, description}) => {
  return (
    <div>
      <header className={hs.root}>
        <div className={hs.forest}></div>
        <div className={hs.container}>
          <h1>{title}</h1>
          <p>{description}</p>
          </div>
      </header>
    </div>
  )
}

export default Header;