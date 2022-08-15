import React from 'react';
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';
import { maxLengthCreator, requiredField } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls.tsx';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = React.memo(props => {
  let postsElements = props.posts.map(p => <Post 
    key={p.id}
    message={p.message} likesCount={p.likesCount} />);

  let onAddPost = values => {
    props.addPost(values.newPostText);
  };

  return <div className={s.postsBlock}>
        <h3>My posts</h3>
        <AddNewPostFormRedux onSubmit={onAddPost} />
        <div className={s.posts}>
          {postsElements}
        </div>
      </div>;
});

function AddNewPostForm (props) {
  return (
    
    <form onSubmit={props.handleSubmit}>
    <div>
      <Field 
      name='newPostText' 
      component={Textarea} 
      placeholder={'Post message'}
      validate={[requiredField , maxLengthCreator(10)]}/>
    </div>
    <div>
        <button>Add button</button>
    </div>
  </form>
  )
}

let AddNewPostFormRedux = reduxForm({form: 'ProfileAddNewPostForm'}) (AddNewPostForm)

export default  MyPosts;