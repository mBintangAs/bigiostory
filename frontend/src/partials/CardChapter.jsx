
export default function CardChapter() {
    return (
        <div className="card">
            <div className="card-header">
                <div className="row justify-content-end">
                    <div className="btn btn-primary w-25">Add Chapter</div>
                </div>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Title</td>
                                <td>Last Update</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    )
}