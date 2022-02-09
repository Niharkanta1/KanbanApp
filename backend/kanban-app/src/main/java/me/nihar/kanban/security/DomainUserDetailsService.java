package me.nihar.kanban.security;

import lombok.extern.slf4j.Slf4j;
import me.nihar.kanban.entity.User;
import me.nihar.kanban.repository.UserRepository;
import org.hibernate.validator.internal.constraintvalidators.hv.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

/*
 * @created 09-02-2022
 * @project kanban-app
 * @author Nihar
 */

@Slf4j
@Component
public class DomainUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
		log.debug("Authenticating {}", login);

		if (new EmailValidator().isValid(login, null)) {
			return userRepository
					.findOneWithAuthoritiesByEmailIgnoreCase(login)
					.map(user -> createSpringSecurityUser(login, user))
					.orElseThrow(() -> new UsernameNotFoundException("User with email " + login + " was not found in the database"));
		}

		String lowerCaseUsername = login.toLowerCase(Locale.ENGLISH);

		return userRepository
				.findOneWithAuthoritiesByUserName(lowerCaseUsername)
				.map(user -> createSpringSecurityUser(lowerCaseUsername, user))
				.orElseThrow(() -> new UsernameNotFoundException("User " + lowerCaseUsername + " was not found in the database"));
	}

	private org.springframework.security.core.userdetails.User createSpringSecurityUser(String lowercaseLogin, User user) {
		if (!user.isActivated()) {
			throw new UserNotActivatedException("User " + lowercaseLogin + " was not activated");
		}
		List<GrantedAuthority> grantedAuthorities = user
				.getAuthorities()
				.stream()
				.map(authority -> new SimpleGrantedAuthority(authority.getName()))
				.collect(Collectors.toList());
		return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), grantedAuthorities);
	}
}
