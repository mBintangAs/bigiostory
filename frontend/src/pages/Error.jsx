import { useRouteError,Link } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.log(error);
  return (
    <>
      {/* 404 Start */}
      <div className="container-fluid pt-4 px-4">
        <div className="row vh-100 bg-light rounded align-items-center justify-content-center mx-0">
          <div className="col-md-6 text-center p-4">
            <i className="bi bi-exclamation-triangle display-1 text-primary" />
            <img src="/KMLOGO.png" width={300} />
            <p className="mb-4">
              Terjadi Kesalahan pada halaman ini! Silahkan menunggu atau kembali ke halaman home dengan mengklik tombol di bawah ini
            </p>
            <Link to={'/'} className="btn btn-primary rounded-pill py-3 px-5" >
              Go Back To Home
            </Link>
          </div>
        </div>
      </div>
      {/* 404 End */}
    </>
  );
}
