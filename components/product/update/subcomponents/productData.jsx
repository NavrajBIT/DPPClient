import QRCode from "qrcode.react";
import { useRef } from "react";
import html2canvas from "html2canvas";

const ProductData = ({ script }) => {
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
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "var(--text-accent)",
          }}
        >
          {script?.product?.name}
        </div>
        <div>{script?.product?.description}</div>
      </div>
      <div
        ref={qrCodeRef}
        style={{
          border: "1px solid var(--accent-20)",
          borderRadius: "var(--border-radius-small)",
          padding: "var(--padding-light)",
        }}
        onClick={generateDownloadLink}
      >
        <QRCode value={`https://localhost:3000/product/${script.productId}`} />
      </div>
    </div>
  );
};

export default ProductData;
