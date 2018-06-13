import React from 'react'
import {Link} from 'react-router-dom'
import PageTitle from 'components/page-title/index.jsx'
class ErrorPage extends React.Component {


constructor(props){
    super(props)
    this.state={
        userCount:'N/A',
        productCount:'N/A',
        orderCount:'N/A'
    }
}

    render() {
        return (
            <div id="page-wrapper">
            <PageTitle title="404 Error" />
            <div className="row">
            <div className="col-md-12">
                    <span>
                        No Page Exists
                    </span>
                    <br />
                    <Link to='/'>Back to Main Page</Link>
                    </div>
                </div>
            </div>
           
        )
    }
}


export default ErrorPage