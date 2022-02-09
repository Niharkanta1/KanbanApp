package me.nihar.kanban.utils;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

/*
 * @created 09-02-2022
 * @project kanban-app
 * @author Nihar
 */
public class DateTimeUtil {
	private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
			.withZone(ZoneId.systemDefault());

	public static String getDateString(Date date)  {
		return DATE_TIME_FORMATTER.format(date.toInstant());
	}

	public static String getDateString(Instant instant)  {
		return DATE_TIME_FORMATTER.format(instant);
	}
}
