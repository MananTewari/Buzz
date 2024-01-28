import Footer from "./Components/Footer";
import Header from "./Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Components/Sidebar";
import "./App.css";
import CreatePost from "./Components/CreatePost";
import PostList from "./Components/PostList";
import { useState } from "react";
import PostListProvider from "./Components/Store/PostListStore";

function App() {
    const [selectedTab, setSelectedTab] = useState("Home");//to render home/create post acc to need using this state
//postlistprovider wrap kar rha sare elements taki states ko use krna na pade ek jagah se, postlistprovider availbale kara dega states
    return (
        <PostListProvider> 
            <div className="app-container">
                <Header />
                <div className="content">
                    <Sidebar
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                    {selectedTab === 'Home' ? <PostList /> : <CreatePost />}
                </div>
                <Footer />

            </div>

        </PostListProvider>
    );
}

export default App;