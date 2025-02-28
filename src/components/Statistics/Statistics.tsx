// Packages
import { storyblokEditable } from "@storyblok/react";

// Components
import RichText from "utils/RichTextRenderer"

// Styles
import CSS from "./Statistics.module.scss"


export default function Statistics({ blok }: {
    blok: {
        titleLine1: string,
        titleLine2: string,
        text: object,
        style: string,
        title: string,
        statistics: Array<any>,
    }
}) {

    return (
        <section {...storyblokEditable(blok)} className={`
            ${!blok?.style ? CSS.defaultStyle : ''}
            ${blok?.style === 'style-2' ? CSS.style2 : ''}
            ${blok?.style === 'style-3' ? CSS.style3 : ''}
            wrapper
        `}>

            <div className={CSS.title}>
                <h2 className={blok?.style ? 'orange-title-no-arrow' : ''}>{blok.title}</h2>
            </div>

            <div className={CSS.statistics}>
                {blok?.statistics?.map((loop, i) => (
                    <div key={i} className={CSS.item}>
                        {loop?.title && <h3>{loop?.title}</h3>}
                        <div>
                            <RichText data={loop?.text} />
                        </div>
                    </div>
                ))}
            </div>

        </section>
    )
}