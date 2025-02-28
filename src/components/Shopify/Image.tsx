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

    const file = img?.src || null;

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
                width={img.width}
                height={img.height}
                alt={img?.altText || ''}
                loading={eager ? 'eager' : defaultLoading ? null : 'lazy'}
                fetchpriority={eager ? 'high' : null}
            />
        )

    } else if (img && file && file?.endsWith('.mp4')) {
        return (
            <video style={style} className={className} src={file} autoPlay loop muted playsInline></video>
        )

    } else if (img && file) {
        return (
            <img
                style={style}
                className={className}
                srcSet={`
                    ${fullwidth === true ? `
                        ${file + `?width=2500${heightRatio && `&height=${Height(2500)}`}`} 2500w,
                        ${file + `?width=2000${heightRatio && `&height=${Height(2000)}`}`} 2000w,
                        ${file + `?width=1600${heightRatio && `&height=${Height(1600)}`}`} 1600w,
                    ` : ''}
                    ${file + `?width=1400${heightRatio && `&height=${Height(1400)}`}`} 1400w,
                    ${file + `?width=1000${heightRatio && `&height=${Height(1000)}`}`} 1000w,
                    ${file + `?width=900${heightRatio && `&height=${Height(900)}`}`} 900w,
                    ${file + `?width=800${heightRatio && `&height=${Height(800)}`}`} 800w,
                    ${file + `?width=700${heightRatio && `&height=${Height(700)}`}`} 700w,
                    ${file + `?width=600${heightRatio && `&height=${Height(600)}`}`} 600w,
                    ${file + `?width=500${heightRatio && `&height=${Height(500)}`}`} 500w,
                    ${file + `?width=400${heightRatio && `&height=${Height(400)}`}`} 400w,
                    ${file + `?width=300${heightRatio && `&height=${Height(300)}`}`} 300w
                `}
                sizes={sizes ? sizes : "(min-width: 1400px) 1400px, 100vw"}
                src={file}
                width={img.width}
                height={img.height}
                alt={img?.altText || ''}
                loading={eager ? 'eager' : defaultLoading ? null : 'lazy'}
                fetchpriority={eager ? 'high' : null}
            />
        )
    }
}