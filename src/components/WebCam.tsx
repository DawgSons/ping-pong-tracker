import { TableService } from "@/services/tableService";
import { useEffect, useRef, useState } from "react";

export const WebCam = () => {
  const videoRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const [buffer, setBuffer] = useState("");

  useEffect(() => {
    navigator.mediaDevices
    .getUserMedia({video: { width: 1280, height: 720 }})
    .then((stream) => {
      const video = videoRef.current;
      if(video) {
        video.srcObject = stream;
        video.play();
      }
    }).catch(alert);
  }, [videoRef]);

  const onPhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(
      videoRef.current,
      0,
      0,
      videoRef.current.clientWidth,
      videoRef.current.clientHeight,
    );
    const buffer = canvasRef.current.toDataURL("image/png");
    setBuffer(buffer);
  };

  const onUpload = async () => {
    const formData = new FormData();
    formData.append("plate_image", base64ToBlob(buffer), "generic.png");

    await TableService.
  };

  const base64ToBlob = (base64: string) => {
    const byteChars = window.atob(base64);
    const byteNumbers = new Array(byteChars.length);
    for ( let i = 0; i < byteChars.length; i++) {
      byteNumbers[i] = byteChars.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], {type: "image/png"});
  };

  return (
    <div>
      <video ref={videoRef} />
      <canvas ref={canvasRef} />
    </div>
  );
};