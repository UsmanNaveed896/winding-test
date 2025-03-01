import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import axios from "axios";
// Components
import RichText from "utils/RichTextRenderer";
import Image from "utils/Image";
import PopUp from "components/PopUp/PopUp";
import Head from "next/head";
// Styles
import CSS from "./Car.module.scss";

export default function Car({ blok, url }) {
  const [activeImages, setActiveImages] = useState([]);
  const [exteriorImages, setExteriorImages] = useState(
    blok.exteriorImages || []
  );
  const [interiorImages, setInteriorImages] = useState(
    blok.interiorImages || []
  );
  const [mechanicalImages, setMechanicalImages] = useState(
    blok.mechanicalImages || []
  );
  const [documentImages, setDocumentImages] = useState(
    blok.documentImages || []
  );
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [btcToUsdRate, setBtcToUsdRate] = useState(null);
  const [cadToUsdRate, setCadToUsdRate] = useState(0.75);

  const carouselOptions = {
    align: "start",
    containScroll: "trimSnaps",
    loop: true,
    skipSnaps: false,
    dragFree: false,
  };
  //@ts-ignore
  const [viewportRef, embla] = useEmblaCarousel(carouselOptions);
  //@ts-ignore
  const [viewportRef2, embla2] = useEmblaCarousel(carouselOptions);

  useEffect(() => {
    setSelectedIndex(0);
  }, [activeTab]);

  useEffect(() => {
    const initCarousels = () => {
      if (embla && embla2 && activeImages.length > 0) {
        setTimeout(() => {
          try {
            embla.reInit();
            embla2.reInit();
            embla.scrollTo(0);
            embla2.scrollTo(0);
          } catch (error) {
            console.error("Carousel initialization error:", error);
          }
        }, 100);
      }
    };

    initCarousels();
  }, [activeImages, embla, embla2]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    const index = embla.selectedScrollSnap();
    setSelectedIndex(index);
    if (embla2) {
      embla2.scrollTo(index);
    }
  }, [embla, embla2]);
  //@ts-ignore
  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    return () => embla.off("select", onSelect);
  }, [embla, onSelect]);

  const scrollTo = useCallback(
    (index) => {
      if (embla && embla2) {
        embla.scrollTo(index);
        embla2.scrollTo(index);
        setSelectedIndex(index);
      }
    },
    [embla, embla2]
  );

  function getExteriorImages() {
    if (!blok.exteriorImages || blok.exteriorImages.length === 0) {
      fetchImagesFromGCP(blok.tag, "exterior");
    } else {
      setActiveImages(blok.exteriorImages);
    }
  }

  function getInteriorImages() {
    if (!blok.interiorImages || blok.interiorImages.length === 0) {
      fetchImagesFromGCP(blok.tag, "interior");
    } else {
      setActiveImages(blok.interiorImages);
    }
  }

  function getMechanicalImages() {
    if (!blok.mechanicalImages || blok.mechanicalImages.length === 0) {
      fetchImagesFromGCP(blok.tag, "mechanical");
    } else {
      setActiveImages(blok.mechanicalImages);
    }
  }

  function getdocumentImages() {
    if (!blok.documentImages || blok.documentImages.length === 0) {
      fetchImagesFromGCP(blok.tag, "document");
    } else {
      setActiveImages(blok.documentImages);
    }
  }

  const fetchImagesFromGCP = async (tag, category) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://winding-backend.vercel.app/api/getImages/${tag}/${category}`
      );

      const { files } = response.data;
      const formattedImages = files.map((file, index) => ({
        id: index + 1,
        alt: "",
        name: "",
        focus: "",
        title: "",
        source: "",
        filename: file,
        copyright: "",
        fieldtype: "asset",
        meta_data: {},
        is_private: false,
      }));

      switch (category) {
        case "exterior":
          setExteriorImages(formattedImages);
          break;
        case "interior":
          setInteriorImages(formattedImages);
          break;
        case "mechanical":
          setMechanicalImages(formattedImages);
          break;
        case "document":
          setDocumentImages(formattedImages);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error fetching images from GCP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    switch (activeTab) {
      case 0:
        setActiveImages(exteriorImages);
        break;
      case 1:
        setActiveImages(interiorImages);
        break;
      case 2:
        setActiveImages(mechanicalImages);
        break;
      case 3:
        setActiveImages(documentImages);
        break;
      default:
        setActiveImages([]);
    }
  }, [
    activeTab,
    exteriorImages,
    interiorImages,
    mechanicalImages,
    documentImages,
  ]);

  useEffect(() => {
    getExteriorImages();
  }, []);

  useEffect(() => {
    const fetchBtcToUsdRate = async () => {
      try {
        const response = await axios.get(
          "https://api.coindesk.com/v1/bpi/currentprice/USD.json"
        );
        const rate = response.data?.bpi?.USD?.rate_float;
        if (rate) {
          setBtcToUsdRate(rate);
        } else {
          console.error("Failed to fetch valid BTC rate");
        }
      } catch (error) {
        console.error("Error fetching BTC price:", error);
      }
    };

    const fetchCadToUsdRate = async () => {
      try {
        const response = await axios.get(
          "https://api.exchangerate-api.com/v4/latest/CAD"
        );
        const rate = response.data?.rates?.USD;
        if (rate) {
          setCadToUsdRate(rate);
        } else {
          console.error("Failed to fetch valid CAD to USD rate");
        }
      } catch (error) {
        console.error("Error fetching CAD to USD rate:", error);
      }
    };

    fetchBtcToUsdRate();
    fetchCadToUsdRate();
  }, []);

  const calculateBtcPrice = (usdPrice) => {
    if (!btcToUsdRate || !usdPrice) return "...";
    return (usdPrice / btcToUsdRate).toFixed(6);
  };

  const metaDescription = `${blok.year} ${blok.make} ${blok.model} ${
    blok.miles ? "| " + blok.miles + " miles" : ""
  } ${
    blok.available
      ? "| $" + Number(blok.price).toLocaleString("en-CA")
      : "| SOLD"
  } | Stock #${blok?.vin?.slice(-4)}`;

  const mainImageUrl = exteriorImages && exteriorImages.length > 0 
  ? exteriorImages[0].filename 
  :  exteriorImages[0].filename ;

  const pageTitle = `${blok.title} | $${Number(blok.price).toLocaleString(
    "en-CA"
  )} ${blok.miles} | Winding Road Motorcars`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={mainImageUrl} />
        <meta property="og:url" content={`https://windingroad.ca/${url}/`} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={mainImageUrl} />
      </Head>
      <div className={`wrapper ${CSS.firstPaint}`}>
        <div className={CSS.tabs}>
          <button
            className={activeTab === 0 ? CSS.active : ""}
            onClick={() => {
              setActiveTab(0);
              getExteriorImages();
            }}
          >
            Exterior
          </button>
          <button
            className={activeTab === 1 ? CSS.active : ""}
            onClick={() => {
              setActiveTab(1);
              getInteriorImages();
            }}
          >
            Interior
          </button>
          <button
            className={activeTab === 2 ? CSS.active : ""}
            onClick={() => {
              setActiveTab(2);
              getMechanicalImages();
            }}
          >
            Mechanical
          </button>
          <button
            className={activeTab === 3 ? CSS.active : ""}
            onClick={() => {
              setActiveTab(3);
              getdocumentImages();
            }}
          >
            Documents
          </button>
        </div>

        <div className={CSS.images}>
          {isLoading ? (
            <div
              className={CSS.loader}
              style={{
                fontSize: "20px",
                color: "red",

                padding: "10px 20px",
                borderRadius: "5px",

                textAlign: "center",
                width: "fit-content",
                animation: "spin 1s linear infinite",
              }}
            >
              Loading...
            </div>
          ) : (
            <>
              <div className={CSS.largeSlider} ref={viewportRef}>
                <div className={CSS.activeImage}>
                  {activeImages &&
                    activeImages?.map((loop, i) => (
                      <div key={i} className={CSS.slide}>
                        <Image eager img={loop} />
                      </div>
                    ))}
                  {(activeImages?.length === 0 || !activeImages) && (
                    <img
                      src="/images/winding-road-16-10.png"
                      loading="lazy"
                      alt=""
                      width="840"
                      height="504"
                    />
                  )}
                </div>
                {activeImages?.length > 1 && (
                  <>
                    <button
                      className={CSS.next}
                      onClick={() => scrollTo(selectedIndex + 1)}
                      aria-label="Go to next image"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
                      </svg>
                    </button>
                    <button
                      className={CSS.previous}
                      onClick={() => scrollTo(selectedIndex - 1)}
                      aria-label="Go to previous image"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              <div className={CSS.smallImageSlider} ref={viewportRef2}>
                <div className={CSS.activeImage}>
                  {activeImages &&
                    activeImages?.map((loop, i) => (
                      <button key={i} onClick={() => scrollTo(i)}>
                        <Image img={loop} sizes="200px" heightRatio={0.75} />
                      </button>
                    ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className={CSS.info}>
          <div className={CSS.tagAndStock}>
            {blok?.tag && <span className={CSS.tag}>{blok.tag}</span>}
            <span>Stock #{blok?.vin?.slice(-4)}</span>
          </div>
          <h1>{blok?.title}</h1>
          <p className={CSS.price}>
            {blok.available ? (
              <>
                {/* CAD Price */}
                CAD ${blok?.price && Number(blok.price).toLocaleString("en-CA")}
                {/* USD Price */}
                {blok?.price && (
                  <>
                    <br />
                    USD $
                    {Math.round(blok.price * cadToUsdRate).toLocaleString(
                      "en-US"
                    )}
                  </>
                )}
                {/* BTC Price */}
                {blok?.price && (
                  <>
                    <br />
                    BTC ₿{calculateBtcPrice(blok.price * cadToUsdRate)}
                  </>
                )}
                {/* Monthly Price, if available */}
                {blok?.monthlyPrice && (
                  <span>
                    <br />${Number(blok.monthlyPrice).toLocaleString("en-CA")}
                    /mo CAD
                    <br />$
                    {Number(
                      (blok.monthlyPrice * cadToUsdRate).toFixed(2)
                    ).toLocaleString("en-US")}
                    /mo USD
                    <br />({calculateBtcPrice(
                      blok.monthlyPrice * cadToUsdRate
                    )}{" "}
                    BTC/mo)
                  </span>
                )}
              </>
            ) : (
              "$ SOLD"
            )}
          </p>

          <div className={CSS.infoTable}>
            <p>
              Status <span>{blok.available ? "Available" : "Unavailable"}</span>
            </p>
            {blok?.make && (
              <p>
                Make <span>{blok.make}</span>
              </p>
            )}
            {blok?.model && (
              <p>
                Model <span>{blok.model}</span>
              </p>
            )}
            {blok?.miles && (
              <p>
                Mileage <span>{blok.miles}</span>
              </p>
            )}
            {blok?.fuelType && (
              <p>
                Fuel Type <span>{blok.fuelType}</span>
              </p>
            )}
            {blok?.engine && (
              <p>
                Engine <span>{blok.engine}</span>
              </p>
            )}
            {blok?.drive && (
              <p>
                Drive <span>{blok.drive}</span>
              </p>
            )}
            {blok?.year && (
              <p>
                Year <span>{blok.year}</span>
              </p>
            )}
            {blok?.vin && blok.available && (
              <p>
                VIN{" "}
                <span>{blok.vin.substring(0, blok.vin.length - 4)}XXXX</span>
              </p>
            )}
          </div>
          {blok?.excerpt && <p className={CSS.excerpt}>{blok.excerpt}</p>}
          <a href="#details" className={CSS.detailsLink}>
            Details
          </a>
          <div className={CSS.buttons}>
            <PopUp
              is="Consignment"
              tradeIn={blok?.title}
              className="button button-red-border"
            >
              <span>Trade-in</span>
            </PopUp>
            <PopUp
              is="Payment Calculator"
              price={blok?.price}
              className="button"
            >
              <span>Get approved</span>
            </PopUp>
          </div>
          <p>
            Bying cash?{" "}
            <PopUp car={blok?.title} className={CSS.bold} is="Test Drive">
              Schedule Test Drive{" "}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <g id="icon_calendar" clip-path="url(#clip0_3901_22767)">
                  {" "}
                  <path
                    id="Vector"
                    d="M11.0833 2.33325H2.91667C2.27233 2.33325 1.75 2.85559 1.75 3.49992V11.6666C1.75 12.3109 2.27233 12.8333 2.91667 12.8333H11.0833C11.7277 12.8333 12.25 12.3109 12.25 11.6666V3.49992C12.25 2.85559 11.7277 2.33325 11.0833 2.33325Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                  />{" "}
                  <path
                    id="Vector_2"
                    d="M1.75 5.83325H12.25"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                  />{" "}
                  <path
                    id="Vector_3"
                    d="M9.3335 1.16675V3.50008"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                  />{" "}
                  <path
                    id="Vector_4"
                    d="M4.6665 1.16675V3.50008"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                  />{" "}
                </g>{" "}
                <defs>
                  {" "}
                  <clipPath id="clip0_3901_22767">
                    {" "}
                    <rect width="14" height="14" fill="white" />{" "}
                  </clipPath>{" "}
                </defs>{" "}
              </svg>
            </PopUp>
          </p>
        </div>
      </div>

      <div className={`wrapper ${CSS.additionals}`}>
        <div id="features" className={CSS.additionalFeatures}>
          <div>
            <h2>Details</h2>
            <RichText data={blok.details} />
          </div>
          <div className={CSS.additionalButtons}>
            <PopUp className={CSS.bold} car={blok?.title} is="Carfax">
              Download CARFAX{" "}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <g id="icon_download" clip-path="url(#clip0_3893_22749)">
                  {" "}
                  <path
                    id="Vector"
                    d="M12.25 8.75V11.0833C12.25 11.3928 12.1271 11.6895 11.9083 11.9083C11.6895 12.1271 11.3928 12.25 11.0833 12.25H2.91667C2.60725 12.25 2.3105 12.1271 2.09171 11.9083C1.87292 11.6895 1.75 11.3928 1.75 11.0833V8.75"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                  />{" "}
                  <path
                    id="Vector_2"
                    d="M4.08325 5.83325L6.99992 8.74992L9.91659 5.83325"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                  />{" "}
                  <path
                    id="Vector_3"
                    d="M7 8.75V1.75"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                  />{" "}
                </g>{" "}
                <defs>
                  {" "}
                  <clipPath id="clip0_3893_22749">
                    {" "}
                    <rect width="14" height="14" fill="white" />{" "}
                  </clipPath>{" "}
                </defs>{" "}
              </svg>
            </PopUp>
            <PopUp
              className={CSS.bold}
              price={blok?.price}
              is="Payment Calculator"
            >
              <span>Finance options</span>
            </PopUp>
          </div>
        </div>

        <div id="details" className={CSS.details}>
          <h2>Additional Features</h2>
          <RichText data={blok.additionalFeatures} />
          <div className={CSS.share}>
            <h3>Share</h3>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://windingroad.ca/${url}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                alt="Share on Facebook"
                src="/icons/facebook-share.svg"
                width="36"
                height="36"
                loading="lazy"
              />
            </a>

            <a
              href={`https://twitter.com/intent/tweet?url=https://windingroad.ca/${url}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                alt="Share on Twitter"
                src="/icons/twitter-share.svg"
                width="36"
                height="36"
                loading="lazy"
              />
            </a>

            <a
              href={`https://wa.me/?text=https://windingroad.ca/${url}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                alt="Share on Twitter"
                src="/icons/whatsapp-share.svg"
                width="36"
                height="36"
                loading="lazy"
              />
            </a>

            <a
              href={`mailto:?subject=Winding Road Motorcars&amp;body=https://windingroad.ca/${url}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                alt="Share on Twitter"
                src="/icons/email-share.svg"
                width="36"
                height="36"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
