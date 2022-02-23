package me.nihar.kanban.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

/*
 * @created 19-02-2022
 * @project kanban-app
 * @author Nihar
 */

@Slf4j
public final class HeaderUtils {

	private HeaderUtils() {
	}

	public static HttpHeaders createAlert(String applicationName, String message, String param) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("X-" + applicationName + "-alert", message);
		try {
			headers.add("X-" + applicationName + "-params", URLEncoder.encode(param, StandardCharsets.UTF_8.toString()));
		} catch (UnsupportedEncodingException e) {
			// StandardCharsets are supported by every Java implementation so this exception will never happen
		}
		return headers;
	}

	public static HttpHeaders createEntityCreationAlert(String applicationName, boolean enableTranslation, String entityName, String param) {
		String message = enableTranslation ? applicationName + "." + entityName + ".created"
				: "A new " + entityName + " is created with identifier " + param;
		return createAlert(applicationName, message, param);
	}

	public static HttpHeaders createEntityUpdateAlert(String applicationName, boolean enableTranslation, String entityName, String param) {
		String message = enableTranslation ? applicationName + "." + entityName + ".updated"
				: "A " + entityName + " is updated with identifier " + param;
		return createAlert(applicationName, message, param);
	}

	public static HttpHeaders createEntityDeletionAlert(String applicationName, boolean enableTranslation, String entityName, String param) {
		String message = enableTranslation ? applicationName + "." + entityName + ".deleted"
				: "A " + entityName + " is deleted with identifier " + param;
		return createAlert(applicationName, message, param);
	}

	public static HttpHeaders createFailureAlert(String applicationName, boolean enableTranslation, String entityName, String errorKey, String defaultMessage) {
		log.error("Entity processing failed, {}", defaultMessage);

		String message = enableTranslation ? "error." + errorKey : defaultMessage;

		HttpHeaders headers = new HttpHeaders();
		headers.add("X-" + applicationName + "-error", message);
		headers.add("X-" + applicationName + "-params", entityName);
		return headers;
	}
}