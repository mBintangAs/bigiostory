import axios from "axios"
import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useOutletContext } from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export default function Story() {
    return (
        <>
            <div className="container-fluid pt-4 px-4">

                <div className="col-12">
                    <div className="bg-light rounded h-100 p-4">
                        <div className="d-flex justify-content-between">
                            <h6 className="mb-4">List Buku</h6>
                            <div className="d-flex gap-3">
                                <div className="dropdown">
                                    <button className="btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Export
                                    </button>
                                    <ul className="dropdown-menu">

                                        <li><a onClick={() => download("pdf")} className="dropdown-item" href="#">PDF</a></li>
                                        <li><a className="dropdown-item" onClick={() => download("excel")}>Excel</a></li>
                                    </ul>
                                </div>
                                <NavLink to={'/books/add'}>
                                    <button className="btn btn-sm  btn-primary text-light" >
                                        Tambah Buku
                                    </button>
                                </NavLink>
                            </div>
                        </div>

                        <div className="table-responsive"   >
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Uploader</th>
                                        <th scope="col">Categori</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {books.map((e, index) =>
                                        <tr key={e.id}>
                                            <td>{index + 1}</td>
                                            <td>{e.name}</td>
                                            <td>{e.category}</td>
                                            <td>{e.title}</td>
                                            <td>{e.quantity}</td>
                                            <td className="d-flex gap-3">
                                                <NavLink to={'/books/edit/'+e.title}>
                                                    <button type="button" className="btn  btn-primary ">Lihat</button>
                                                </NavLink>
                                                <button type="button" onClick={() => deleteBuku(e.id)} className="btn  btn-danger ">Hapus</button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                                <div className="d-flex justify-content-center">
                                    <Pagination length={books.length} handlePaging={handlePaging} offsetScroll={offsetScroll} />
                                </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}