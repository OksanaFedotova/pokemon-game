import ls from './layout.module.css';

const Layout = ({title, urlBg, colorBg, children}) => {
    const bgStyle ={
        backgroundImage: `url(${urlBg})`, 
        backgroundColor: colorBg
    };
    return (
      <div>
          <section className={ls.root} style={bgStyle}>
              <div className={ls.wrapper}>
                  <article>
                      <div className={ls.title}>
                          <h3>{title}</h3>
                <span className={ls.separator}></span>
                </div>
                <div className={`${ls.desc} ${ls.full}`}>
                    {children}
            </div>
        </article>
    </div>
</section>

      </div>
    )
  }
  
  export default Layout;