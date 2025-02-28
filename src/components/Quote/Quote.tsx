// Packages
import { storyblokEditable } from "@storyblok/react";

// Components
import RichText from "utils/RichTextRenderer"
import Image from "utils/Image"

// Styles
import CSS from "./Quote.module.scss"


export default function Quote({ blok, richtext }: {
    blok: any,
    richtext?: boolean,
}) {

    return (
        <section {...storyblokEditable(blok)} className={`${CSS.section} ${blok?.image ? '' : CSS.noImage} ${richtext ? CSS.richtext : ''}`}>

            <div className={`wrapper ${CSS.text}`}>
                <RichText data={blok.text} />
            </div>

            {blok?.image &&
                <Image img={blok?.image} fullwidth />
            }

        </section>
    )
}