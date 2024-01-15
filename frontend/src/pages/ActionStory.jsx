import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom"
import CreatableSelect from 'react-select/creatable';
import { MySwal, fetchData, postData } from "../main";
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



    useEffect(() => {
        const load = async () => {
            await fetchData('/category', setCategory)
            if (formatPathToLabel(location.pathname) == 'Detail') {
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
                    console.log(tagObjects);
                })
            }
        }
        load()
    }, [])
    async function tambahSubmit(e) {
        e.preventDefault()
        console.log(tags);
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
        tags.map((e) => tag.push(e.value))
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('synopsis', synopsis);
        formData.append('status', status);
        formData.append('categoryId', categorySelected);
        formData.append('storyCover', storyCover);
        formData.append('tags', JSON.stringify(tag));

        await postData('/story', formData, (item) => {
            MySwal.fire({
                title: item.message,
                icon: "success",
                showConfirmButton: true
            })
            navigate(`/story/`)
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
        // Menghapus karakter garis miring awal dan mengganti dengan huruf kapital
        const detail = path.split("/");
        return detail[1].charAt(0).toUpperCase() + detail[1].slice(1);
    }
    return (
        <>
            <form onSubmit={tambahSubmit} >
                <div className="container-fluid pt-4 px-4">
                    <div className="col-12  p-4">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <NavLink activeclassname="text-primary" onClick={cancel} className="breadcrumb-item">List Cerita</NavLink>
                                <NavLink activeclassname="text-primary" to={location.pathname} className="breadcrumb-item">{formatPathToLabel(location.pathname)} Cerita</NavLink>
                            </ol>
                        </nav>
                        <h1 className="">{formatPathToLabel(location.pathname)} Cerita</h1>

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

                                    <div className={"col-6"+isDisabled&&'d-none'}>
                                        <input required type="file" accept="image/*" ref={fileInputRef} className='form-control' onChange={handleFileChange} />
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
                                    <img src={axios.defaults.baseURL+'/images/'+storyCover} alt="" />
                                </div>
                            </div>

                        </div>
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