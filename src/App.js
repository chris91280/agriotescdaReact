import React from 'react';

import './App.css';
import {Link, Route} from 'react-router-dom';
import Login from './Login';
import AuthService from './AuthService';
import AccessDenied from './AccessDenied';
import Evaluations from './evaluations';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentUser : undefined,
      
    }
  }
  

  setCurrentUser = (user)=>{
    console.log(user);
    this.setState({currentUser: user})
  }

  logOut = () =>{
    AuthService.logout();
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <Link to ="/evaluations?currentPage=0"><button class="Header-button">evaluations</button></Link>
          <Link to ="/cours"><button class="Header-button">Cours</button></Link>
          <Link to ="/salon"><button class="Header-button">Salons</button></Link>
          <Link to ="/planning"><button class="Header-button">Planning</button></Link>
          <Link to ="/devoirs"><button class="Header-button">Devoirs</button></Link>
          {(this.state.currentUser) && <div>
                                        <span>{this.state.currentUser.username} | </span>
                                        <a href="/login" className="nav-link" onClick={this.logOut}>
                                          Se déconnecter
                                        </a>
                                      </div>}
          {(!this.state.currentUser) && <Link to="/login">Se connecter</Link>}
        </header>
        <main>
          <Route path = "/evaluations" render={(props)=> <Evaluations {...props} currentUser={this.state.currentUser}/>}/>
          <Route path="/login" render={(props)=> <Login {...props} setCurrentUser={this.setCurrentUser} />}/>
          <Route path="/access_denied" component={AccessDenied}/>
        </main>
      </div>
    );
  }
  componentDidMount(){
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    this.setState({currentUser : AuthService.getCurrentUser(), panier: panier})
  }
  componentDidUpdate(){
    console.log("componentDidUpdate");
    localStorage.setItem("panier", JSON.stringify(this.state.panier));
  }
}

export default App;