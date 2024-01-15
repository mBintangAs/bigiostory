export default function Spinner() {
    return (<>
      <div id="spinner" className="show  position-absolute translate-middle top-75 start-50 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary"  role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>)
}