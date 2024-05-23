import "./style.scss";

const Reference = () => {
  const pdfUrl = "/references/programmer.pdf";

  return (
    <div className="Reference-container">
      <iframe
        src={pdfUrl}
        title="PDF Viewer"
        width="100%"
        height="760px"
      ></iframe>
    </div>
  );
};

export default Reference;
