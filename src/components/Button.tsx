// Packages
import Link from 'next/link';


export default function Button({ data, className }: {
    data: any,
    className?: string,
}) {
    return ( data &&
        <>
            {data?.link?.linktype === "story" && data?.text && data?.link.cached_url &&
                <Link
                    href={`/${data?.link.cached_url === 'home' ? '' : data?.link.cached_url}`}
                    className={`button ${data?.class} ${className ? className : ''} ${data?.style ? data.style : ''}`}
                    target={data?.link?.target === '_blank' ? '_blank' : ''}
                    rel={data?.link?.target === '_blank' ? 'noopener noreferrer' : ''}
                    id={data?.id}
                >
                    {data.text}
                </Link>
            }

            {data?.link?.linktype === "url" && data?.text && data?.link.cached_url &&
                <a
                    href={data?.link.cached_url}
                    className={`button ${data?.class} ${className ? className : ''} ${data?.style ? data.style : ''}`}
                    target={data?.link?.target === '_blank' ? '_blank' : ''}
                    rel={data?.link?.target === '_blank' ? 'noopener noreferrer' : ''}
                    id={data?.id}
                >
                    {data.text}
                </a>
            }

            {data?.spacerAfter && <span className="w-[0.75em] sm:inline-block"></span>}

        </>
    )
}