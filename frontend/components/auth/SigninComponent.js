import {useState, useEffect} from 'react';
import {signin, authenticate, isAuth} from '../../actions/auth'
import Router from 'next/router';


const SigninComponent = () => {

    const [values, setValues] = useState({
        email: 'meow@meow.com',
        password: 'meow',
        error: '',
        loading: false,
        message: '',
        showForm: true
    })

    const{email, password, error, loading, message, showForm}= values;

    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log('handle submit')
        console.table({name, email, password, error, loading, message, showForm})
        setValues({...values, loading: true, error: false})
        const user = {email, password}

        signin(user)
        .then(data => {
            console.log("data: ", data )
            console.log("error: ", error )
            if(data.error){
                setValues({...values, error: data.error, loading: false})
            }else{
                // save user token to cookie
               
               
                // save user info to local storage
               
               
                // authenticate user
                authenticate(data, () => {
                    if(isAuth() && isAuth().role === 1){
                        Router.push(`/admin`);
                    }else{
                        Router.push(`/user`);
                    }
                })
                
            }
        })
    
    }

    const handleChange = name => (e) => {
        setValues({...values, error: false, [name]: e.target.value})
        console.log(e.target.value)
    }

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

    const signinForm = () => {
       return(
       <form onSubmit={handleSubmit}>
            
            <div className = "form-group">
                 <input value={email} 
                 onChange={handleChange('email')} type="email" 
                 className="form-control" 
                 placeholder="type your email"/>
            </div>

            <div className = "form-group">
                 <input value={password} 
                 onChange={handleChange('password')} type="password" 
                 className="form-control" 
                 placeholder="type your password"/>
            </div>

            <div>
                <button className="btn btn-primary">Signin</button>
            </div>

        </form>
       )
    }
    
    return(
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signinForm()}
            
        </React.Fragment>
    )
}

export default SigninComponent;