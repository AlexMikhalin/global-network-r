import profileReducer, { addPostActionCreator, deletePost } from "./profile-reducer";



let state = {
    posts: [
        { id: 1, message:'Hi', likesCount: 12}, 
        { id: 2, message:"it's my first post", likesCount: 11}, 
        { id: 3, message:'Hi BLA BLA', likesCount: 12}, 
        { id: 4, message:"it's my first post BLA BLA", likesCount: 11}, 
      ]
};

test('length of post should be incremented', () => {


        let action = addPostActionCreator('it-kama.com');

        let newState = profileReducer(state, action);

        // expectation
        expect(newState.posts.length).toBe(5);
  });

  test('should be itkama', () => {


    let action = addPostActionCreator('it-kama.com');

    let newState = profileReducer(state, action);

    // expectation
    expect(newState.posts[4].message).toBe('it-kama.com');
});
  

test('lentgh after deleting should be decremented', () => {


    let action = deletePost(1);

    let newState = profileReducer(state, action);

    // expectation
    expect(newState.posts.length).toBe(3);
});

test('lentgh after deleting should not be decremented if id', () => {

    let action = deletePost(1000);

    let newState = profileReducer(state, action);

    // expectation
    expect(newState.posts.length).toBe(4);
});