# STAGE 1: Build
FROM golang:1.22-alpine AS builder

# Install git/ca-certificates if your private modules or HTTPS calls need them
RUN apk add --no-cache git ca-certificates && update-ca-certificates

# Set the working directory
WORKDIR /src

# Leverage Docker cache: Download dependencies first
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the source code
COPY . .

# Build the binary
# -ldflags="-s -w" removes debug info (smaller binary)
# CGO_ENABLED=0 ensures the binary is statically linked
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /app/main ./cmd/api/main.go

# STAGE 2: Final Runtime
FROM scratch

# Copy SSL certs from builder (essential if your app calls external APIs)
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

# Copy the compiled binary from the builder stage
COPY --from=builder /app/main /main

# Optional: Copy static assets if your Go app serves them
# COPY --from=builder /src/public /public

# Use a non-privileged port (Coolify handles the mapping)
EXPOSE 3104

# Run the binary
ENTRYPOINT ["/main"]