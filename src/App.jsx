import { useState } from "react";
import "./styles.css";
import Instructions from "./Instructions";
import GeneralForm from "./GeneralForm";
import CVItem from "./CVItem";

function App() {
  const [visibleForm, setVisibleForm] = useState(null);
  const [cvData, setCvData] = useState({
    generalInfo: {
      name: "John Smith",
      email: "example@email.com",
      phone: "+44 01987 322 444",
    },
    education: [
      {
        id: 1,
        schoolName: "University of London",
        qualification: "BSc Computer Science",
        startDate: "2019-09",
        endDate: "2020-08",
      },
    ],
    experience: [
      {
        id: 1,
        companyName: "Facebook",
        jobTitle: "Software Engineer",
        startDate: "2019-09",
        endDate: "2020-08",
        description: "Created Facebook search algorithm",
      },
      {
        id: 2,
        companyName: "Google",
        jobTitle: "DevOps",
        startDate: "2019-09",
        endDate: "2020-08",
        description: "Developed Google search YouTube algo",
      },
    ],
  });
  const [currentEdit, setCurrentEdit] = useState(null);

  const toggleForm = (formName, item = null) => {
    setVisibleForm(visibleForm === formName ? null : formName);
    setCurrentEdit(item);
  };

  const handleFormSubmit = (data) => {
    if (visibleForm === "generalInfo") {
      setCvData({ ...cvData, generalInfo: data });
    } else {
      setCvData({
        ...cvData,
        [visibleForm]: currentEdit
          ? cvData[visibleForm].map((item) =>
              item.id === currentEdit.id ? { ...data, id: item.id } : item
            )
          : [...cvData[visibleForm], { ...data, id: Date.now() }],
      });
    }
    setVisibleForm(null);
    setCurrentEdit(null);
  };

  const handleDelete = () => {
    if (visibleForm !== "generalInfo") {
      setCvData({
        ...cvData,
        [visibleForm]: cvData[visibleForm].filter(
          (item) => item.id !== currentEdit.id
        ),
      });
    }
    setVisibleForm(null);
    setCurrentEdit(null);
  };

  const fields = {
    generalInfo: [
      { label: "Name", type: "text", id: "name", required: true },
      { label: "Email", type: "email", id: "email", required: false },
      { label: "Phone", type: "tel", id: "phone", required: false },
    ],
    education: [
      { label: "School Name", type: "text", id: "schoolName", required: true },
      {
        label: "Qualification",
        type: "text",
        id: "qualification",
        required: true,
      },
      { label: "Start Date", type: "date", id: "startDate" },
      { label: "End Date", type: "date", id: "endDate" },
    ],
    experience: [
      {
        label: "Company Name",
        type: "text",
        id: "companyName",
        required: true,
      },
      { label: "Job Title", type: "text", id: "jobTitle", required: true },
      { label: "Description", type: "text", id: "description" },
      { label: "Start Date", type: "date", id: "startDate" },
      { label: "End Date", type: "date", id: "endDate" },
    ],
  };

  return (
    <div className="main-container">
      <div className="sidebar">
        <h1>CV Builder</h1>
        <Instructions toggleForm={toggleForm} />
        <GeneralForm
          title="General Info"
          fields={fields.generalInfo}
          visible={visibleForm === "generalInfo"}
          initialData={cvData.generalInfo}
          onSubmit={handleFormSubmit}
        />
        <GeneralForm
          title="Education"
          fields={fields.education}
          visible={visibleForm === "education"}
          initialData={currentEdit}
          onSubmit={handleFormSubmit}
          onDelete={handleDelete}
        />
        <GeneralForm
          title="Experience"
          fields={fields.experience}
          visible={visibleForm === "experience"}
          initialData={currentEdit}
          onSubmit={handleFormSubmit}
          onDelete={handleDelete}
        />
      </div>
      <div className="cv-container" id="cv-preview">
        <div
          className="general-info"
          onClick={() => toggleForm("generalInfo", cvData.generalInfo)}
        >
          <h1 className="name">{cvData.generalInfo.name}</h1>
          <div className="contact-info">
            <p className="email">{cvData.generalInfo.email}</p>
            <p className="phone">{cvData.generalInfo.phone}</p>
          </div>
        </div>
        <div className="cv-item-container">
          <h2 className="cv-title">Education</h2>
          {cvData.education.map((item) => (
            <CVItem
              key={item.id}
              bigName={item.schoolName}
              littleName={item.qualification}
              date={`${item.startDate} - ${item.endDate}`}
              description=""
              onClick={() => toggleForm("education", item)}
            />
          ))}
        </div>
        <div className="cv-item-container">
          <h2 className="cv-title">Experience</h2>
          {cvData.experience.map((item) => (
            <CVItem
              key={item.id}
              bigName={item.companyName}
              littleName={item.jobTitle}
              date={`${item.startDate} - ${item.endDate}`}
              description={item.description}
              onClick={() => toggleForm("experience", item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
