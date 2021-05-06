import React from 'react';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchWord: "",
        }
    }
    handleChange = (evt)=>{
      this.setState((state)=>state[evt.target.name] = evt.target.value)
    }
    search = (evt)=>{
      let searchWord = this.state.searchWord.trim();
      if(searchWord.length > 0){
        this.props.searchCallback(searchWord.toLowerCase());
      }
    }

    annuler = ()=>{
      this.setState((state)=>state.searchWord = "")
      this.props.annulerSearch();
    }

    render(){
      return (
        <div>
          <input type="text" name="searchWord" onChange={this.handleChange} value={this.state.searchWord}/>
          <button className="Rechercher-Button" onClick={this.search}>Rechercher</button>
          <button className="Annuler-Button" onClick={this.annuler}>X</button>
        </div>)
    }
  }
