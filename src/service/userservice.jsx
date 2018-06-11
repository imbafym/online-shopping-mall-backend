import MUtil from 'util/mm.jsx'

const _mm = new MUtil()


export default class User{
    login(loginInfo){
       return _mm.request({
            type:'post',
            url:'/manage/user/login.do',
            data:loginInfo
        })
    }



    //check if login success
    checkLoginInfo(loginInfo){
        //check use name is empty
        if(typeof loginInfo.username !== 'string' || loginInfo.username.length === 0){
            return {
                status : false,
                msg: 'username can not be empty'
            }
        }
        //check password name is empty
        
        if(typeof loginInfo.password !== 'string' || loginInfo.password.length === 0){
            return {
                status : false,
                msg: 'password can not be empty'
            }
        }
        return {
            status : true,
            msg: 'login success'
        }
    }


    logout(){
        return _mm.request({
            type:'post',
            url:'/user/logout.do',
          
        })
    }


    getUserList(pageNum){
        return _mm.request({
            type: 'post',
            url : '/manage/user/list.do',
            data : {
                pageNum: pageNum
            }
        })
    }
}