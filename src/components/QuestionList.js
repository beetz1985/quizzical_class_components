import React from "react";
import CallApi from "../services/CallApi";
import Question from './Question'

class QuestionList extends React.Component {

    state = {
        quest: [],
        result: {
            questionsOver: false,
            gameOver: false,
            score: ""
        }
    }

    componentDidMount() {
        console.log("Mounted")
        CallApi(this.props)
            .then(data=>this.setState((s)=>{
                s.quest = data.map((v, i)=>{
                    return {
                        ...v,
                        id: i,
                        userAnswer: "",
                        allAnswers: [...v.incorrect_answers, v.correct_answer].sort(()=>Math.random() - 0.5),
                    }
                })
                return s
            }))
    }


    componentDidUpdate(prevProps, prevState) {
        console.log("updated")
        console.log(this.state.quest)
        const allQs = this.state.quest.every(v=>(v.userAnswer !== "")) 
                        && (this.state.quest.length !== 0);

        if(allQs && !prevState.result.questionsOver) {
            this.setState((s)=>{
                s.result.questionsOver = true
                return s
            })
        }
    }

    
    handleSelect = (e) =>{
        const {id, value} = e.target;
        this.setState((s)=>{
            s.quest.map((v)=>{
                if(v.id === Number(id)) v.userAnswer = value;
                return v
            })
            return s
        })
    }

    handleCheck = (e) =>{
        let points = 0;
        this.state.quest.forEach((v)=>{
            if(v.userAnswer === v.correct_answer) points++
        })

        this.setState((s)=>{
            s.result.gameOver = true;
            s.result.score = points;
            return s;
        })
    }

    handleReset = () => {
        this.setState({
            quest: [],
            result: {
                questionsOver: false,
                gameOver: false,
                score: ""
            }
        });

        this.props.mainReset();
    }

    render() {
        const questionEl = this.state.quest.map((v,i)=>{
            return <Question key={i} {...v} result={this.state.result} boxSelect={this.handleSelect}/>
        })

        return (
            <>
            {questionEl}
            <br/>
            <br/>

            {
                this.state.result.gameOver
                ?
                <>
                <h3>You have Scored {this.state.result.score}/{this.state.quest.length}</h3>
                <button onClick={this.handleReset}>Play Again</button>
                </>
                :
                <button disabled={!this.state.result.questionsOver} onClick={this.handleCheck}>Check Results</button>
            }
            </>
        )  
  }
 
}

export default QuestionList;
