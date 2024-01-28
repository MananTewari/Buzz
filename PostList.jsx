import {useContext} from "react";
import Post from "./Post";
import { PostList as PostListData } from "./Store/PostListStore";
import WelcomeMsg from "./WelcomeMsg";
import LoadingSpinner from "./LoadingSpinner";
 
function PostList() {

  const { postList, fetching } = useContext(PostListData)
   //object dalo jo banaya (defauult post  list=postList in context globally)
  //mapping data from postListData toPost component using postList from useContext
  //yaha tak humne default value ko attach kr diya post component ke sath

  console.log(postList);

  return (
    <div>
      {fetching && <LoadingSpinner/>}
      {!fetching && postList.length === 0 && <WelcomeMsg />}
      {!fetching && postList.map((post) => (
        <Post
          key={post.id} 
          post={post} //passing as prop tp post(data ke anusar render kre)
        />
      ))}
    </div>
  );
}

export default PostList;
