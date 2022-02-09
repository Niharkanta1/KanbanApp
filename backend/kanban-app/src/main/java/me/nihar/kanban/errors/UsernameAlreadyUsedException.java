package me.nihar.kanban.errors;

/*
 * @created 10-02-2022
 * @project kanban-app
 * @author Nihar
 */
public class UsernameAlreadyUsedException extends RuntimeException {

	private static final long serialVersionUID = 4561332410177633226L;

	public UsernameAlreadyUsedException() {
		super("Login name already used!");
	}
}
