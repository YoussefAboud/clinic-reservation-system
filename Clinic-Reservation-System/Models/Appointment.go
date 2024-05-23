package Models

type Appointment struct {
	ID           uint    `json:"id" gorm:"primaryKey"`
	DoctorRefer  int     `json:"doctor_id"`
	Doctor       Doctor  `gorm:"foreignKey:DoctorRefer;references:ID"`
	SlotRefer    int     `json:"slot_id"`
	Slot         Slot    `gorm:"foreignKey:SlotRefer;references:ID"`
	PatientRefer int     `json:"patient_id"`
	Patient      Patient `gorm:"foreignKey:PatientRefer;references:ID"`
}