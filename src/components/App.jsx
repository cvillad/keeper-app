import React from 'react'
import {Router, Route, Switch} from 'react-router-dom'
import history from '../history'
import Login from './Login'
import Home from './Home'
import SignUp from './SignUp'

const App = () => {
    return (
        <React.Fragment>
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/signup" exact component={SignUp} />
                    <Route path='/home' exact component={Home}/>
                </Switch>
            </Router>
        </React.Fragment>
    )
}

export default App;