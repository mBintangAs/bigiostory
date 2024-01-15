import axios from "axios";
import { useEffect, useState } from "react"
import { NavLink, useOutletContext } from "react-router-dom"
import Spinner from "../partials/Spinner";
import { MySwal } from "../main";

export default function Story() {
    const [isLoad, setIsLoad] = useState(true)
    const [query, setQuery] = useState('');
    const [cerita, setCerita] = useState([])
    const [category, setCategory] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const fetchData = async (url, setDataCallback) => {
        try {
            const response = await axios.get(url);
            setDataCallback(response.data);
            setIsLoad(false);
        } catch (error) {
            console.error(error);
            MySwal.fire({
                title: 'Something went wrong!',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
            });
        }
    };

    useEffect(() => {
        fetchData('/story', setCerita);
        fetchData('/category', setCategory);
    }, []);

    useEffect(() => {
        const delayFetch = setTimeout(() => {
            if (query !== '') {
                setIsLoad(true);
                if (categoryFilter || statusFilter) {
                    fetchData(`/story?query=${query}&category=${category}&status=${statusFilter}`, setCerita);
                } else {
                    fetchData(`/story?query=${query}`, setCerita);
                }
            } else {
                setIsLoad(false);
                if (categoryFilter || statusFilter) {
                    fetchData(`/story?query=${query}&category=${category}&status=${statusFilter}`, setCerita);
                }
            }
        }, 1000);

        // Cleanup function to clear timeout on component unmount or query change
    }, [query]);

    const search = (event) => {
        const queryValue = event.target.value;
        setQuery(queryValue);
    };
    const filter = () => {
        fetchData(`/story?query=${query}&category=${categoryFilter}&status=${statusFilter}`, setCerita);
    }


    return (
        <>
            {/* Modal */}
            <div className="modal fade " id="filterModal" aria-labelledby="filterModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered ">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="filterModalLabel">Filter</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <label className="label">Category</label>
                            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="form-select mb-3" >
                                <option value="">Pilih Category</option>
                                {category.map((e) => (
                                    <option key={e.id} value={e.id}>{e.name}</option>
                                ))}

                            </select>
                            <label className="label">Status</label>
                            <select name="" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="form-select" >
                                <option value="">Pilih Status</option>
                                <option value="publish">publish</option>
                                <option value="draft">draft</option>
                            </select>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={() => {
                                setCategoryFilter('')
                                setStatusFilter('')
                            }} className="btn btn-danger">Reset Filter</button>
                            <button type="button" onClick={filter} data-bs-dismiss="modal" className="btn btn-primary">Filter</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid pt-4 px-4">
                <div className="col-12">
                    <div className="bg-light rounded h-100 p-4 position-relative">

                        {isLoad &&
                            <Spinner></Spinner>
                        }

                        <div className="d-flex justify-content-between">
                            <h6 className="mb-4">List Cerita</h6>
                            <div className="d-flex gap-3">
                                <div>
                                    <input type="search" onChange={search} value={query} id="" className="form-control" placeholder="Search by writer's name / title story" />
                                </div>
                                <div className="cursor-pointer" data-bs-toggle="modal" data-bs-target="#filterModal">
                                    <i className="fa-solid fa-filter fs-3 "></i>
                                </div>
                                <NavLink to={'/'}>
                                    <button className="btn btn-sm  btn-secondary text-light" >
                                        Tambah Cerita
                                    </button>
                                </NavLink>
                            </div>
                        </div>

                        <div className="table-responsive mt-3"  >
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Writes</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Tags</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>

                                    </tr>
                                </thead>

                                <tbody>
                                    {!isLoad && cerita.map((data, index) => (
                                        <tr key={index}>
                                            <td>{++index}</td>
                                            <td>{data.title}</td>
                                            <td>{data.author}</td>
                                            <td>{data.Category.name}</td>
                                            <td>{data.Tags.map((e) => (
                                                <span key={e.id} className="badge rounded-pill bg-secondary m-1">{e.name}</span>
                                            ))}</td>
                                            <td>
                                                <span className="badge rounded-pill bg-secondary m-1">{data.status}</span>
                                            </td>
                                            <td><i className="fa-solid fa-ellipsis"></i></td>
                                        </tr>
                                    ))}


                                </tbody>
                            </table>


                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}