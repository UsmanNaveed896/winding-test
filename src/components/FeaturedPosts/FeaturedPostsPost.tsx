// Packages
import Link from 'next/link';

// Components
import Image from "utils/Image"
import FormatDate from "utils/FormatDate"

// Styles
import CSS from "./FeaturedPostsPost.module.scss"


export default function FeaturedArticles({ post, isSlider, white }: {
    post: any,
    isSlider?: boolean,
    white?: boolean,
}) {

    return (
        <article className={`${CSS.article} ${white ? CSS.white : ''} ${isSlider ? CSS.isSlider : ''}`}>

            <div className={CSS.thumbnail}>
                <Image heightRatio={0.75} img={{filename: post.thumbnail, alt: post.title}} />
            </div>
            
            <div className={CSS.text}>
                <div className={CSS.details}>
                    {post.category &&
                        <span>
                            <img src="/icons/icon-bookmark.svg" width="16" height="16" loading="lazy" alt="" /> 
                            {post.category}
                        </span>
                    }
                    <span>
                        <img src="/icons/icon-calendar.svg" width="16" height="16" loading="lazy" alt="" /> 
                        <FormatDate date={post.published}/>
                    </span>
                    {/* <span>
                        <img src="/icons/icon-clock.svg" width="16" height="16" loading="lazy" alt="" /> 
                        min
                    </span> */}
                </div>

                <strong>
                    <Link href={`/${post.full_slug}`}>{post.title}</Link>
                </strong>
            </div>

        </article>
    )
}