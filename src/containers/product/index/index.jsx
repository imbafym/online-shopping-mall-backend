import React from 'react'
import { Link } from 'react-router-dom'


import PageTitle from 'components/page-title/index.jsx'
import Pagination from 'util/pagination.jsx';
import MUtil from 'util/mm.jsx'
import Product from 'service/product-service.jsx'
import TableList from 'util/tableList/index.jsx';
import ListSearch from './index-list-search.jsx'
import './index.scss'

const _mm = new MUtil()

const _Product = new Product()

class ProductList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            pageNum: 1,
            listType: 'list',
            searchKeyword: '',
            searchType: ''
        }
    }


    componentDidMount() {
        this.loadProductList()
    }
    loadProductList() {
        let listParam = {}
        listParam.listType = this.state.listType
        listParam.pageNum = this.state.pageNum
        //if search need type and keyword
        if (this.state.listType === 'search') {
            listParam.keyword = this.state.searchKeyword
            listParam.searchType = this.state.searchType
        }
        _Product.getProductList(listParam).then(
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
            this.loadProductList()
        }

        )
    }
    onSetProductStatus(e, id, status) {
        const newStatus = status === 1 ? 2 : 1,
            confirmTips = status === 1 ? 'Are you sure to unlist item' : 'are you sure to list item'

        if (window.confirm(confirmTips)) {
            _Product.setProductStatus({
                productId: id,
                status: newStatus
            }).then(res => {
                _mm.successTips(res)
                this.loadProductList()
            }, err => {
                _mm.errorTips(err)
            })

        }
    }

    onSearch(searchType, searchKeyword) {
        let listType = searchKeyword === '' ? 'list' : 'search'
        this.setState({
            listType: listType,
            pageNum: 1,
            searchType: searchType,
            searchKeyword: searchKeyword
        }, () => {
            this.loadProductList()
        })
    }

    render() {
        const tableHeads = [
            { name: 'Product ID', width: '10%' },
            { name: 'Info', width: '50%' },
            { name: 'Price', width: '10%' },
            { name: 'Status', width: '15%' },
            { name: 'More', width: '15%' },
        ]

        return (
            <div id="page-wrapper">
                <PageTitle title="Product List">
                    <div className="page-header-right">
                        <Link to="/product/save" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span> Add Item</span></Link>
                    </div>
                </PageTitle >
                <ListSearch onSearch={(searchType, searchKeyword) => {
                    this.onSearch(searchType, searchKeyword)
                }} />
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>
                                        <p>{product.name}</p>
                                        <p>{product.subtitle}</p>
                                    </td>
                                    <td>${product.price}</td>
                                    <td>
                                        <p>{product.status === 1
                                            ? 'on Sale'
                                            : 'off sale'}
                                        </p>
                                        <button className="btn btn-xs btn-warning" onClick={(e) => {
                                            this.onSetProductStatus(e, product.id, product.status)
                                        }}>{product.status === 1 ? 'Unlist' : 'List'}</button>
                                    </td>
                                    <td>
                                        <Link className="operation" to={`/product/detail/${product.id}`}>
                                            View
                                    </Link>
                                        <Link className="operation" to={`/product/save/${product.id}`}>
                                            Edit
                                    </Link>
                                    </td>
                                </tr>
                            )
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

export default ProductList