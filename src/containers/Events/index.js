import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // Debug: afficher les types disponibles
  const typeList = new Set(data?.events?.map((event) => event.type) || []);
  console.log('Available types:', Array.from(typeList));
  console.log('Current type state:', type);

  // D'abord filtrer par type, puis par pagination
  const eventsByType = !type
      ? data?.events || []  // Tous les événements si pas de type sélectionné
      : (data?.events || []).filter((event) => event.type === type); // Filtrer par type

  console.log('Events by type:', eventsByType.length, 'events');

  // Ensuite appliquer la pagination sur les événements filtrés
  const filteredEvents = eventsByType.filter((event, index) => {
    const startIndex = (currentPage - 1) * PER_PAGE;
    const endIndex = PER_PAGE * currentPage;
    return index >= startIndex && index < endIndex;
  });

  const changeType = (evtType) => {
    console.log('Changing type to:', evtType); // Debug
    setCurrentPage(1); // Reset à la page 1 quand on change de type
    setType(evtType);
  };

  // Calculer le nombre de pages basé sur les événements filtrés par type
  const pageNumber = Math.ceil((eventsByType?.length || 0) / PER_PAGE);

  const selectionOptions = ["Tous", ...Array.from(typeList)];
  console.log('Selection options:', selectionOptions);

  return (
      <>
        {error && <div>An error occured</div>}
        {data === null ? (
            "loading"
        ) : (
            <>
              <h3 className="SelectTitle">Catégories</h3>
              <Select
                  aria-label="Catégories"
                  selection={selectionOptions}
                  value={type || "Tous"} // Valeur actuelle du select
                  onChange={(value) => {
                    console.log('Select onChange called with:', value, typeof value); // Debug
                    console.log('Is value "soirée entreprise"?', value === "soirée entreprise");
                    // Gérer le cas "Tous" et les valeurs nulles
                    if (value === "Tous" || !value) {
                      changeType(null); // null = tous les événements
                    } else {
                      changeType(value);
                    }
                  }}
              />


              <div id="events" className="ListContainer">
                {filteredEvents.map((event) => (
                    <Modal key={event.id} Content={<ModalEvent event={event} />}>
                      {({ setIsOpened }) => (
                          <EventCard
                              onClick={() => setIsOpened(true)}
                              imageSrc={event.cover}
                              title={event.title}
                              // Convertir la date en objet Date avant de la passer
                              date={new Date(event.date)}
                              label={event.type}
                          />
                      )}
                    </Modal>
                ))}
              </div>
              <div className="Pagination">
                {/* Affiche la pagination seulement s'il y a plus d'une page */}
                {pageNumber > 1 && Array.from({ length: pageNumber }, (_, i) => i + 1).map((pageNum) => (
                    <a
                        key={`page-${pageNum}`}
                        href="#events"
                        onClick={() => setCurrentPage(pageNum)}
                        // Ajoute une classe pour la page active
                        className={currentPage === pageNum ? "active" : ""}
                    >
                      {pageNum}
                    </a>
                ))}
              </div>
            </>
        )}
      </>
  );
};

export default EventList;