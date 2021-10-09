import { useRouteMatch, Route, Switch } from "react-router-dom";

import StartPage from './routes/Start/StartPage.js';
import BoardPage from './routes/Board/BoardPage.js';
import FinishPage from './routes/Finish/FinishPage.js';



const GamePage = () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/`} exact component={StartPage} />
            <Route path={`${match.path}/board`} component={BoardPage} />
            <Route path={`${match.path}/finish`} component={FinishPage} />
        </Switch>
    );
};

export default GamePage;