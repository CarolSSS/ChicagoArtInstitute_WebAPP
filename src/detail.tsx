import React, { useState,useEffect} from 'react';
import './App.css';
import './galleryView.css';
import './detail.css';

import { useLocation, useNavigate, Link} from 'react-router-dom'
import axios from 'axios';


export default function Detail(s:any) {
    const location = useLocation();
    const loc_cut = location.pathname.substring(9);
    const [state, setState] = useState([] as any);
    // id
    const [loc, setLoc] = useState(loc_cut);
    const [title, setTitle] = useState("monet");
    const [id_li, setId] = useState([] as any);
    const [image_id, setImage] = useState("https://img.freepik.com/premium-vector/system-software-update-upgrade-concept-loading-process-screen-vector-illustration_175838-2182.jpg?w=1000")
    const navigate = useNavigate();
    // alert(loc)

    useEffect(() => {
        // console.log(loc);
        // console.log(title);
        const fetchArt = async () => {
            const response = await axios.get(`https://api.artic.edu/api/v1/artworks/search?query[term][id]=${loc}&fields=id,title&page=1&limit=100`);
 
            console.log(response.data.data[0].title);
            
            let title2 =response.data.data[0].title;
            setTitle(title2);
        }
        fetchArt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title]);
    // console.log(title);
    
    useEffect(() => {
        const fetchArt = async () => {
            const response = await axios.get("https://api.artic.edu/api/v1/artworks/search?query[term][id]="+loc+"&fields=title,artwork_type_title,artist_title,department_title,department_title,id,image_id,place_of_origin,dimensions,medium_display,credit_line");
            let tmp = response.data.data[0];
            let image_set = `https://www.artic.edu/iiif/2/${tmp.image_id}/full/843,/0/default.jpg`;
            if (tmp.image_id == null) {
                image_set = "https://thumbs.dreamstime.com/b/not-available-stamp-seal-watermark-distress-style-designed-rectangle-circles-stars-black-vector-rubber-print-title-138796185.jpg";
            }
            setState(tmp);
            // setTitle(title_set);
            setImage(image_set);
            navigate("/gallery/"+loc);
        };
        
        fetchArt();
        return () => {
            // console.log('Component will be unmount')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loc]);


    useEffect(() => {
        let tmp: any[] = [];
            axios.get(`https://api.artic.edu/api/v1/artworks/search?q=${title}&fields=id,title&page=1&limit=100`)
                    .then((response) => {
                        if (response.data) {
                            tmp = response.data.data;
                            setId(tmp);
                        }
                    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id_li]);


    let handleClick1 = function() {
        let ind = 0;
        for (let i = 0; i < 100; i++) {
            let curr = ''+id_li[i].id;
            if (curr === loc) {
                ind = i;
            }
        } 
        ind = ind - 1;
        if (ind < 0) {
            ind = 99;
        }
        if (ind > 99) {
            ind = 0;
        }
        let new_id = ''+id_li[ind].id;
        // console.log(ind)
        setLoc(new_id);
    };

    let handleClick2 = function() {
        let ind = 0;
        for (let i = 0; i < 100; i++) {
            let curr = ''+id_li[i].id;
            if (curr === loc) {
                ind = i;
            }
        } 
        ind = ind + 1;
        if (ind < 0) {
            ind = 99;
        }
        if (ind > 99) {
            ind = 0;
        }
     
        let new_id = ''+id_li[ind].id;
        // console.log(ind);
        setLoc(new_id);
    };
 
    let source = image_id;
    return(
        <div>
            <div className='gridbox'>
            <div className='grid-container2'>
                <div className ="word22">Details View</div>
            </div>
            </div>
            <div className='gridbox'>
                <div className='grid-container'>
                    <img src={source} alt="not available" id="image" className="helper2"></img>
                </div>
                <div className='grid-container'>
                    <div className ="word9">Title : {state.title}</div>
                    <br></br>
                    <div className ="word9">Author : {state.artist_title}</div>
                    <br></br>
                    <div className ="word9">Type : {state.artwork_type_title}</div>
                    <br></br>
                    <div className ="word9">Department : {state.department_title}</div>
                    <br></br>
                    <div className ="word9">Place : {state.place_of_origin}</div>
                    <br></br>
                    <div className ="word9">Dimensions : {state.dimensions}</div>
                    <br></br>
                    <div className ="word9">Medium : {state.medium_display}</div>
                    <br></br>
                    <div className ="word9">Credit : {state.credit_line}</div>
                    <br></br>
                    <div className="word9"><Link to="/Gallery">Go back to gallery</Link></div>
                </div>
            </div>
            
            <div className="box2">
                <button className="buttonsize" onClick ={handleClick1}>Previous Artwork</button>
                <button className="buttonsize"  onClick ={handleClick2}>Next Artwork</button>
            </div>

        </div>
    )

};
