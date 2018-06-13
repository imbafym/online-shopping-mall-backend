import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


import ProductList from 'containers/product/index/index.jsx';
import './index.scss'


class ListSearch extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            searchType: 'productId',
            searchKeyword: ''
        }
    }

    onValueChange(e) {
        let name = e.target.name
        let value = e.target.value.trim()
        this.setState({
            [name]: value
        })
    }
    onSearch() {

        this.props.onSearch(this.state.searchType, this.state.searchKeyword)
    }
    onSearchKeywordKeyup(e) {
        if (e.keyCode === 13)
            this.onSearch()
    }


    render() {



        return (
            <div className="row search-wrap">
                <div className="col-md-12">
                    <div className="form-inline">
                        <div className="form-group">
                            <select className="form-control"
                                name="searchType"
                                onChange={(e) => {
                                    this.onValueChange(e)
                                }}>
                                <option value="productId">Search By ID</option>
                                <option value="productName">Search By Name</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input
                                name="searchKeyword"
                                onChange={(e) => {
                                    this.onValueChange(e)
                                }}
                                type="text"
                                className="form-control"
                                placeholder="keyword"
                                onKeyUp={(e) => {
                                    this.onSearchKeywordKeyup(e)
                                }} />
                        </div>
                        <button
                            onClick={(e) => {
                                this.onSearch()
                            }}
                            className="btn btn-primary">Search</button>
                    </div>
                </div>

            </div>
        )
    }
}


export default ListSearch