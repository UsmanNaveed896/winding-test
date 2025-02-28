// Packages
import { storyblokEditable } from "@storyblok/react";
import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

// Components
import Post from "./FeaturedPostsPost"
import RichText from "utils/RichTextRenderer"

// Styles
import CSS from "./FeaturedPosts.module.scss"


export default function FeaturedPosts({ blok, blogPosts, url }: {
    blok: {
        featuredPosts: Array<any>,
        showAutomaticallyLatestBlogPosts: boolean,
        showMaxAmount: number,
        title: string,
        readMoreLinkText: string,
        readMoreLink: object,
        useSlider: boolean,
        textBelow: object,
    },
    blogPosts: Array<any>,
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

    let shownPosts = 0;

    return (
        <section {...storyblokEditable(blok)}>
            <div className="wrapper">

                <div className={CSS.titleAndArrows}>
                    <h2 className="orange-title">{blok.title}</h2>
                    {blok?.useSlider &&
                        <div>
                            <button onClick={() => scrollTo(selectedIndex - 1)} aria-label="Go to previous blog post"/>
                            <button onClick={() => scrollTo(selectedIndex + 1)} aria-label="Go to next blog post"/>
                        </div>
                    }
                </div>

                {!blok?.useSlider &&
                    <div className={CSS.wrapper}>
                        {/* Manual blog posts */}
                        {blok?.featuredPosts &&
                            blogPosts?.map((post, i) => {
                                if (blok.featuredPosts.includes(post.uuid)) {
                                    shownPosts = shownPosts + 1;
                                    if (!blok.showMaxAmount || (shownPosts <= blok?.showMaxAmount)) {
                                        return (
                                            <Post key={i} post={post} />
                                        )
                                    }
                                }
                            })
                        }

                        {/* Automatic blog posts */}
                        {blok?.showAutomaticallyLatestBlogPosts && blogPosts?.map((post, i) => {
                            if (post.full_slug !== url) {
                                shownPosts = shownPosts + 1;
                                return (
                                    (!blok.showMaxAmount || (shownPosts <= blok?.showMaxAmount)) &&
                                    <Post key={i} post={post} />
                                )
                            }
                        })}
                    </div>
                }

                {blok?.useSlider &&
                    <div className={CSS.slider} ref={viewportRef}>
                        <div className={CSS.sliderWrapper}>
                        {/* Manual blog posts */}
                            {blok?.featuredPosts &&
                                blogPosts?.map((post, i) => {
                                    if (blok.featuredPosts.includes(post.uuid)) {
                                        shownPosts = shownPosts + 1;
                                        if (!blok.showMaxAmount || (shownPosts <= blok?.showMaxAmount)) {
                                            return (
                                                <Post key={i} post={post} isSlider />
                                            )
                                        }
                                    }
                                })
                            }

                            {/* Automatic blog posts */}
                            {blok?.showAutomaticallyLatestBlogPosts && blogPosts?.map((post, i) => {
                                if (post.full_slug !== url) {
                                    shownPosts = shownPosts + 1;
                                    return (
                                        (!blok.showMaxAmount || (shownPosts <= blok?.showMaxAmount)) &&
                                        <Post key={i} post={post} isSlider />
                                    )
                                }
                            })}
                        </div>
                    </div>
                }

                {blok?.textBelow &&
                    <div className={CSS.textBelow}>
                        <RichText data={blok.textBelow} />
                    </div>
                }

            </div>
        </section>
    )
}