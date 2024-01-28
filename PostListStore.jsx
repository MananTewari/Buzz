import { createContext, useReducer, useState, useEffect } from "react"; //naya concept samjh lena

export const PostList = createContext({
  //ISI KE PARAMETERS USE HO RHE AAGE, POSTLIST HAS ALL THE DATA
  //default values for useReducer
  postList: [], //array for  storage
  addPost: () => {}, //method
  deletePost: () => {},
  fetching:false, //method
}); //default structre me default values feed kr dete hain, types ki kya kya aayega context me

const postListReducer = (currPostList, action) => {
  console.log(action)
  console.log(currPostList);
  switch (action.type) {
    case "ADD_INITIAL_POSTS":
      return action.payload.posts;

    case "ADD_POST":
      return [action.payload, ...currPostList];

    case "DELETE_POST":
      return currPostList.filter((post) => post.id !== action.payload.postId);

    default:
      return currPostList;
  }
};


const PostListProvider = ({ children }) => {
  //children passed as prop from app.js
  //state ka baap Reducer, just slike states isme hume ek function aur aek default value pass krni hai, jo ki kaam kregi ek state ki tarah (HERE postList)
  const [postList, dispatchPostList] = useReducer(postListReducer, []);//function//object jo posts carry kra hai
  //REDUCER FUNCTION AUR DEFAULT VALUE, DEFAULT VALUE=POSTLIST NOW GLOBALLLY, JO AB CONTEXT PROVIDER ME BHI HAI
  //create post, delete post are two actions under this
  const[fetching, setFetching]=useState(false);
  
  const addPost = (post) => { 
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    })
  }
    const addInitialPosts = (posts) => {
      dispatchPostList({
        type: "ADD_INITIAL_POSTS",
        payload: {
          posts
        },
      });
    };
    const deletePost = ({ postId }) => {
      //iska kam hai action ko record krna aur dispatch krna hai using dispatch function
      console.log(postId);
      dispatchPostList({
        type: "DELETE_POST", //object, yahi action hai
        payload: {
          postId, //object
        }, //is method ko itna hi karna hai ki bhej do, ye jaygea post list reduceer ke pass jo id ko filter krega
      });
    };


    useEffect(() => {
      // Fetching data from a json file
      const controller=new AbortController();
      const signal=controller.signal;
      setFetching(true);
      console. log("Fetch clicked");
      fetch("https://dummyjson.com/posts", {signal})
        .then((res) => res.json())
        .then((data) => {
          // Add initial posts only if the postList is empty
          if (postList.length ===0) {
            addInitialPosts(data.posts);  
              //varna har baar call hojagea
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        })
        .finally(()=>{
          setFetching(false);
        })
         return ()=>{
          console.log("cleanup initiated");
          controller.abort();
        }
    }, [postList]);




    return (
      <PostList.Provider
        value={{
          //object ke form me ye teen values mil rhi hain
          postList: postList, //called by PostList
          addPost: addPost, //called by createPost
          fetching:fetching,
          deletePost: deletePost,
        }}
      >
        {children}
      </PostList.Provider>
    );
  }


export default PostListProvider;
