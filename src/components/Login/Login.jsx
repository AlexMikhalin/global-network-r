import { connect } from "react-redux"
import { Field } from "redux-form"
import { reduxForm } from "redux-form"
import { requiredField } from "../../utils/validators/validators"
import { createField, Input } from "../common/FormsControls/FormsControls"
import {login} from '../../redux/auth-reducer';
import { Navigate } from "react-router-dom";
import style from './../common/FormsControls/FormsControls.module.css';

const LoginForm = ({handleSubmit, error}) => {
    return <div>
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', [requiredField], Input)}
            {createField('Password', 'password', [requiredField], Input, {type: 'password'})} 
            {createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'Remember me')}

           {error && <div className={style.formSummaryError}>
                {error}
            </div>}

            <div><button>Login</button></div>
        </form>
    </div>
}

const Login = (props) => {

    const onSubmit = (formData) =>{
        props.login(
            formData.email, 
            formData.password, 
            formData.rememberMe
            )
    }

    if(props.isAuth) {
        return <Navigate to={'/profile'} />
    }

    return <div>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}

const LoginReduxForm = reduxForm({

    form: 'login'
})(LoginForm)

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);