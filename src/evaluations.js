import React from "react";
import EvaluationFormulaire from "./EvaluationFormulaire";
import EvaluationService from './EvaluationService'
import { Link, Route, Switch } from 'react-router-dom';
import EvaluationListe from "./EvaluationListe";
import SearchBar from "./SearchBar";


export default class Evaluations extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            evaluations:[],
            evaluationsCount: 0,
            currentPage: 0,
            perPage: 4,
            pageCount: 1,
            searchWord: ""


        }

    }

    setCurrentPage = (currentPage) => {
        console.log(currentPage);
        this.setState({ currentPage: currentPage });
        this.getEvaluations(currentPage, this.state.perPage, this.state.searchWord);
    }
    setPerPage = (perPage) => {
        this.setState({ perPage: perPage });
        this.getEvaluations(this.state.currentPage, perPage, this.state.searchWord);
    }
    getEvaluations = (pageNumber = this.state.currentPage, perPage = this.state.perPage, searchWord = "") => {
        EvaluationService.getEvaluations(pageNumber, perPage, searchWord).then((response) => {
            console.log(response.data);
            this.setState({ evaluations: response.data })
        }, (error) => {
            console.log(error);
        })
    }
    getEvaluationsCount = (searchWord = "") => {
        fetch(`http://localhost:8080/api/public/count?searchWord=${searchWord}`, {
            method: "GET"
        })
            .then((data) => {
                console.log(data);
                return data.json()
            })
            .then((res) => {
                console.log(res);
                this.setState({
                    evaluationsCount: res.evaluationsCount,
                    pageCount: Math.ceil(res.evaluationsCount / this.state.perPage)
                }
                )
            })
    }

    deleteEvaluation = (evaluationId => {
        // suppression d'une evaluation
        EvaluationService.deleteEvaluation(evaluationId).then((response) => {
            this.setState({
                evaluations: this.state.evaluations.map((evaluation) => evaluation.id === evaluationId ? response.data : evaluation)
            })
            this.props.history.push(`/evaluations?currentPage=${this.state.currentPage}&searchWord=${this.state.searchWord}`)
        }
            , (error) => {
                console.log(error);
                if (error.response) {
                    if (error.response.status === 403) {
                        alert("Accès refusé : Connectez-vous en tant que Formateur pour supprimer une evaluation")
                        this.props.history.push(`/login`)
                    }
                }
            })
        
        }
    )

    showForm = (evaluation) => {
        this.setState({ startEditing: true, evaluation: evaluation });
    }

    cancel = () => {
        this.setState({ startEditing: false, evaluation: {} });
    }

    save = (evaluation) => {
        console.log(evaluation);
        //ajout d'une nouvelle evaluation
        if (!evaluation.id) {
            EvaluationService.createEvaluation(evaluation).then((response) => {
                console.log(response.data);
                this.getEvaluationsCount();
                this.props.history.push(`/evaluations?currentPage=${this.state.pageCount - 1}&searchWord=${this.state.searchWord}`)
                this.setCurrentPage(this.state.pageCount - 1)
            }, (error) => {
                console.log(error);
                if (error.response) {
                    if (error.response.status === 403) {
                        alert("Accès refusé : Connectez-vous en tant que Formateur pour créer une evaluation")
                        this.props.history.push(`/login`)
                    }
                }
            })
        }
        else {
            // modification d'une evaluation
            EvaluationService.editEvaluation(evaluation).then((response) => {
                this.setState({
                    evaluations: this.state.evaluations.map((evaluation) => evaluation.id === evaluation.id ? response.data : evaluation)
                })
                this.props.history.push(`/evaluations?currentPage=${this.state.currentPage}&searchWord=${this.state.searchWord}`)
            }
                , (error) => {
                    console.log(error);
                    if (error.response) {
                        if (error.response.status === 403) {
                            alert("Accès refusé : Connectez-vous en tant que Formateur pour modifier une evaluation")
                            this.props.history.push(`/login`)
                        }
                    }
                })
        }
    }

    search = (searchWord) => {
        this.getEvaluations(0, this.state.perPage, searchWord);
        this.getEvaluationsCount(searchWord);
        this.setState({ searchWord: searchWord, currentPage: 0 });
        this.props.history.push(`/evaluations?currentPage=${this.state.currentPage}&searchWord=${searchWord}`);
    }
    clearSearchWord = () => {
        this.setState({ searchWord: "" });
        this.props.history.push(`/evaluations?currentPage=0`);
        this.getEvaluations();
        this.getEvaluationsCount();
    }
    render() {
        console.log(this.props.match);
        const isFormateur = this.props.currentUser && this.props.currentUser.roles && this.props.currentUser.roles.includes("ROLE_FORMATEUR");
        return (
            <React.Fragment>
                <div className="App-header">
                    {(isFormateur && <Link to={this.props.match.url + '/create'}><button className="Add-Button">Créer une evaluation</button></Link>)}
                    <SearchBar searchCallback={this.search} annulerSearch={this.clearSearchWord} />
                </div>
                <Switch>
                    <Route path={this.props.match.path + '/create'} render={
                        (props) => <EvaluationFormulaire {...props} saveCallback={this.save} />
                    } />
                    <Route path={this.props.match.path + '/edit/:id'} render={
                        (props) => <EvaluationFormulaire {...props} saveCallback={this.save} />
                    } />
                    
                    <Route exact path={this.props.match.path + '/'} render={
                        (props) => <EvaluationListe {...props}
                            currentUser={this.props.currentUser}
                            searchWord={this.state.searchWord}
                            search={this.search}
                            clearSearchWord={this.clearSearchWord}
                            evaluations={this.state.evaluations}
                            sCount={this.state.evaluationsCount}
                            currentPage={this.state.currentPage}
                            perPage={this.state.perPage}
                            pageCount={this.state.pageCount}
                            setCurrentPage={this.setCurrentPage}
                            deleteCallback={this.deleteEvaluation} 
                              />
                    } />
                </Switch>

            </React.Fragment>

        );
    }
    componentDidMount() {
        //this.getEvaluationsCount();
        this.getEvaluations();
        

    }
}