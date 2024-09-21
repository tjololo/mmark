package api

import (
	"encoding/json"
	"github.com/tjololo/mmark/backend/internal/storage"
	"net/http"
)

type MarksApi struct {
	marksStorage storage.MarkStorage
}

func NewMarksApi(markStorage storage.MarkStorage) *MarksApi {
	return &MarksApi{
		marksStorage: markStorage,
	}
}

func (api *MarksApi) GetMarks(w http.ResponseWriter, _ *http.Request) {
	// Get all marks
	marks, err := api.marksStorage.GetMarks()
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	responseBody, err := json.Marshal(mapToApiMarka(marks))
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

func (api *MarksApi) RegisterMark(w http.ResponseWriter, r *http.Request) {
	// Register a new mark
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	var registerMark RegisterMark
	err := json.NewDecoder(r.Body).Decode(&registerMark)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	mark, err := api.marksStorage.AddMark(storage.MapMark{
		Lat:      registerMark.Lat,
		Lng:      registerMark.Lng,
		Metadata: map[string]interface{}{"title": registerMark.Title},
	})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	responseBody, err := json.Marshal(mapToApiMark(*mark))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	_, err = w.Write(responseBody)
}

type MapMark struct {
	Id    int     `json:"id"`
	Title string  `json:"title"`
	Lat   float64 `json:"lat"`
	Lng   float64 `json:"lng"`
}

type RegisterMark struct {
	Title string  `json:"title"`
	Lat   float64 `json:"lat"`
	Lng   float64 `json:"lng"`
}

func mapToApiMarka(marks []storage.MapMark) []MapMark {
	result := make([]MapMark, 0, len(marks))
	for _, mark := range marks {
		result = append(result, mapToApiMark(mark))
	}
	return result
}

func mapToApiMark(mark storage.MapMark) MapMark {
	return MapMark{
		Id:    mark.Id,
		Title: mark.Metadata["title"].(string),
		Lat:   mark.Lat,
		Lng:   mark.Lng,
	}
}
