package me.nihar.kanban.security.jwt;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
