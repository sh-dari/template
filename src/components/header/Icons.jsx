import React from "react"

const Icons = () => {
    return (
        <div className="header__icons">
            <img className="header__iconsDisk" src="/imgs/player_default_album.png"/>
            <div className="header__iconsPlayer">
                <img src="/imgs/rewind.png" width="20" height="17" />
                <img src="/imgs/player.png" width="30" />
                <img src="/imgs/rewind.png" width="20" height="17" className="img-right"/>
                <img src="/imgs/heart.png" width="20" height="17"/>
            </div>
        </div>
    );
}


export default Icons;