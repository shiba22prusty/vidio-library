import axios from "axios";
import { useEffect, useState } from "react"
import { VideoContracts } from "../contracts/VideoContracts";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";



export function AdminDashbord() {
    const [videos, setVideos] = useState<VideoContracts[]>();

    const [cookies, setCookies, removeCookies] = useCookies(['admin-id']);
    let navigate = useNavigate();


    function LoadVideos(): void {
        axios.get(`http://127.0.0.1:7070/get-videos`)
            .then(response => {
                setVideos(response.data);
                setCookies("admin-id", removeCookies)
            })
    }
    function handleSignout() {
        removeCookies('admin-id');
        navigate('/')
    }
    useEffect(()=>{
        if(cookies['admin-id']==undefined){
            navigate('/admin-login');
        }else{
            LoadVideos();
        }
    },[])


    function handleRemoveClick(id: number){
        axios.delete(`http://127.0.0.1:7070/delete-video/${id}`)
            alert('Video Deleted');
        window.location.reload();
    }


    return (
        <div>
            <div className="d-flex justify-content-between">
                <h2>Admin Dashboard - [{cookies['admin-id']}]</h2>
                <button className="btn btn-danger" onClick={handleSignout}>Sign Out</button>
            </div>
            <Link to='/add-video' className="bi bi-camera-video btn btn-primary "> Add Video</Link>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Preview</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        videos?.map(video =>
                            <tr key={video.VideoId}>
                                <th>{video.Title}</th>
                                <th>
                                    <iframe src={video.Url} width="200" height="200"></iframe>
                                </th>
                                <th>
                                    <Link to={`/edit-video/${video.VideoId}`} className="btn btn-warning m-2"><span className="bi bi-pen-fill"></span></Link>
                                   <button className="btn btn-danger bi bi-trash-fill" onClick={()=>handleRemoveClick(video.VideoId)}></button>
                                </th>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}