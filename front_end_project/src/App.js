import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Patient from './Patient';
import Doctor from './Doctor';

const App = ()=>{
  return(
    
    <Router>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/patient/:uuid" component={Patient} />
        <Route path="/doctor/:uuid" component={Doctor} />
        <Route path="/" component={SignIn} />
      </Switch>
    </Router>
    
  );
}
export default App;