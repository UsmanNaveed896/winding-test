// Packages
import { storyblokEditable } from "@storyblok/react";
import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Link from "next/link"

// Components
import Image from "utils/Image"
import Button from "components/Button"

// Styles
import CSS from "./FeaturedCars.module.scss"


export default function Slider({ blok, cars, url }: {
    blok: {
        slides: Array<any>,
        title: string,
        button: Array<any>,
    },
    cars: Array<any>,
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
                        {cars?.map((loop, i) => (
                            (i < 10) && (loop.full_slug !== url) &&
                            <div className={CSS.slide} key={i}>
                                <div className={CSS.image}>
                                    <Image img={loop.image} heightRatio={0.6} />
                                    {!loop.image &&
                                    <></>
                                        // <img src="/images/winding-road-16-10.png" loading="lazy" alt="" width="840" height="504" />
                                    }
                                </div>
                                <div className={CSS.nameAndPrice}>
                                    <p>{loop.title}</p>
                                    <p className={CSS.price}>${Number(loop.price).toLocaleString('en-CA').replaceAll(',', ' ')}</p>
                                </div>
                                <div className={CSS.details}>
                                    <div className={CSS.yearAndMiles}>
                                        <p className={CSS.year}><span className="sr-only">Manufacturing year: </span>{loop.year}</p>
                                        <p className={CSS.miles}><span className="sr-only">Total miles: </span>{loop.miles}</p>
                                    </div>
                                    <p><Link href={loop.full_slug}>Details</Link></p>
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