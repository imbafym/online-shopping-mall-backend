import React from 'react'

import RcPagination from 'rc-pagination'

import 'rc-pagination/dist/rc-pagination.min.css'


import User from 'service/userservice.jsx'



const _user = new User()




class Pagination extends React.Component{
    constructor(props){
        super(props)
      
    }

  
    render(){
        return(
            
            <div className="row">
            <div className="col-md-12">
            <RcPagination  {...this.props}
                hideOSinglePage
                showQuickJumper
            />
            </div>
</div>

        )
    }
}

export default Pagination