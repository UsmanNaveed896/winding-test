// Packages
import { storyblokEditable } from "@storyblok/react";

// Components
import Image from "utils/Image"

// Styles
import CSS from './PhotoGallery.module.scss'


export default function PhotoGallery({ blok }: {
    blok: {
        photos: any,
        title: string,
    },
}) {
    
    return (
        <section {...storyblokEditable(blok)} className="wrapper">

            {blok?.title && <h2 className="orange-title">{blok.title}</h2>}

            <div className={CSS.images}>
                {blok?.photos?.map((loop, i) => (
                    <div key={i}>
                        <Image img={loop} />
                    </div>
                ))}
            </div>

        </section>
    )
}