package me.nihar.kanban.repository;

import me.nihar.kanban.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/*
 * @created 19-02-2022
 * @project kanban-app
 * @author Nihar
 */
@SuppressWarnings("unused")
@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
	List<Board> findByWorkspaceId(Long workspaceId);
	Optional<Board> findByIdAndWorkspaceId(Long id, Long workspaceId);
}
