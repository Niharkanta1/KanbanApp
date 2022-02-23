package me.nihar.kanban.utils;

import me.nihar.kanban.errors.UserNotLoggedInException;
import me.nihar.kanban.security.AuthoritiesConstants;
import me.nihar.kanban.security.DomainUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;
import java.util.stream.Stream;

/*
 * @created 10-02-2022
 * @project kanban-app
 * @author Nihar
 */
public class AuthUtils {

	public static final String AUTHENTICATION_IS_NOT_FOUND = "Authentication is not found!";

	public static SecurityContext getSecurityContext() {
		return SecurityContextHolder.getContext();
	}

	public static Optional<String> getCurrentUserLogin() {
		return Optional.ofNullable(extractPrincipal(getSecurityContext().getAuthentication()));
	}

	public static DomainUser getCurrentUser() {
		return extractDomainUser(getSecurityContext().getAuthentication());
	}

	private static DomainUser extractDomainUser(Authentication authentication) {
		if (authentication == null) {
			throw new UserNotLoggedInException(AUTHENTICATION_IS_NOT_FOUND);
		} else if (authentication.getPrincipal() instanceof DomainUser) {
			return (DomainUser) authentication.getPrincipal();
		}
		throw new UserNotLoggedInException(AUTHENTICATION_IS_NOT_FOUND);
	}

	public static Long getCurrentUserId() {
		return getCurrentUser().getId();
	}

	public static String getCurrentUserFullName() {
		return getCurrentUser().getFullName();
	}

	public static String getCurrentUserName() {
		return getCurrentUser().getUsername();
	}

	private static String extractPrincipal(Authentication authentication) {
		if (authentication == null) {
			return null;
		} else if (authentication.getPrincipal() instanceof DomainUser) {
			DomainUser springSecurityUser = (DomainUser) authentication.getPrincipal();
			return springSecurityUser.getUsername();
		} else if (authentication.getPrincipal() instanceof String) {
			return (String) authentication.getPrincipal();
		}
		return null;
	}

	public static Optional<String> getCurrentUserJWT() {
		SecurityContext securityContext = SecurityContextHolder.getContext();
		return Optional
				.ofNullable(securityContext.getAuthentication())
				.filter(authentication -> authentication.getCredentials() instanceof String)
				.map(authentication -> (String) authentication.getCredentials());
	}

	public static boolean isAuthenticated() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return authentication != null && getAuthorities(authentication).noneMatch(AuthoritiesConstants.ANONYMOUS::equals);
	}

	private static Stream<String> getAuthorities(Authentication authentication) {
		return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority);
	}

}
