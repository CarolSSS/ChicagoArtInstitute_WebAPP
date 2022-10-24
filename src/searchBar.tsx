import React from "react";
import './App.css';
import './galleryView.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

interface Item {
    id: number,
    image_id: string,
    title: string
}

class SearchBar extends React.Component<{}, { items: Array<Item>,loaded:boolean, count:number,page:number,value:string,curr:string,order:string,sortType:string}> {
    constructor(props:any) {
        super(props);
        this.state = {
            page:1,
            value: '',
            items: [],
            loaded: false,
            count:0,
            curr:'',
            order:"DESC",
            sortType:"_score"
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.handleOnError = this.handleOnError.bind(this);
    }

    fetchData() {
        axios.get("https://api.artic.edu/api/v1/artworks/search?q="+this.state.value
        +"&fields=id,title,image_id,_score&size=24&page="+this.state.page
        +"&sort["+ this.state.sortType
        +"][order]="+this.state.order)
            .then((response) => {
                let curr = [] as any;
                if (response.data) {
                    response.data.data.map( (item:Item) => (
                        curr.push(item)
                    ))
                    this.setState({
                        items: curr,
                        loaded: true,
                        count:0
                    })
                }
            })
    }
   
    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate() {
        this.fetchData()      
    }


    getImage(url:any, id:any) {
        // if id is empty
        if(id === null) {
            return 'https://thumbs.dreamstime.com/b/not-available-stamp-seal-watermark-distress-style-designed-rectangle-circles-stars-black-vector-rubber-print-title-138796185.jpg'
        }
        return url + "/" + id +"/full/843,/0/default.jpg";
    }

    handleChange(event:any) {
        this.setState({value: event.target.value})
    }

    onChangeValue(event:any) {
        this.setState({order: event.target.value})
    }

    handleSelect(event:any) {
        this.setState({sortType: event.target.value})
    }

    handleOnError(event:any) {
        // alert(event.target.style);
    }

    getPage(p:number) {
        if (p < 1) {
            alert("This is already the very first page")
            return 1
        }
        return p;
    }

    render() {
        if (!this.state.loaded) {
            return <div className="word3"> Loading  </div> ;
        } else { 
            return (
                <div className = "App">
                    <label>
                        <br></br>
                        <div className="word3-title">Search Your Favourite Artworks</div>
                        <br></br>
                        <input
                            type = "text"
                            value = {this.state.value}
                            onChange = {this.handleChange} className ="egg2"/>
                    </label>
                    <div className="box3">
                        <div className="word3">Sort by:</div>
                        <select name="select" className="egg5" onChange={this.handleSelect}>
                            <option value="_score">Popularity</option>
                            <option value="date_end">Date Painted</option>
                            <option value="artwork_type_id">Art Work Type</option>
                            <option value="artist_id">Artist ID</option>
                        </select>
                    </div>

                    <div className="box3">
                        <div >
                            <div>
                            <label>
                                <input type="radio" value="DESC" onChange={this.onChangeValue} checked={"DESC"===this.state.order} />
                                Descending Order
                            </label>
                            </div>
                            
                            <div>
                            <label>
                                <input type="radio" value="ASC" onChange={this.onChangeValue} checked={"ASC"===this.state.order} />
                                Ascending Order
                            </label>
                            </div>
                        </div>  
                    </div>
        
                    <br></br>
                    <hr/>
            
                    <div className="box">
                        {   
                        this.state.items.map((item:any) => ( 
                            <Link to ={"/gallery/"+item.id}  className ="egg">
                                <img src={this.getImage("https://www.artic.edu/iiif/2/", item.image_id)} className="helper" alt ="source unavailable"
                                onError={()=>this.handleOnError(item.image_id)}>
                                </img>
                                <br></br>
                                <div className ="word6">{item.title.substring(0,80)}</div>
                                </Link>
                            ))
                        }
                    </div>
                    <div className="box2">
                        <button onClick = {()=>(this.setState({loaded:false, page:this.getPage(this.state.page-1)}))} className="buttonsize">Previous page</button>
                        <div className="word">Page Number: {this.state.page}</div>
                        <button onClick = {()=>(this.setState({loaded:false, page:this.state.page+1}))} className="buttonsize">Next page</button>
                    </div>
                </div>

            )
        }
    }
}
   
export default SearchBar;
