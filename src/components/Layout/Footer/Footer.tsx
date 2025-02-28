// Packages
import Link from 'next/link';

// Components
import RichText from "utils/RichTextRenderer"

// Styles
import CSS from './Footer.module.scss'


export default function Footer({ data }: {
    data: {
        columns: Array<any>,
        copyrightText: object,
    },
}) {
    
    return (
        <footer className={CSS.footer}>

            <div className={CSS.newsletter}>
                <div className="wrapper">
                    <div>
                        <p>Stay connected</p>
                        <form action="">
                            <label>
                                <span className="sr-only">Enter your email</span>
                                <input className={CSS.email} type="email" placeholder="Enter your email" />
                                <input type="submit" value="Submit" className="button" />
                            </label>
                        </form>
                    </div>
                    <div className={CSS.car}>
                        <picture>
                            <source srcSet="/images/footer-car.png" type="image/webp" />
                            <img src="/images/footer-car.png" alt="" loading="lazy" width="330" height="112" />
                        </picture>
                    </div>
                </div>
            </div>

            <div className="wrapper">

                <nav className={CSS.columns} aria-label="Site navigation on footer">
                    <div className={CSS.logo}>
                        <Link href="/">
                            <img src="/winding-road-logo.svg" alt="Winding Road logo" loading="lazy" width="204" height="45" />
                        </Link>
                    </div>
                    {data.columns.map((loop, i) => (
                        <div key={i}>
                            <RichText data={loop.text} />
                        </div>
                    ))}
                </nav>

                <div className={CSS.legals}>
                    <RichText data={data.copyrightText} />
                </div>

            </div>
        </footer>
    )
}