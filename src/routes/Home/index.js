import Header from '../../components/Header/Header';
import Layout from '../../components/Layout/Layout';


import bg1 from './assets/bg1.jpeg';



const HomePage = ({ onChangePage }) => {

    const handleClickButton = () => {
      onChangePage && onChangePage('game');
    };

    return (
    <>
    <Header title='This is title' 
    descr='This is Description!'
    onClickButton={handleClickButton}
    />

    <Layout title='Title' descr='Description' urlBg={bg1}>
    <p>In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid.</p>
    <p>Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the player's own color of red or blue.</p>
    </Layout>
    <Layout title='Title' descr='Description' colorBg='red'>
    </Layout>
    <Layout title='Title' descr='Description' urlBg={bg1}/>
    </>
  )  
} 
export default HomePage;
