import React, { Component } from 'react';
import { Button, Form, Formgroup } from 'reactstrap';
import FileBase64 from "react-file-base64";
import './Upload.css';

class Upload extends Component {

    constructor(props){
        super();
        this.state = { 
            files : [],
            Result : [],
            objectis : ' '
        }
        this.fileupload = this.fileupload.bind(this);
        
    }

    getFiles(files){
        this.setState({files : files });
        console.log(files);
    }

    async fileupload(){
        const response = await fetch ( 'https://8xqea3tvnl.execute-api.ap-south-1.amazonaws.com/prod/objectphoto',{
            method : "POST",
            headers :{
                Accept : "application/json",
                "content-type" : "application/json",
            },
            body :JSON.stringify({photo : this.state.files['base64']})
        }
        )
        const Result  = await response.json();
        this.setState({Result: Result.body})

        const nameobj = JSON.parse(this.state.Result);
    
        
        //console.log(nameobj.Labels[0].Name)
        this.setState({objectis: nameobj.Labels[0].Name })
    }


    render() { 
        const objectis = this.state.objectis
        
        return (

            <div>

                <div className= "row">
                    <div className = "column-6 offset-3 ">
                        
                       <h1>Object Detector</h1>

                    </div>
                </div> 

                <div className= "row">
                    <div className = "col-6 offset-3 files">
                        <FileBase64 multiple={false} onDone ={this.getFiles.bind(this)}/>
                    </div>
                </div>

                <div className= "row">
                    <div className = "col-6 offset-3 ">
                        <img src = {this.state.files.base64} width = "50%" />
                    </div>
                </div>  

                
                <div className= "button">
                    <div className = "col-6 offset-3 ">
                        <Button className ="btn btn-lg btn-danger btn-block" onClick={this.fileupload}>detect the object!!!</Button> 
            
                    </div>
                </div> 

                <div className= "row">
                    <div className = "col-6 offset-5 ">
                       <h1>{objectis}</h1>
                    </div>
                </div> 



            </div>
        );
    }
}
 
export default Upload;