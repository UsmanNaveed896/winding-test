// Packages
import { storyblokEditable } from "@storyblok/react";

// Components
import RichText from "utils/RichTextRenderer"
import Image from "utils/Image"
import FormatDate from "utils/FormatDate"

// Styles
import CSS from "./Hero.module.scss"


export default function Hero({ blok, textAsString, category, releaseDate, timeToRead }: {
    blok: {
        text?: object,
        title: string,
        image: object,
        maxTitleWidth?: number,
    },
    textAsString?: string,
    category?: string,
    releaseDate?: string,
    timeToRead?: number,
}) {

    return (
        <section {...storyblokEditable(blok)} className={CSS.section}>

            <div className={CSS.text}>
                {releaseDate &&
                    <div className={CSS.details}>
                        {category &&
                            <span>
                                <img src="/icons/icon-bookmark.svg" width="16" height="16" loading="lazy" alt="" /> 
                                {category}
                            </span>
                        }
                        <span>
                            <img src="/icons/icon-calendar.svg" width="16" height="16" loading="lazy" alt="" /> 
                            <FormatDate date={releaseDate}/>
                        </span>
                        <span>
                            <img src="/icons/icon-clock.svg" width="16" height="16" loading="lazy" alt="" /> 
                            {timeToRead} min
                        </span>
                    </div>
                }

                {blok.title &&
                    <h1 style={{maxWidth: blok?.maxTitleWidth ? blok.maxTitleWidth + 'em' : null}} className="heading-lines">{blok.title}</h1>
                }

                <RichText data={blok.text} />

                {textAsString && <p>{textAsString}</p>}
            </div>

            <Image className={CSS.backgroundImage} img={blok.image} eager fullwidth />

        </section>
    )
}