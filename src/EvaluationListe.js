import React from "react";
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import SearchBar from "./SearchBar"

export default class EvaluationListe extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            netWorkError:false,
            startEditing: false,
            evaluation: {},
            evaluations: []

    }
}

    handlePageClick = ({selected}) =>{
        console.log(selected);
        this.props.setCurrentPage(selected);
        this.props.history.push(this.props.match.url + "?currentPage="+selected+"&searchWord="+this.props.searchWord)

}

    render(){

        console.log(this.props);
        const isFormateur = this.props.currentUser && this.props.currentUser.roles.includes("ROLE_FORMATEUR");
        return (
            <React.Fragment>
                {!!this.props.searchWord && (<div>{this.props.produitsCount} produit(s) trouvés. Voici les résultats pour le mot-clé "{this.props.searchWord}"</div>)}
                <ReactPaginate
                    previousLabel={"← Previous"}
                    nextLabel={"Next →"}
                    initialSelected={this.props.currentPage}
                    forcePage={this.props.currentPage}
                    pageCount={this.props.pageCount}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                    
                />
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>date_de_creation</th>
                            <th>intitule</th>
                            <th>description</th>
                            <th>durée</th>
                            <th>note</th>
                            <th>csv_filename</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.evaluations.map((evaluation) =>{
                            return (<tr key={evaluation.id}>
                                <td>{evaluation.id}</td>
                                <td>{evaluation.date_de_creation}</td>
                                <td>{evaluation.intitule}</td>
                                <td>{evaluation.description}</td>
                                <td>{evaluation.durée}</td>
                                <td>{evaluation.note}</td>
                                <td>{evaluation.csv_filename}</td>
                                <td>
                                    <Link to = {this.props.match.url + '/'+evaluation.id}>Afficher</Link>
                                    <Link style={isFormateur ? {}: {display: "none" }} to={this.props.match.url + '/edit/'+evaluation.id}>Modifier</Link>
                                    <button style={isFormateur ? {}: {display: "none" }}  onClick={() => this.props.deleteCallback(evaluation.id)}>Supprimer</button>
                                </td>
                                    
                                
                                
                                
                                
                               </tr> )

                        })}

                    </tbody>

                </table>
            </React.Fragment>
        )

        
    }

    componentDidMount(){
        console.log("EvaluationList Componentdidmount called");
        let search = this.props.location.search;
        search = search.trim();
        search = search.split("&");
        let currPage = 0;
        let searchWord = "";
        for (let index = 0; index < search.length; index++) {
            let temp = search[index].split("=");
            if (index === 0) {
                if(temp.length === 2){
                    currPage = temp[0].indexOf("currentPage") >= 0 ? temp[1] : 0;
                }
            }
            else if(index === 1){
                if(temp.length === 2){
                    searchWord = temp[0].indexOf("searchWord") >= 0 ? temp[1] : "";
                }
            }
        }
        if (searchWord !== "") {
            this.props.search(searchWord);
            this.props.history.push(this.props.match.url + "?currentPage="+currPage + "&searchWord="+ searchWord);
        }
        else{
            this.props.setCurrentPage(parseInt(currPage));
            this.props.history.push(this.props.match.url + "?currentPage="+currPage)
        }
    }
}


