// Packages
import { storyblokEditable } from "@storyblok/react";
import { useForm } from '@formspree/react';

// Components
import RichText from "utils/RichTextRenderer"
import Image from "utils/Image"

// Styles
import CSS from "./ContactUs.module.scss"


export default function ContactUs({ blok }: {
    blok: {
        text: object,
        image: object,
        show: string,
        mapEmbed: string,
    },
}) {

    const [state, handleSubmit] = useForm('moqovdpa');


    return (
        <section {...storyblokEditable(blok)} className={CSS.section}>

            <div className={`wrapper ${CSS.wrapper}`}>
                <div className={CSS.text}>
                    <RichText data={blok.text} />
                </div>

                {blok.show === 'map' &&
                    <div className={CSS.map} dangerouslySetInnerHTML={{__html: blok?.mapEmbed}} />
                }

                {blok.show === 'form' &&
                    <form className={CSS.form} onSubmit={handleSubmit}>

                        <label>
                            <span className="sr-only">Name</span>
                            <input type="text" name="Name" placeholder="Name"/>
                        </label>

                        <label>
                            <span className="sr-only">Email</span>
                            <input type="text" name="Email" placeholder="Email" />
                        </label>

                        <label>
                            <span className="sr-only">Subject</span>
                            <input type="text" name="Subject" placeholder="Subject" />
                        </label>

                        <label>
                            <span className="sr-only">Message</span>
                            <textarea name="Message" cols={30} rows={10} placeholder="Your message" />
                        </label>

                        <input disabled={state.submitting} className="button" type="submit" value="Submit"/>

                        {state?.succeeded && <p>Message sent! One of our team members will get back to you shortly.</p>}
                    
                    </form>
                }
            </div>

            <Image className={CSS.backgroundImage} img={blok.image} fullwidth />

        </section>
    )
}