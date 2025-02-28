// Packages
import { storyblokEditable } from "@storyblok/react";
import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

// Components
import Image from "utils/Image"
import RichText from "utils/RichTextRenderer"

// Styles
import CSS from "./Reviews.module.scss"


export default function Reviews({ blok }: {
    blok: {
        reviews: Array<any>,
        title: string,
        text: object,
    },
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
        <section {...storyblokEditable(blok)}>
            <div className={`wrapper ${CSS.wrapper}`}>

                <div className={CSS.titleAndArrows}>
                    <h2 className="orange-title-no-arrow">{blok.title}</h2>
                    <RichText data={blok.text} />
                    <div>
                        <button onClick={() => scrollTo(selectedIndex - 1)} aria-label="Go to previous review"/>
                        <button onClick={() => scrollTo(selectedIndex + 1)} aria-label="Go to next review"/>
                    </div>
                </div>

                <div className={CSS.slider} ref={viewportRef}>
                    <div className={CSS.sliderWrapper}>
                        {blok.reviews.map((loop, i) => (
                            <div className={CSS.slide} key={i}>
                                <Image img={loop.image} heightRatio={0.7} />
                                <div className={CSS.reviewText}>
                                    <RichText data={loop.text} />
                                </div>
                                <div className={CSS.imageAndName}>
                                    {loop?.reviewerImage?.filename &&
                                        <img
                                            src={loop.reviewerImage.filename + `/m/60x0`}
                                            width="40"
                                            height="40"
                                            alt={'Profile photo of ' + loop.reviewerName}
                                            loading="lazy"
                                        />
                                    }
                                    <p>{loop.reviewerName}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}