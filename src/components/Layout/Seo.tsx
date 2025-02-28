// Next requirements
import Head from 'next/head'

export default function Seo( data: {
    noindex?: boolean,
    url: string,
    description: string,
    title: string,
    image?: string,
}) {

    const description = data?.description || '';
    const url = data.url === '/' ? '' : data.url.endsWith('/') ? data.url : data.url + '/';
    const title = !data?.title ? 'Winding Road Motorcars' : url === '/' ? data.title : `${data.title} – Winding Road Motorcars`;

    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta property="og:locale" content="en-CA" />
        
            {data?.noindex && <meta name="robots" content="noindex" /> }

            <title>{title}</title>
            <meta name="title" content={title}/>
            <meta property="og:title" content={title}/>
            <meta property="twitter:title" content={title}/>

            <meta property="og:site_name" content="Winding Road Motorcars" />
            <meta property="twitter:card" content="summary_large_image" />

            <link rel="canonical" href={`https://windingroad.ca/${url}`} />
            <meta property="og:url" content={`https://windingroad.ca/${url}`} />
            <meta property="twitter:url" content={`https://windingroad.ca/${url}`} />

            <meta property="og:type" content="website" />

            {/* <meta property="og:image" content={data?.image ? data.image + '/m/1200x0/filters:quality(80)' : "/images/winding-road-thumbnail.jpg"} />
            <meta property="twitter:image" content={data?.image ? data.image + '/m/1200x0/filters:quality(80)' : "/images/winding-road-thumbnail.jpg"} /> */}

            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <meta property="twitter:description" content={description} />

            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <meta name="msapplication-TileColor" content="#000000" />
            <meta name="theme-color" content="#000000" />

        </Head>
    )
}