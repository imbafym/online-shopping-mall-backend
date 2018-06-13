import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MUtil from 'util/mm.jsx'
import Product from 'service/product-service.jsx'

import './category-selector.scss'

const _mm = new MUtil()

const _Product = new Product()

class CategorySelector extends React.Component {

constructor(props){
    super(props)
    this.state={
        firstCategoryList:[],
        firstCategoryId: 0,
        secondCategoryList:[],
        secondCategoryId: 0
    }
}


componentDidMount(){

    this.loadFirstCategory()
}

loadFirstCategory(){
_Product.getCategoryList().then(res=>{
    this.setState({
        firstCategoryList: res
    },err=>{
        _mm.errorTips(err)
    })
})
}

loadSecondCategory(){
    _Product.getCategoryList(this.state.firstCategoryId).then(res=>{
        this.setState({
            secondCategoryList: res
        },err=>{
            _mm.errorTips(err)
        })
    })
}


//get first category class
onFirstCategoryChange(e){
    let newValue = e.target.value || 0
    this.setState({
        firstCategoryId : newValue,
        secondCategoryId :0,
        secondeCategoryList:[]
    },()=>{
        //update second class
        this.loadSecondCategory()
        this.onPropsCategoryChange()
    })
}
//get second category class
onSecondCategoryChange(e){
    let newValue = e.target.value || 0
    this.setState({
        secondCategoryId : newValue,
      
    },()=>{
        //update second class
        this.onPropsCategoryChange()
    })
}
    //传给父组件选中的结果
    onPropsCategoryChange(){
        //判断父组件是否有回调函数 取值
        let categoryChangeble = typeof this.props.onCategoryChange ==="function"
        if(this.state.secondCategoryId){
            categoryChangeble && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId)
        }else{
            categoryChangeble && this.props.onCategoryChange(this.state.firstCategoryId, 0)
        }
    }
    render() {



        return (
            <div>

                <div className="form-group">
                    <label className="col-md-2 control-label">Category</label>
                    <div className="col-md-10">
                        <select className="form-control cate-select" onChange={(e)=>{
                            this.onFirstCategoryChange(e)
                        }}>
                            <option value="">Please Choose Primary Class</option>
                        {
                            this.state.firstCategoryList.map(
                                (cate,index)=><option key={index} value={cate.id}>{cate.name}</option>
                            )
                        }
                        </select>
                        {
                            this.state.secondCategoryList.length?
                            <select className="form-control cate-select"
                            onChange={(e)=>{
                                this.onSecondCategoryChange(e)
                            }}>
                            <option value="">Please Choose sub Class</option>
                            {
                            this.state.secondCategoryList.map(
                                (cate,index)=><option key={index} value={cate.id}>{cate.name}</option>
                            )
                            }
                            </select>:null

                        }
                        
                       
                    </div>
                </div>


            </div>
        )
    }
}


export default CategorySelector