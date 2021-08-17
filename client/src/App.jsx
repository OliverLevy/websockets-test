import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/Main";
import Documentation from "./pages/Documentation";

function App() {
  return (
    <main className="main">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/documentation">
            <Documentation />
          </Route>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
