package models

import (
	"time"
	"backend/db"
)

type PerQuizDeadline struct {
	QuizName  string `json:"quizName"`
	QuizUuid 	string `json:"quizUuid"`
	OpenDate  string `json:"openDate"`
	CloseDate string `json:"closeDate"`
}

type PerQuizDeadlineTime struct {
	QuizName  string `json:"quizName"`
	QuizUuid 	string `json:"quizUuid"`
	OpenDate  time.Time `json:"openDate"`
	CloseDate time.Time `json:"closeDate"`
	IsActive  bool `json:"isActive"`
	Status string `json:"status"`
}

type PerQuizDeadlineStatus struct {
	QuizName  string `json:"quizName"`
	QuizUuid 	string `json:"quizUuid"`
	OpenDate  string `json:"openDate"`
	CloseDate string `json:"closeDate"`
	IsActive  bool `json:"isActive"`
	Status string `json:"status"`
}

type QuizLandingInfo struct {
	QuizName string `json:"quizName"`
	QuizDesc string `json:"quizDesc"`
	MaxScore int `json:"maxScore"`
}

type QuizScore struct {
    QuizTitle string  `json:"quizTitle"`
    Score     *int    `json:"score"`
}

type QuizScorePerSubject struct {
    CourseName string       `json:"courseName"`
    Scores     []QuizScore  `json:"scores"`
}

func GetQuizLanding (quizUuid any) ([]QuizLandingInfo, error) {
	var list []QuizLandingInfo

	err := db.DB.Raw(`
		SELECT
			quizzes.title as quiz_name,
			quizzes.description as quiz_desc,
			quizzes.max_score as max_Score
		FROM quizzes
		WHERE uuid = ?`, quizUuid).Scan(&list).Error

	if err != nil {
		return nil, err
	}

	return list, nil
}

func GetQuizScore (userId any) ([]QuizScorePerSubject, error) {
	type rawData struct {
		CourseName string
		QuizTitle  string
		Score      *int
	}

	var rows []rawData
	query := `
		SELECT 
			c.name AS course_name,
			q.title AS quiz_title,
			r.score
		FROM Enrollments e
		JOIN Courses c ON e.course_id = c.id
		JOIN Quizzes q ON q.course_id = c.id
		LEFT JOIN QuizResults r 
			ON r.quiz_id = q.id AND r.user_id = e.student_id
		WHERE e.student_id = ?
		ORDER BY c.name, q.id
	`

	if err := db.DB.Raw(query, userId).Scan(&rows).Error; err != nil {
		return nil, err
	}

	courseMap := make(map[string][]QuizScore)
	for _, row := range rows {
		courseMap[row.CourseName] = append(courseMap[row.CourseName], QuizScore{
			QuizTitle: row.QuizTitle,
			Score:     row.Score,
		})
	}

	var result []QuizScorePerSubject
	for courseName, scores := range courseMap {
		result = append(result, QuizScorePerSubject{
			CourseName: courseName,
			Scores:     scores,
		})
	}

	return result, nil
}