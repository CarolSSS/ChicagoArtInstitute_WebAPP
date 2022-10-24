import React from "react";
import './App.css';
import './galleryView.css';
import axios from 'axios';
import { Link} from 'react-router-dom';

interface Item {
    id: number,
    image_id: string,
    date_display: number,
    title: string
}


class Results extends React.Component<{}, { items: Array<any>, loaded:boolean, count:number,page:number,start:number,end:number}> {
    constructor(props:any) {
        super(props);
        this.state = {
            items: [],
            loaded: false,
            count:0,
            page:1,
            start:-1,
            end:3000
        }
        this.handleOnError = this.handleOnError.bind(this);
    }

    fetchData() {
        axios.get("https://api.artic.edu/api/v1/artworks/search?query[range][date_end][gte]="+this.state.start
            +"&query[range][date_end][lt]=" +this.state.end
            +"&fields=id,title,image_id&page="
                +this.state.page+"&limit=24&sort[date_end][order]=asc")

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
        this.fetchData();
    }

    componentDidUpdate() {
        this.fetchData();
    }

    
    handleOnError(event:any) {
        // alert(event.target);
        // alert(event.target.style);
        // alert(event.target.style);
        // let curr = document.getElementById("helper") as HTMLImageElement;
        // alert(curr);
        // curr.src= 'https://www.nutraingredients-usa.com/var/wrbm_gb_food_pharma/storage/images/9/4/5/8/218549-6-eng-GB/Akay-Flavours-Aromatics-Pvt.-Ltd2.jpg';
    }

    getImage(url:any, id:any) {
        // if id is empty
        if(id === null) {
            return 'https://thumbs.dreamstime.com/b/not-available-stamp-seal-watermark-distress-style-designed-rectangle-circles-stars-black-vector-rubber-print-title-138796185.jpg'
        }
        if(id.length === 0) {
            return 'https://thumbs.dreamstime.com/b/not-available-stamp-seal-watermark-distress-style-designed-rectangle-circles-stars-black-vector-rubber-print-title-138796185.jpg'
        }
        return url + "/" + id +"/full/843,/0/default.jpg";
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
            return <div className="word3"> Loading </div> ;
        } else {
            return (
                <div className = "App">
                    <br></br>
                    <div className="word3-title"> Artwork List </div>  
                    <br></br>
                    <div className="box2">
                        <button onClick = {()=>{this.setState({start:-1,end:3000})}} className="buttonsize2"><div className="word33">Reset to all</div></button>
                        <button onClick = {()=>{this.setState({start:-1,end:1900})}} className="buttonsize2"><div className="word33">Before 1900</div></button>
                        <button onClick = {()=>(this.setState({start:1900,end:1950}))} className="buttonsize2"><div className="word33">1900-1950</div></button>
                        <button onClick = {()=>(this.setState({start:1950,end:2000}))} className="buttonsize2"><div className="word33">1950-2000</div></button>
                        <button onClick = {()=>(this.setState({start:2000,end:3000}))} className="buttonsize2"><div className="word33">2000-Present</div></button>
                    </div>

                    <br></br>

                    <div className="box">
                        {   
                        this.state.items.map((item:any) => ( 
                            <Link to ={"/gallery/"+item.id} className ="egg">
                                <img src={this.getImage("https://www.artic.edu/iiif/2/", item.image_id)} className="helper" id ="helper" alt ="source unavailable"
                                onError={()=>this.handleOnError(item.image_id)} >
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
            );
        }
    }
}
   
export default Results;
