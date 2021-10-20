import React, {useState,useEffect} from 'react'
import {singleFileUplaod,multipleFilesUpload} from '../data/api'
import {CircularProgressbar,buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import './FileUploadScreen.css'

const FileUploadScreen = ({getsingle,getMultiple}) => {
  const[singleFile,setSingleFile]=useState('')
  const[multipleFile,setMultipleFile]=useState('')
  const [title,setTitle]=useState('')
  const[singleProgress,setSingleProgress]=useState(0)
  const[multipleProgress,setMultipleProgress]=useState(0)


  const singleFileObtions ={
    onUploadProgress:(progressEvent)=>{
      const {loaded,total} = progressEvent;
      const percentage=Math.floor(((loaded/1000)*100)/(total/1000));
      setSingleProgress(percentage)
    }
  }

  const multipleFileObtions ={
    onUploadProgress:(progressEvent)=>{
      const {loaded,total} = progressEvent;
      const percentage=Math.floor(((loaded/1000)*100)/(total/1000));
      setMultipleProgress(percentage)
    }
  }


  const singleFileChange =(e)=>{
    setSingleFile(e.target.files[0])
    setSingleProgress(0)
  }

  const uploadSingleFile = async()=>{
    const formData=new FormData()
    formData.append('file',singleFile)
    await singleFileUplaod(formData,singleFileObtions)
    getsingle()
      // console.log(singleFile)
  }

  const multipleFileChange = (e)=>{
    setMultipleFile(e.target.files)
    setMultipleProgress(0)

  }

  const uploadMultipleFiles = async()=>{
    const formData = new FormData()
    formData.append('title',title)
    for(let i=0;i<multipleFile.length;i++){
      formData.append('files',multipleFile[i])
    }

    await multipleFilesUpload(formData,multipleFileObtions)
    getMultiple()
    // console.log(multipleFile)
  }

  return (
    <div className="row mt-3">
      <div className="col-6">
          <div className="form-group">
            <label>Select Single File</label>
            <input type="file" className="form-control" onChange={(e)=>singleFileChange(e)}/>
          </div>
          <div className="row">
            <div className="col-10">
              <button type="button" className="btn btn-danger" onClick={()=>uploadSingleFile()}>Upload</button>
            </div>
            <div className="col-2 ">
                <CircularProgressbar
                className="circularcontrol"
                  value={singleProgress}
                  text={`${singleProgress}%`}
                  styles={buildStyles({
                    rotate:0.25,
                    strokeLinecap:'butt',
                    textSize:'16px',
                    pathTransitionDuraton:0.5,
                    pathColor:`rgba(255,136,136,${singleProgress/100})`,
                    textColor:'#f88',
                    trailColor:'#d6d6d6',
                    backgroundColor:'#3e98c7',
                  })}
                />
            </div>
          </div>
      </div>
      <div className="col-6">
          <div className="row">
            <div className="col-6">
              <label>Title</label>
                <input type="text" placeholder="Enter tiltle for your galery" className="form-control"  onChange={(e)=>setTitle(e.target.value)}/>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Select Multiple File</label>
                    <input type="file" className="form-control" multiple onChange={(e)=>multipleFileChange(e)}/>
                  </div>
        </div>
      </div>

      <div className="row">
        <div className="col-10">
            <button type="button" className="btn btn-danger" onClick={()=>uploadMultipleFiles()}>Upload</button>
        </div>
        <div className="col-2 ">
            <CircularProgressbar
            className="circularcontrol"
              value={multipleProgress}
              text={`${multipleProgress}%`}
              styles={buildStyles({
                rotate:0.25,
                strokeLinecap:'butt',
                textSize:'16px',
                pathTransitionDuraton:0.5,
                pathColor:`rgba(255,136,136,${multipleProgress/100})`,
                textColor:'#f88',
                trailColor:'#d6d6d6',
                backgroundColor:'#3e98c7',
              })}
            />
        </div>
      </div>
      </div>
    </div>
  )
}

export default FileUploadScreen
