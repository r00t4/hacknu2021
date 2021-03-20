package lib

import "github.com/gin-gonic/gin"

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