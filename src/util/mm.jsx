


export default class MUtil {

    //encodeURIcomponent 处理特殊字符
    //跳转登录
    doLogin(){
        window.location.href = `./login?redirect=${encodeURIComponent(window.location.pathname)}`
    }

    //獲取url param
    getUrlParam(name){
        //xxx.com?param=13&param1=233
        let queryString= window.location.hash.split('?')[1] || ''
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result = queryString.match(reg)
            // result : ['param =13','', '13', '&']
           
        return result?decodeURIComponent(result[2]):null
    }

    // 获取url参数
    getHashParam(name){
        var reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            queryString = window.location.hash.split('?')[1] || '',
            result      = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }


    //err tips
    errorTips(errMsg){
        alert(errMsg || 'err exists')
    }
    successTips(msg){
        alert(msg || 'operation success')
    }
    request(param) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: param.type || 'get',
                url: param.url || '',
                dataType: param.dataType || 'json',
                data: param.data || null,
                success: (res)=> {
                    if(0===res.status){
                        //data success
                        typeof resolve === 'function' && resolve(res.data,res.msg)
                    }
                    //need login
                    else if(10 === res.status){
                        //go to login page
                        this.doLogin()
                    }//数据出错
                    else{
                        typeof reject === 'function' && reject(res.data||res.msg)

                    }
                },
                error: (err)=> {
                    //请求出错
                    typeof reject === 'function' && reject(err.statusText)
                }

            })

        })
    }

    setStorage(name,data){
        let dataType = typeof data;
        
        if(dataType === 'object'){
            window.localStorage.setItem(name, JSON.stringify(data))

        }
        else if(['number','string','boolean'].indexOf(dataType) >= 0){
            window.localStorage.setItem(name, data)
        }
        else{
            alert('the type is not suitable for localstorage')
        }
       
    }


    getStorage(name){
        let data = window.localStorage.getItem(name)
        if(data){
            return JSON.parse(data)
        }
        else{
            return ''
        }
    }

    removeStorage(name){
        window.localStorage.removeItem(name)
    }

}