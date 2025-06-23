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
    //  Meilleure gestion des dates
    const getValidDate = (inputDate) => {
        // Si c'est déjà une Date valide, on la retourne
        if (inputDate instanceof Date && !Number.isNaN(inputDate.getTime())) {
            return inputDate;
        }

        // Si c'est une string, on essaie de la convertir
        if (typeof inputDate === 'string' && inputDate.trim() !== '') {
            const parsedDate = new Date(inputDate);
            if (!Number.isNaN(parsedDate.getTime())) {
                return parsedDate;
            }
        }

        // Si rien ne marche, on retourne null (pas de date par défaut)
        return null;
    };

    const eventDate = getValidDate(date);

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
                    {/* Affiche le mois seulement si on a une date valide */}
                    {eventDate ? getMonth(eventDate) : ''}
                </div>
            </div>
        </div>
    );
};

EventCard.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    imageAlt: PropTypes.string,
    // Accepte aussi les strings pour les dates
    date: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string
    ]),
    title: PropTypes.string.isRequired,
    small: PropTypes.bool,
    label: PropTypes.string.isRequired,
};

EventCard.defaultProps = {
    imageAlt: "image",
    small: false,
    date: null,
};

export default EventCard;