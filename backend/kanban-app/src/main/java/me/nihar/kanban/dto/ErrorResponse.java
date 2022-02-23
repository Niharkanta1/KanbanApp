package me.nihar.kanban.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import me.nihar.kanban.utils.DateTimeUtil;

import java.util.Date;

/*
 * @created 19-02-2022
 * @project kanban-app
 * @author Nihar
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {

	private String message;
	private String timeStamp;
	private String code;

	public ErrorResponse(String message) {
		this.message = message;
		this.timeStamp = DateTimeUtil.getDateString(new Date());
	}
}
