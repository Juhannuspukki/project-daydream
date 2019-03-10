import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import ListComponent from "./ListComponent";
import TextComponent from "./TextComponent";
import FacultyGraphs from "./FacultyGraphs";
import Course from "./Course";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      showAll: false,
      showAbsolutes: false,
      year: "18-19",
      sort: {
        column: "grade",
        direction: "desc"
      }
    };
    
    this.saveState = this.saveState.bind(this);
  }
  
  saveState(data) {
    this.setState(data);
  }
  
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/'
                 render={(props) => (<ListComponent {...props} settings={this.state} saveState={this.saveState} />)}
          />
          <Route path='/wtf' component={TextComponent}/>
          <Route path='/faculty-o-meter' component={FacultyGraphs}/>
          <Route path={'/course/:name'} component={Course}/>
        </Switch>
      </main>
    );
  }
}

export default Main;
