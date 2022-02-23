package me.nihar.kanban.utils;

import me.nihar.kanban.dto.ErrorResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

/*
 * @created 19-02-2022
 * @project kanban-app
 * @author Nihar
 */
@SuppressWarnings("unchecked")
public final class ResponseUtils {

	public static ResponseEntity wrapOrNotFound(Optional maybeResponse, String message) {
		return wrapOrNotFound(maybeResponse, null, message);
	}

	public static  ResponseEntity wrapOrNotFound(Optional maybeResponse, HttpHeaders header, String message) {
		return (ResponseEntity) maybeResponse.map(response -> ResponseEntity.ok().headers(header).body(response))
				.orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(message)));
	}
}
