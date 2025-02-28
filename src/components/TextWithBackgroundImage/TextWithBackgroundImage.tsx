// Packages
import { storyblokEditable } from "@storyblok/react";

// Components
import RichText from "utils/RichTextRenderer"
import Image from "utils/Image"

// Styles
import CSS from "./TextWithBackgroundImage.module.scss"


export default function TextWithBackgroundImage({ blok }: {
    blok: {
        text: object,
        title: string,
        image: object,
        gradientType: string,
    }
}) {

    return (
        <section {...storyblokEditable(blok)} className={`
            ${CSS.section}
            ${blok?.gradientType === 'top-white-bottom-black' ? CSS.whiteTopGradient : ''}
        `}>

            <div className={`wrapper ${CSS.wrapper}`}>

                {blok.title &&
                    <h2 className="orange-title">{blok.title}</h2>
                }

                <RichText data={blok.text} />

            </div>

            <Image img={blok.image} fullwidth />

        </section>
    )
}