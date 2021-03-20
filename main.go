package main

import (
	"encoding/json"
	"fmt"
	"github.com/r00t4/hacknu2021/lib"
	"io/ioutil"
	"net/http"
)

func main() {
	fmt.Println("Hello world")
	service := lib.Service{}
	//handlers := lib.Handlers{
	//	Service: service,
	//}
	b := make(chan string, 3)
	ans := make(chan string, 3)
	http.HandleFunc("/establish-video-sdp", func(w http.ResponseWriter, r *http.Request) {
		body, _ := ioutil.ReadAll(r.Body)
		b <- string(body)
		jsonData, _ := json.Marshal(&lib.WelcomeResponse{Message: <-ans})
		w.WriteHeader(200)
		w.Write(jsonData)
	})

	go func() {
		http.ListenAndServe("localhost:50000", nil)
	}()
	service.Worker(b, ans)
}
