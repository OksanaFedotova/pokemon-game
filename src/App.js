import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import Footer from './components/Footer/Footer';
import bg1 from './assets/bg1.jpeg';

//console.log(bg1);

const App = () => {
  return (
    <>
    <Header title='This is title' descr='This is Description!'/>
    <Layout title='Title' descr='Description' urlBg={bg1}/>
    <Layout title='Title' descr='Description' colorBg='red'/>
    <Layout title='Title' descr='Description' urlBg={bg1}/>
    <Footer/>
    </>
  )  
} 
export default App;
