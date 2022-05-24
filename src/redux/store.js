import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidedar-reducer";

let store = {
    _state: {

        profilePage: {
    
            posts: [
                { id: 1, message:'Hi', likesCount: 12}, 
                { id: 2, message:"it's my first post", likesCount: 11}, 
                { id: 3, message:'Hi BLA BLA', likesCount: 12}, 
                { id: 4, message:"it's my first post BLA BLA", likesCount: 11}, 
              ],
              newPostText: 'lolo',
        },
    
        dialogsPage: {
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

            newMessageBody: ""
         },
         sidebar: { }, 
    },
    _callSubscriber() {
    },

    getState(){
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    

    dispatch(action){

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }
}

export default store;