package models

import (
	"errors"
	"fmt"
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
	IsCompleted bool `json:"isCompleted"`
}

type QuizLandingInfo struct {
	CourseUuid string `json:"courseUuid"`
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
	QuizId     int               `json:"quizId"`
	QuizName string							 `json:"quizName"`
	AllQuestion []SingleQuestion `json:"questions"`
}

type SingleQuestion struct {
	ID       int                 `json:"id"`
	Question string              `json:"question"`
	Option   []OptionsPerQuestion `json:"option"`
}

type OptionsPerQuestion struct {
	Label  string `json:"label"`
	Option string `json:"option"`
}

type rawQuestionRow struct {
	QuizID            int    `db:"quiz_id"`
	ActualQuestionID  int    `db:"actual_question_id"` // ID dari quizquestions
	Question          string `db:"question"`
	OptionID          int    `db:"option_id"`          // ID dari questionoptions
	Option            string `db:"option"`
	Label             string `db:"label"`
}

type QuizAnswer struct {
	QuestionID int    `json:"questionId"`
	Option     string `json:"option"`
}

type QuizSubmitPayload struct {
	QuizID int          `json:"quizId"`
	Answers []QuizAnswer `json:"answer"`
}

func GetQuizLanding (quizUuid any) ([]QuizLandingInfo, error) {
	var list []QuizLandingInfo

	err := db.DB.Raw(`
		SELECT
			courses.uuid as course_uuid,
			quizzes.title as quiz_name,
			quizzes.description as quiz_desc,
			quizzes.max_score as max_Score
		FROM quizzes
		JOIN courses on courses.id = quizzes.course_id
		WHERE quizzes.uuid = ?`, quizUuid).Scan(&list).Error

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

func GetQuizQuestions (quizUuid any) (*QuizData, error) {
	var quizInfo struct {
		ID    int    `gorm:"column:id"`
		Title string `gorm:"column:title"`
	}
	
	err := db.DB.Raw("SELECT id, title FROM quizzes WHERE uuid = ?", quizUuid).
		Scan(&quizInfo).Error
	
	if err != nil {
		return nil, fmt.Errorf("gagal ambil quiz: %v", err)
	}
	if quizInfo.ID == 0 {
		return nil, errors.New("quiz tidak ditemukan")
	}

	var rows []rawQuestionRow
	err = db.DB.Raw(`
		SELECT 
			quizquestions.quiz_id AS quiz_id,
			quizzes.title AS quiz_name,
			quizquestions.id AS actual_question_id,
			quizquestions.question_text AS question,
			questionoptions.id AS option_id,
			questionoptions.option_text AS option,
			questionoptions.option_label AS label
		FROM questionoptions
		JOIN quizquestions ON questionoptions.question_id = quizquestions.id
		JOIN quizzes ON quizzes.id = quizquestions.quiz_id
		WHERE quizzes.uuid = ?
		ORDER BY quizquestions.question_order`, quizUuid).Scan(&rows).Error

	if err != nil {
		return nil, fmt.Errorf("gagal ambil data quiz: %v", err)
	}

	questionMap := make(map[int]*SingleQuestion)
	for _, r := range rows {
		q, exists := questionMap[r.ActualQuestionID]
		if !exists {
			q = &SingleQuestion{
				ID:       r.ActualQuestionID,
				Question: r.Question,
				Option:   []OptionsPerQuestion{},
			}
			questionMap[r.ActualQuestionID] = q
		}
		q.Option = append(q.Option, OptionsPerQuestion{
			Label:  r.Label,
			Option: r.Option,
		})
	}

	var allQuestions []SingleQuestion
	for _, q := range questionMap {
		allQuestions = append(allQuestions, *q)
	}

	result := &QuizData{
		QuizId:      quizInfo.ID,
		QuizName:    quizInfo.Title,
		AllQuestion: allQuestions,
	}
	return result, nil
}

func CheckQuizId (userId any, quizId any) (bool, error) {
	var isValid bool

	err := db.DB.Raw(`
		SELECT EXISTS (
			SELECT 1
			FROM quizzes
			JOIN enrollments ON enrollments.course_id = quizzes.course_id
			WHERE enrollments.student_id = ?
			AND quizzes.id = ?
			AND quizzes.opened_at <= NOW()
			AND quizzes.deadline >= NOW()
		)`, userId, quizId).Scan(&isValid).Error

	if err != nil {
		return false, fmt.Errorf("gagal ambil data quiz: %v", err)
	}

	return isValid, err
}

func HandleQuizGrading(userId any, quizId any, answers []QuizAnswer) error {
	// Ambil max_score
	var maxScore int
	err := db.DB.Raw(`
		SELECT max_score
		FROM quizzes
		WHERE id = ?
	`, quizId).Scan(&maxScore).Error
	if err != nil {
			return err
	}

	// Ambil kunci jawaban
	type CorrectAnswer struct {
		QuestionId    int
		CorrectOption string
	}
	var correctList []CorrectAnswer

	err = db.DB.Raw(`
		SELECT qq.id AS question_id, qo.option_label AS correct_option
		FROM quizquestions qq
		JOIN questionoptions qo ON qo.question_id = qq.id
		WHERE qq.quiz_id = ? AND qo.is_correct = TRUE
	`, quizId).Scan(&correctList).Error
	if err != nil {
		return err
	}

	correctMap := make(map[int]string)
	for _, item := range correctList {
		correctMap[item.QuestionId] = item.CorrectOption
	}

	// Hitung jumlah benar
	correct := 0
	for _, ans := range answers {
		if correctMap[ans.QuestionID] == ans.Option {
			correct++
		}
	}

	total := len(correctMap)

	// Hitung skor final berdasarkan max_score
	finalScore := int(float64(correct) / float64(total) * float64(maxScore))

	// Simpan hasil (double submit ditangani oleh UNIQUE constraint)
	err = db.DB.Exec(`
		INSERT INTO quizresults (user_id, quiz_id, score, is_submitted)
		VALUES (?, ?, ?, true)
	`, userId, quizId, finalScore).Error

	if err != nil {
		return fmt.Errorf("Database Error")
	}

	return nil
}
