package me.nihar.kanban.repository;

/*
 * @created 19-02-2022
 * @project kanban-app
 * @author Nihar
 */

import me.nihar.kanban.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@SuppressWarnings("unused")
@Repository
public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {
	List<Workspace> findByUserId(Long currentUserId);
	Optional<Workspace> findByIdAndUserId(Long id, Long currentUserId);
}
