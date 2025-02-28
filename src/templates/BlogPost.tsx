// Packages
import { useState, useEffect } from "react"
import { storyblokEditable } from "@storyblok/react"

// Components
import StoryblokComponents from 'utils/StoryblokComponents'
import Seo from 'components/Layout/Seo'
import Header from 'components/Layout/Header/Header'
import Footer from 'components/Layout/Footer/Footer'
import Hero from 'components/Hero/Hero'
import Image from "utils/Image"
import RichText from "utils/RichTextRenderer"

// Styles
import CSS from "styles/BlogPost.module.scss"


export default function BlogPost({ data, header, footer, cars, blogPosts, contentAfterBlogPosts }: {
    data: any,
    header: any,
    footer: any,
    cars?: Array<any>,
    children?: JSX.Element | JSX.Element[],
    blogPosts?: Array<any>,
    contentAfterBlogPosts: any,
}) {

    // Template data live previews
    const [preview, setPreview] = useState(null);

    // Page data live previews
    useEffect(() => {
        if (window.location.search.includes('_storyblok') && data.full_slug !== '404') {
            const url = `https://api-us.storyblok.com/v2/cdn/stories/${data.full_slug}?version=draft&token=${process.env.NEXT_STORYBLOK_ACCESS_TOKEN}&cv=${Date.now()}`;

            const fetchData = async () => {
                try {
                    const response = await fetch(url);
                    const json = await response.json();
                    setPreview(json.story);
                } catch (error) {
                    console.log("error", error);
                }
            };

            fetchData();

            // Let's wait until the Storyblok script has loaded
            const waitForStoryblokToLoad = function () {
                if (!window.StoryblokBridge) {
                  setTimeout(waitForStoryblokToLoad, 100)
                } else {
                    const { StoryblokBridge } = window
                    const storyblokInstance = new StoryblokBridge()
    
                    // Update live preview when Storyblok story changes
                    storyblokInstance.on('input', (event) => {
                        setPreview(event.story);
                    })
                }
            }

            waitForStoryblokToLoad();
        }
    }, []);

    // Time To Read
    const [timeToRead, setTimeToRead] = useState(null)
    useEffect(() => {
        const text = document.getElementById("article").innerText;
        const words = text.trim().split(/\s+/).length;
        setTimeToRead(Math.ceil(words / 240))
    }, []);

    const content = preview?.content ? preview.content : data.content;
    
    return (
        <>
            <Header
                data={header}
                url={data.full_slug}
            />

            <Seo
                title={content?.title}
                description={content?.description}
                url={data.full_slug}
                image={content?.thumbnail?.filename}
            />

            <main id="content" className={CSS.article} {...storyblokEditable(data)}>
                <article>
                    <Hero
                        blok={{title: content.title,image: content?.thumbnail}}
                        textAsString={content?.description}
                        category={content?.category}
                        releaseDate={content?.releaseDate}
                        timeToRead={timeToRead}
                    />
                    <div id="article" className={`${CSS.articleContent} wrapper`}>
                        <RichText data={content.text} />
                    </div>
                </article>
            </main>

            <aside>
                <section className={CSS.share}>
                    <div className="wrapper">
                        <h2>Like what you{`'`}ve read?</h2>
                        <p>Share the story to let people find out about it.</p>
                        <div>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${data.full_slug}`} target="_blank" rel="noreferrer noopener">
                                <img alt="Share on Facebook" src="/icons/facebook.svg" width="40" height="40" loading="lazy" />
                            </a>

                            <a href={`https://twitter.com/intent/tweet?url=${data.full_slug}`} target="_blank" rel="noreferrer noopener">
                                <img alt="Share on Twitter" src="/icons/twitter.svg" width="40" height="40" loading="lazy" />
                            </a>
                        </div>
                        <Image className={CSS.bg} img={{filename: 'https://a-us.storyblok.com/f/1014612/2039x730/7aa8106a1b/share-background.jpg'}} />
                    </div>
                </section>
                <StoryblokComponents
                    data={contentAfterBlogPosts}
                    cars={cars}
                    blogPosts={blogPosts}
                    url={data.full_slug}
                />
            </aside>

            <Footer data={footer} />
        </>
    )
}