import axios from "axios";
import { useEffect, useState } from "react"
import { NavLink, useOutletContext } from "react-router-dom"
import Spinner from "../partials/Spinner";
import { MySwal, deleteData, fetchData } from "../main";

export default function Story() {
    const [isLoad, setIsLoad] = useOutletContext()
    const [query, setQuery] = useState('');
    const [cerita, setCerita] = useState([])
    const [category, setCategory] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');


    useEffect(() => {
        const load = async () => {
            await fetchData('/story', setCerita);
            await fetchData('/category', setCategory);
            setIsLoad(false)
        }
        load()
    }, []);

    useEffect(() => {
        const search = async () => {
            setIsLoad(true);
            if (query !== '') {
                if (categoryFilter || statusFilter) {
                    await fetchData(`/story?query=${query}&category=${category}&status=${statusFilter}`, setCerita);
                } else {
                    await fetchData(`/story?query=${query}`, setCerita);
                }
            } else {
                if (categoryFilter || statusFilter) {
                    await fetchData(`/story?query=${query}&category=${category}&status=${statusFilter}`, setCerita);
                } else {
                    await fetchData(`/story`, setCerita);

                }
            }
            setIsLoad(false)
        }
        search()
    }, [query]);


    const filter = () => {
        fetchData(`/story?query=${query}&category=${categoryFilter}&status=${statusFilter}`, setCerita);
    }
    const hapus = async (id) => {
        console.log(id);
        await deleteData('/story?id=' + id, async (item) => {
            MySwal.fire({
                title: item.message,
                icon: "success",
                showConfirmButton: true
            })
            await fetchData('/story', setCerita)
        })
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
                                    <input type="search" onChange={(e) => setQuery(e.target.value)} value={query} id="" className="form-control" placeholder="Search by writer's name / title story" />
                                </div>
                                <div className="cursor-pointer" data-bs-toggle="modal" data-bs-target="#filterModal">
                                    <i className="fa-solid fa-filter fs-3 "></i>
                                </div>
                                <NavLink to={'/tambah'}>
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
                                            <td>
                                                <i className="fa-solid fa-ellipsis " type="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                                <ul className="dropdown-menu">
                                                    <li><NavLink to={`/edit/${data.title}`} className="dropdown-item" href="#">Edit</NavLink></li>
                                                    <li><NavLink to={`/detail/${data.title}`} className="dropdown-item" href="#">Detail</NavLink></li>
                                                    <li><a className="dropdown-item" onClick={() => hapus(data.id)} href="#">Hapus</a></li>
                                                </ul>

                                            </td>
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