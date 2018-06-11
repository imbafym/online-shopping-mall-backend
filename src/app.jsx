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
import Layout from 'components/layout/index.jsx'
class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>

                    <Route path="/" render={() => (
                        <Layout>
                            <Switch>
                                <Route path="/" exact component={Home} />
                                <Route path="/product" exact component={Home} />
                                <Route path="/product-category" exact component={Home} />
                            </Switch>
                        </Layout>
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