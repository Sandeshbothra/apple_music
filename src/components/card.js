import { Link } from 'react-router-dom';
import './card.css';

const Card = ({imgSrc, title, type, linkTo}) => {
    return (
        <Link to={linkTo}>
        <div className="card-main">
            <img role="button" src={imgSrc} />
            <div className="card-details">
                <p role="button" className="mb-0 title">{title}</p>
                <p role="button" className="category">{type}</p>
            </div>
        </div>
        </Link>
    )
}

export default Card;