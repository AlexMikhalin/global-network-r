import { Navigate } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';
import { maxLengthCreator, requiredField } from '../../utils/validators/validators';
import { Textarea } from '../common/FormsControls/FormsControls.tsx';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Messge';

const Dialogs = (props) =>{

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map( d => <DialogItem name={d.name} key={d.id} id={d.id}/>); 
    let messagesElements = state.messages.map( m => <Message message={m.message} key={m.id}/>);
    
    let addNewMessage = (values) =>
    {
       props.sendMessage(values.newMessageBody)
    }

    //if(!props.isAuth) return <Navigate to={'/login'} /> 

    return (
        <div className={s.dialogs}>
            <div  className={s.dialogsItems}>

            {
                dialogsElements
            }
            </div>
            <div className={s.messages}>


               <div> {messagesElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

const AddMessageForm = (props) =>{
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} 
                validate={[requiredField, maxLengthCreator(50)]}
                name='onNewMessageChange'  
                placeholder='Enter your message' />
            </div>
        <div><button>Send</button></div>
    </form>
    )
}

const AddMessageFormRedux = reduxForm({form: 'addMessageReduxForm'})(AddMessageForm)

export default Dialogs;