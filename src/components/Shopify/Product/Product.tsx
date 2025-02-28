// Packages
import { useState, useEffect, useCallback, useContext } from "react";
import { StoreContext } from "components/Shopify/Misc/store-context"
import { AddToCart } from "components/Shopify/Misc/add-to-cart"
import { NumericInput } from "components/Shopify/Misc/numeric-input"
import isEqual from "lodash.isequal"

// Components
import Image from "components/Shopify/Image"

// Styles
import CSS from "./Product.module.scss"


export default function Product({ data }: {
    data: any,
}) {

    const {
        options,
        variants,
        variants: [initialVariant],
        images,
    } = data;

    const product = data;

    const { client } = useContext(StoreContext)

    const [activeLargeImage, setActiveLargeImage] = useState(0);
    const [variant, setVariant] = useState({ ...initialVariant })
    const [quantity, setQuantity] = useState(1)
  
    const productVariant =
      client.product.helpers.variantForOptions(product, variant) || variant
  
    const [available, setAvailable] = useState(
      productVariant.availableForSale
    )
  
    const checkAvailablity = useCallback(
      (productId) => {
        client.product.fetch(productId).then((fetchedProduct) => {
          const result =
            fetchedProduct?.variants.filter(
              (variant) => variant.id === productVariant.id
            ) ?? []
  
          if (result?.length > 0) {
            setAvailable(result[0].available)
          }
        })
      },
      [productVariant.id, client.product]
    )
  
    const handleOptionChange = (index, event) => {
      const value = event.target.value
  
      if (value === "") {
        return
      }
  
      const currentOptions = [...variant.selectedOptions]
  
      currentOptions[index] = {
        ...currentOptions[index],
        value,
      }
  
      const selectedVariant = variants.find((variant) => {
        return isEqual(currentOptions, variant.selectedOptions)
      })
  
      setVariant({ ...selectedVariant })
    }
  
    useEffect(() => {
      checkAvailablity(product.id)
    }, [productVariant.id, checkAvailablity, product.id])
  
    const hasVariants = variants?.length > 1

    // Image slider dragging support for desktop
    useEffect(() => {
        const slider = document.getElementById('image-slider');
        let number = slider.scrollLeft;

        let mouseDown = false;
        let startX;
        
        let startDragging = function (e) {
            mouseDown = true;
            startX = e.pageX - slider.offsetLeft;
            number = slider.scrollLeft;
        };
        
        let stopDragging = function (event) {
            number = slider.scrollLeft;
            mouseDown = false;
        };
        
        slider.addEventListener('mousemove', (e) => {
            e.preventDefault();
            if (!mouseDown) { return; }
            const x = e.pageX - slider.offsetLeft;
            const scroll = x - startX;
            slider.scrollLeft = number - scroll;
        });
        
        // Add the event listeners to start dragging
        slider.addEventListener('mousedown', startDragging, false);
        slider.addEventListener('mouseup', stopDragging, false);
    }, [])

    // Split description to tabs
    const splitDescription = data?.descriptionHtml?.replaceAll("&amp;", "&")?.split("<h2>");


    return (
        <section className={`${CSS.section} wrapper`}>

            <div className={CSS.firstPaint}>
                <div className={CSS.images}>
                    <div className={CSS.activeImage}>
                        <Image eager img={images[activeLargeImage]} />
                    </div>
                    <div className={CSS.imageSlider} id="image-slider">
                        {images?.map((loop, i) => (
                            <button key={i} onClick={() => setActiveLargeImage(i)}>
                                <Image img={loop} sizes="200px" heightRatio={0.75} />
                            </button>
                        ))}
                    </div>
                </div>

                <div className={CSS.info}>
                    {/* <span className={blok?.tag ? CSS.tag : ''}>{blok?.tag ? blok.tag : ''}</span> */}
                    <h1>{data.title}</h1>

                    <p className={CSS.price}>
                        ${Number(productVariant.price.amount).toLocaleString('en-CA').replaceAll(',', ' ')}
                    </p>

                    {hasVariants &&
                        <fieldset className={CSS.optionsWrapper}>
                            {options.map(({ id, name, values }, index) => (
                                <div className={CSS.selectVariant} key={id}>
                                <select
                                    aria-label="Variants"
                                    onChange={(event) => handleOptionChange(index, event)}
                                >
                                    <option value="">{`Select ${name}`}</option>
                                    {values.map((value) => (
                                        <option value={value.value} key={`${name}-${value.value}`}>
                                            {value.value}
                                        </option>
                                    ))}
                                </select>
                                </div>
                            ))}
                        </fieldset>
                    }

                    {/* @ts-ignore */}
                    <NumericInput
                        aria-label="Quantity"
                        onIncrement={() => setQuantity((q) => Math.min(q + 1, 20))}
                        onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
                        onChange={(event) => setQuantity(event.currentTarget.value)}
                        value={quantity}
                        min="1"
                        max="20"
                    />

                    {splitDescription[0] && <div dangerouslySetInnerHTML={{__html: splitDescription[0]}} />}

                    <a href="#details" className={CSS.details}>Details</a>

                    <AddToCart
                        variantId={productVariant.id}
                        quantity={quantity}
                        available={available}
                        product={product}
                        variant={productVariant}
                    />

                </div>
            </div>

            <div className={CSS.additionals}>
                {splitDescription[1] && 
                    <div id="features" className={CSS.additionalFeatures}>
                        <div dangerouslySetInnerHTML={{__html: '<h2>'+splitDescription[1]}} />
                    </div>
                }

                {splitDescription[2] &&
                    <div id="details" className={CSS.details}>
                        <div dangerouslySetInnerHTML={{__html: '<h2>'+splitDescription[2]}} />
                    </div>
                }
        </div>

        </section>
    )
}