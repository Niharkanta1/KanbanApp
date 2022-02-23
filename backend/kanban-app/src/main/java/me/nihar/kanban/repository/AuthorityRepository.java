package me.nihar.kanban.repository;

import me.nihar.kanban.entity.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/*
 * @created 10-02-2022
 * @project kanban-app
 * @author Nihar
 */
@Repository
public interface AuthorityRepository  extends JpaRepository<Authority, String> {
}
