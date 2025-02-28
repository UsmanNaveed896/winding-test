// Components
import Image from "utils/Image"
import { useForm } from '@formspree/react';

// Styles
import CSS from "./TestDrive.module.scss"


export default function TestDrive({ car }: {
    car?: string,
}) {

    const [state, handleSubmit] = useForm('mgejvkre');

    return (
        <div className={CSS.wrapper}>
            <div className={CSS.image}>
                <Image img={{'filename': 'https://a-us.storyblok.com/f/1014612/477x619/f83b5eaaae/car-interior.jpg'}} />
            </div>
            <div className={CSS.text}>
                <h3>Schedule a Test Drive</h3>
                <p>{car}</p>

                <form className={CSS.form} onSubmit={handleSubmit}>
                    <label>
                        <span className="sr-only">Name</span>
                        <input type="text" name="Name" placeholder="Name" />
                    </label>
                    <label>
                        <span className="sr-only">Email</span>
                        <input type="email" name="Email" placeholder="Email" />
                    </label>
                    <label>
                        <span className="sr-only">Phone</span>
                        <input type="tel" name="Phone" placeholder="Phone Number" />
                    </label>
                    <label>
                        <span className="sr-only">Best Time</span>
                        <input type="text" name="Best Time" placeholder="Best Time" />
                    </label>
                    <label style={{display: 'none'}}>
                        <input type="text" name="Car" value={car} />
                    </label>
                    <input disabled={state.submitting} className="button" type="submit" value="Send request"/>
                    {state?.succeeded && <p>Successfully sent! One of our team members will be in touch with you soon.</p>}
                </form>
            </div>
        </div>
    )
}