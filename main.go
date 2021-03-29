package main

import (
	"fmt"
	"github.com/gorilla/mux"
	"github.com/r00t4/hacknu2021/lib"
	"io/ioutil"
	"net/http"
	"time"
)

func main() {
	fmt.Println("starting...")
	ip := lib.GetOutboundIP()
	fmt.Println("running on:", ip.String())
	service := lib.Service{}
	router := mux.NewRouter()
	stop := make(chan bool)
	audioBody := make(chan string, 3)
	audioAns := make(chan string, 3)

	//router.Handle("/public/", http.StripPrefix("/public/", http.FileServer(http.Dir("./public"))))
	router.PathPrefix("/public/").Handler(http.StripPrefix("/public/", http.FileServer(http.Dir("./public/"))))
	router.HandleFunc("/establish-audio-sdp", func(w http.ResponseWriter, r *http.Request) {
		body, _ := ioutil.ReadAll(r.Body)
		audioBody <- string(body)
		select {
		case resp := <-audioAns:
			w.WriteHeader(200)
			w.Write([]byte(resp))
		case <-time.After(time.Second * 10):
			w.WriteHeader(500)
			w.Write([]byte("timeout"))
		}
	})

	go func() {
		srv := &http.Server{
			Handler:      router,
			Addr:         ip.String()+":8000",
			WriteTimeout: 15 * time.Second,
			ReadTimeout:  15 * time.Second,
		}

		srv.ListenAndServe()
	}()
	//go service.VideoWorker(videoBody, videoAns)
	go service.AudioWorker(audioBody, audioAns)
	<-stop
}
