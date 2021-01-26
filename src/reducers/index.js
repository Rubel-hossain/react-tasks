export const postsReducer = (state,action)=>{
    switch(action.type){
        case "ADD_POST":
            const addedPosts = [...state.posts,action.payload];
            return {
                ...state,
                posts: addedPosts
            };
        case "SET_CURRENT_POST":
            return {
                ...state,
                currentPost: action.payload
            };
        case "REMOVE":
            const filterPosts = state.posts.filter(post=>post.id !== action.payload.id);
            return {
                ...state,
                posts: filterPosts
            };
        case "UPDATE_POST":
            console.log(action.payload);

            const updatedPostIndex = state.posts.findIndex(t=>t.id === state.currentPost.id);
            const updatedPosts = [
                ...state.posts.slice(0,updatedPostIndex),
                action.payload,
                ...state.posts.slice(updatedPostIndex + 1)
            ];
            
            return {
                ...state,
                posts: updatedPosts,
                currentPost: {}
            };
            
        default:
            return state;
    }
}