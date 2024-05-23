package Models

type Slot struct {
	ID        uint   `json:"id" gorm:"primaryKey"`
	Date      string `json:"date" gorm:"column:date"`
	Hour      string `json:"hour" gorm:"column:hour"`
	Doctor_id uint   `json:"doctor_id" gorm:"column:doctor_id"`
	Occuppied bool   `json:"occuppied" gorm:"column:occuppied"`
}
