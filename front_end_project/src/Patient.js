import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import './Patient.css';
import API_ENDPOINTS from './apiConfig';

const Patient = () => {
  const [doctors, setDoctors] = useState([]);
  const [doctorSlots, setDoctorSlots] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [patientAppointments, setPatientAppointments] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [userName ,setUserName ]= useState("");
  const { uuid } = useParams();
  const history = useHistory();

  // Fetch patient data
  useEffect(() => {
    axios
      .get(API_ENDPOINTS.GET_PATIENT + `/${uuid}`)
      .then((response) => {
        const patientData = response.data;
        setUserName(patientData.name);
        setPatientAppointments(patientData.appointments || []);
      })
      .catch((error) => {
        console.error("Error fetching patient appointments:", error);
      });
  }, [uuid]);

  // Fetch doctors
  useEffect(() => {
    axios
      .get(API_ENDPOINTS.GET_DOCTORS + `/${uuid}`)
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, [uuid]);

  // Fetch doctor slots
  useEffect(() => {
    if (selectedDoctor) {
      axios
        .get(`${API_ENDPOINTS.GET_DOCTOR_SLOTS}/${uuid}/${selectedDoctor}`)
        .then((response) => {
          const doctorData = response.data;
          const doctorSlots = doctorData.slots || [];
          setDoctorSlots(doctorSlots);
        })
        .catch((error) => {
          console.error("Error fetching doctor slots:", error);
        });
    }
  }, [selectedDoctor]);

  const renderDoctorOptions = () => {
    return doctors.map((doctor) => (
      <option key={doctor.id} value={doctor.id}>
        {doctor.name}
      </option>
    ));
  };

  const renderSlotOptions = () => {
    return doctorSlots.map((slot) => (
      <option key={slot.id} value={slot.id}>
        {slot.date} - {slot.hour}
      </option>
    ));
  };

  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);
  };

  const handleSlotChange = (e) => {
    setSelectedSlot(e.target.value);
  };

  const handleLogout = () => {
    history.push("/signin");
  };

  // Make or update appointment
  const handleAppointmentSubmit = () => {
    if (selectedDoctor && selectedSlot) {
      if (editMode) {
        if (uuid && selectedAppointment) {
          axios
            .post(
              `${API_ENDPOINTS.UPDATE_APPOINTMENT}/${uuid}/${selectedAppointment}/${selectedDoctor}/${selectedSlot}`
            )
            .then((response) => {
              console.log("Appointment updated successfully:", response.data);
              refreshPatientAppointments();
            })
            .catch((error) => {
              console.error("Error updating appointment:", error);
            });
        } else {
          console.error("Missing information for updating appointment.");
        }
      } else {
        axios
          .post(
            `${API_ENDPOINTS.ADD_APPOINTMENT}/${uuid}/${selectedDoctor}/${selectedSlot}`
          )
          .then((response) => {
            console.log("Appointment made successfully:", response.data);
            refreshPatientAppointments();
          })
          .catch((error) => {
            console.error("Error making appointment:", error);
          });
      }
    } else {
      console.error(
        "Please select both a doctor and a slot before making an appointment."
      );
    }
  };

  const handleDeleteAppointment = () => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      if (uuid && selectedAppointment) {
        axios
          .delete(
            `${API_ENDPOINTS.CANCEL_APPOINTMENT}/${uuid}/${selectedAppointment}`
          )
          .then((response) => {
            console.log("Appointment deleted successfully:", response.data);
            refreshPatientAppointments();
          })
          .catch((error) => {
            console.error("Error deleting appointment:", error);
          });
      } else {
        console.error("Missing information for deleting appointment.");
      }
    }
  };

  const handleEditClick = (appointmentId) => {
    setSelectedAppointment(appointmentId);
    setEditMode(true);
    const appointment = patientAppointments.find(
      (app) => app.id === appointmentId
    );
    if (appointment) {
      setSelectedDoctor(appointment.doctor_id);
      setSelectedSlot(appointment.slot_id);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setSelectedAppointment("");
    setSelectedDoctor("");
    setSelectedSlot("");
  };

  const refreshPatientAppointments = () => {
    axios
      .get(API_ENDPOINTS.GET_PATIENT + `/${uuid}`)
      .then((response) => {
        const patientData = response.data;
        setPatientAppointments(patientData.appointments || []);
        setEditMode(false);
        setSelectedAppointment("");
        setSelectedDoctor("");
        setSelectedSlot("");
      })
      .catch((error) => {
        console.error("Error fetching patient appointments:", error);
      });
  };




  return (
    <div className="PatientContainer">
      <h2>welcome, {userName}  </h2>
      <h2>Choose a Doctor</h2>
      <div className="SelectDropdown">
        <select value={selectedDoctor} onChange={handleDoctorChange}>
        <option value="" disabled>
          Select a doctor
        </option>
        {renderDoctorOptions()}
        </select>
      </div>

      {selectedDoctor && (
        <>
          <h2>Choose a Slot</h2>
          <div className="SelectDropdown">
            <select value={selectedSlot} onChange={handleSlotChange}>
            <option value="" disabled>
              Select a slot
            </option>
            {renderSlotOptions()}
            </select>
          </div>
        </>
      )}

      {(selectedSlot || editMode) && (
        <div className="ActionsButtons">
          <button onClick={handleAppointmentSubmit}>
            {editMode ? "Update Appointment" : "Make Appointment"}
          </button>
          {editMode && (
            <>
              <button onClick={handleDeleteAppointment} className="delete-button">
                Delete Appointment
              </button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </>
          )}
        </div>
      )}

      <h2>My Appointments</h2>
      <table className="PatientAppointmentsTable">
      <thead>
          <tr>
            <th>Doctor</th>
            <th>Date</th>
            <th>Hour</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patientAppointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.Doctor.name}</td>
              <td>{appointment.Slot.date}</td>
              <td>{appointment.Slot.hour}</td>
              <td>
                <button onClick={() => handleEditClick(appointment.id)}>
                  Edit
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );

};

export default Patient;
