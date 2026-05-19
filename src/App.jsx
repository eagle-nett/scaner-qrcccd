import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function App() {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false
    );

    scanner.render(
      (decodedText) => {
        console.log(decodedText);
        alert(decodedText);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Scan CCCD</h1>
      <div id="reader"></div>
    </div>
  );
}

export default App;