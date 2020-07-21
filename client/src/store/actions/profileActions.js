import axios from 'axios';



export const getUserInfo = (uid) =>{
    return (dispatch) =>{
      

        const config = {
            headers: {'Content-Type': 'application/json'}
        }
    
        axios.post('http://localhost:5000/userinfo', {uid}, config).then(response =>{
            const {firstName, lastName} = response.data.result;
    
           dispatch({
                type: "USER_INFO",
                firstName,
                lastName
           });
        });
    }
}

export const loadProfilePic = (uid) =>{
    return (dispatch) =>{
            const data = {action: 'load', uid};

            const config={'Content-Type': 'application/json'};

            fetch('http://localhost:5000/profilepic', {method: 'POST', headers:  config , body: JSON.stringify(data)}) 
            .then(response =>response.blob())
            .then(file =>{
                dispatch({type: "LOAD_PROFILE_PIC", imgURL: URL.createObjectURL(file)});
            });
    }
}

export const changeProfilePic = (uid, imgFile) => {
    return () => {
            const formData =new FormData();

            formData.append('uid',  uid);
            formData.append('image', imgFile);
    
            const config = {headers: {'Content-Type': 'multipart/form-data'}};
    
            axios.post('http://localhost:5000/profilepic', formData, config)
            .then(()=> window.location.reload());
    }
}

export const changeUserName = (uid, firstName, lastName) =>{
    return (dispatch) =>{
        const data={
            uid,
            firstName,
            lastName
        }

        axios.post('http://localhost:5000/changename', data , {headers: {'content-type': 'application/json'}})
        .then(response => {
            const {_doc, msg} =response.data;

            if(_doc){
                dispatch({type: 'CHANGE_NAME', firstName: _doc.firstName, lastName: _doc.lastName})
            }

            alert(msg);
        });
    }
}

export const changePwd = (uid, currPwd, newPwd, confirmPwd) =>{
    return () =>{
        const data={uid, currPwd, newPwd, confirmPwd}

        axios.post('http://localhost:5000/changepwd', data, {headers:{'content-type': 'application/json'}})
        .then(response =>{
            const {msg} = response.data;
            alert(msg);
        });
    }
}

export const deleteUser = (uid) =>{
    return () =>{
        
        const data = {uid}

        

        axios.post('http://localhost:5000/deleteUser', data,   {headers: {'content-type': 'application/json'}}).then(response =>{
            
        const {msg} =response.data;
        alert(msg);
            window.localStorage.clear();
            window.location.href='/';
         
        })

        
    }
}

/**
 * //deleteUser
export const deleteUser = (uid)=>{
    return()=>{
        const data={uid};

        axios.post('http://localhost:5000', data, {headers:{'content-type': 'application/json'}} )
        .then(response=>{
            const {msg} = response.data;
            alert(msg);
        });
    }
}
 */