package lib

import (
	"github.com/gin-gonic/gin"
	"net/http"

	//"github.com/pion/webrtc"
	"github.com/pion/webrtc/v3"
	"io/ioutil"
	"time"
)
const rtcpPLIInterval = time.Second * 3

var sdpResp = map[string]string{}

type Handlers struct {
	Service Service
}

func (h *Handlers) Welcome(ctx *gin.Context) {
	resp, err := h.Service.Welcome()
	if err != nil {
		ctx.JSON(400, ErrorResponse{
			ErrorMessage: err.Error(),
		})
		return
	}
	ctx.JSON(200, resp)
	return
}

func (h *Handlers) EstablishVideoSDP(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)
	offer := webrtc.SessionDescription{}
	Decode(string(body), &offer)

	//json.Marshal(WelcomeResponse{Message: })


}