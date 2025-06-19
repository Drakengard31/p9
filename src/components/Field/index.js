import PropTypes from "prop-types";

import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  TEXTAREA: 2,
};

const Field = ({
                 type = FIELD_TYPES.INPUT_TEXT,
                 label,
                 name,
                 placeholder,
                 value,
                 onChange,
                 required,
                 ...props // Pour récupérer data-testid et autres props
               }) => {
  let component;
  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = (
          <input
              type="text"
              name={name}
              placeholder={placeholder}
              value={value || ""}
              onChange={onChange}
              required={required}
              data-testid="field-testid"
              {...props} // Je passe les autres props (comme data-testid)
          />
      );
      break;
    case FIELD_TYPES.TEXTAREA:
      component = (
          <textarea
              name={name}
              placeholder={placeholder}
              value={value || ""}
              onChange={onChange}
              required={required}
              data-testid="field-testid"
              {...props} // Je passe les autres props ici aussi
          />
      );
      break;
    default:
      component = (
          <input
              type="text"
              name={name}
              placeholder={placeholder}
              value={value || ""}
              onChange={onChange}
              required={required}
              data-testid="field-testid"
              {...props}
          />
      );
  }
  return (
      <div className="inputField">
        <span>{label}</span>
        {component}
      </div>
  );
};

Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

Field.defaultProps = {
  label: "",
  placeholder: "",
  type: FIELD_TYPES.INPUT_TEXT,
  name: "field-name",
  // J'ajoute les valeurs par défaut
  value: "",
  onChange: () => {},
  required: false,
}

export default Field;