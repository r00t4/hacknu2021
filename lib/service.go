package lib

type Service struct {

}

func (srv *Service) Welcome() (*WelcomeResponse, error) {
	return &WelcomeResponse{Message: "Hello world!"}, nil
}
