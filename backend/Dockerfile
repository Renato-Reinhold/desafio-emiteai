FROM gradle:8.8-jdk17 AS builder

WORKDIR /app
COPY . .

RUN chmod +x ./wait-for-it.sh

FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
