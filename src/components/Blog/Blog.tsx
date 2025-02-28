// Packages
import { storyblokEditable } from "@storyblok/react";
import { useState, useEffect } from 'react'

// Components
import Post from "../FeaturedPosts/FeaturedPostsPost"

// Styles
import CSS from "./Blog.module.scss"


export default function FeaturedPosts({ blok, blogPosts }: {
    blok: {
        featuredPosts: Array<any>,
    },
    blogPosts: Array<any>,
    url?: string,
}) {

    blogPosts.sort(function(a,b){
        return new Date(b.releaseDate).valueOf() - new Date(a.releaseDate).valueOf();
    });

    const [showMaxAmount, setShowMaxAmount] = useState(8);
    const [filteredPosts, setFilteredPosts] = useState(blogPosts)
    const [activeCategory, setActiveCategory] = useState(null);

    // Get blog post categories
    let blogPostCategories = [];
    blogPosts.forEach(item => {
        if (item?.category && !blogPostCategories.includes(item?.category)) {
            blogPostCategories.push(item?.category);
        }
    })

    useEffect(() => {
        if (activeCategory) {
            let newFilteredCars = [];
            blogPosts.forEach(loop => {
                if (loop.category === activeCategory) {
                    newFilteredCars.push(loop)
                }
            })
            setFilteredPosts(newFilteredCars)
        } else {
            setFilteredPosts(blogPosts);
        }
    }, [activeCategory])

    let shownAmount = 0;

    return (
        <section {...storyblokEditable(blok)} className={CSS.section}>
            <div className="wrapper">

                {/* Filter tabs */}
                {blogPostCategories?.length > 0 &&
                    <div className={CSS.filters}>
                        <button onClick={() => setActiveCategory(null)} className={`
                            ${!activeCategory ? CSS.active : ''}
                        `}>
                            All Articles
                        </button>
                        {blogPostCategories.map((loop, i) => (
                            <button key={i} onClick={() => setActiveCategory(loop)} className={`
                                ${activeCategory === loop ? CSS.active : ''}
                            `}>
                                {loop}
                            </button>
                        ))}
                    </div>
                }

                <div className={CSS.posts}>
                    {filteredPosts?.map((post, i) => {
                        if (shownAmount < showMaxAmount) {
                            shownAmount = shownAmount + 1;
                            return (
                                // shownPosts <= showMaxAmount &&
                                <Post key={i} post={post} white />
                            )
                        }
                    })}
                </div>

                <div className={CSS.showMore}>
                    <p>{shownAmount < filteredPosts.length ? shownAmount : filteredPosts.length} out of {filteredPosts.length} items seen</p>
                    {showMaxAmount < filteredPosts.length &&
                        <button className="button" onClick={() => setShowMaxAmount(showMaxAmount + 8)}>Show more</button>
                    }
                </div>

            </div>
        </section>
    )
}