// Packages
import { useState, useEffect } from "react"

// Components
import Image from "utils/Image"

// Styles
import CSS from "./Video.module.scss"


export default function VideoPopup({ data: {youtubeId, vimeoId, thumbnail} }: {
    data: {
        youtubeId?: string,
        vimeoId?: string,
        thumbnail?: object,
    }
}) {

    const [open, setOpen] = useState(false);

    const youtubeEmbed = <iframe width="500" height="0" className={CSS.video} src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

    const vimeoEmbed = <iframe width="500" height="0" className={CSS.video} src={`https://player.vimeo.com/video/${vimeoId}?h=995f4b47a6&autoplay=1`} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>

    useEffect(() => {
        if (open) {
            const video = document.getElementById(youtubeId ? youtubeId : vimeoId);
            const root = document.getElementById("content");
            root.before(video);
        }
    }, [open])

    return (
        <>
        <button className={CSS.thumbnail} onClick={() => setOpen(true)}>
            <Image img={thumbnail} />
        </button>

        {/* Video popup */}
        <div id={youtubeId ? youtubeId : vimeoId} onClick={() => setOpen(false)} className={`${CSS.videoPopup} ${open === true ? CSS.active : ''}`}>
            <div className={CSS.videoWrapper}>
                {open &&
                    <>
                        {youtubeId && youtubeEmbed}
                        {vimeoId && vimeoEmbed}
                    </>
                }
            </div>
            <button 
                onClick={() => setOpen(false)}
                aria-label="Close popup"
            >
                &#10005;
            </button>
        </div>
        </>
    );
}