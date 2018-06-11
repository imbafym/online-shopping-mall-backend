import React from 'react'
import './theme.scss'
import TopNav from 'components/top-nav/index.jsx'
import SideNav from 'components/side-nav/index.jsx'

class Layout extends React.Component {
    constructor(props) {
        super(props)
    }

    

    render() {

        return (
            <div id="wrapper">
                <TopNav />
                <SideNav />
                {this.props.children}
            </div>)
    }
}
export default Layout