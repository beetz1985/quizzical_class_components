import React from "react";

class Question extends React.Component {

  render() {

    const ansEls = this.props.allAnswers.map((v, i)=>{
        const style = {
            backgroundColor: (this.props.userAnswer === v) ? "lightgreen" : 
            (this.props.correct_answer === v && this.props.result.gameOver) ? "red" : ""
        }
        return <button style={style} key={i+100} id={this.props.id} value={v} onClick={this.props.boxSelect}>{v}</button>
    })

    return (
    <>
    <h3>{this.props.question}</h3>
        {ansEls}
    </>
      
      
    )  
  }
 
}

export default Question;
