package me.nihar.kanban.errors;

import org.springframework.security.core.AuthenticationException;

/*
 * @created 20-02-2022
 * @project kanban-app
 * @author Nihar
 */
public class UserNotLoggedInException extends AuthenticationException {
	public UserNotLoggedInException(String message) {
		super(message);
	}
	public UserNotLoggedInException(String message, Throwable t) {
		super(message, t);
	}
}