package initializers

import (
	"fmt"
	"os"
	"github.com/RamezTalaat/Clinic-Reservation-System/Models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type DbInstance struct{

	Db *gorm.DB
}

 var Database DbInstance

func ConnectToDatabase() {
	var err error

	dsn := os.Getenv("DB_URL")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil{
		fmt.Println("Failed to connect to Database")
	}else {
		fmt.Println("Connected to Database successfully")
	}

	//Migration
	db.AutoMigrate(&Models.Doctor{}, &Models.Slot{}, &Models.Appointment{}, &Models.Patient{})
	db.Logger = logger.Default.LogMode(logger.Info)

	Database = DbInstance{Db : db}
}


	
