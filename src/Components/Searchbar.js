import '../App.css'
import react from "react";
const butt=document.getElementById('search')
export default class Searchbar extends react.Component{
    state={
        imageCollection:[],
        input:"",
        page:1,
        lastpage:0
    }
   
    handleChange=(event)=>{
 
    this.setState({
        input:event.target.value
    })
    }
    handleSubmit=async(e)=>{
        e.preventDefault();    
        this.setState({
             imageCollection:[]
         })
        const text=this.state.input
        const pageno=this.state.page
        const url=`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e52a287d86469bf01ea901dfd92cf8a5&text=${text}&media=photos&per_page=12&page=${pageno}&format=json&nojsoncallback=1`;
        const response=await fetch(url);
        const data=await response.json(); 
         console.log(data.photos)
        for (let i=0;i<12;i++)
        {
          
            const imageObj=data.photos.photo[i]
            
            const imageurl=`https://farm${imageObj.farm}.staticflickr.com/${imageObj.server}/${imageObj.id}_${imageObj.secret}.jpg`
            const imgdetails={
                id:imageObj.id,
                imgurl:imageurl
            }
            const newimgs= [imgdetails,...this.state.imageCollection];  
             
                setTimeout(this.setState({
                      imageCollection:newimgs ,
                      lastpage:data.photos.pages
                }) ,1000)
         }
         this.props.onSubmit({
             list:this.state.imageCollection
         })
     
        }
    handleButton=async(e)=>{
        e.preventDefault()
      await this.setState({
            page:e.target.name==="next"?this.state.page+1:this.state.page-1
        })
       this.handleSubmit(e)
    }
    render()
    {
             return(
            
            <form onSubmit={this.handleSubmit}>
            <div className="form">
            <div>
                <input placeholder="Search free high resolution photos" onChange={this.handleChange} value={this.state.input} />
                <button id="search" className='search' onClick={this.search}>Search</button>
            </div>
            </div>
            <div className="btn">
            {this.state.page>1?
                <button name="prev" onClick={this.handleButton} className="prev">Prev</button>:null}
            {this.state.page>0 && this.state.lastpage>this.state.page?
                 <button name='next' onClick={this.handleButton} className="next">Next</button>:null}
            </div>
        
            </form>
        );
    }
}