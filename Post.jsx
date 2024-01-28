import { useContext } from "react";
import "../App.css";
import { AiFillDelete } from "react-icons/ai";
import { PostList } from "./Store/PostListStore";

function Post({ post }) {
  const { deletePost } = useContext(PostList);
  //post passed as prop, delete ke liye usecontext lagao, post del
  return (
    <div>
      <div className="card post-card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">
            {post.title}
            <span
              onClick={()=> deletePost({postId: post.id})}
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
              <AiFillDelete />
              <span className="visually-hidden"></span>
            </span>
          </h5>
          <p className="card-text">{post.body}</p>
          {post.tags.map((tag) => (
            <span key={tag} className="badge text-bg-primary tag">
              {tag}
            </span>
          ))}
          <div className="alert alert-dark reactions" role="alert">
            You and {post.reaction} others liked this
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
//mapping data on tags using map fucntoin kyunki array hai
