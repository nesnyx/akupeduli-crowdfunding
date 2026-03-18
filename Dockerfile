# STAGE 1: Build
# Gunakan versi 1.24 sesuai kebutuhan go.mod kamu
FROM golang:1.24-alpine AS builder

# install build-base jika ada dependency CGO, tapi karena kita pakai CGO_ENABLED=0, 
# kita cukup butuh ca-certificates & git
RUN apk add --no-cache git ca-certificates tzdata && update-ca-certificates

WORKDIR /src

# 1. Cache dependencies (Layer ini tidak akan jalan ulang kalau go.mod/sum tidak berubah)
COPY go.mod go.sum ./
RUN go mod download

# 2. Copy source code
COPY . .

# 3. Build
# Kita tambahkan -trimpath untuk menghilangkan path lokal di binary (lebih aman/clean)
RUN CGO_ENABLED=0 GOOS=linux go build \
    -ldflags="-s -w" \
    -trimpath \
    -o /app/main ./cmd/api/main.go

# STAGE 2: Final Runtime
FROM scratch

# Copy zona waktu agar time.Now() di Go tidak ngaco (UTC/WIB)
COPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo
# Copy SSL certs untuk HTTPS calls
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
# Copy user info agar kita bisa jalan sebagai non-root (opsional tapi best practice)
COPY --from=builder /etc/passwd /etc/passwd

# Copy binary
COPY --from=builder /app/main /main

# Gunakan port yang kamu mau
EXPOSE 3104

# Jalankan aplikasi
ENTRYPOINT ["/main"]