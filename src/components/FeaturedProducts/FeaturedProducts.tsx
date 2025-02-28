// Packages
import { storyblokEditable } from "@storyblok/react";
import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Link from "next/link"

// Components
import Image from "components/Shopify/Image"
import Button from "components/Button"

// Styles
import CSS from "./FeaturedProducts.module.scss"


export default function FeaturedProducts({ blok, products, url }: {
    blok: {
        title: string,
        button: Array<any>,
    },
    products: Array<any>,
    url?: string,
}) {

    // All of this enables the carousel and its navigation dots
    // I just copy pasted it from the docs: https://www.embla-carousel.com/api/
    const [viewportRef, embla] = useEmblaCarousel({
        align: "start",
        containScroll: "trimSnaps",
        loop: true,
        skipSnaps: false
    });
    const [selectedIndex, setSelectedIndex] = useState(0);
  
    const scrollTo = useCallback((index) => embla && embla.scrollTo(index), [
      embla
    ]);
  
    const onSelect = useCallback(() => {
      if (!embla) return;
      setSelectedIndex(embla.selectedScrollSnap());
    }, [embla, setSelectedIndex]);
  
    useEffect(() => {
      if (!embla) return;
      onSelect();
      embla.on("select", onSelect);
    }, [embla, onSelect]);


    return (
        <section {...storyblokEditable(blok)} className={CSS.section}>
            <div className="wrapper">

                <div className={CSS.titleAndArrows}>
                    <h2 className="orange-title">{blok.title}</h2>
                    <div>
                        <button onClick={() => scrollTo(selectedIndex - 1)} aria-label="Go to previous car"/>
                        <button onClick={() => scrollTo(selectedIndex + 1)} aria-label="Go to next car"/>
                    </div>
                </div>

                <div className={CSS.slider} ref={viewportRef}>
                    <div className={CSS.sliderWrapper}>
                        {products.map((loop, i) => (
                            (i < 10) && (loop.url !== url) &&
                            <div className={CSS.slide} key={i}>
                                <div className={CSS.image}>
                                    <Image img={loop.image} heightRatio={0.6} />
                                </div>
                                <p className={CSS.title}>{loop.title}</p>
                                <div className={CSS.details}>
                                    <p className={CSS.price}> from <span>${Number(loop.price).toLocaleString('en-CA').replaceAll(',', ' ')}</span></p>
                                    <p><Link href={'/shop/' + loop.url + '/'}>Details</Link></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {blok?.button[0] && <Button data={blok.button[0]} />}

            </div>
        </section>
    )
}