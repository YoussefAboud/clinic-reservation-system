package Models

type Doctor struct {
	ID       uint   `json:"id" gorm:"primaryKey"`
	Name     string `json:"name" gorm:"column:name"`
	Mail     string `json:"email" gorm:"column:mail"`
	Password string `json:"password" gorm:"column:password"`
	Slots    []Slot `json:"slots" gorm:"foreignKey:Doctor_id"`
}
