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

// Fetch data from Storyblok
const fetchDataFromStoryblok = async (full_slug) => {
    const url = `https://api-us.storyblok.com/v2/cdn/stories/${full_slug}?version=draft&token=${process.env.NEXT_STORYBLOK_ACCESS_TOKEN}&cv=${Date.now()}`;
    
    const response = await fetch(url);
    const json = await response.json();
    return json.story;
}

export default function PageTemplate({ data, header, footer, cars, soldCars, contentAfterInventory }: {
    data: any,
    header: any,
    footer: any,
    cars?: Array<any>,
    soldCars?: Array<any>,
    children?: JSX.Element | JSX.Element[],
    contentAfterInventory: any,
}) {
    // Because we're using server-side rendering, we don't need the preview state or useEffect anymore
    const content = data.content;

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
                noindex={content?.noindex}
            />

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

// Server-side rendering function
export async function getServerSideProps(context) {
    const { full_slug } = context.params; // Get full_slug from URL

    try {
        const data = await fetchDataFromStoryblok(full_slug); // Fetch page data
        const header = await fetchDataFromStoryblok('header'); // Example for header data
        const footer = await fetchDataFromStoryblok('footer'); // Example for footer data
        
        const cars = []; // Fetch cars data if needed
        const soldCars = []; // Fetch sold cars data if needed
        const contentAfterInventory = []; // Fetch additional content if needed

        return {
            props: {
                data,
                header,
                footer,
                cars,
                soldCars,
                contentAfterInventory,
            }
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
        return {
            notFound: true, // Optional: return 404 if data fetching fails
        }
    }
}