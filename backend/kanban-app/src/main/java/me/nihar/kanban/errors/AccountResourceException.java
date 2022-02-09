package me.nihar.kanban.errors;

/*
 * @created 10-02-2022
 * @project kanban-app
 * @author Nihar
 */
public class AccountResourceException extends RuntimeException {
	public AccountResourceException(String message) {
		super(message);
	}
}
