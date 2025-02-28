// Packages
import { storyblokEditable } from "@storyblok/react";

// Style
import CSS from './Cards.module.scss'

// Components
import RichText from "utils/RichTextRenderer"
import Image from "utils/Image"


export default function Slider({ blok }: {
    blok: {
        cards: Array<any>,
        title: string,
        style: string,
    },
}) {

    return (
        <section {...storyblokEditable(blok)} className="wrapper">

            {blok?.title && <h2 className="orange-title">{blok.title}</h2>}

            <div className={`${CSS.cards} ${blok?.style === 'style-2' ? CSS.style2 : ''}  ${blok?.style === 'style-3' ? CSS.style3 : ''}`}>
                {blok.cards.map((loop, i) => (
                    <div key={i} className={`${CSS.card} ${loop?.image?.filename ? CSS.cardWithImage : ''}`}>
                        <Image img={loop.image} className={CSS.backgroundImage} />
                        {loop?.icon &&
                            <Image img={loop.icon} className={CSS.icon} />
                        }
                        <div>
                            <RichText data={loop.text} />
                        </div>
                    </div>
                ))}
            </div>

        </section>
    )
}