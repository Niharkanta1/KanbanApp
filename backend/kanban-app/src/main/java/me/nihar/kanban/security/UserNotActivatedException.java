package me.nihar.kanban.security;

import org.springframework.security.core.AuthenticationException;

/*
 * @created 09-02-2022
 * @project kanban-app
 * @author Nihar
 */
public class UserNotActivatedException extends AuthenticationException {

	private static final long serialVersionUID = -1972393760912171545L;

	public UserNotActivatedException(String message) {
		super(message);
	}
	public UserNotActivatedException(String message, Throwable t) {
		super(message, t);
	}
}
