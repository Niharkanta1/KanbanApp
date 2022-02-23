package me.nihar.kanban.service;

import me.nihar.kanban.dto.UserDto;
import me.nihar.kanban.entity.User;

import java.util.Optional;

/*
 * @created 20-02-2022
 * @project kanban-app
 * @author Nihar
 */
public interface UserService {
	User registerUser(UserDto userDto);
	void updateUser(String firstName, String lastName, String email, String langKey, String imageUrl);
	Optional<User> getUserWithAuthoritiesByLogin(String username);
	Optional<User> getUserWithAuthorities();
	void deleteUser(String login);

}
