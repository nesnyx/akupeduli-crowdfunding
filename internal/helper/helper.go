package helper

import "github.com/go-playground/validator/v10"

type Response struct {
	Meta  Meta        `json:"meta"`
	Data  interface{} `json:"data"`
	Token string      `json:"token,omitempty"`
}

type Meta struct {
	Message string `json:"message"`
	Code    int    `json:"code"`
	Status  string `json:"status"`
}

func APIResponse(message string, code int, status string, data interface{}, token ...string) Response {
	meta := Meta{
		Message: message,
		Code:    code,
		Status:  status,
	}

	var tok string
	if len(token) > 0 {
		tok = token[0] // ambil token pertama jika ada
	}
	// jika tidak ada token, tok tetap "" → tidak muncul di JSON karena ,omitempty

	return Response{
		Meta:  meta,
		Data:  data,
		Token: tok,
	}
}

func FormatValidationError(err error) []string {
	var errors []string

	for _, e := range err.(validator.ValidationErrors) {
		errors = append(errors, e.Error())
	}

	return errors

}
