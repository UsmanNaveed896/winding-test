// Packages
import Link from 'next/link';


export default function Button({ link, text, className }: {
    link: any,
    text: string,
    className?: string,
}) {
    return ( link &&
        <>
            {link?.linktype === "story" && link.cached_url &&
                <Link
                    href={`/${link.cached_url === 'home' ? '' : link.cached_url}`}
                    className={className ? className : ''}
                    target={link?.target === '_blank' ? '_blank' : ''}
                    rel={link?.target === '_blank' ? 'noopener noreferrer' : ''}
                >
                    {text}
                </Link>
            }

            {link?.linktype === "url" && link.cached_url &&
                <a
                    href={link.cached_url}
                    className={className ? className : ''}
                    target={link?.target === '_blank' ? '_blank' : ''}
                    rel={link?.target === '_blank' ? 'noopener noreferrer' : ''}
                >
                    {text}
                </a>
            }

        </>
    )
}