// 'use strict'; 
// react 
import React from 'react';
// react-dom
import ReactDom from 'react-dom';
// react-router 
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
// bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css'; 

import Home from 'containers/home/index.jsx'
import Login from 'containers/login/index.jsx'
import ErrorPage from 'containers/error/index.jsx'
import Layout from 'components/layout/index.jsx'
import UserList from 'containers/user/index.jsx'
class App extends React.Component {
    constructor(props){
        super(props)
        
    }


    render() {
        
    let LayoutRouter = (
       
        <Layout>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/product" exact component={Home} />
            <Route path="/product-category" exact component={Home} />
            <Route path="/user/index" exact component={UserList} />
            <Redirect from="/user" to='/user/index'/>
            <Route component={ErrorPage} />
        </Switch>
        </Layout>
       
    )
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" render={(props) => (
                       LayoutRouter
                    )
                    } />
                </Switch>
            </Router>
        );
    }
}



// render router
ReactDom.render(
    <App />,
    document.getElementById('app')
);