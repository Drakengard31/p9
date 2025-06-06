import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
    const { data } = useData();
    const [index, setIndex] = useState(0);

    // Tri + ajout d'un id fallback si manquant
    const byDateDesc = data?.focus
        ?.map((event, i) => ({ ...event, id: event.id || `event-${i}` }))
        ?.sort((evtA, evtB) =>
            new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
        ) || [];

    useEffect(() => {
        if (byDateDesc.length === 0) {
            return undefined; // Retour explicite quand il n'y a rien à faire
        }

        const timer = setTimeout(
            () => setIndex(prevIndex =>
                prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
            ),
            5000
        );
        return () => clearTimeout(timer);
    }, [index, byDateDesc.length]);

    return (
        <div className="SlideCardList">
            {byDateDesc.map((event, idx) => (
                <div
                    key={`slide-${event.id}`}
                    className={`SlideCard SlideCard--${
                        index === idx ? "display" : "hide"
                    }`}
                >
                    <img src={event.cover} alt={event.title || "Événement"} />
                    <div className="SlideCard__descriptionContainer">
                        <div className="SlideCard__description">
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <div>{getMonth(new Date(event.date))}</div>
                        </div>
                    </div>
                </div>
            ))}

            {byDateDesc.length > 1 && (
                <div className="SlideCard__paginationContainer">
                    <div className="SlideCard__pagination">
                        {byDateDesc.map((event, radioIdx) => (
                            <input
                                key={`radio-${event.id}`}
                                type="radio"
                                name="radio-button"
                                checked={index === radioIdx}
                                onChange={() => setIndex(radioIdx)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Slider;