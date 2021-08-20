import { useEffect, useState } from 'react';
import './FavoriteButton.css';
const FavoriteButton = ({favorites, onclick, id}) => {
    const [isFavroite, setIsFavroite] = useState(false);

    useEffect(() => {
        let isFav = favorites && (favorites.findIndex(fav => {return fav === id}) > -1) ? true : false;
        setIsFavroite(isFav);
    },[favorites])

    return(
        <div className="favorite">
            <i className={`fas fa-star ${isFavroite && 'active'}`} onClick={() => onclick(id)} />
        </div>
    )
}

export default FavoriteButton;