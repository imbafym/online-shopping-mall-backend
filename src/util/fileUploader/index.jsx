import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


import FileUpload from './react-fileUpload.jsx'


class FileLoader extends React.Component {



    render(){
        /*set properties*/
        const options={
            baseUrl:'/manage/product/upload.do',
            fileFieldName :'upload_file',
            dataType: 'json',
            chooseAndUpload:true,
            uploadSuccess: (res)=>this.props.onUploadSuccess(res.data),
            uploadError:(err) => this.props.onUploadError(err.message || 'upload failed')
        }
        /*Use FileUpload with options*/
        /*Set two dom with ref*/
        return (
            <FileUpload  options={options}>
                <button className="btn btn-xs btn-default" ref="chooseAndUpload">choose Image</button>    
            </FileUpload>
        )	        
    }
}


export default FileLoader