/**
 * Register: as Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
import classnames from "classnames"
import times from "lodash/times"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"
//  Import CSS.
import "./style.scss"
import "./editor.scss"
import attributes from "./attributes"
import edit from "./edit"
import contentTimelineStyle from './inline-styles'
import ContentTmClasses from './classes'

// Components
const { __ } = wp.i18n

// Register block controls
const {
    registerBlockType
} = wp.blocks

const {
    RichText
} = wp.editor

registerBlockType( 'uagb/content-timeline', {

    // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
    title: __( 'Content Timeline - UAGB' ), // Block title.
    description: __( 'Add Content Timeline block.' ), // Block description.
    icon: UAGB_Block_Icons.content_timeline, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
    category: "uagb",
    keywords: [
        __( "Content Timeline" ),
        __( "Timeline" ),
        __( "uagb" ),
    ],
    attributes,    
    edit,    
    save: function( props ) {
        
        const {
            headingTitle,
            headingDesc,
            tm_content,
            headingColor,
            subHeadingColor,
            backgroundColor,
            separatorColor,
            separatorFillColor,
            separatorBg,
            separatorBorder,
            borderFocus,
            headingTag,
            headFontSize,
            timelineItem,
            timelinAlignment,
            arrowlinAlignment,
            subHeadFontSize,
            verticalSpace,
            horizontalSpace,
            headSpace,
            separatorwidth,
            borderwidth,
            connectorBgsize,
            subHeadSpace,
            dateBottomspace,
            align,
            order,
            orderBy,
            width,          
            authorColor,
            dateColor,
            dateFontsize,
            authorFontsize,
            tm_block_id,
            borderRadius,
            bgPadding,
            tm_client_id,
            iconSize,
            icon,
            iconColor,          
            iconFocus,
            borderHover,
            iconBgHover,
            iconHover,
            iconBgFocus,
            className,
            t_date, 
            displayPostDate           
        } = props.attributes;       

        var my_block_id = 'uagb-ctm-'+tm_client_id

        /* Style for elements */
        var front_style = contentTimelineStyle( props );        
        
        const hasItems = Array.isArray( tm_content ) && tm_content.length;

        var content_align_class = '';
        var day_align_class = '';

        if( timelinAlignment == 'left' ){
            content_align_class = 'uagb-timeline__widget uagb-timeline__left';
            day_align_class = 'uagb-timeline__day-new uagb-timeline__day-left';
        }else if(timelinAlignment == 'right'){
            content_align_class = 'uagb-timeline__widget uagb-timeline__right';
            day_align_class = 'uagb-timeline__day-new uagb-tmimeline__day-right';
        }     
        let data_copy     = [ ...tm_content ];
        var display_inner_date = false;

        return (            
                <div  className={ classnames(
                    className,
                    "uagb-timeline__outer-wrap"
                ) }
                id = { my_block_id } >                          
                     <div  className = { classnames(
                        "uagb-timeline__content-wrap",
                        ...ContentTmClasses( props.attributes ),
                    ) }>
                        <div className = "uagb-timeline-wrapper">
                            <div className = "uagb-timeline__main">   
                                <div className = "uagb-timeline__days uagb-timeline-infinite-load">
                                    {<style dangerouslySetInnerHTML={{ __html: front_style }}></style>}
                                    { 
                                        tm_content.map((post,index) => { 
                                            var second_index = 'uagb-'+index;
                                            if(timelinAlignment == 'center'){
                                                display_inner_date = true;
                                                if(index % 2 == '0'){
                                                    content_align_class = 'uagb-timeline__widget uagb-timeline__right';
                                                    day_align_class = 'uagb-timeline__day-new uagb-tmimeline__day-right';
                                                }else{
                                                    content_align_class = 'uagb-timeline__widget uagb-timeline__left';
                                                    day_align_class = 'uagb-timeline__day-new uagb-timeline__day-left';
                                                }  
                                            }   
                                            const Tag = headingTag;  
                                            var icon_class = 'uagb-timeline__icon-new out-view-uagb-timeline__icon '+icon;  
                                                
                                            return (
                                                <article className = "uagb-timeline__field animate-border"  key={index}>
                                                    <div className = {content_align_class}> 
                                                        
                                                        <div className = "uagb-timeline__marker out-view-uagb-timeline__icon">
                                                            <span className = {icon_class}></span>
                                                        </div>
                                                        
                                                        <div className = {day_align_class}>
                                                            <div className="uagb-events-new" style = {{textAlign:align}}>
                                                                <div className="uagb-timeline__events-inner-new" style={{ backgroundColor: backgroundColor }}>                                                                
                                                                    <div className="uagb-timeline__date-hide uagb-timeline__date-inner" style = {{textAlign:align}}>                                                                
                                                                        { displayPostDate && t_date[index].title &&
                                                                            <div dateTime={ moment( t_date[index].title ).utc().format() } className={ 'uagb-timeline__inner-date-new' }>
                                                                                { moment( t_date[index].title ).local().format( 'MMMM DD, Y' ) }
                                                                            </div>
                                                                        }  
                                                                    </div>

                                                                    <div className="uagb-timeline-content">
                                                                        
                                                                        <div className="uagb-timeline__heading-text" style={{                                                                            
                                                                                    marginBottom: headSpace + 'px',
                                                                                }}> 
                                                                            <RichText.Content
                                                                                tagName={ headingTag }
                                                                                value={ post.time_heading }
                                                                                className='uagb-timeline__heading entry-title'                                                                              
                                                                                style={{                                                                   
                                                                                    fontSize: headFontSize + 'px',
                                                                                    color: headingColor,
                                                                                    textAlign:align                                                                    
                                                                                }}
                                                                            />
                                                                        </div>

                                                                        <RichText.Content
                                                                            tagName= "p"
                                                                            value={ post.time_desc }
                                                                            className='uagb-timeline-desc-content'                                                                          
                                                                            style={{                                                                   
                                                                                fontSize: subHeadFontSize + 'px',
                                                                                color: subHeadingColor, 
                                                                                marginBottom: subHeadSpace + 'px', 
                                                                                textAlign:align                                                             
                                                                            }}
                                                                        />

                                                                        <div className="uagb-timeline__arrow"></div> 

                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>

                                                        { display_inner_date && <div className = "uagb-timeline__date-new">                                                                                                   
                                                            { displayPostDate && t_date[index].title &&
                                                                <div dateTime={ moment( t_date[index].title ).utc().format() } className={ 'uagb-timeline__date-new' }>
                                                                    { moment( t_date[index].title ).local().format( 'MMMM DD, Y' ) }
                                                                </div>
                                                            } 
                                                            </div>
                                                        }
                                                    </div>
                                                </article>
                                            );

                                        })
                                    }
                                </div>
                                <div className = "uagb-timeline__line" >
                                    <div className = "uagb-timeline__line__inner"></div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
} );