import { useState, useEffect } from "react";

function GeneralForm({
  title,
  fields,
  visible,
  initialData,
  onSubmit,
  onDelete,
}) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!visible) return null;

  return (
    <form onSubmit={handleSubmit}>
      <h2>{title}</h2>
      {fields.map((field) => (
        <div key={field.id} className="form-item">
          <label htmlFor={field.id}>{field.label}</label>
          <textarea
            type={field.type}
            id={field.id}
            required={field.required}
            value={formData[field.id] || ""}
            onChange={handleChange}
          />
        </div>
      ))}
      <div className="form-btn-container">
        <button type="submit">Submit</button>
        {title !== "General Info" && initialData && (
          <button type="button" onClick={onDelete}>
            Delete Section
          </button>
        )}
      </div>
    </form>
  );
}

export default GeneralForm;
