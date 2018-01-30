import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAWWyA2mrEqGOj8SNZTg2rN7BjzJ2PUXZM",
  authDomain: "thisischatboi.firebaseapp.com",
  databaseURL: "https://thisischatboi.firebaseio.com",
  projectId: "thisischatboi",
  storageBucket: "thisischatboi.appspot.com",
  messagingSenderId: "110772684693"
};
firebase.initializeApp(config);
const db = firebase.database();

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      messages: [],
      messagesLength: 0,
      userInput: ''
    };
  }

  componentDidMount(){
    //Keep connection open to firebase, storing it as this.state.messages.
    db.ref("messages").orderByValue().on("value", (snap) => { //.limitToLast(6)
      let messages = snap.val();
      if (messages) {
        this.setState({ messages });
        this.setState({messagesLength: messages.length});
      }else{
        db.ref('messages/' + 0 ).set({
          humanUser: "Let's chat!",
          robotUser: "Hello, this is robot, how can I help you?"
        });
      }
    });
  }

  handleSubmitListener(event){
    event.preventDefault();
    db.ref('messages/' + this.state.messagesLength).set({
      humanUser: this.state.userInput,
      robotUser: 'hello this is robotz'
    });
    console.log(this.state.messages + ' and length ' + this.state.messages.length);
  }

  deleteChat(event){
    db.ref('messages').remove();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome</h1>
          </header>
          <br/>
        <div className="message">
          <form onSubmit={this.handleSubmitListener.bind(this)}>
          <input value={this.state.userInput} onChange={(event) => {
            this.setState({ userInput: event.target.value });
          }}/>
          <button>
            Submit
          </button>
          </form>
          <p>Message Count: {this.state.messages.length -1}</p>
          <hr margin-top='2em' margin-bottom='2em' />
          <button onClick={this.deleteChat.bind(this)}>
            Delete Chat
          </button>
          <hr/>
          {this.state.messages.map( (item, key) => {
            return (
              <div>
                <div className='humanUser' >
                  {item.humanUser}
                </div>
                <div className='robotUser' >
                  {item.robotUser}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
