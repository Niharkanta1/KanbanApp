package me.nihar.kanban.security.jwt;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.tomcat.jni.Local;

import java.time.Instant;

/*
 * @created 09-02-2022
 * @project kanban-app
 * @author Nihar
 */

@Getter
@Setter
@NoArgsConstructor
public class JWTToken {

	private String token;
	private String expireTime;

	public JWTToken(String jwt, String expiry) {
		token = jwt;
		expireTime = expiry.toString();
	}
}
