// Packages
import { storyblokEditable } from "@storyblok/react";

// Components
import RichText from "utils/RichTextRenderer"
import Image from "utils/Image"

// Styles
import CSS from "./ImageCollage.module.scss"


export default function ImageCollage({ blok }: {
    blok: {
        text: object,
        title: string,
        images: any,
        mobileImages: any,
    }
}) {

    return (
        <section {...storyblokEditable(blok)} className={`wrapper ${CSS.section}`}>

            <div>
                <Image img={blok.images[0]} />
                <Image img={blok.images[1]} />
                <Image img={blok.images[2]} />
            </div>

            <div>
                <Image img={blok.images[3]} />
                <div>
                    <h2 className="heading-lines">
                        {blok.title}
                    </h2>
                    <RichText data={blok.text} />
                </div>
                <Image img={blok.images[4]} />
            </div>

            <div>
                <Image img={blok.images[5]} />
                <Image img={blok.images[6]} />
                <Image img={blok.images[7]} />
            </div>

            <div className={CSS.mobileImages}>
                {blok?.mobileImages?.map((loop, i) => (
                    <Image img={loop} key={i} />
                ))}
            </div>

        </section>
    )
}