export default function Image({ img, eager, sizes, style, className, fullwidth, square, heightRatio, defaultLoading }: {
    img: any,
    eager?: boolean,
    sizes?: string,
    className?: string,
    fullwidth?: boolean,
    square?: boolean,
    heightRatio?: number,
    defaultLoading?: boolean,
    style?: any,
}) {

    const file = img?.filename || img?.src || null;

    function Height(i) {
        if (square) { return i}
        else if (!heightRatio) { return 0 }
        else return Math.round(heightRatio * i)
    }
    
    if (img && file && (file?.endsWith('.svg') || file?.endsWith('.gif'))) {
        return (
            <img
                style={style}
                className={className}
                src={file}
                width={file?.split('/')[5]?.split('x')[0] !== '0' ? file?.split('/')[5]?.split('x')[0] : '250'}
                height={square ? file?.split('/')[5]?.split('x')[0] : file?.split('/')[5]?.split('x')[1] !== '0' ? file?.split('/')[5]?.split('x')[1] : '250'}
                alt={img?.name || img?.alt || ''}
                loading={eager ? 'eager' : defaultLoading ? null : 'lazy'}
                fetchpriority={eager ? 'high' : null}
            />
        )

    } else if (img && file && file?.endsWith('.mp4')) {
        return (
            <video style={style} className={className} src={file} autoPlay loop muted playsInline></video>
        )

    } else if (img && file && file.includes('storyblok.com')) {
        return (
            <img
                style={style}
                className={className}
                srcSet={`
                    ${fullwidth === true ? `
                        ${file + `/m/2500x${Height(2500)}`} 2500w,
                        ${file + `/m/2000x${Height(2000)}`} 2000w,
                        ${file + `/m/1600x${Height(1600)}`} 1600w,
                    ` : ''}
                    ${file + `/m/1400x${Height(1400)}/filters:quality(90)`} 1400w,
                    ${file + `/m/1000x${Height(1000)}/filters:quality(90)`} 1000w,
                    ${file + `/m/900x${Height(900)}/filters:quality(90)`} 900w,
                    ${file + `/m/800x${Height(800)}/filters:quality(90)`} 800w,
                    ${file + `/m/700x${Height(700)}/filters:quality(90)`} 700w,
                    ${file + `/m/600x${Height(600)}/filters:quality(90)`} 600w,
                    ${file + `/m/500x${Height(500)}/filters:quality(90)`} 500w,
                    ${file + `/m/400x${Height(400)}/filters:quality(90)`} 400w,
                    ${file + `/m/300x${Height(300)}/filters:quality(85)`} 300w
                `}
                sizes={sizes ? sizes : "(min-width: 1400px) 1400px, 100vw"}
                src={file}
                width={file?.split('/')[5]?.split('x')[0] !== '0' ? file?.split('/')[5]?.split('x')[0] : '250'}
                height={square ? file?.split('/')[5]?.split('x')[0] : file?.split('/')[5]?.split('x')[1] !== '0' ? file?.split('/')[5]?.split('x')[1] : '250'}
                alt={img?.name || img?.alt || ''}
                loading={eager ? 'eager' : defaultLoading ? null : 'lazy'}
                fetchpriority={eager ? 'high' : null}
            />
        )
    } else if (img && file && !file.includes('storyblok.com')) {
        return (
            <img
                style={style}
                className={className}
                src={file}
                alt={img?.name || img?.alt || ''}
                loading={eager ? 'eager' : defaultLoading ? null : 'lazy'}
                fetchpriority={eager ? 'high' : null}
            />
        )
    }
}