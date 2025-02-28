// Packages
import { storyblokEditable } from "@storyblok/react";

// Style
import CSS from './Faq.module.scss'

// Components
import RichText from "utils/RichTextRenderer"
import Image from "utils/Image"


export default function Faq({ blok }: {
    blok: {
        items: Array<any>,
        image: object,
        title: string,
    },
}) {
    
    return (
        <section {...storyblokEditable(blok)} data-background-color="white" >
            <div className="wrapper">

                {blok.title &&
                    <h2 className="orange-title">{blok.title}</h2>
                }

                <div className={blok?.image ? CSS.flex : ''}>
                    {blok?.image &&
                        <div className={CSS.image}>
                            <Image img={blok.image} />
                        </div>
                    }
                    
                    <div className={CSS.faq}>
                        {blok.items.map((item, i) => (
                            <details key={i}>
                                <summary>{item.question}</summary>
                                <div>
                                    <RichText data={item.answer} />
                                </div>
                            </details>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}