import Header from '../../components/Header/Header';
import Layout from '../../components/Layout/Layout';
import {useHistory} from 'react-router-dom';

import bg1 from './assets/bg1.jpeg';





const HomePage = () => {
  const history = useHistory();
    const handleClickButton = () => {
     history.push('/game');
    };

    return (
    <>
    <Header title='Card Pokemon Game' 
    descr='This is Description!'
    onClickButton={handleClickButton}
    />

    <Layout className='bg1' title='' descr='Description' urlBg={bg1}>
    <p>In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid.</p>
    <p>Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the player's own color of red or blue.</p>
    </Layout>
    <Layout title='' descr='To play you should register' colorBg='red'/>
    </>
  )  
} 
export default HomePage;
