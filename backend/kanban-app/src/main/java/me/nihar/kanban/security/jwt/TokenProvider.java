package me.nihar.kanban.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import me.nihar.kanban.security.DomainUser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

import static me.nihar.kanban.utils.DateTimeUtil.getDateString;
import static org.springframework.util.ObjectUtils.isEmpty;

/*
 * @created 09-02-2022
 * @project kanban-app
 * @author Nihar
 */
@Slf4j
@Component
public class TokenProvider {
	public static final String USER_ID = "UserId";
	public static final String EMAIL = "Email";
	private static final String AUTHORITIES_KEY = "Roles";
	public static final String FULL_NAME = "FullName";
	private static final String INVALID_JWT_TOKEN = "Invalid JWT token.";

	private String secret, base64Secret;
	private Long tokenValidityInMilliseconds;
	private Long tokenValidityInMillisecondsForRememberMe;

	private Key key;
	private JwtParser jwtParser;

	public TokenProvider(@Value("${jwt.secret}") String secret,
	                     @Value("${jwt.base64.secret}") String base64Secret,
	                     @Value("${jwt.token.validity}") Long validity,
	                     @Value("${jwt.token.validity.remember.me}") Long rememberMe) {
		byte[] keyBytes;
		this.secret = secret;
		this.base64Secret = base64Secret;
		this.tokenValidityInMilliseconds = validity;
		this.tokenValidityInMillisecondsForRememberMe = rememberMe;
		if (!isEmpty(base64Secret)) {
			log.debug("Using a Base64-encoded JWT secret key");
			keyBytes = Decoders.BASE64.decode(base64Secret);
		} else {
			log.warn("Warning: the JWT key used is not Base64-encoded. This token must be encoded using Base64 and be at least 256 bits long for Max security");
			keyBytes = secret.getBytes(StandardCharsets.UTF_8);
		}
		log.info("Key Size::{}",keyBytes.length);
		key = Keys.hmacShaKeyFor(keyBytes);
		jwtParser = Jwts.parserBuilder().setSigningKey(key).build();
	}

	public JWTToken createToken(Authentication authentication, boolean rememberMe) {
		String authorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));
		long now = (new Date()).getTime();
		Date validity;
		if (rememberMe) {
			validity = new Date(now + this.tokenValidityInMillisecondsForRememberMe);
		} else {
			validity = new Date(now + this.tokenValidityInMilliseconds);
		}
		DomainUser user = (DomainUser) authentication.getPrincipal();
		Map<String, Object> claims = new HashMap<>();
		claims.put(AUTHORITIES_KEY, authorities);
		claims.put(USER_ID, user.getId());
		claims.put(EMAIL, user.getEmail());
		claims.put(FULL_NAME, user.getFullName());

		String jwt = Jwts.builder()
				.setSubject(authentication.getName())
				.addClaims(claims)
				.signWith(key, SignatureAlgorithm.HS256)
				.setExpiration(validity)
				.compact();
		log.info("Generated Token :: {}", jwt);
		log.info("Token Validity :: {}", validity);
		return new JWTToken(jwt, getDateString(validity));
	}

	public boolean validateToken(String authToken) {
		try {
			jwtParser.parseClaimsJws(authToken);
			return true;
		} catch (ExpiredJwtException e) {
			log.trace(INVALID_JWT_TOKEN + "Token expired!", e);
		} catch (UnsupportedJwtException e) {
			log.trace(INVALID_JWT_TOKEN + "Token unsupported!", e);
		} catch (MalformedJwtException e) {
			log.trace(INVALID_JWT_TOKEN + "Token malformed.", e);
		} catch (SignatureException e) {
			log.trace(INVALID_JWT_TOKEN + "Invalid signature.", e);
		} catch (IllegalArgumentException e) {
			log.error("Token validation error {}", e.getMessage());
		}
		return false;
	}

	public Authentication getAuthentication(String token) {
		Claims claims = jwtParser.parseClaimsJws(token).getBody();

		Collection<? extends GrantedAuthority> authorities = Arrays
				.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
				.filter(auth -> !auth.trim().isEmpty())
				.map(SimpleGrantedAuthority::new)
				.collect(Collectors.toList());

		DomainUser principal = new DomainUser(claims.getSubject(), "",
				authorities, Long.valueOf( (Integer) claims.get(USER_ID)), (String) claims.get(FULL_NAME),
				(String) claims.get(EMAIL));
		return new UsernamePasswordAuthenticationToken(principal, token, authorities);
	}

}
