// Packages
import { useState, useEffect } from "react"
import { storyblokEditable } from "@storyblok/react"

// Style
import CSS from 'styles/Car.module.scss'

// Components
import StoryblokComponents from 'utils/StoryblokComponents'
import Seo from 'components/Layout/Seo'
import Header from 'components/Layout/Header/Header'
import Footer from 'components/Layout/Footer/Footer'
import Car from 'components/Car/Car'


export default function PageTemplate({ data, header, footer, cars, soldCars, contentAfterInventory }: {
    data: any,
    header: any,
    footer: any,
    cars?: Array<any>,
    soldCars?: Array<any>,
    children?: JSX.Element | JSX.Element[],
    contentAfterInventory: any,
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

    const content = preview?.content ? preview.content : data.content;
    
    return (
        <>
            <Header
                data={header}
                url={data.full_slug}
            />

            {/* <Seo
                title={content?.title}
                description={content?.description}
                url={data.full_slug}
                noindex={content?.noindex}
            /> */}

            <main className={CSS.wrapper} id="content" {...storyblokEditable(data)}>
                <Car blok={content} url={data.full_slug} />
            </main>

            <aside className={CSS.aside}>
                <StoryblokComponents
                    data={contentAfterInventory}
                    cars={cars}
                    soldCars={soldCars}
                    url={data.full_slug}
                />
            </aside>

            <Footer data={footer} />
        </>
    )
}