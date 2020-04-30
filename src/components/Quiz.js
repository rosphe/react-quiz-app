import styles from './Quiz.module.css';
import React from 'react';
import Score from'./Score'

import Question from './Question';

class Quiz extends React.Component {

  constructor(props){
    super(props)
  
    this.state ={
      playerScore: 0,
      questionsAnswered: 0,
      quizInstance: null
      
    }

  }

  updateScore= async (currentScore)=>{
    console.log("is number in quiz component", Number.isInteger(currentScore))
    console.log("player score in quiz component", this.state.playerScore)
    console.log("player score update quiz component",this.state.playerScore+currentScore)
    
    await this.setState({
      playerScore: this.state.playerScore+currentScore
      
    }) 

    let playerObj={
      score: this.state.playerScore,
      playerName: this.props.currentPlayer
    }

    //this.props.score(this.state.playerScore) 
    this.props.score(playerObj)
    console.log("quiz instance player", this.state.playerScore)
  }
  
  updateAnsweredQuestions= async (currentAnswered)=>{
    await this.setState({
      questionsAnswered: this.state.questionsAnswered+currentAnswered
      
    })

    this.props.answeredQuestions(this.state.questionsAnswered) 

  }


  refreshPage = () => {
    window.location.reload(false);
  }


      getQuizApi = async (userData) => {

        const categoryNumber = userData.category;
        const difficulty = userData.difficulty;
    
        const apiCall = await fetch(`https://opentdb.com/api.php?amount=5&category=${categoryNumber}&difficulty=${difficulty}&type=multiple`);
        const data = await apiCall.json();

    
        console.log("first question from api", data.results[0].question);
        
        this.setState({
             quizInstance: data.results
        })
  
    
    }


       componentDidMount =()=>{

      this.getQuizApi(this.props.playerInfo)
    
    }
    

    render() {
      return (
        this.state.quizInstance === null ? `waiting for ${this.props.currentPlayer}s round to load load`:

          <div>


            <div>
              {this.props.score}
              {this.props.currentPlayer}
            <div/>
            
          <div className={styles.startButtonDiv}>
              <button className={styles.startButton} onClick={this.refreshPage}>Start New Quiz!</button>
            </div>

            <div>
             {this.props.currentPlayer} you are being quizzed on {this.props.playerInfo.categoryName}
           
            </div>
            
            <div>
              

              {this.state.quizInstance.map((questionItem) => 
              <Question questionData={questionItem} 
              latestPoint={this.updateScore} 
              answeredQuestions={this.updateAnsweredQuestions}/>)}


            </div>
            
      
          
          </div>
        
    
        // <div className={styles.quizDiv}>
        // <h3 className={styles.question}>Question : {this.props.questions}</h3>

        // {/* // display answers - find a way to randomise and space the answers out in button form */}
        // <h3 className={styles.question}>Answer : {this.props.answers} {this.props.incorrect}</h3>
        // </div>
    )
  }
}


export default Quiz;
