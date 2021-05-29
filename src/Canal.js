import React from 'react'

export default class Canal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            canaux:[],
            canauxCount: 0,
            currentPage: 0,
            perPage: 4,
            pageCount: 1,
            searchWord: ""

        }
    }


    getcanaux = () => {
        CanalService.getCanaux().then((response) => {
            console.log(response.data);
            this.setState({ canaux: response.data })
        }, (error) => {
            console.log(error);
        })
    }

    deleteCanal = (canalId => {
        // suppression d'un canal
      CanalService.deleteCanal(canalId).then((response) => {
            this.setState({
                canaux: this.state.canaux.map((canal) => canal.id === canalId ? response.data : canal)
            })
            this.props.history.push(`/public/canaux/delete/`+ canalId)
        }
            , (error) => {
                console.log(error);
                if (error.response) {
                    if (error.response.status === 403) {
                        alert("Accès refusé : Connectez-vous en tant que Formateur ou etudiant pour supprimer un canal")
                        this.props.history.push(`/login`)
                    }
                }
            })
        
        }
    )

    showForm = (canal) => {
        this.setState({ startEditing: true, canal: canal });
    }

    cancel = () => {
        this.setState({ startEditing: false, canal: {} });
    }

    save = (canal) => {
        console.log(canal);
        //ajout d'une nouvelle canal
        if (!canal.id) {
            CanalService.createCanal(canal).then((response) => {
                console.log(response.data);
                //this.getEvaluationsCount();
                this.props.history.push(`/public/canaux/create`)
                //this.setCurrentPage(this.state.pageCount - 1)
            }, (error) => {
                console.log(error);
                if (error.response) {
                    if (error.response.status === 403) {
                        alert("Accès refusé : Connectez-vous en tant que Formateur pour créer un canal")
                        this.props.history.push(`/login`)
                    }
                }
            })
        }
        else {
            // modification d'un canal
            CanalService.editCanal(evaluation).then((response) => {
                this.setState({
                    canaux: this.state.canaux.map((canal) => canal.id === canal.id ? response.data : canal)
                })
                this.props.history.push(`/canaux/edit`)
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

    render(){

        console.log(this.props.match);

        return(
            <React.Fragment>
                <div className="App-header">
                <Link to={this.props.match.url + '/create'}><button className="Add-Button">Creer un canal</button></Link>)
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
                        canaux={this.state.canaux}
                        deleteCallback={this.deleteCanal}
                        />
                    
                    }/>
                        

                    </Switch>





            </React.Fragment>
           




        )
    }





    
    }



