import { connect } from "react-redux"
import { Field } from "redux-form"
import { reduxForm } from "redux-form"
import { requiredField } from "../../utils/validators/validators"
import { createField, Input } from "../common/FormsControls/FormsControls.tsx"
import {login} from '../../redux/auth-reducer.ts';
import { Navigate } from "react-router-dom";
import style from './../common/FormsControls/FormsControls.module.css';

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return <div>
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', [requiredField], Input)}
            {createField('Password', 'password', [requiredField], Input, {type: 'password'})} 
            {createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'Remember me')}

            { captchaUrl && <img src={captchaUrl} />}

            { captchaUrl &&  createField('Symbols from image', 'captcha', 
            [requiredField], Input, {}, )}

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
            formData.rememberMe,
            formData.captcha
            )
    }

    if(props.isAuth) {
        return <Navigate to={'/profile'} />
    }

    return <div>
        <ht>Login</ht>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}

const LoginReduxForm = reduxForm({

    form: 'login'
})(LoginForm)

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);