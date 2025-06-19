import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve({ success: true });
    }, 500);
});

const Form = ({ onSuccess, onError }) => {
    const [sending, setSending] = useState(false);
    const [formData, setFormData] = useState({
        lastname: "",
        firstname: "",
        email: "",
        type: "Personel",
        message: ""
    });

    const sendContact = useCallback(
        async (evt) => {
            evt.preventDefault();
            setSending(true);
            try {
                await mockContactApi();
                onSuccess(); // Appel explicite de onSuccess
            } catch (err) {
                onError(err);
            } finally {
                setSending(false);
            }
        },
        [onSuccess, onError]
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <form onSubmit={sendContact}>
            <div className="row">
                <div className="col">
                    <Field
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        label="Nom"
                        data-testid="lastname-field"
                        required
                    />
                    <Field
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleInputChange}
                        label="Prénom"
                        data-testid="firstname-field"
                        required
                    />
                    <Select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        selection={["Personel", "Entreprise"]}
                        label="Personel / Entreprise"
                        data-testid="type-select"
                        type="large"
                        titleEmpty
                    />
                    <Field
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        label="Email"
                        placeholder="votre@email.com"
                        data-testid="email-field"
                        required
                    />
                    <Button
                        type={BUTTON_TYPES.SUBMIT}
                        disabled={sending}
                        data-testid="submit-button"
                    >
                        {sending ? "En cours" : "Envoyer"}
                    </Button>
                </div>
                <div className="col">
                    <Field
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        label="Message"
                        type={FIELD_TYPES.TEXTAREA} // utilise la constante
                        data-testid="message-field"
                    />
                </div>
            </div>
        </form>
    );
};

Form.propTypes = {
    onError: PropTypes.func,
    onSuccess: PropTypes.func,
};

Form.defaultProps = {
    onError: () => null,
    onSuccess: () => null,
};

export default Form;