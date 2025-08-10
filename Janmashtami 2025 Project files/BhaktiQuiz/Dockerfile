FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /app

COPY . .

RUN mvn clean package

FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY --from=builder app/target/BhaktiQuiz-1.jar /app

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "BhaktiQuiz-1.jar"]