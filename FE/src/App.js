import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Profile from "./pages/Profile";
import Main from "./components/layout/Main";
// import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { useWebSocketStore } from "./stores";
import {useEffect} from 'react'


function App() {
  const { connect, closeConnection } = useWebSocketStore();

  useEffect(() => {
    connect('ws://localhost:8080');

    return () => {
      closeConnection();
    };
  }, [connect, closeConnection]);

  return (
    <div className="App">
      <Switch>
        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/tables" component={Tables} />
          <Route exact path="/profile" component={Profile} />
          <Redirect from="*" to="/dashboard" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
