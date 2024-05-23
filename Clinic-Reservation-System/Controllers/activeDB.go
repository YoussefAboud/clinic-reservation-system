package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type activeDB struct {
	ActivePatients    map[string]uint
	ActiveDoctors     map[string]uint
}


func (db *activeDB) createUID() string {
	_uuid := uuid.New()
	uid := _uuid.String()
	return uid
}

func (db *activeDB) AddDoctor(id uint) string {
	uid := db.createUID()
	db.ActiveDoctors[uid] = id
	return uid
}

func (db *activeDB) GetDoctor(uuid string) uint {
	
	return  db.ActiveDoctors[uuid]
}

func (db *activeDB) AddPatient(id uint) string {
	uid := db.createUID()
	db.ActivePatients[uid] = id
	return uid
}

func (db *activeDB) GetPatient(uuid string) uint {
	
	return  db.ActivePatients[uuid]
}


var singleInstance *activeDB

func getActiveDBInstance() *activeDB {
    if singleInstance == nil {
		singleInstance = &activeDB{
			ActivePatients : make(map[string]uint) ,
			ActiveDoctors:make(map[string]uint),
		} 
    } 

    return singleInstance
}

func GetActiveDB(c *fiber.Ctx) error{

	return c.Status(200).JSON(getActiveDBInstance())
}