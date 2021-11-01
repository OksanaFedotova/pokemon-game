import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import cn from 'classnames';
import {NotificationContainer} from 'react-notifications';
import PrivateRoute from "./components/PrivateRoute";
import { useEffect } from "react";

import MenuHeader from "./components/MenuHeader";
import Footer from "./components/Footer/Footer";
import GamePage from "./routes/Game";
import HomePage from "./routes/Home";
import AboutPage from "./routes/AboutPage";
import User from "./routes/User";

import { FireBaseContext } from "./context/FireBaseContext";
import FirebaseClass from "./services/firebase";

import 'react-notifications/lib/notifications.css';
import s from './style.module.css';
import { useDispatch, useSelector } from "react-redux";
import { getUserAsync, selectUserLoading } from "./store/user";

const App = () => {
  const isUserLoading = useSelector(selectUserLoading);
  const location = useLocation();
  const isPadding = location.pathname === '/' || location.pathname === '/game/board';
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAsync())
  }, []);

  if (isUserLoading) {
    return 'Loading...' 
  }

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
                <Route path="/game" component={GamePage}/>
                <Route path="/about" component={AboutPage}/>
                <PrivateRoute path="/user" component={User}/>
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