function CVItem({ bigName, date, littleName, description, onClick }) {
  return (
    <div className="cv-item" onClick={onClick}>
      <div className="item-with-date">
        <strong className="big-name">{bigName} </strong>
        <em className="date">{date}</em>
      </div>
      <p className="little-name">{littleName} </p>
      <p className="description">{description}</p>
    </div>
  );
}

export default CVItem;
