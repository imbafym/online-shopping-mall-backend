import React from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'components/page-title/index.jsx'
import Pagination from 'util/pagination.jsx'

import MUtil from 'util/mm.jsx'

import User from 'service/userservice.jsx'
import TableList from 'util/tableList/index.jsx';


const _mm = new MUtil()

const _user = new User()

class UserList extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            list: [],
            pageNum: 1,
            loading: true
        }
    }


    componentDidMount() {
        this.loadUserList()
    }
    loadUserList() {
        _user.getUserList(this.state.pageNum).then(
            res => {
                this.setState(res)
            }, errMsg => {
                _mm.errorTips(errMsg);
            }
        )
    }

    //頁面數據發生變化
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadUserList()
        }
        )
    }

    render() {


        let tableHeads = ['Id', 'Name', 'Email', 'Phone', 'CreateTime']


        return (
            <div id="page-wrapper">
                <PageTitle title="User List" />

                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{new Date(user.createTime).toLocaleString()}</td>
                                </tr>)
                        })
                    }

                </TableList>


                <Pagination
                    current={this.state.pageNum}
                    total={this.state.total}
                    onChange={(pageNum) => {
                        this.onPageNumChange(pageNum)
                    }}></Pagination>
            </div>

        )
    }
}


export default UserList