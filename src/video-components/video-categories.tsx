import axios from "axios";
import { useEffect, useState } from "react";
import { VideoContracts } from "../contracts/VideoContracts";
import { CategoriesContracts } from "../contracts/CategoriesContracts";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

export function VideoCategories() {
    const [videos, setVideos] = useState<VideoContracts[]>([]);
    const [cookies, setCookies, removeCookies] = useCookies(['user-id']);
    const [categories, setCategories] = useState<CategoriesContracts[]>([]);
    const [categoriesId, setCategoriesId] = useState<string>("");
    let navigate = useNavigate();
    let params = useParams();

    function handleSignout() {
        removeCookies('user-id');
        navigate('/');
    }

    function VideoCategory() {
        axios.get('http://127.0.0.1:7070/get-categories')
            .then(response => {
                const updatedCategories = [{ CategoryId: '-1', CategoryName: 'Select Category' }, ...response.data];
                setCategories(updatedCategories);
            })
            .catch(error => {
                console.error("There was an error fetching the categories!", error);
            });
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoriesId(e.target.value);
    };

    function LoadVideos(categoryId: string) {
        if (categoryId && categoryId !== '-1') {
            axios.get(`http://127.0.0.1:7070/category/${categoryId}`)
                .then(response => {
                    setVideos(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the videos!", error);
                });
        } else if(categoriesId == "-1"){
            axios.get(`http://127.0.0.1:7070/get-videos`)
            .then(response => {
                setVideos(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the videos!", error);
            });
        }else{
            setVideos([])
        }
    }

    useEffect(() => {
        if (categoriesId) {
            LoadVideos(categoriesId);
        }
    }, [categoriesId]);
    useEffect(()=>{
        if(cookies['user-id']==undefined){
            navigate('/user-login');
        }else{
            VideoCategory();    
        }
    },[])

    return (
        <div className="overflow-auto" style={{ height: '500px' }}>
            <h2 className="align-item-centre">Video Category</h2>
            <header className="text-center fs-5 d-flex justify-content-between">
                <span>UserDashbord-[{cookies['user-id']}]</span>
                <button className="btn btn-danger" onClick={handleSignout}>Sign Out</button>
            </header>
            <nav className="text-center fw-bold">
                <Link to="/user-dashbord" className="me-4 fw-bold">Home</Link>
                <Link to="/video-categories">Category</Link>
            </nav>
            <div>
                <dl className="row">
                    <dt className="col-3">Select Category</dt>
                    <dd className="col-9">
                        <select name="CategoryId" required className="form-control w-50" onChange={handleCategoryChange}>
                            {
                                categories.map(category =>
                                    <option key={category.CategoryId} value={category.CategoryId}>
                                        {category.CategoryName}
                                    </option>
                                )
                            }
                        </select>
                    </dd>
                </dl>
            </div>
            <main className="d-flex flex-wrap">
                {
                    videos.map(video =>
                        <div key={video.VideoId} className="card m-3 p-2" style={{ width: "200px" }}>
                            <div className="card-header">
                                {video.Title}
                            </div>
                            <div className="card-body">
                                <iframe src={video.Url} width="100%" height="100%" title={video.Title}></iframe>
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
    );
}
