import React,{useState,useContext,useReducer} from 'react'
import {PostsContext} from "../context";
import {postsReducer} from "../reducers";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Posts from "./posts";
import Navbar from "./navbar";
import PostDetails from "./post_details";
import Users from "./users";
import SingleUser from "./single_user";
import "../assets/scss/global.scss";
export default function App() {
  
const initialState = useContext(PostsContext);
const [state,dispatch] = useReducer(postsReducer,initialState);
  return (
    <PostsContext.Provider value={{state,dispatch}}>
    <div>
    <div className="App">
      <Router>
      <Navbar/>
        <Switch>
          <Route path="/" exact={true}>
            <Posts/>
          </Route>
          <Route path="/post_details/:id">
            <PostDetails/>
          </Route>
          <Route path="/users">
           <Users/>
          </Route>
          <Route path="/single_user/:id/:user_name">
            <SingleUser/>
          </Route>
        </Switch>
      </Router>
    </div>
    </div>
    </PostsContext.Provider>

  )
}