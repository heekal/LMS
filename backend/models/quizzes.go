package models

import (
	"errors"
	"fmt"
	"strconv"
	"time"

	"backend/db"
)

type PerQuizDeadline struct {
	QuizName  string `json:"quizName"`
	QuizUuid  string `json:"quizUuid"`
	OpenDate  string `json:"openDate"`
	CloseDate string `json:"closeDate"`
}

type PerQuizDeadlineTime struct {
	QuizName  string    `json:"quizName"`
	QuizUuid  string    `json:"quizUuid"`
	OpenDate   time.Time `json:"openDate"`
	CloseDate  time.Time `json:"closeDate"`
	IsActive   bool      `json:"isActive"`
	Status     string    `json:"status"`
}

type PerQuizDeadlineStatus struct {
	QuizName  string `json:"quizName"`
	QuizUuid  string `json:"quizUuid"`
	OpenDate  string `json:"openDate"`
	CloseDate string `json:"closeDate"`
	IsActive  bool   `json:"isActive"`
	Status    string `json:"status"`
}

type QuizLandingInfo struct {
	QuizName string `json:"quizName"`
	QuizDesc string `json:"quizDesc"`
	MaxScore int    `json:"maxScore"`
}

type QuizScore struct {
	QuizTitle string `json:"quizTitle"`
	Score     *int   `json:"score"`
}

type QuizScorePerSubject struct {
	CourseName string      `json:"courseName"`
	Scores     []QuizScore `json:"scores"`
}

type QuizData struct {
	ID       string            `json:"id"`
	Question string            `json:"question"`
	Option   map[string]string `json:"option"`
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

func GetQuizQuestions(quizUuid any) ([]QuizData, error) {
	// 1️⃣ Ambil quiz_id dari quizzes.uuid
	var quizID int
	if err := db.DB.Raw("SELECT id FROM quizzes WHERE uuid = ?", quizUuid).Scan(&quizID).Error; err != nil {
		return nil, fmt.Errorf("gagal ambil quiz_id: %v", err)
	}
	if quizID == 0 {
		return nil, errors.New("quiz tidak ditemukan")
	}

	// 2️⃣ Ambil semua pertanyaan
	type Question struct {
		ID           int
		QuestionText string
	}
	var questions []Question
	if err := db.DB.Raw(`
		SELECT id, question_text
		FROM quizquestions
		WHERE quiz_id = ?
		ORDER BY question_order ASC
	`, quizID).Scan(&questions).Error; err != nil {
		return nil, fmt.Errorf("gagal ambil pertanyaan: %v", err)
	}

	if len(questions) == 0 {
		return []QuizData{}, nil
	}

	// 3️⃣ Ambil semua opsi berdasarkan daftar question_id
	var questionIDs []int
	for _, q := range questions {
		questionIDs = append(questionIDs, q.ID)
	}

	fmt.Println("Question IDs:", questionIDs)

	type Option struct {
		QuestionID  int
		OptionLabel string
		OptionText  string
	}
	var options []Option
	if err := db.DB.Raw(`
		SELECT question_id, option_label, option_text
		FROM questionoptions
		WHERE question_id IN ?
	`, questionIDs).Scan(&options).Error; err != nil {
		return nil, fmt.Errorf("gagal ambil opsi: %v", err)
	}

	// 4️⃣ Kelompokkan opsi berdasarkan question_id
	optionMap := make(map[int]map[string]string)
	for _, opt := range options {
		if optionMap[opt.QuestionID] == nil {
			optionMap[opt.QuestionID] = make(map[string]string)
		}
		optionMap[opt.QuestionID][opt.OptionLabel] = opt.OptionText
	}

	// 5️⃣ Susun hasil akhir
	var result []QuizData
	for _, q := range questions {
		opts := optionMap[q.ID]
		if opts == nil {
			opts = map[string]string{}
		}
		result = append(result, QuizData{
			ID:       strconv.Itoa(q.ID),
			Question: q.QuestionText,
			Option:   opts,
		})
	}

	return result, nil
}