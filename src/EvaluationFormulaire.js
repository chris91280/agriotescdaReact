import React from 'react';
import './App.css';
import AuthService from './AuthService';


export default class EvaluationFormulaire extends React.Component{
    constructor(props){
        super(props);
        console.log("props"+ props);
        this.state =  {
            evaluation:{
                id : "",
                date_de_creation : "",
                intitule : "",
                description : "",
                durée:"",
                note:"",
                csv_filename:""



            }

        }
    }

    handlechange = (evt) => {
        console.log ("evt" + evt);
        evt.persist();
        let field = evt.target.name
        let value = evt.target.value;
        this.setState((state) => state.evaluation[field] = value)
    }

    cancel = (evt) =>{
        evt.preventDefault();
        this.props.history.push("/evaluations")
    }

    save = (evt) =>{
        evt.preventDefault();
        this.props.saveCallback(this.state.evaluation);
        console.log(this.state.evaluation);


        let evaluation = {
            id: this.state.evaluation.id || null,
            date_de_creation: this.state.date_de_creation || this.state.evaluation.date_de_creation,
            intitule: this.state.intitule || this.state.evaluation.intitule,
            description: this.state.description || this.state.evaluation.description,
            durée: this.state.durée || this.state.evaluation.durée,
            note: this.state.note || this.state.evaluation.note,
            csv_filename: this.state.csv_filename || this.state.evaluation.csv_filename
        }
        console.log("evaluation : " + evaluation.intitule);
         this.props.saveCallback(evaluation);
        
    }

    saveBdd = (evaluation) => {
        console.log("saving " + evaluation.intitule);
        if (!this.props.match.params.id) {
            console.log("saving create");
            fetch("http://localhost:8080/evaluations/create", {
                method: "POST", 
                headers: {"Content-type": "application/json", "Access-Control-Allow-Origin": "http://localhost:8080", 'Accept' :'application/json', 'Authorization': '*'},
                body: JSON.stringify(evaluation)
            }).then((data) => data.json())
                    console.log("saved");
                }
                
        else {
            console.log("saving modif"+ this.props.match.params.id);
            fetch(`http://localhost:8080/evaluations/edit/${this.props.match.params.id}`, {
                method: "PUT",
                headers: {"Content-type": "application/json", "Access-Control-Allow-Origin": "http://localhost:8080", 'Accept' :'application/json', 'Authorization': '*'},
                body: JSON.stringify(evaluation)
            })
                .then((data) => data.json())
            }
        this.props.history.push('/evaluations');
    }

    render(){
        const edit = !!this.props.match.params.id;
        const evaluation = this.state.evaluation || {};
        return(
            <form>
                <div style = {edit ? {} : {display:'none'}}>
                    id : <input type ="id" readOnly value = {evaluation.id ? evaluation.id : 0}/>
                </div>
                <div>
                    date de creation : <input type ="date de creation" value = {evaluation.date_de_creation} onChange={this.handlechange}/>
                </div>
                <div>
                    intitulé : <input type = "intitule" value = {evaluation.intitule} onChange={this.handlechange}/>
                </div>
                <div>
                    description : <input type ="description" value = {evaluation.description} onChange={this.handlechange}/>
                </div>
                <div>
                    durée : <input type ="durée" value = {evaluation.durée} onChange={this.handlechange}/>
                </div>
                <div>
                note : <input type ="note" value = {evaluation.note} onChange={this.handlechange}/>
                </div>
                <div>
                    csv-Filename : <input type ="file" value ={evaluation.csv_filename} onChange={this.handlechange}/>
                </div>

                <div>
                    <button onClick={this.save}>{edit ? "Modifier":"Creer"}</button>
                    <button onClick={this.cancel}>Annuler</button>
                </div>



            </form>

        )
    }

    componentDidMount(){
        //vérifier l'autorisation

        const currUser = AuthService.getCurrentUser();
        const isFormateur = AuthService.isFormateur(currUser);
        if (!isFormateur) {
            this.props.history.push("/access_denied")
        }
        const id=this.props.match.params.id;
        if (id) {
            fetch(`http://localhost:8080/api/public/evaluations/${id}`, {
            method: "GET"
          })
          .then((data)=>{
              console.log(data);
              return data.json()
            })
          .then((res)=> {
            console.log(res);
            this.setState({
                produit: res
              }
              )
          })
        }
        
        
    }
}
    


    







    
    




