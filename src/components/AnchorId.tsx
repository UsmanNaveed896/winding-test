//Packages
import { useState, useEffect } from 'react'
import { storyblokEditable } from "@storyblok/react";


export default function AnchorId({ blok }: {
    blok: {
        id: string,
    }
}) {

    const [isEditor, setEditor] = useState(false);

    useEffect(() => {
        if (window.location.search.includes('_storyblok')) {
            setEditor(true);
        }
    }, []);

    return (
        <div style={{display: 'block', margin: '0', padding: '0', zIndex: '999', position: 'relative'}} id={blok.id} {...storyblokEditable(blok)}>
            {isEditor && 
                <div style={{padding: '0.5em 0', textAlign: 'center', backgroundColor: '#1c1c1c'}}>
                    <p style={{margin: '0'}}>Anchor ID: <strong>#{blok.id}</strong>. This is only visible to you inside Storyblok. <button style={{backgroundColor: '#fff'}} onClick={() => setEditor(false)}>Hide me</button></p>
                </div>
            }
        </div>
    )
}