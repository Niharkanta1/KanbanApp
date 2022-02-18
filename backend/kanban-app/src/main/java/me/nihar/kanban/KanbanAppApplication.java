package me.nihar.kanban;

import org.springdoc.core.SpringDocUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.error.BasicErrorController;

@SpringBootApplication
public class KanbanAppApplication {

	static {
		SpringDocUtils.getConfig().addHiddenRestControllers(BasicErrorController.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(KanbanAppApplication.class, args);
	}

}
