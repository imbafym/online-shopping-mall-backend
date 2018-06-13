import React from 'react'

import Simditor from 'simditor'
import 'simditor/styles/simditor.scss'

//通用富文本编辑器
class RichEditor extends React.Component {

    componentDidMount(){
        this.loadEidtor()
    }
    loadEidtor(){
        let element = this.refs['textarea']
        this.simditor = new Simditor({
            textarea: $(element),
            defaultValue:this.props.placeholder || 'please input conten',
            upload:{
                url:'/manage/product/richtext_img_upload.do',
                defaultImage:'',
                fileKey:'upload_file'
            }
        })
        this.bindEditorEvent()
    }

    bindEditorEvent(){
        this.simditor.on('valuechanged',e=>{
            this.props.onRichEditorValueChange(this.simditor.getValue())
        })
    }
    render() {



        return (
            <div className="rich-editor">
                <textarea ref="textarea"></textarea>
            </div>

        )
    }
}


export default RichEditor