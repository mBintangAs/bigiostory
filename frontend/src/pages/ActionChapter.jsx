import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { MySwal, fetchData, postData } from "../main";

export default function ActionChapter() {
    const location = useLocation();
    const [title, setTitle] = useState('')
    const [storyChapter, setStoryChapter] = useState('')
    const { judul } = useParams()
    const navigate = useNavigate()
    const [pagename, setPageName] = useState();

    useEffect(() => {
        async function cekPageName() {
            const checkPage = location.pathname.split('/')[3];
            setPageName(checkPage ? 'Edit' : 'Tambah')
            if (checkPage) {
                console.log(location.pathname.split('/')[3]);
                await fetchData('/chapter/'+location.pathname.split('/')[3],(item)=>{
                    setTitle(item.title);
                    setStoryChapter(item.storyChapter);
                })
            }
        }
        cekPageName()
    }, [])
    function cancel() {

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
                console.log(judul);
                navigate('/edit/' + judul)
            }
        });
    }
    async function submit(e) {
        e.preventDefault();
        if (pagename === 'Tambah') {
            postData('/chapter', { title, storyChapter, judul }, (item) => {
                MySwal.fire({
                    title: item.message,
                    icon: "success",
                    showConfirmButton: true
                })
                navigate('/edit/' + judul)
            })
        }
        if (pagename === 'Edit') {
            postData('/chapter-edit', { title, storyChapter, judul }, (item) => {
                MySwal.fire({
                    title: item.message,
                    icon: "success",
                    showConfirmButton: true
                })
                navigate('/edit/' + judul)
            })
        }
    }

    return (
        <>
            <form onSubmit={submit}>
                <div className="container-fluid pt-4 px-4">
                    <div className="col-12  p-4">
                        <h3 >{pagename} Chapter</h3>
                        <div className="row my-3">
                            <div className="col">
                                <div className="form-floating ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={e => setTitle(e.target.value)}
                                        value={title}
                                        required
                                        placeholder=""
                                    />
                                    <label htmlFor="floatingInput">Title</label>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <ReactQuill theme="snow" value={storyChapter} onChange={setStoryChapter} />
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end gap-1 my-3">
                    <div className="btn btn-secondary w-25" onClick={cancel}>Cancel</div>
                    <button type='submit' className="btn btn-light w-25">Save</button>
                </div>
            </form>
        </>
    )
}
