
const SEND_MESSAGE = 'SEND-MESSAGE';

type DialogType = {
    id: number;
    name: string;
}
type MessageType = {
    id: number;
    message: string;
}

let initialState = {
   
    messages:[
        { id: 1, message:'Hi'}, 
        { id: 2, message:'How are you?'}, 
        { id: 3, message:'Wow'}, 
        { id: 4, message:'Wow'}, 
        { id: 5, message:'Wow'}, 
    ] as Array<MessageType>,
    
    dialogs: [
        { id: 1, name:'Sasha'}, 
        { id: 2, name:'Polina'}, 
        { id: 3, name:'Sveta'}, 
        { id: 4, name:'Dima'}, 
        { id: 5, name:'Vitalya'}, 
    ] as Array<DialogType>,
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType=> {

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

type sendMessageCreatorType = {
    type: typeof SEND_MESSAGE,
    newMessageBode: string
}

export const sendMessageCreator = (newMessageBody: string): sendMessageCreatorType => ({ type: SEND_MESSAGE, newMessageBody})


export default dialogsReducer;