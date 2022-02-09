package me.nihar.kanban.service;

/*
 * @created 09-02-2022
 * @project kanban-app
 * @author Nihar
 */

import lombok.extern.slf4j.Slf4j;
import me.nihar.kanban.dto.UserDto;
import me.nihar.kanban.entity.Authority;
import me.nihar.kanban.entity.User;
import me.nihar.kanban.errors.EmailAlreadyUsedException;
import me.nihar.kanban.errors.UsernameAlreadyUsedException;
import me.nihar.kanban.repository.AuthorityRepository;
import me.nihar.kanban.repository.UserRepository;
import me.nihar.kanban.security.AuthoritiesConstants;
import me.nihar.kanban.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Slf4j
@Service
@Transactional
public class UserService {

	@Autowired private UserRepository userRepository;
	@Autowired private PasswordEncoder passwordEncoder;
	@Autowired private AuthorityRepository authorityRepository;

	public User registerUser(UserDto userDto) {
		userRepository.findOneByUserName(userDto.getLogin().toLowerCase()).ifPresent(existingUser -> {
			if (!removeNonActivatedUser(existingUser)) {
				throw new UsernameAlreadyUsedException();
			}
		});
		userRepository.findOneByEmailIgnoreCase(userDto.getEmail()).ifPresent(existingUser-> {
			boolean removed = removeNonActivatedUser(existingUser);
			if (!removed) {
				throw new EmailAlreadyUsedException();
			}
		});

		User newUser = new User();
		String encryptedPassword = passwordEncoder.encode(userDto.getPassword());
		newUser.setUserName(userDto.getLogin().toLowerCase());
		newUser.setPassword(encryptedPassword);
		newUser.setFirstName(userDto.getFirstName());
		newUser.setLastName(userDto.getLastName());
		if (userDto.getEmail() != null) {
			newUser.setEmail(userDto.getEmail().toLowerCase());
		}
		newUser.setImageUrl(userDto.getImageUrl());
		newUser.setLangKey(userDto.getLangKey());
		newUser.setActivated(true);
		newUser.setJoinDate(Instant.now());
		Set<Authority> authorities = new HashSet<>();
		authorityRepository.findById(AuthoritiesConstants.USER).ifPresent(authorities::add);
		newUser.setAuthorities(authorities);
		userRepository.save(newUser);
		log.debug("Created Information for User: {}", newUser);
		return newUser;
	}

	@Transactional(readOnly = true)
	public Optional<User> getUserWithAuthoritiesByLogin(String username) {
		return userRepository.findOneWithAuthoritiesByUserName(username);
	}

	@Transactional(readOnly = true)
	public Optional<User> getUserWithAuthorities() {
		return SecurityUtils.getCurrentUserLogin().flatMap(userRepository::findOneWithAuthoritiesByUserName);
	}

	private boolean removeNonActivatedUser(User existingUser) {
		if (existingUser.isActivated()) {
			return false;
		}
		userRepository.delete(existingUser);
		userRepository.flush();
		return true;
	}

}
