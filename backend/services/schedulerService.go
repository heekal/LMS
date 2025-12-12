package services

import (
  "github.com/go-co-op/gocron"
  "time"
  "log"
)

func StartScheduler() {
  s := gocron.NewScheduler(time.UTC)

  _, err := s.Every(1).Hour().Do(func() {
      AutoGradeExpiredQuizzes()
  })
  if err != nil {
      log.Printf("Failed to schedule auto-grading: %v", err)
  }

  s.StartAsync()
}
