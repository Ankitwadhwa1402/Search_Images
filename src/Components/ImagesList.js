import react from "react";
import '../App.css'
import Searchbar from "./Searchbar";

export default class ImagesList extends react.Component{
      
    state={
            images:[],
            
        }
    
        addImages=async(imgdetails)=>{
           

           this.setState({
               images:imgdetails.list
           })
        }
      
        render()
        {
            return(
                <div>
                    <Searchbar  onSubmit={this.addImages} />
                    <div className="list">
                    {this.state.images.map((image)=>{
                        return <img key={image.id} src={image.imgurl} />
                    
                    })
                    }
                    </div>
                    
                </div>
            );
        }
}
