import React, {Fragment, useState} from 'react';
import axios from 'axios';

const FileUpload= ()=>{
    const [file, setFile]= useState('');
    const [fileName,setFilename] = useState('chose File');
    const [uploadFile, setUploadFile]=useState({});

    const onChange = e =>{
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);

    };

    const onSubmit = async e => {
        e.preventDefault();
        const formData= new FormData();
        formData.append('file', file);
        try {
            const res= await axios.post('http://localhost:5000/upload', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const { fileName, filePath}= res.data;
            setUploadFile({fileName, filePath})
        } catch (err) {
            if(err.response.status===500){
                console.log("problem with server")
            }else{
                console.log(err.response.data.msg)
            }
        }
    }

    return ( 
        <Fragment>
            <form onSubmit={onSubmit} style={{"margin-left":"37%"}}>
                <div className="form-group inline">
                    <input type='file' className="form-control form-control-sm" id="customFile" onChange={onChange}/>
                    {/* <label className="form-control" htmlFor="customFile">
                        {fileName}
                    </label> */}
                </div>
                <input type="submit" value="upload" className="btn btn-primary btn-block mt-4"/>
            </form>
            {uploadFile ? <div className="row mt-5">
                <div className="col-md-6 m-auto">
                <h3 className="text-center">{uploadFile.fileName}</h3>
                <img style={{width:'100%'}} src={uploadFile.filePath} alt=""/>
                </div>
            </div>:null}
        </Fragment>
    )
}
export default FileUpload;