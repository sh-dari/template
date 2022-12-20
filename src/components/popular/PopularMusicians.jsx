import React from "react";
import PopularMusiciansItem from "./PopularMusiciansItem";

const PopularMusicians = ({musicians, tagsMusicians}) => {
    return (
        <div className="musicians__wrapper">
            {musicians.map((musician, index)=>
                <PopularMusiciansItem musician={musician} key={index} tags={tagsMusicians[index]}/>
            )}
        </div>
    );
}

export default PopularMusicians;