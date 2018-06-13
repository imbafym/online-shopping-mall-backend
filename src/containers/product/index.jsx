import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


import ProductList  from 'containers/product/index/index.jsx';
import ProductSave  from 'containers/product/index/save.jsx';


class ProductRouter extends React.Component {



    render() {



        return (
            <Switch>
                <Route path="/product/index" component={ProductList} />
                <Route path="/product/save" component={ProductSave} />
                
                <Redirect from="/product(/*)?" to='/product/index' />
            </Switch>
        )
    }
}


export default ProductRouter