import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { fetchData } from '../main';


export default function CardCerita() {

    
    const [category, setCategory] = useState([])

    useEffect(() => {
        const load = async () => {
            await fetchData('/category', setCategory)
        }
        load()
    }, [])
    return (
        <>
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
                                />
                                <label htmlFor="floatingInput">Writer Name</label>
                            </div>

                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <div className="form-floating">
                                <textarea placeholder="" required className="form-control h-100" id="floatingTextarea" value={synopsis} onChange={(e) => setSynopsis(e.target.value)} />
                                <label htmlFor="floatingTextarea">Synopsis</label>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-6 ">
                            <select className="form-select" required id="categorySelect" value={categorySelected} onChange={(e) => setCategorySelected(e.target.value)} aria-label="">
                                <option  >Pilih Category</option>
                                {category.map((e) => (
                                    <option key={e.id} value={e.id}>{e.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-6">
                            <div className="form-floating">
                                <CreatableSelect
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
                        <div className="col-6">
                            <input required type="file" accept="image/*" ref={fileInputRef} className='form-control' onChange={handleFileChange} />
                        </div>
                        <div className="col-6 ">
                            <select className="form-select" id="categorySelect" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="">
                                <option  >Pilih Status</option>
                                <option value="publish">Publish</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>

                    </div>
                </div>

            </div>

        </>
    )
}