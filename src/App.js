import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import Footer from './components/Footer/Footer';
import PokemonCard from './components/PokemonCard/index';
import s from './App.css';
import POKEMONS from './pokemons.json';

import bg1 from './assets/bg1.jpeg';



const App = () => {
  return (
    <>
    <Header title='This is title' descr='This is Description!'/>
    <Layout title='Title' descr='Description' urlBg={bg1}>
    <p>In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid.</p>
    <p>Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the player's own color of red or blue.</p>
    </Layout>
    <Layout title='Title' descr='Description' colorBg='red'>
    <div className={s.flex}>
      {
      POKEMONS.map((pokemon) => <PokemonCard key={pokemon.id} type={pokemon.type} values={pokemon.values} 
      img={pokemon.img} name={pokemon.name} id={pokemon.id}/>
      )
    }
    </div>
    </Layout>
    <Layout title='Title' descr='Description' urlBg={bg1}/>
    <Footer/>
    </>
  )  
} 
export default App;
