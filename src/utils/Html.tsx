// Gatsby requirements
import React from "react"

export default function Html({ data }: {
    data: any
}) {

    return (
        data && <div dangerouslySetInnerHTML={{__html: data}}/>
    )
}