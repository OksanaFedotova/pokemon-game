import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import cn from 'classnames';
import {NotificationContainer} from 'react-notifications';

import MenuHeader from "./components/MenuHeader";
import Footer from "./components/Footer/Footer";
import GamePage from "./routes/Game";
import HomePage from "./routes/Home";

import { FireBaseContext } from "./context/FireBaseContext";
import FirebaseClass from "./services/firebase";

import 'react-notifications/lib/notifications.css';
import s from './style.module.css';
import PrivateRoute from "./components/PrivateRoute";



const App = () => {
  const location = useLocation();
  const isPadding = location.pathname === '/' || location.pathname === '/game/board';
  
  return (
    <FireBaseContext.Provider value={FirebaseClass}>
      <Switch>
        <Route path="/404" render={() => (
          <h1>404 Not Found</h1>
        )} />
        <Route>
          <>
            <MenuHeader bgActive={!isPadding}/>
            <div className={cn(s.wrap, {
              [s.isHomePage]: isPadding
            })}>
              <Switch>
                <Route path="/" exact component={HomePage}/>
                <Route path="/home" component={HomePage}/>
                <PrivateRoute path="/game" component={GamePage}/>
                <PrivateRoute path="/about" render={() => (
                  <h1>This page About</h1>
               )}/>
               <Route render={() => (
                  <Redirect to="/404" />
               )}/>
              </Switch>
            </div>
            <Footer />
          </>
        </Route>
      </Switch>
      <NotificationContainer/>
      </FireBaseContext.Provider>
  ) 
};

export default App;