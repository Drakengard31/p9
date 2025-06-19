import PropTypes from 'prop-types';
import { getMonth } from '../../helpers/Date';
import './style.scss';

const EventCard = ({
                       imageSrc,
                       imageAlt,
                       date,
                       title,
                       label,
                       small = false,
                       ...props
                   }) => {
    // Et une vérification plus propre pour les dates invalides
    const eventDate = (date instanceof Date && !Number.isNaN(date.getTime())) ? date : new Date();

    return (
        <div
            data-testid="card-testid"
            className={`EventCard${small ? " EventCard--small" : ""}`}
            {...props}
        >
            <div className="EventCard__imageContainer">
                <img
                    data-testid="card-image-testid"
                    src={imageSrc}
                    alt={imageAlt}
                />
                <div className="EventCard__label">{label}</div>
            </div>
            <div className="EventCard__descriptionContainer">
                <div className="EventCard__title">{title}</div>
                <div
                    className="EventCard__month"
                    data-testid="event-month"
                >
                    {/* On utilise notre eventDate vérifiée */}
                    {getMonth(eventDate)}
                </div>
            </div>
        </div>
    );
};

EventCard.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    imageAlt: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    title: PropTypes.string.isRequired,
    small: PropTypes.bool,
    label: PropTypes.string.isRequired,
};

EventCard.defaultProps = {
    imageAlt: "image",
    small: false,
    date: new Date(),
};

export default EventCard;