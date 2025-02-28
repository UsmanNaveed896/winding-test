// Styles
import CSS from './SocialMedia.module.scss'

// Components
import Image from 'utils/Image'


export default function SocialMedia({ data }: {
    data: any,
}) {
    return (
        <div className={CSS.socials}>
            {data.socials.map((loop, i) => (
                <a target="_blank" rel="noreferrer noopener" href={loop.link} key={i}>
                    <Image img={loop.icon} />
                </a>
            ))}
        </div>
    )
}