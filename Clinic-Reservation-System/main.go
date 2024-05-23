package main

import (
	"os"

	controllers "github.com/RamezTalaat/Clinic-Reservation-System/Controllers"
	initializers "github.com/RamezTalaat/Clinic-Reservation-System/Initializers"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func init(){
	initializers.LoadEnvVariables()
	initializers.ConnectToDatabase()
}
func Routers (app *fiber.App){
	app.Get("/API", welcome)
	app.Post("/doctorSignUp",controllers.CreateDoctor)
	app.Post("/doctorSignIn",controllers.SignInDoctor)
	app.Post("/patientSignUp",controllers.CreatePatient)
	app.Post("/patientSignIn",controllers.SignInPatient)
	app.Post("/addSlot/:uuid",controllers.AddSlot)
	app.Post("/addAppointment/:uuid/:doctor_id/:slot_id",controllers.AddAppointment)
	app.Post("/updateAppointment/:uuid/:appointment_id/:doctor_id/:slot_id",controllers.UpdateAppointment)
	app.Get("/getDoctors/:uuid",controllers.GetDoctors)
	app.Get("/getDoctor/:uuid",controllers.GetDoctor)
	app.Get("/getPatients/:uuid",controllers.GetPatients)
	app.Get("/getPatient/:uuid",controllers.GetPatientByUID)
	app.Get("/getDoctorSlots/:uuid/:doctor_id",controllers.GetDoctorSlots)
	app.Get("/activeDB",controllers.GetActiveDB)   // to test the ative DB entries
	app.Delete("/cancelappointment/:uuid/:appointment_id", controllers.CancelAppointment)
}

func welcome(c *fiber.Ctx) error {
	return c.SendString("welcome to our API")
}
func main(){
	app := fiber.New()
	app.Use(cors.New(cors.Config{
        AllowHeaders:     "Origin,Content-Type,Accept,Content-Length,Accept-Language,Accept-Encoding,Connection,Access-Control-Allow-Origin",
        AllowOrigins:     "*",
        AllowCredentials: true,
        AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
    }))
	Routers(app)
    app.Listen(":" + os.Getenv("PORT"))
}