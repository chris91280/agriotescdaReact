import React from 'react'
import QuestionService from './QuestionService'



export default class Questions extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            questions:[],
            question:"",
            
        }
    }

    getQuestions = (questions) =>{
        QuestionService.getQuestions(questions).then((response) => {
            console.log(response.data);
            this.setState({ questions: response.data })
        }, (error) => {
            console.log(error);
        })

   
}

render(){
    return(
        <h2>{this.question.ennonce}</h2>

        
            


                

    

            



        


      


    )
    
}


componentDidMount() {
    this.getEvaluationsCount();
    //this.getQuestions();
    
    
}
}