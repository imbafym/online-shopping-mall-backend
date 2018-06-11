import React from 'react'

import MUtil from 'util/mm.jsx'

import User from 'service/userservice.jsx'

const _mm = new MUtil()

const _user = new User()

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            redirect: _mm.getHashParam('redirect')||'/'
        }
        this.onInputChange = this.onInputChange.bind(this)
        this.onInputKeyUp = this.onInputKeyUp.bind(this)
    }

    componentWillMount(){
        document.title =  'LOGIN - HAPPY MALL'
    }
    onInputChange(e) {
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]: value
        })
    }
    onInputKeyUp(e){
        if(e.keyCode === 13){
            this.onSubmit()
        }
    }
    onSubmit(){
        let loginInfo = {
            username: this.state.username,
            password: this.state.password
        },
        checkResult = _user.checkLoginInfo(loginInfo)
        //check validation success
        if(checkResult.status){
            _user.login(loginInfo
            ).then((res)=>{
                // console.log(this.state.redirect)
                _mm.setStorage('userinfo',res)
                this.props.history.replace(this.state.redirect)
            },(errMsg)=>{
                _mm.errorTips(errMsg)
            })
        }
        //check validation false
        else{
            _mm.errorTips(checkResult.msg)
        }
       
    }
    render() {
        return (
            <div >

                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="panel panel-default login-panel">
                            <div className="panel-heading">Welcome to Login, Happy Mall admin system</div>
                            <div className="panel-body">
                                <div>
                                    <div className="form-group">
                                        <input type="text"
                                            name="username"
                                            className="form-control"
                                            placeholder="UserName"
                                            onKeyUp={
                                                e=>this.onInputKeyUp(e)
                                            }
                                            onChange={(e) => {
                                                this.onInputChange(e)
                                            }} />
                                    </div>
                                    <div className="form-group">

                                        <input
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            className="form-control"
                                            onKeyUp={
                                                e=>this.onInputKeyUp(e)
                                            }
                                            onChange={(e) => {
                                                this.onInputChange(e)
                                            }}
                                        />
                                    </div>

                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" /> remember
                                        </label>
                                    </div>
                                    <button 
                                    
                                    className="btn btn-lg btn-primary btn-block"
                                    onClick={(e)=>{
                                        this.onSubmit(e)
                                    }}
                                    >Login</button>
                                    <br />
                                    <button  className="btn btn-lg btn-primary btn-block">Register</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


export default Login