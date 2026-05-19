import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

function App() {
  const [result, setResult] = useState("");

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");

    const startScanner = async () => {
      try {
        await html5QrCode.start(
          {
            facingMode: "environment",
          },
          {
            fps: 20,
            qrbox: { width: 300, height: 300 },
            aspectRatio: 1.777,
            disableFlip: false,
          },
          (decodedText) => {
            console.log(decodedText);
            setResult(decodedText);

            navigator.vibrate?.(200);

            html5QrCode.pause();

            setTimeout(() => {
              html5QrCode.resume();
            }, 1500);
          },
          () => {}
        );
      } catch (err) {
        console.error(err);
      }
    };

    startScanner();

    return () => {
      html5QrCode.stop().catch(() => {});
    };
  }, []);

  return (
    <div
      style={{
        background: "#111",
        minHeight: "100vh",
        color: "white",
        padding: 20,
      }}
    >
      <h1>Scan CCCD</h1>

      <div
        id="reader"
        style={{
          width: "100%",
          maxWidth: 500,
          margin: "auto",
          borderRadius: 20,
          overflow: "hidden",
        }}
      ></div>

      <div
        style={{
          marginTop: 20,
          padding: 15,
          background: "#222",
          borderRadius: 10,
          wordBreak: "break-word",
        }}
      >
        {result || "Đưa QR CCCD vào camera"}
      </div>
    </div>
  );
}

export default App;