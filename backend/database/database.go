package database

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
   
    err := godotenv.Load() 
    if err != nil {
        log.Println("Note: File .env tidak ditemukan, menggunakan environment system")
    }

    host := os.Getenv("DB_HOST")
    user := os.Getenv("DB_USER")
    password := os.Getenv("DB_PASSWORD")
    dbname := os.Getenv("DB_NAME")
    port := os.Getenv("DB_PORT")

    dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Jakarta", host, user, password, dbname, port)

    database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

    if err != nil {
        panic("Gagal koneksi ke database!")
    }

    DB = database
    log.Println("Sukses koneksi ke database!")
}