import React from "react";
import TagItem from "./TagItem";

const PopularMusiciansItem = ({musician, tags}) => {
    if (typeof tags === 'undefined') {
        return (<div></div>);
    }
    return (
        <div className="musician">
            <a href={musician.url}>
                <img className="musician__img" src={musician.image[3]['#text']} />
            </a>
            <a href={musician.url} className="musician__name">{musician.name}</a>
            <ul className="tags">
                {tags.map((tag, index)=>
                    <TagItem tag={tag} key={index}/>
                )}
            </ul>
        </div>
    );
}

export default PopularMusiciansItem;