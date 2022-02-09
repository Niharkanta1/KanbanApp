package me.nihar.kanban.errors;

/*
 * @created 10-02-2022
 * @project kanban-app
 * @author Nihar
 */
public class EmailAlreadyUsedException extends RuntimeException {

	private static final long serialVersionUID = 1093699939499088153L;

	public EmailAlreadyUsedException() {
		super("Email is already in use!");
	}
}
