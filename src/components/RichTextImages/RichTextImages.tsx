// Packages
import { storyblokEditable } from "@storyblok/react";

// Components
import Image from "utils/Image"

// Styles
import CSS from "./RichTextImages.module.scss"


export default function RichTextImages({ blok }: {
    blok: any,
}) {

    return (
        <div {...storyblokEditable(blok)} className={CSS.section}>

            <div className={blok.alignImages === 'left-is-larger' ? CSS.larger : ''}>
                <Image img={blok.image1} />
            </div>

            <div className={blok.alignImages === 'right-is-larger' ? CSS.larger : ''}>
                <Image img={blok.image2} />
            </div>

        </div>
    )
}