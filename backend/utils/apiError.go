package utils

type ApiError struct {
	StatusCode int
	Message string
}

func (e *ApiError) Error() string {
	return e.Message
}

func NewApiError (statusCode int, err error) *ApiError {
	return &ApiError {
		StatusCode: statusCode,
		Message: err.Error(),
	}
}