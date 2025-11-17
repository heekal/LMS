package services

import (
  "backend/db"
  "time"
)

type MissingResult struct {
  StudentID int
  QuizID    int
  Deadline  time.Time
}

func AutoGradeExpiredQuizzes() {
  var rows []MissingResult

  err := db.DB.Raw(`
    SELECT 
      e.student_id AS student_id,
      q.id AS quiz_id,
      q.deadline AS deadline
    FROM enrollments e
    JOIN quizzes q ON q.course_id = e.course_id
    LEFT JOIN quizresults s 
      ON s.quiz_id = q.id 
      AND s.user_id = e.student_id
    WHERE q.deadline < NOW()
      AND s.id IS NULL
  `).Scan(&rows).Error

  if err != nil {
    return
  }

  for _, r := range rows {
    db.DB.Exec(`
      INSERT INTO quizresults (quiz_id, user_id, score, submitted_at)
      VALUES (?, ?, 0, ?)
    `, r.QuizID, r.StudentID, r.Deadline)
  }
}