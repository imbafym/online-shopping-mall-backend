import React from 'react'




class TableList extends React.Component{
    constructor(props){
        super(props)
      this.state={
          loading: true
      }
    }

  componentWillReceiveProps(){
    //only first loading is true, to show loading..  
    this.setState({
          loading: false
      })
  }
  
    render(){
        //header
        let tableHeader = this.props.tableHeads.map((tableHead, index)=>{
            if(typeof tableHead === 'object'){
                return (<th key={index} width={tableHead.width}>{tableHead.name}</th>)

            }else if (typeof tableHead === 'string'){
                return (<th key={index} >{tableHead}</th>)
            }
            })
        //content
        let listBody = this.props.children
        //info
        let infoList = (
            <tr>
                <td colSpan={this.props.tableHeads.length} className="text-center">
                    {this.state.loading ? 'Loading...' : 'No Result'} </td>
            </tr>
        )

        let tableBody = listBody.length > 0
            ? listBody : infoList

        return(
            <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                  {tableHeader}
                                </tr>
                            </thead>
                            <tbody>
                                {tableBody}
                            </tbody>
                        </table>
                    </div>
                </div>
        )
    }
}

export default TableList