import React from 'react'
import {Link} from 'react-router-dom'
import PageTitle from 'components/page-title/index.jsx'
import Pagination from 'util/pagination.jsx'

import MUtil from 'util/mm.jsx'

import User from 'service/userservice.jsx'


const _mm = new MUtil()

const _user = new User()

class UserList extends React.Component {


constructor(props){
    super(props)
    this.state={
        list:[],
        pageNum : 1,
        loading: true
    }
}


componentDidMount(){
    this.loadUserList()
}
loadUserList(){
    _user.getUserList(this.state.pageNum).then(
        res=>{
            this.setState(res, ()=>{
                this.setState({
                    loading: false
                })
            })
        },errMsg=>{
            _mm.errorTips(errMsg);
        }
    )
}

//頁面數據發生變化
onPageNumChange(pageNum){
this.setState({
    pageNum:pageNum
},()=>{
    this.loadUserList()
}

)
}

    render() {


        let listBody =   this.state.list.map((user,index)=>{
            return  (
            <tr key={index}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{new Date(user.createTime).toLocaleString()}</td>
                
            </tr>)
        })

        let errorList = (
            <tr>
                <td colSpan="5"  className="text-center">
                {this.state.loading? 'Loading...' : 'No Result'} </td>
            </tr>
        )

        let tableBody = this.state.list.length>0
                        ?listBody:errorList
        return (
            <div id="page-wrapper">
            <PageTitle title="User List" />
            <div className="row">




            <div className="col-md-12">
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Create Time</th>
                    </tr>
                </thead>
                <tbody>
                    {tableBody}    
                </tbody>
                </table>   
                    </div>
                </div>



                <Pagination 
                current ={this.state.pageNum} 
                total = {this.state.total} 
                onChange={(pageNum)=>{
                    this.onPageNumChange(pageNum)
                }}></Pagination>
            </div>
           
        )
    }
}


export default UserList