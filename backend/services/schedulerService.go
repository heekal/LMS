package services

import (
  "github.com/go-co-op/gocron"
  "time"
)

func StartScheduler() {
  s := gocron.NewScheduler(time.UTC)

  s.Every(1).Hour().Do(func() {
    AutoGradeExpiredQuizzes()
  })

  s.StartAsync()
}
