import './App.css';
import FileUploadScreen from './screens/FileUploadScreen'
import {getSingleFiles,getMultipleFiles} from './data/api'
import {useState,useEffect} from 'react'
function App() {
  const [singleFiles,setSingleFiles]=useState([])
  const [multlipleFiles,setMultipleFiles]=useState([])

  const getSingleFilesList = async ()=>{
    try{
      const filesList = await getSingleFiles()
      setSingleFiles(filesList)
    }catch(error){
      console.log(error)
    }
  }

  const getMultipleFilesList = async ()=>{
    try{
      const fileslist = await getMultipleFiles()
      setMultipleFiles(fileslist)

    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    getSingleFilesList()
    getMultipleFilesList()
  },[])
  return (
    <>
    <div className="container">
    <h3 className="text-danger font-weight-bolder border-bottom text-center">Single and Multiple file upload using MERN stack</h3>
    <FileUploadScreen getsingle={()=>getSingleFilesList()} getMultiple={()=>getMultipleFilesList()}/>
    </div>
    <div className="container-fluid mt-5">
      <div className="row">
          <div className="col-6">
            <h4 className="text-success font-weight-bold">Single Files List</h4>
            <div className="row">
              {singleFiles.map((file,index)=>(
                <div className="col-6">
                  <div className="card mb-2 border-0 p-0">
                    <img src={`http://localhost:8080/${file.filePath}`} height="200" alt="" className="card-img-top" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-6">
          <h4 className="text-success font-weight-bold">Multiple File List</h4>
          <div className="row">
            {
            multlipleFiles.map((element,index)=>(
              <div key={element._id} >
                <h6 className="text-danger font-weight-bold">{element.title}</h6>
                <div className="row">
                  {element.files.map((file,index)=>(
                    <div className="col-6">
                    <div className="card mb-2 border-0 p-0">
                      <img src={`http://localhost:8080/${file.filePath}`} height="200" alt="" className="card-img-top" />
                    </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
            }
          </div>
          </div>

      </div>
    </div>

    </>
  );
}

export default App;
