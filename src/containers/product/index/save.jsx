import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import PageTitle from 'components/page-title/index.jsx'
import MUtil from 'util/mm.jsx'
import Product from 'service/product-service.jsx'
import CategorySelector from './category-selector.jsx'
import FileUploader from 'util/fileUploader/index.jsx'
import RichEditor from 'util/rich-editor/index.jsx'

import './index.scss'
import './save.scss'

const _mm = new MUtil()

const _Product = new Product()

class ProductSave extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            name:'',
            subtitle:'',
            categoryId: 0,
            parentCategoryId: 0,
            subImages: [],
            price:'',
            stock:'',
            detail:'',
            status:1 //商品状态1：onstock
        }
    }
    //选择品类
    onCategoryChange(categoryId, parentCategoryId){
        console.log(parentCategoryId,categoryId)
        this.setState({
            categoryId: categoryId,
            parentCategoryId: parentCategoryId,
        })
    }
    //上传图片成功
    onUploadSuccess(res){
        let subImages = this.state.subImages
        subImages.push(res)
        this.setState({
            subImages:subImages
        })
    }
    onUploadError(res){
        _mm.errorTips(error.message || 'upload image failed')
    }
    //删除图片
    onImageDelete(e){
        let index = parseInt(e.target.getAttribute('index')),
        subImages = this.state.subImages

        

        subImages.splice(index, 1)
        this.setState({
            subImages:subImages
        })

    }

    onRichEditorValueChange(v){
        this.setState({
            detail: v
        })
    }

    onValueChange(e){
        let name = e.target.name
        let value = e.target.value.trim()
        this.setState({
            [name]:value
        })
    }
    getSubImagesString(){
        return this.state.subImages.map((image)=>image.uri).join(',')
    }

    onSubmit(){
        const s = this.state
        let product = {
            name: s.name,
            subtitle:s.subtitle,
            categoryId: s.categoryId,
            parentCategoryId: parseInt(s.parentCategoryId),
            subImages: this.getSubImagesString(),
            price:parseFloat(s.price),
            stock:parseInt(s.stock),
            detail:s.detail,
            status:s.status//商品状态1：onstock
        }
        let productCheckResult = _Product.checkProduct(product)
        if(productCheckResult.status){
            _Product.saveProduct(product).then(res=>{
                _mm.successTips(res)
                this.props.history.push('/product/index')
            },err=>{
                _mm.errorTips(err)
            })
        }else{
            _mm.errorTips(productCheckResult.msg || 'submit err')
        }
    }
    render() {



        return (
            <div id="page-wrapper">
                <PageTitle title="Add Product"></PageTitle>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">Product Name</label>
                        <div className="col-md-5">
                            <input 
                            type="text" 
                            name="name"
                            className="form-control" 
                            placeholder="Please add product name" 
                            onChange={(e)=>{
                                this.onValueChange(e)
                            }}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Description</label>
                        <div className="col-md-5">
                            <input 
                            type="text" 
                            name="subtitle"
                            
                            className="form-control" 
                            placeholder="Please add product description" 
                            onChange={(e)=>{
                                this.onValueChange(e)
                            }}/>
                        </div>
                    </div>

                   <CategorySelector 
                   onCategoryChange={
                       (categoryId, parentCategoryId)=>{
                        this.onCategoryChange(categoryId, parentCategoryId)
                   }}></CategorySelector>

                    <div className="form-group has-feedback">
                        <label className="col-md-2 control-label" >Price</label>
                        <div className="col-md-2">
                            <input 
                            type="number" 
                            className="form-control" 
                            name="price" 
                            onChange={(e)=>{
                                this.onValueChange(e)
                            }}/>
                            <span className="form-control-feedback price-helper">AUD</span>
                        </div>
                    </div>


                    <div className="form-group">
                        <label className="col-md-2 control-label">Quantity</label>
                        <div className="col-md-2">
                            <input 
                            type="number" 
                            name="stock"
                            className="form-control" 
                            placeholder="Quantity" 
                            onChange={(e)=>{
                                this.onValueChange(e)
                            }}/>

                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">Picture</label>
                        <div className="col-md-10">
                            {
                                this.state.subImages.length 
                                ? this.state.subImages.map((img, index)=>{
                                   return (
                                   <div key={index} className="img-upload">
                                        <img className="img" key={index} src={img.url}  />
                                        <i  index={index} className="fa fa-close" onClick={(e)=>{
                                            this.onImageDelete(e)
                                        }}></i>
                                    </div>
                                    )
                                }): (<div >Please Upload Image</div>)

                            }
                        </div>
                        </div>
                        <div className="form-group">

                         
                        <div className="col-md-offset-2 col-md-10 file-upload-con">
                            <FileUploader onUploadSuccess={(res)=>{
                                this.onUploadSuccess(res)
                            }}
                            onUploadError={(err)=>{
                                this.onUploadError(err)
                            }}
                            ></FileUploader>
                         </div>
                            </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Detail</label>
                        <div className="col-md-10">
                            <RichEditor onRichEditorValueChange={(v)=>{
                                this.onRichEditorValueChange(v)
                            }}/>
                        </div>
                    </div>


                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <button className="btn btn-primary"
                            onClick={(e)=>{this.onSubmit(e)}}
                            >Submit</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


export default ProductSave