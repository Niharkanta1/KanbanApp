package me.nihar.kanban.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/*
 * @created 09-02-2022
 * @project kanban-app
 * @author Nihar
 */
@Getter
@Setter
public class LoginDto {
	@NotNull
	@Size(min = 1, max = 50)
	private String login;

	@NotNull
	@Size(min = 4, max = 100)
	private String password;

	private boolean rememberMe;

	@Override
	public String toString() {
		return "LoginDto{" +
				"login='" + login + '\'' +
				", rememberMe=" + rememberMe +
				'}';
	}
}
