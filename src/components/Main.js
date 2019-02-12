import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ListComponent from "./ListComponent";
import initial from '../kaiku-17-18.json';
import TextComponent from "./TextComponent";


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/'
         render={(props) => (<ListComponent {...props} data={initial} />)}
      />
      <Route path='/wtf' component={TextComponent}/>
    </Switch>
  </main>
)

export default Main
