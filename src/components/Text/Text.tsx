// Packages
import { storyblokEditable } from "@storyblok/react";

// Components
import RichText from "utils/RichTextRenderer"

// Styles
import CSS from "./Text.module.scss"


export default function Text({ blok }: {
    blok: {
        text: object,
    }
}) {

    return (
        <section {...storyblokEditable(blok)} className={`${CSS.section} wrapper`}>

            <RichText data={blok.text} />

        </section>
    )
}