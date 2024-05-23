FROM golang:latest

WORKDIR /go/src/app

COPY go.mod .
COPY go.sum .
COPY . .

RUN go get -d -v github.com/gofiber/fiber/v2@latest
RUN go get -d -v gorm.io/gorm@latest
RUN go get -d -v gorm.io/driver/postgres@latest
RUN go build -o main .

ENV PORT 4000
ENV DB_HOST localhost
ENV DB_USER postgres
ENV DB_PASSWORD 2362
ENV DB_NAME clinicreservationsystem
ENV DB_PORT 5432

EXPOSE $PORT

CMD ["./main"] 
