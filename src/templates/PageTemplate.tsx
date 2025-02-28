// Packages
import { useState, useEffect } from "react"
import { storyblokEditable } from "@storyblok/react"

// Components
import StoryblokComponents from 'utils/StoryblokComponents'
import Seo from 'components/Layout/Seo'
import Header from 'components/Layout/Header/Header'
import Footer from 'components/Layout/Footer/Footer'

export default function PageTemplate({ data, header, footer, children, cars, soldCars, blogPosts, products }: {
    data: any,
    header: any,
    footer: any,
    cars?: Array<any>,
    soldCars?: Array<any>,
    children?: JSX.Element | JSX.Element[],
    blogPosts?: Array<any>,
    products?: Array<any>,
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
    
    return (
        <>
            <Header
                data={header}
                url={data.full_slug}
            />
            <main id="content" {...storyblokEditable(data)}>
                <Seo
                    title={data?.content?.title}
                    description={data?.content?.description}
                    url={data.full_slug === "home" ? "/" : data.full_slug}
                    noindex={data?.content?.noindex}
                />
                <StoryblokComponents
                    data={preview?.content ? preview.content.content : data.content.content}
                    cars={cars}
                    blogPosts={blogPosts}
                    soldCars={soldCars}
                    products={products}
                />
                {children}
            </main>
            <Footer data={footer} />
        </>
    )
}