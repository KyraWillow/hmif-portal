package database

import (
	"fmt"
	"os"
	"strings"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func OpenFromEnv() (*gorm.DB, error) {
	_ = godotenv.Load()

	dsn, err := BuildDSNFromEnv()
	if err != nil {
		return nil, err
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("gagal koneksi ke database: %w", err)
	}

	return db, nil
}

func BuildDSNFromEnv() (string, error) {
	databaseURL := strings.TrimSpace(os.Getenv("DATABASE_URL"))
	if databaseURL != "" {
		return databaseURL, nil
	}

	host := strings.TrimSpace(os.Getenv("DB_HOST"))
	port := strings.TrimSpace(os.Getenv("DB_PORT"))
	user := strings.TrimSpace(os.Getenv("DB_USER"))
	password := os.Getenv("DB_PASSWORD")
	dbName := strings.TrimSpace(os.Getenv("DB_NAME"))
	sslMode := strings.TrimSpace(os.Getenv("DB_SSLMODE"))
	timeZone := strings.TrimSpace(os.Getenv("DB_TIMEZONE"))

	if sslMode == "" {
		sslMode = "disable"
	}

	if timeZone == "" {
		timeZone = "Asia/Jakarta"
	}

	missingFields := make([]string, 0, 5)
	if host == "" {
		missingFields = append(missingFields, "DB_HOST")
	}
	if port == "" {
		missingFields = append(missingFields, "DB_PORT")
	}
	if user == "" {
		missingFields = append(missingFields, "DB_USER")
	}
	if dbName == "" {
		missingFields = append(missingFields, "DB_NAME")
	}

	if len(missingFields) > 0 {
		return "", fmt.Errorf(
			"konfigurasi database tidak lengkap: set DATABASE_URL atau lengkapi %s",
			strings.Join(missingFields, ", "),
		)
	}

	return fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=%s",
		host,
		user,
		password,
		dbName,
		port,
		sslMode,
		timeZone,
	), nil
}
