package com.capstone.defecttracking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class DefectTrackingApplication {

  public static void main(String[] args) {
    SpringApplication.run(DefectTrackingApplication.class, args);
  }
}
