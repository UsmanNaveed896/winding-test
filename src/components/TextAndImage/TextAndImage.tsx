// Packages
import { storyblokEditable } from "@storyblok/react";

// Components
import RichText from "utils/RichTextRenderer"
import Image from "utils/Image"

// Styles
import CSS from "./TextAndImage.module.scss"


export default function TextAndImage({ blok }: {
    blok: any,
}) {

    return (
        <section {...storyblokEditable(blok)} className={CSS.section}>

            <div className={`wrapper ${CSS.wrapper} ${blok.reverseOrder ? CSS.reverse : ''}`}>

                <div className={CSS.text}>
                    {blok?.isCarClub &&
                        <img src="/icons/WR-logo.svg" alt="Winding Road Car Club logo" style={{marginBottom: '2em'}} width="62" height="65" loading="lazy" />
                    }
                    <div className={CSS.line} />
                    <RichText data={blok.text} />
                    {blok?.isCarClub &&
                        <form className={CSS.form} action="">
                            <label>
                                <span className="sr-only">Enter your email</span>
                                <input className={CSS.email} type="email" placeholder="Enter your email" />
                            </label>
                            <input type="submit" value="Join waitlist" className="button button-red" />
                        </form>
                    }
                </div>

                <div className={CSS.image}>
                    <Image img={blok.image} />
                </div>

            </div>

        </section>
    )
}