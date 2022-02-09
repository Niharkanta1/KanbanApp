package me.nihar.kanban.rest;

/*
 * @created 09-02-2022
 * @project kanban-app
 * @author Nihar
 */

import lombok.extern.slf4j.Slf4j;
import me.nihar.kanban.dto.UserDto;
import me.nihar.kanban.entity.User;
import me.nihar.kanban.errors.AccountResourceException;
import me.nihar.kanban.repository.UserRepository;
import me.nihar.kanban.errors.InvalidPasswordException;
import me.nihar.kanban.service.UserService;
import me.nihar.kanban.utils.mappers.UserMapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/api")
public class AccountResource {
	private final UserRepository userRepository;
	private final UserService userService;

	public AccountResource(UserRepository userRepository, UserService userService) {
		this.userRepository = userRepository;
		this.userService = userService;
	}

	@PostMapping("/register")
	@ResponseStatus(HttpStatus.CREATED)
	public void registerAccount(@Valid @RequestBody UserDto userDto) {
		if (isPasswordLengthInvalid(userDto.getPassword())) {
			throw new InvalidPasswordException();
		}
		User user = userService.registerUser(userDto);
	}

	@GetMapping("/account")
	public UserDto getAccount() {
		return userService.getUserWithAuthorities().map(UserDto::new)
				.orElseThrow(() -> new AccountResourceException("User could not be found"));
	}


	private static boolean isPasswordLengthInvalid(String password) {
		return (
				StringUtils.isEmpty(password) ||
						password.length() < UserDto.PASSWORD_MIN_LENGTH ||
						password.length() > UserDto.PASSWORD_MAX_LENGTH
		);
	}
}
