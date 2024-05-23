
const BASE_URL = process.env.REACT_APP_FRONTEND_BASE_URL;
const API_ENDPOINTS = {
    // patient
    PATIENT_SIGN_IN: `${BASE_URL}/patientSignIn`,
    PATIENT_SIGN_UP: `${BASE_URL}/patientSignUp`,
    GET_PATIENT: `${BASE_URL}/getPatient`,
    GET_DOCTORS: `${BASE_URL}/getDoctors`,
    GET_DOCTOR_SLOTS: `${BASE_URL}/getDoctorSlots`,
    UPDATE_APPOINTMENT: `${BASE_URL}/updateAppointment`,
    ADD_APPOINTMENT: `${BASE_URL}/addAppointment`,
    CANCEL_APPOINTMENT: `${BASE_URL}/cancelAppointment`,

    // doctor
    DOCTOR_SIGN_IN: `${BASE_URL}/doctorSignIn`,
    DOCTOR_SIGN_UP: `${BASE_URL}/doctorSignUp`,
    GET_DOCTOR: `${BASE_URL}/getDoctor`,
    ADD_SLOT: `${BASE_URL}/addSlot`,
};

export default API_ENDPOINTS;
