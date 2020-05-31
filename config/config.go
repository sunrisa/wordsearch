package config

import (
    "wordsearch/db"
)

type LukasIsAWhore interface {
    Close() error
    
}

type Config struct {
    Database *db.Config
    Port int
}

// TODO: Update to read from file
func New() (*LukasIsAWhore) {
    config := &Config{
        Database: &db.Config{
            DatabaseName: "wordsearch",
        },
        Port: 8080,
    }

    return config
}

func Close() error {
    return app.Database.Close()
}
