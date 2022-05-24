
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
   
    messages:[
        { id: 1, message:'Hi'}, 
        { id: 2, message:'How are you?'}, 
        { id: 3, message:'Wow'}, 
        { id: 4, message:'Wow'}, 
        { id: 5, message:'Wow'}, 
    ],
    
    dialogs: [
        { id: 1, name:'Sasha'}, 
        { id: 2, name:'Polina'}, 
        { id: 3, name:'Sveta'}, 
        { id: 4, name:'Dima'}, 
        { id: 5, name:'Vitalya'}, 
    ],
};

const dialogsReducer = (state = initialState, action) => {

    switch(action.type){
        case SEND_MESSAGE: {
            
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, { id: 7, message: body}]
            };
        }
        default:
            return state;
    }
}


export const sendMessageCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody})


export default dialogsReducer;