// Packages
import { storyblokEditable } from "@storyblok/react"

// Components
import Image from "utils/Image"

// Styles
import CSS from "./Logos.module.scss"


export default function Logos({ blok }: {
    blok: {
        topText: object,
        backgroundColor: string,
        logos: Array<any>,
    }
}) {

    return (
        <section {...storyblokEditable(blok)} className={CSS.section}>

            <div className={`logos-animation ${CSS.logos}`}>

                {blok.logos.map((loop, i) => (
                    <div key={i}><Image img={loop} /></div>
                ))}

                {blok.logos.map((loop, i) => (
                    <div key={i} className={CSS.mobileLogo}><Image img={loop} /></div>
                ))}

                <style>
                    {`
                        @keyframes loop-logos {
                            from { transform: translateX(calc(8rem * ${blok.logos.length / 2})); }
                            to { transform: translateX(calc(-8rem * ${blok.logos.length / 2})); }
                        }

                        @media only screen and (max-width: 68rem) {
                            .logos-animation {
                                animation: loop-logos ${blok.logos.length * 2}s linear infinite;
                            }
                        }
                    `}
                </style>

            </div>

        </section>
    )
}