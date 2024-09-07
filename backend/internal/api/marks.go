package api

import (
	"encoding/json"
	"net/http"
)

type MarksApi struct {
}

func NewMarksApi() *MarksApi {
	return &MarksApi{}
}

func (api *MarksApi) GetMarks(w http.ResponseWriter, r *http.Request) {
	// Get all marks
	marks := []MapMark{
		{Id: 1, Title: "First mark", Lat: 66.10671, Lng: 13.6980},
		{Id: 2, Title: "Second mark", Lat: 66.10671, Lng: 13.7080},
		{Id: 3, Title: "Third mark", Lat: 66.10671, Lng: 13.7180},
	}
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	responseBody, err := json.Marshal(marks)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	_, err = w.Write(responseBody)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

type MapMark struct {
	Id    int     `json:"id"`
	Title string  `json:"title"`
	Lat   float64 `json:"lat"`
	Lng   float64 `json:"lng"`
}
