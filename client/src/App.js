import logo from './logo.svg';
import './App.css';
import CurrencyConverter from './components/CurrencyConverter';
import {Route,Switch} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Fpassword from "./components/Fpassword";

function App() {
  return (
    <div className="App">
     <Switch>
      <Route exact path='/currencyconverter' component={CurrencyConverter}/>
      <Route exact path='/' component={Signup}/>
      <Route exact path='/forgetpassword' component={Fpassword}/>
      <Route  path='/login' component={Login}/>
    </Switch>
    </div>
  );
}

export default App;
