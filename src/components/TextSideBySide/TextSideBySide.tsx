// Packages
import { storyblokEditable } from "@storyblok/react";

// Components
import RichText from "utils/RichTextRenderer"

// Styles
import CSS from "./TextSideBySide.module.scss"


export default function TextSideBySide({ blok }: {
    blok: any,
}) {

    return (
        <div {...storyblokEditable(blok)} className={CSS.section}>

            {blok?.text1 &&
                <div>
                    <RichText data={blok.text1} />
                </div>
            }

            {blok?.text2 &&
                <div>
                    <RichText data={blok.text2} />
                </div>
            }
            
            {blok?.text3 &&
                <div>
                    <RichText data={blok.text3} />
                </div>
            }
            
            {blok?.text4 &&
                <div>
                    <RichText data={blok.text4} />
                </div>
            }

        </div>
    )
}