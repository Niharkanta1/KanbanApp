package me.nihar.kanban.service;

import me.nihar.kanban.entity.Board;
import me.nihar.kanban.entity.Workspace;

import java.util.List;
import java.util.Optional;

/*
 * @created 20-02-2022
 * @project kanban-app
 * @author Nihar
 */
public interface BoardService {
	Board saveBoardForWorkspace(Board board, Workspace workspace);
	Optional<Board> partialUpdate(Board board);
	List<Board> findAllForWorkspace(Long workspaceId);
	Optional<Board> findOne(Long id);
	Optional<Board> findByIdAndWorkspace(Long id, Workspace workspace);
	void delete(Long id);
	Board save(Board board);
}
