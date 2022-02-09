package me.nihar.kanban.dto;

import lombok.Data;
import me.nihar.kanban.entity.Authority;
import me.nihar.kanban.entity.User;
import me.nihar.kanban.utils.Constants;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Set;
import java.util.stream.Collectors;

/*
 * @created 09-02-2022
 * @project kanban-app
 * @author Nihar
 */

@Data
public class UserDto {
	public static final int PASSWORD_MIN_LENGTH = 4;
	public static final int PASSWORD_MAX_LENGTH = 100;

	private Long id;

	@NotBlank
	@Pattern(regexp = Constants.LOGIN_REGEX)
	@Size(min = 1, max = 50)
	private String login;

	@Size(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH)
	private String password;

	@Size(max = 50)
	private String firstName;

	@Size(max = 50)
	private String lastName;

	@Email
	@Size(min = 5, max = 254)
	private String email;

	@Size(max = 256)
	private String imageUrl;

	private boolean activated = false;

	@Size(min = 2, max = 10)
	private String langKey;

	private Set<String> authorities;

	public UserDto(User user) {
		this.id = user.getId();
		this.login = user.getUserName();
		this.firstName = user.getFirstName();
		this.lastName = user.getLastName();
		this.email = user.getEmail();
		this.activated = user.isActivated();
		this.imageUrl = user.getImageUrl();
		this.langKey = user.getLangKey();
		this.authorities = user.getAuthorities().stream().map(Authority::getName).collect(Collectors.toSet());
	}

}
