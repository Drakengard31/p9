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

  // D'abord filtrer par type, puis par pagination
  const eventsByType = !type
      ? data?.events || []  // Tous les événements si pas de type
      : (data?.events || []).filter((event) => event.type === type); // Filtrer par type

  // Ensuite appliquer la pagination sur les événements filtrés
  const filteredEvents = eventsByType.filter((event, index) => {
    if (
        (currentPage - 1) * PER_PAGE <= index &&
        PER_PAGE * currentPage > index
    ) {
      return true;
    }
    return false;
  });

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  // Calculer le nombre de pages basé sur les événements filtrés par type
  const pageNumber = Math.floor((eventsByType?.length || 0) / PER_PAGE) + 1;

  // Vérifier que data?.events existe avant de mapper
  const typeList = new Set(data?.events?.map((event) => event.type) || []);

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
                  selection={Array.from(typeList)}
                  onChange={(value) => (value ? changeType(value) : changeType(null))}
              />
              <div id="events" className="ListContainer">
                {filteredEvents.map((event) => (
                    <Modal key={event.id} Content={<ModalEvent event={event} />}>
                      {({ setIsOpened }) => (
                          <EventCard
                              onClick={() => setIsOpened(true)}
                              imageSrc={event.cover}
                              title={event.title}
                              date={new Date(event.date)}
                              label={event.type}
                          />
                      )}
                    </Modal>
                ))}
              </div>
              <div className="Pagination">
                {[...Array(pageNumber || 0)].map((_, n) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                      {n + 1}
                    </a>
                ))}
              </div>
            </>
        )}
      </>
  );
};

export default EventList;