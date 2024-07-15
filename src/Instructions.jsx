function Instructions({ toggleForm }) {
  return (
    <div className="instructions-container">
      <h2 className="instructions">Click on a section to edit</h2>
      <div className="instructions-btn-container">
        <button
          className="new-education-btn"
          onClick={() => toggleForm("education")}
        >
          Add new education
        </button>
        <button
          className="new-experience-btn"
          onClick={() => toggleForm("experience")}
        >
          Add new experience
        </button>
      </div>
    </div>
  );
}

export default Instructions;
