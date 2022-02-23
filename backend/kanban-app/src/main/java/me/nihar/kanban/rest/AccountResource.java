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
import me.nihar.kanban.errors.EmailAlreadyUsedException;
import me.nihar.kanban.errors.InvalidPasswordException;
import me.nihar.kanban.repository.UserRepository;
import me.nihar.kanban.service.UserService;
import me.nihar.kanban.service.WorkspaceService;
import me.nihar.kanban.utils.AuthUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api")
public class AccountResource {
	private final UserRepository userRepository;
	private final UserService userService;
	private final WorkspaceService workspaceService;

	public AccountResource(UserRepository userRepository, UserService userService, WorkspaceService workspaceService) {
		this.userRepository = userRepository;
		this.userService = userService;
		this.workspaceService = workspaceService;
	}

	@PostMapping("/register")
	@ResponseStatus(HttpStatus.CREATED)
	public String registerAccount(@Valid @RequestBody UserDto userDto) {
		log.info("Registering User::{}", userDto);
		if (isPasswordLengthInvalid(userDto.getPassword())) {
			throw new InvalidPasswordException();
		}
		User user = userService.registerUser(userDto);
		workspaceService.createDefaultWorkspace(user);

		return new StringBuilder("User created!")
				.append(" with username::").append(user.getUserName())
				.append(" and with userId::").append(user.getId())
				.toString();
	}

	@GetMapping("/account")
	public UserDto getAccount() {
		return userService.getUserWithAuthorities().map(UserDto::new)
				.orElseThrow(() -> new AccountResourceException("User could not be found"));
	}

	@GetMapping("/authenticate")
	public String isAuthenticated(HttpServletRequest request) {
		log.debug("REST request to check if the current user is authenticated");
		return request.getRemoteUser();
	}

	@PostMapping("/account")
	public String saveAccount(@Valid @RequestBody UserDto userDto) {
		String userLogin = AuthUtils
				.getCurrentUserLogin()
				.orElseThrow(() -> new AccountResourceException("Current user login not found"));
		Optional<User> existingUser = userRepository.findOneByEmailIgnoreCase(userDto.getEmail());
		if (existingUser.isPresent() && (!existingUser.get().getUserName().equalsIgnoreCase(userLogin))) {
			throw new EmailAlreadyUsedException();
		}
		Optional<User> user = userRepository.findOneByUserName(userLogin);
		if (!user.isPresent()) {
			throw new AccountResourceException("User could not be found");
		}
		userService.updateUser(
				userDto.getFirstName(),
				userDto.getLastName(),
				userDto.getEmail(),
				userDto.getLangKey(),
				userDto.getImageUrl()
		);
		return "Save Successful!";
	}

	private static boolean isPasswordLengthInvalid(String password) {
		return (
				StringUtils.isEmpty(password) ||
						password.length() < UserDto.PASSWORD_MIN_LENGTH ||
						password.length() > UserDto.PASSWORD_MAX_LENGTH
		);
	}
}
