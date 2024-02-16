import QRCode from "qrcode.react";
import { useRef } from "react";
import html2canvas from "html2canvas";

const ProductData = ({ script, viewMode }) => {
  const qrCodeRef = useRef(null);

  const generateDownloadLink = async () => {
    if (qrCodeRef.current) {
      const canvas = await html2canvas(qrCodeRef.current);
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "qrcode.png";
      link.click();
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div
        style={{
          color: "var(--text-primary)",
        }}
      >
        <div
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "var(--text-accent)",
          }}
        >
          {script?.name}
        </div>
        <h4 style={{ marginTop: "30px" }}>Description:</h4>
        <p>{script?.description}</p>
      </div>
      {viewMode && (
        <div
          ref={qrCodeRef}
          style={{
            border: "1px solid var(--accent-20)",
            borderRadius: "var(--border-radius-small)",
            padding: "var(--padding-light)",
          }}
          onClick={generateDownloadLink}
        >
          <QRCode
            value={`https://localhost:3000/products/${script?.id}/detailed-view`}
          />
        </div>
      )}
    </div>
  );
};

export default ProductData;
