package me.nihar.kanban.repository;

import me.nihar.kanban.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/*
 * @created 09-02-2022
 * @project kanban-app
 * @author Nihar
 */

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findOneWithAuthoritiesByUserName(String username);

	Optional<User> findOneWithAuthoritiesByEmailIgnoreCase(String email);

	Optional<User> findOneByEmailIgnoreCase(String email);

	Optional<User> findOneByUserName(String login);
}
