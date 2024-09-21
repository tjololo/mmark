package storage

type MarkStorage interface {
	GetMarks() ([]MapMark, error)
	GetMark(id int) (*MapMark, error)
	AddMark(mark MapMark) (*MapMark, error)
	UpdateMark(mark MapMark) error
	DeleteMark(id int) error
}

type MapMark struct {
	Id         int                    `json:"id" firestore:"id"`
	Registered string                 `json:"registered" firestore:"registered"`
	Lat        float64                `json:"lat" firestore:"lat"`
	Lng        float64                `json:"lng" firestore:"lng"`
	Metadata   map[string]interface{} `json:"metadata" firestore:"metadata"`
}
