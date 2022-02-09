package me.nihar.kanban.errors;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

/*
 * @created 10-02-2022
 * @project kanban-app
 * @author Nihar
 */
public class InvalidPasswordException extends AbstractThrowableProblem {
	private static final long serialVersionUID = 1L;

	public InvalidPasswordException() {
		super(ErrorConstants.INVALID_PASSWORD_TYPE, "Incorrect password", Status.BAD_REQUEST);
	}
}
