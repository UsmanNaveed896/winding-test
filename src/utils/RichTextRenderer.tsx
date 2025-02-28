// Packages
import { render, MARK_LINK, NODE_IMAGE } from 'storyblok-rich-text-react-renderer';
import Link from "next/link";

// Components
import Button from 'components/Button'
import PopUp from 'components/PopUp/PopUp'
import Image from "utils/Image"
import Video from "components/Video/Video"
import SocialMedia from "components/SocialMedia/SocialMedia"
import Html from "utils/Html"
import RichTextImages from "components/RichTextImages/RichTextImages"
import Quote from "components/Quote/Quote"
import TextSideBySide from "components/TextSideBySide/TextSideBySide"

    
export default function RichTextRenderer({ data }: {
    data: any
}) {
    
    return (
        render(data, {

            // Links
            markResolvers: {
                [MARK_LINK]: (children, props) => {
                    const { href, target, linktype } = props;
                    if (linktype === 'story') { 
                        
                        const ReturnsWithSlash = function (link) {
                            if (link.endsWith("/")){
                                return href
                            } else {
                                return href + '/'
                            }
                        }

                        return (
                            <Link
                                href={href === 'home' ? '/' : `${ReturnsWithSlash(href)}`}
                                className={data.component === "Button" ? 'button' : ''}
                                target={target}
                            >
                                {children}
                            </Link>
                        )
                    }

                    if (linktype === 'url' || linktype === 'asset') {
                        return  <a href={href} target={target}>{children}</a>
                    }

                    if (linktype === 'email') {
                        return <a href={'mailto:' + href}>{children}</a>
                    }
                },
            },

            // Images
            nodeResolvers: {
                [NODE_IMAGE]: (children, props) => <Image style={{margin: '1em 0'}} img={props}/>,
            },

            // Custom blocks
            blokResolvers: {
                ['Item: Button']: (props) => <Button data={props} />,
                ['Item: Popup Button']: (props) => <PopUp className="button" data={props} />,
                ['Item: Video']: (props) => <Video data={props} />,
                ['Item: Socials']: (props) => <SocialMedia data={props} />,
                ['Item: Html Embed']: (props) => <Html data={props?.html} />,
                ['Item: Images']: (props) => <RichTextImages blok={props} />,
                ['Item: Quote']: (props) => <Quote blok={props} richtext />,
                ['Item: Text Side by Side']: (props) => <TextSideBySide blok={props} />
            },
        })
    )
}