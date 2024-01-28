import { useRef } from "react";
import { useContext } from "react";
import "../App.css";
import { PostList as PostListData } from "./Store/PostListStore";

function CreatePost() {
  const { addPost } = useContext(PostListData); //postList is context ka object
  const userIdElement = useRef(); //remembers the initial value of each item in payload and when updated checks teh current
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const reactionsElement = useRef();
  const tagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const reactions = reactionsElement.current.value;
    const tags = tagsElement.current.value.split(" ");

    fetch("https://dummyjson.com/posts/add",{
      method:"POST",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify({
        title: postTitle,
        body: postBody,
        reaction: reactions,
        userId:userId,
        tags:tags,
      }),
    })
      .then((res)=>res.json())
      .then((post)=>{
        console.log("Got response from server", post);
        addPost(post);
        console.log(post);
      });
     
      };
  
    
  

  
  

  return (
    <div className="create-post">
      <form className="row gx-3 gy-2 align-items-center">
        <div className="col-sm-3">
          <label className="form-label" htmlFor="userId">
            Enter UserName
          </label>
          <input
            type="text"
            className="form-control"
            id="userId"
            placeholder="UserName"
            ref={userIdElement}
          />
        </div>

        <div className="col-sm-3">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            ref={postTitleElement}
            placeholder="How are you feeling today"
          />
        </div>
        <div className="col-sm-3">
          <label className="form-label" htmlFor="body">
            Body
          </label>
          <div className="input-group">
            <textarea
              type="text"
              className="form-control"
              id="body"
              placeholder="Body"
              ref={postBodyElement}
            />
          </div>
        </div>
        <div className="col-sm-3">
          <label className="visually-hidden" htmlFor="specificSizeSelect">
            Preference
          </label>
        </div>

        <div className="col-sm-3">
          <label className="form-label" htmlFor="reactions">
            Number Of Reactions
          </label>
          <input
            type="text"
            className="form-control"
            id="reactions"
            ref={reactionsElement}
            placeholder="How many people reaqcted to this"
          />
        </div>

        <div className="col-sm-3">
          <label className="form-label" htmlFor="tags">
            Enter your #s here
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            ref={tagsElement}
            placeholder="Press space for multiple tags"
          />
        </div>

        <div className="col-auto">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter")
                  handleSubmit();
              }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
  }
export default CreatePost;
