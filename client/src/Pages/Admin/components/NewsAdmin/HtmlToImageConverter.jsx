import { useRef, useLayoutEffect } from "react";
import * as htmlToImage from "html-to-image";
import "./style.scss";

function HtmlToImageConverter({ html }) {
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    document.body.appendChild(tempDiv);
    tempDiv.classList.add("ql-editor");
    htmlToImage
      .toPng(tempDiv)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        imageRef.current.appendChild(img);
        document.body.removeChild(tempDiv); // Удаляем временный элемент
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  }, [html]);

  return <div ref={imageRef} className="img-news"></div>;
}

export default HtmlToImageConverter;
