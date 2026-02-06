# --- Stage 1: Build the JAR ---
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copy the pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build the application (skipping tests speeds up deployment)
RUN mvn clean package -DskipTests

# --- Stage 2: Run the JAR ---
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy the JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port Render uses
EXPOSE 8080

# Command to run the app
ENTRYPOINT ["java", "-jar", "app.jar"]