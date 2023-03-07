import React from "react";

const TagItem = ({tag}) => {
    return (
        <li className="tag">
            <a href={tag.url}>{tag.name}</a>
        </li>
    );
}

export default TagItem;