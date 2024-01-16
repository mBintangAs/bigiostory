import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom"
import CreatableSelect from 'react-select/creatable';
import { MySwal, deleteData, fetchData, postData } from "../main";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function ActionStory() {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [synopsis, setSynopsis] = useState('')
    const [categorySelected, setCategorySelected] = useState('')
    const [storyCover, setStoryCover] = useState(null)
    const [status, setStatus] = useState('')
    const [tags, setTags] = useState([])
    const [category, setCategory] = useState([])
    const fileInputRef = useRef(null);
    const navigate = useNavigate()
    const location = useLocation();
    const [isDisabled, setIsDisabled] = useState(false)
    const { judul } = useParams();
    const [pagename, setPageName] = useState(formatPathToLabel(location.pathname));
    const [chapter, setChapter] = useState('')


    useEffect(() => {
        const load = async () => {
            await fetchData('/category', setCategory)

            if (pagename == 'Detail') {
                setIsDisabled(true)
                await fetchData('/story/' + judul, (e) => {
                    setTitle(e.title)
                    setAuthor(e.author)
                    setSynopsis(e.synopsis)
                    setCategorySelected(e.categoryId)
                    setStatus(e.status)
                    const tagObjects = e.Tags.map(tag => ({ label: tag.name }));
                    setTags(tagObjects);
                    setStoryCover(e.storyCover)
                })
            }
            if (pagename == 'Edit') {
                await fetchData('/story/' + judul, (e) => {
                    setTitle(e.title)
                    setAuthor(e.author)
                    setSynopsis(e.synopsis)
                    setCategorySelected(e.categoryId)
                    setStatus(e.status)
                    const tagObjects = e.Tags.map(tag => ({ label: tag.name }));
                    setTags(tagObjects);
                    setStoryCover(e.storyCover)
                })
            }
            if (pagename !== 'Tambah') {
                await fetchData('/chapter?judul=' + judul, setChapter)

            }
        }
        load()
    }, [])
    async function submit(e) {
        e.preventDefault()
        if (storyCover === null) {
            return MySwal.fire({
                title: "Silahkan memasukkan gambar cover",
                icon: "warning",
                showConfirmButton: true
            })
        }
        if (categorySelected === '') {
            return MySwal.fire({
                title: "Silahkan memilih kategori",
                icon: "warning",
                showConfirmButton: true
            })
        }
        if (status === '') {
            return MySwal.fire({
                title: "Silahkan memilih status",
                icon: "warning",
                showConfirmButton: true
            })
        }
        if (tags.length < 1) {
            return MySwal.fire({
                title: "Silahkan memasukkan keyword / tag",
                icon: "warning",
                showConfirmButton: true
            })
        }
        let tag = []
        tags.map((e) => tag.push(pagename === 'Tambah' ? e.value : e.label))
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('synopsis', synopsis);
        formData.append('status', status);
        formData.append('categoryId', categorySelected);
        formData.append('storyCover', storyCover);
        formData.append('tags', JSON.stringify(tag));
        let url;
        if (pagename === 'Edit') {
            url = '/story-edit'
        }
        if (pagename === 'Tambah') {
            url = '/story'
        }
        await postData(url, formData, (item) => {
            MySwal.fire({
                title: item.message,
                icon: "success",
                showConfirmButton: true
            })
            navigate(`/story`)
        });


    }
    function cancel() {
        if (isDisabled) {
            return navigate('/story')
        }
        MySwal.fire({
            title: 'Apakah  yakin untuk keluar ? ',
            text: 'semua data yang sudah di masukkan akan dihapus dan tidak di simpan',
            icon: 'info',
            showCancelButton: true,
            cancelButtonColor: "red",
            confirmButtonColor: 'blue',
            confirmButtonText: 'Ya, Saya Setuju'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/story')
            }
        });
    }
    function handleFileChange(event) {
        const selectedFile = event.target.files[0];
        if (!selectedFile.type.startsWith('image/')) {
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            return MySwal.fire({
                title: "Format gambar yang di masukkan salah",
                icon: "warning",
                showConfirmButton: true
            })
        }
        setStoryCover(selectedFile)
    }
    function formatPathToLabel(path) {
        const detail = path.split("/");
        return detail[1].charAt(0).toUpperCase() + detail[1].slice(1);
    }
    function formatDateAddHours(dateString, hoursToAdd) {
        let date = new Date(dateString);
        date.setHours(date.getHours() + hoursToAdd);
        return date.toLocaleString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' });
    }
    async function deleteChapter(id) {
        MySwal.fire({
            title: 'Apakah  yakin untuk menghapus ? ',
            text: 'Aksi ini tidak dapat di kembalikan',
            icon: 'danger',
            showCancelButton: true,
            cancelButtonColor: "red",
            confirmButtonColor: 'blue',
            confirmButtonText: 'Ya, Saya Setuju'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteData('/chapter?id=' + id, (item) => {
                    MySwal.fire({
                        title: item.message,
                        icon: "success",
                        showConfirmButton: true
                    })
                    fetchData('/chapter?judul=' + judul, setChapter)
                });

            }
        });
    }
    return (
        <>
            <form onSubmit={submit} >
                <div className="container-fluid pt-4 px-4">
                    <div className="col-12  p-4">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <NavLink activeclassname="text-primary" onClick={cancel} className="breadcrumb-item">List Cerita</NavLink>
                                <NavLink activeclassname="text-primary" to={location.pathname} className="breadcrumb-item">{pagename} Cerita</NavLink>
                            </ol>
                        </nav>
                        <h1 className="">{pagename} Cerita</h1>

                        <div className="card">

                            <div className="card-body">
                                <div className="row mb-3">
                                    <div className="col-6 ">
                                        <div className="form-floating ">
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={e => setTitle(e.target.value)}
                                                value={title}
                                                required
                                                disabled={isDisabled}
                                                placeholder=""
                                            />
                                            <label htmlFor="floatingInput">Title</label>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-floating ">
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={e => setAuthor(e.target.value)}
                                                value={author}
                                                required
                                                placeholder=""
                                                disabled={isDisabled}
                                            />
                                            <label htmlFor="floatingInput">Writer Name</label>
                                        </div>

                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-floating">
                                            <textarea placeholder="" disabled={isDisabled} required className="form-control h-100" id="floatingTextarea" value={synopsis} onChange={(e) => setSynopsis(e.target.value)} />
                                            <label htmlFor="floatingTextarea">Synopsis</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6 ">
                                        <select disabled={isDisabled} className="form-select" required id="categorySelect" value={categorySelected} onChange={(e) => setCategorySelected(e.target.value)} aria-label="">
                                            <option  >Pilih Category</option>
                                            {category.map((e) => (
                                                <option key={e.id} value={e.id}>{e.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-floating">
                                            <CreatableSelect
                                                isDisabled={isDisabled}
                                                value={tags}
                                                onChange={(e) => setTags(e || [])}
                                                isMulti
                                                placeholder="Tags / Keyword"
                                                options={[]}
                                            />
                                        </div>

                                    </div>
                                </div>
                                <div className="row mb-3">

                                    <div className={"col-6"}>
                                        <input type="file" disabled={isDisabled} accept="image/*" ref={fileInputRef} className='form-control' onChange={handleFileChange} />
                                    </div>
                                    <div className="col-6 ">
                                        <select disabled={isDisabled} className="form-select" id="categorySelect" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="">
                                            <option  >Pilih Status</option>
                                            <option value="publish">Publish</option>
                                            <option value="draft">Draft</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="row">
                                    <img src={axios.defaults.baseURL + '/images/' + storyCover} alt="" />
                                </div>
                            </div>
                        </div>
                        {
                            pagename !== 'Tambah' &&
                            (<div className="card">
                                <div className="card-header">
                                    {!isDisabled && (
                                        <div className="row justify-content-end" >
                                            <NavLink to={'/chapter/' + title} className="btn btn-primary w-25" >Add Chapter</NavLink>
                                        </div>
                                    )}
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <td>Title</td>
                                                    <td>Last Update</td>
                                                    {!isDisabled && (
                                                        <td>Action</td>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {chapter && chapter.map((e) => (
                                                    <tr className="w-100" key={e.id} >
                                                        <td>{e.title}</td>
                                                        <td>{formatDateAddHours(e.updatedAt, 7)}</td>
                                                        {!isDisabled &&
                                                            (<td>
                                                                <i className="fa-solid fa-ellipsis " type="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                                                <ul className="dropdown-menu">
                                                                    <li><NavLink to={`/chapter/${judul}/${e.id}`} className="dropdown-item" href="#">Edit</NavLink></li>
                                                                    <li><div className="dropdown-item" onClick={() => deleteChapter(e.id)}>Delete</div></li>
                                                                </ul>
                                                            </td>)
                                                        }
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                    <div className="row justify-content-end gap-1 my-3">
                        <div className="btn btn-secondary w-25" onClick={cancel}>Cancel</div>
                        <button type='submit' disabled={isDisabled} className="btn btn-light w-25">Save</button>
                    </div>
                </div>
            </form>
        </>
    )
}