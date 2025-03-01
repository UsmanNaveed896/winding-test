import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import CSS from "./Car.module.scss";

export default function Car({ blok, url }) {
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);
  const [activeImages, setActiveImages] = useState([]);
  const [exteriorImages, setExteriorImages] = useState(blok.exteriorImages || []);

  useEffect(() => {
    if (blok.exteriorImages?.length > 0) {
      setActiveImages(blok.exteriorImages);
    }
  }, [blok.exteriorImages]);

  const handleImageLoad = () => {
    setFirstImageLoaded(true);
  };

  const mainImageUrl = exteriorImages.length > 0 ? exteriorImages[0].filename : "";

  return (
    <>
      <Head>
        <title>{`${blok.title} | Winding Road Motorcars`}</title>
        <meta name="description" content={`${blok.year} ${blok.make} ${blok.model}`} />
        <meta property="og:image" content={mainImageUrl} />
      </Head>

      {/* Show only the first image until it loads */}
      <div className={`wrapper ${CSS.firstPaint}`}>
        <div className={CSS.imageContainer}>
          {mainImageUrl && (
            <img
              src={mainImageUrl}
              alt="Car Image"
              onLoad={handleImageLoad}
              className={CSS.mainImage}
              style={{ display: firstImageLoaded ? "block" : "none" }}
            />
          )}
          {!firstImageLoaded && <div className={CSS.loader}>Loading Image...</div>}
        </div>

        {/* Render rest of the component only after the first image loads */}
        {firstImageLoaded && (
          <>
            <div className={CSS.tabs}>
              <button onClick={() => setActiveImages(blok.exteriorImages)}>Exterior</button>
              <button onClick={() => setActiveImages(blok.interiorImages)}>Interior</button>
              <button onClick={() => setActiveImages(blok.mechanicalImages)}>Mechanical</button>
              <button onClick={() => setActiveImages(blok.documentImages)}>Documents</button>
            </div>

            <div className={CSS.images}>
              {activeImages.map((image, index) => (
                <img key={index} src={image.filename} alt={`Car ${index}`} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
