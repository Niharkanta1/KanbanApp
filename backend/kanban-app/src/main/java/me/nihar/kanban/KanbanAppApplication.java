package me.nihar.kanban;

import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class KanbanAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(KanbanAppApplication.class, args);
	}

	@Bean
	public JavaTimeModule dateTimeModule(){
		return new JavaTimeModule();
	}
}
