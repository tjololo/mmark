package storage

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"
)

type FileMapMarks struct {
	rootPath string
}

func NewFileMapMarks(rootPath string) *FileMapMarks {
	return &FileMapMarks{rootPath: rootPath}
}

// GetMarks returns all marks that are stored in separate files in rootPath
func (f *FileMapMarks) GetMarks() ([]MapMark, error) {
	var marks []MapMark
	err := filepath.Walk(f.rootPath, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if info.IsDir() {
			return nil
		}
		mark := MapMark{}
		bytes, err := os.ReadFile(path)
		if err != nil {
			return err
		}
		err = json.Unmarshal(bytes, &mark)
		if err != nil {
			return err
		}
		marks = append(marks, mark)
		return nil
	})
	if err != nil {
		return nil, err
	}
	return marks, nil
}

func (f *FileMapMarks) GetMark(id int) (*MapMark, error) {
	// check if file exists
	if _, err := os.Stat(fmt.Sprintf("%s/%d.json", f.rootPath, id)); errors.Is(err, os.ErrNotExist) {
		return nil, fmt.Errorf("not found: mark with id %d not found", id)
	}
	// read file and parse it to MapMark
	mark := MapMark{}
	bytes, err := os.ReadFile(fmt.Sprintf("%s/%d.json", f.rootPath, id))
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal(bytes, &mark)
	return &mark, err
}

func (f *FileMapMarks) AddMark(mark MapMark) (*MapMark, error) {
	if fileExists(fmt.Sprintf("%s/%d.json", f.rootPath, mark.Id)) {
		return nil, fmt.Errorf("already exists: mark with id %d already exists", mark.Id)
	}
	c := f.markCount()
	mark.Id = c + 1
	mark.Registered = time.Now().UTC().String()
	bytes, err := json.Marshal(mark)
	if err != nil {
		return nil, err
	}
	err = os.WriteFile(fmt.Sprintf("%s/%d.json", f.rootPath, mark.Id), bytes, 0644)
	return &mark, err
}

func (f *FileMapMarks) UpdateMark(mark MapMark) error {
	if !fileExists(fmt.Sprintf("%s/%d.json", f.rootPath, mark.Id)) {
		return fmt.Errorf("not found: mark with id %d not found", mark.Id)
	}
	bytes, err := json.Marshal(mark)
	if err != nil {
		return err
	}
	err = os.WriteFile(fmt.Sprintf("%s/%d.json", f.rootPath, mark.Id), bytes, 0644)
	return err
}

func (f *FileMapMarks) DeleteMark(id int) error {
	if !fileExists(fmt.Sprintf("%s/%d.json", f.rootPath, id)) {
		return fmt.Errorf("not found: mark with id %d not found", id)
	}
	err := os.Remove(fmt.Sprintf("%s/%d.json", f.rootPath, id))
	return err
}

func fileExists(path string) bool {
	_, err := os.Stat(path)
	return !errors.Is(err, os.ErrNotExist)
}

func (f *FileMapMarks) markCount() int {
	count := 0
	filepath.Walk(f.rootPath, func(path string, info os.FileInfo, err error) error {
		if !info.IsDir() {
			count++
		}
		return nil
	})
	return count
}

func IsNotExist(err error) bool {
	return strings.HasPrefix(err.Error(), "not found: ")
}
