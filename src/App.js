import React from "react";

import axios from "axios";

import "./App.css";

class App extends React.Component {
     state = {
          resultText: "",
          numOfGames: 1,
          changeDoor: false,
          error: undefined
     };

     async componentDidMount() {
          try {
               const response = await axios.get("http://localhost:3001");

               const data = response.data;

               console.log(data);
          } catch (error) {
               console.error(error);
               this.setState({ error: error.message });
          }
     }

     handleSubmit = async (e) => {
          try {
               e.preventDefault();

               const simulation = { numOfGames: this.state.numOfGames, changeDoor: this.state.changeDoor };

               const response = await axios.post("http://localhost:3001", simulation);
               const resultText = `Out of ${this.state.numOfGames} game(s) this is how many that was won: ${response.data}`;
               this.setState({ resultText: resultText });

               this.setState({ error: undefined });
          } catch (error) {
               console.log(error.message);
               this.setState({ error: error.message });
               this.setState({ resultText: "" });
          }
     };

     render() {
          return (
               <div>
                    <div className="header">
                         <h1>Welcome to the Monty Hall Problem Simulator</h1>
                    </div>

                    <form className="form" onSubmit={this.handleSubmit}>
                         <div className="form-item">
                              <label>Number of Games: </label>
                              <input
                                   value={this.state.numOfGames}
                                   type="number"
                                   onChange={(e) => {
                                        const numOfGames = e.target.value;
                                        this.setState(() => ({ numOfGames: numOfGames }));
                                   }}
                              />
                         </div>

                         <div className="form-item">
                              <label>Change door?</label>
                              <input
                                   type="checkbox"
                                   checked={this.state.changeDoor}
                                   onChange={() => {
                                        this.setState({ changeDoor: !this.state.changeDoor });
                                   }}
                              />
                         </div>
                         <div className="form-item">
                              <input type="submit" value="Submit" />
                         </div>
                    </form>

                    {this.state.error && <p>{this.state.error}</p>}

                    {this.state.resultText && <p>{this.state.resultText}</p>}
               </div>
          );
     }
}

export default App;
