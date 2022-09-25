import React from "react";
import QuestionList from "./components/QuestionList";

class App extends React.Component {

  state = {
    gameLive: false,
    form: {
      category: "",
      difficulty: "",
      questionCount: 5
    }
  }


  handleOnChange = (e) => {
    const {name, value} = e.target;

    this.setState((s)=>{
      const newObj = {...s}
      newObj.form[name] = value
      return newObj
      
    })
  }

  handleStartGame = () =>{
    this.setState((s)=>{
      return {
        ...s,
        gameLive: true
      }
    })
  }
  
  reset = () => {
    this.setState({
      gameLive: false,
      form: {
        category: "",
        difficulty: "",
        questionCount: 5
      }
    });
  }

  render() {
    //console.log(this.state)
    return (

      <>

        {
          this.state.gameLive
          ?
          <QuestionList {...this.state.form} mainReset={this.reset}/>
          :
          <form>
            <fieldset>
              <select name="category" value={this.state.form.category} onChange={this.handleOnChange}>
                <option value="any">--Any--</option>
                <option value="18">Science: Computers</option>
                <option value="19">Science: Mathematics</option>
                <option value="20">Mythology</option>
              </select>
              <br/>
              <br/>
              <select name="difficulty" value={this.state.form.difficulty} onChange={this.handleOnChange}>
                <option value="any">--Any--</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <br/>
              <br/>
              <input name="questionCount" type="number" min="1" max="20" value={this.state.form.questionCount} onChange={this.handleOnChange}/>
              <br/>
              <br/>
              <button onClick={this.handleStartGame}>Play Game</button>      
            </fieldset>
            <br/>
            <br/>
          </form>
        }

      </>

    )  
  }
 
}

export default App;
