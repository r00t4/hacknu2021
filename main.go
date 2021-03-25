package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/r00t4/hacknu2021/lib"
	"io/ioutil"
	"net/http"
	"time"
)

func main() {
	fmt.Println("Hello world")
	service := lib.Service{}
	//handlers := lib.Handlers{
	//	Service: service,
	//}
	rooms := lib.NewRooms()
	router := mux.NewRouter()

	router.HandleFunc("/api/stats", func(w http.ResponseWriter, r *http.Request) {
		bytes, err := json.Marshal(rooms.GetStats())
		if err != nil {
			http.Error(w, fmt.Sprint(err), 500)
		}
		w.Write(bytes)
	}).Methods("GET")
	router.HandleFunc("/api/rooms/{id}", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Access-Control-Allow-Headers", "*")
		w.Header().Add("Access-Control-Allow-Origin", "*")
		vars := mux.Vars(r)
		roomID := vars["id"]
		room, err := rooms.Get(roomID)
		if err == lib.ErrNotFound {
			http.NotFound(w, r)
			return
		}
		bytes, err := json.Marshal(room.Wrap(nil))
		if err != nil {
			http.Error(w, fmt.Sprint(err), 500)
		}
		w.Write(bytes)
	}).Methods("GET")

	router.HandleFunc("/rooms/{id}", func(w http.ResponseWriter, r *http.Request) {
		lib.ServeWs(rooms, w, r)
	})
	stop := make(chan bool)
	videoBody := make(chan string, 3)
	videoAns := make(chan string, 3)
	router.HandleFunc("/establish-video-sdp", func(w http.ResponseWriter, r *http.Request) {
		body, _ := ioutil.ReadAll(r.Body)
		videoBody <- string(body)
		w.WriteHeader(200)
		w.Write([]byte(<-videoAns))
	})

	audioBody := make(chan string, 3)
	audioAns := make(chan string, 3)
	router.HandleFunc("/establish-audio-sdp", func(w http.ResponseWriter, r *http.Request) {
		body, _ := ioutil.ReadAll(r.Body)
		audioBody <- string(body)
		w.WriteHeader(200)
		w.Write([]byte(<-audioAns))
	})

	go func() {
		srv := &http.Server{
			Handler:      router,
			Addr:         "192.168.0.181:50000",
			WriteTimeout: 15 * time.Second,
			ReadTimeout:  15 * time.Second,
		}

		srv.ListenAndServe()
	}()
	go service.VideoWorker(videoBody, videoAns)
	go service.AudioWorker(audioBody, audioAns)
	<-stop
}
