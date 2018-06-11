import React from 'react'

import PageTitle from 'components/page-title/index.jsx'
class Home extends React.Component {

    render() {
        return (
            <div id="page-wrapper">


                <PageTitle title="Home">
                </PageTitle>
                <button className="btn btn-warning">
                        test</button>
                <div className="row">
                    <div className="col-md-12">
                        Body</div>
                </div>
            </div>
        )
    }
}


export default Home