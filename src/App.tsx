import React,{useState} from "react";
import './App.css';
import Results from './galleryView';
import {Routes, Route, Outlet, Link} from 'react-router-dom';
import SearchBar from './searchBar';
import MainPage from "./main"
import Detail from "./detail"


export default function App() {
    const [count, setCount] = useState(0);
    return(
        <div>
            <Routes>
                <Route path="/" element={<Layout/>}>
                <Route index element={<MainPage/> } />
                <Route path="Gallery" element={<Results/> } />
                <Route path="Gallery/:id"  element={<Detail/> } />
                <Route path="Search" element={[<SearchBar/>]} />
                <Route path= "*" element={<D count={count} setCount ={setCount}/>} />
                </Route>
            </Routes>
        </div>
    )
};

function Layout() {
    return (
        <div>
            <div className = 'nav'>
                <div className = 'item'>
                    <Link to ="/" className ="word">Home</Link>
                </div>
                <div className = 'item'>
                    <Link to ="/Gallery" className ="word">Gallery</Link>
                </div>
                <div className = 'item'>
                    <Link to ="/Search" className ="word">List</Link>
                </div>
                <div className = 'item'>
                    <Link to ="/bad" className ="word">Like</Link>
                </div>
            </div>
            <Outlet/>
        </div>
      );
}


function D(props:any) {
    return (
        <div className ="body">
          <h2>There is no info for this page, but do you know {props.count} people has already liked our website !</h2>
          <h2>Click the button to be one of them!</h2>
          <button onClick = {()=>props.setCount(props.count + 1)}>I Like this page</button>
          <p>
            <Link to="/"><h2>Go to the home page</h2></Link>
          </p>
        </div>
      );
}