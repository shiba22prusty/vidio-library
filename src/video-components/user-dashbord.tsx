import axios from "axios";
import { useEffect, useState } from "react"
import { VideoContracts } from "../contracts/VideoContracts"
import {Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


export function UserDashbord(){
        const[videos, setVideos] = useState<VideoContracts[]>();
        const [cookies, setCookies, removeCookies] = useCookies(['user-id']);
        let navigate = useNavigate();

    function LoadVideos(){
        axios.get('http://127.0.0.1:7070/get-videos')
        .then(response=>{
            setCookies("user-id", removeCookies)
            setVideos(response.data);
        })
    }
    function handleSignout() {
        removeCookies('user-id');
        navigate('/')
    }
    
    useEffect(()=>{
        if(cookies['user-id']==undefined){
            navigate('/user-login');
        } else {
                LoadVideos();
        }
    },[])

    return(
        <div className="overflow-auto" style={{height:'500px'}}>
            <h2>Home</h2>
            <header className="text-center fs-5 d-flex justify-content-between">
            <span>UserDashbord-[{cookies['user-id']}]</span> 
            <button className="btn btn-danger" onClick={handleSignout}>Sign Out</button>
            </header>
            
            <nav className="text-center fw-bold">
                <Link to="/user-dashbord" className="me-4 fw-bold">Home</Link>
                <Link to="/video-categories">Category</Link>
            </nav>
            <main className="d-flex flex-wrap">
                {
                    videos?.map(video=>
                        <div className="card m-3 p-2" style={{width:"200"}}>
                            <div className="card-header">
                                {video.Title}
                            </div>
                            <div className="card-body">
                                <iframe src={video.Url} width="100%" height="100%"></iframe>
                            </div>
                            <div className="card-footer d-flex justify-content-around">
                                <span className="bi bi-hand-thumbs-up">{video.Like}</span>
                                <span className="bi bi-hand-thumbs-down">{video.Dislike}</span>
                            </div>
                        </div>
                    )
                }
            </main>
        </div>
    )
}