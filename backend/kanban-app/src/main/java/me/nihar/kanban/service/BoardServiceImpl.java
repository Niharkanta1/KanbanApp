package me.nihar.kanban.service;

import lombok.extern.slf4j.Slf4j;
import me.nihar.kanban.entity.Board;
import me.nihar.kanban.entity.Workspace;
import me.nihar.kanban.repository.BoardRepository;
import me.nihar.kanban.utils.AuthUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/*
 * @created 20-02-2022
 * @project kanban-app
 * @author Nihar
 */
@Slf4j
@Service
public class BoardServiceImpl implements BoardService {

	@Autowired private BoardRepository boardRepository;

	@Override
	public Board save(Board board) {
		log.info("Request to save Board:: {}", board);
		if(board.getId() != null) {
			board.onUpdate();
		} else {
			board.onCreate();
		}
		return boardRepository.save(board);
	}

	@Override
	public Board saveBoardForWorkspace(Board board, Workspace workspace) {
		log.info("Request to save Board:: board name::{} with Workspace:: workspace name::{}", board.getName(), workspace.getName());
		board.setWorkspace(workspace);
		board.onCreate();
		board.setUserCreated(AuthUtils.getCurrentUserName());
		return boardRepository.save(board);
	}

	@Override
	public Optional<Board> partialUpdate(Board board) {
		log.info("Request to partially update Board : {}", board);

		return boardRepository.findById(board.getId()).map(existingBoard -> {
					if (board.getName() != null) {
						existingBoard.setName(board.getName());
					}
					if (board.getDescription() != null) {
						existingBoard.setDescription(board.getDescription());
					}
					if (board.getIsFavorite() != null) {
						existingBoard.setIsFavorite(board.getIsFavorite());
					}
					if (board.getDateCreated() != null) {
						existingBoard.setDateCreated(board.getDateCreated());
					}
					if (board.getUserCreated() != null) {
						existingBoard.setUserCreated(board.getUserCreated());
					}
					if (board.getDateModified() != null) {
						existingBoard.setDateModified(board.getDateModified());
					}
					if (board.getUserModified() != null) {
						existingBoard.setUserModified(board.getUserModified());
					}

					return existingBoard;
				})
				.map(boardRepository::save);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Board> findAllForWorkspace(Long workspaceId) {
		log.info("Request to find all boards for workspace::{}", workspaceId);
		return boardRepository.findByWorkspaceId(workspaceId);
	}

	@Override
	@Transactional(readOnly = true)
	public Optional<Board> findOne(Long id) {
		log.info("Request to get Board : {}", id);
		return boardRepository.findById(id);
	}

	@Override
	@Transactional(readOnly = true)
	public Optional<Board> findByIdAndWorkspace(Long id, Workspace workspace) {
		log.info("Request to get Board : {}", id);
		return boardRepository.findByIdAndWorkspaceId(id, workspace.getId());
	}

	@Override
	public void delete(Long id) {
		log.info("Request to delete Board : {}", id);
		boardRepository.deleteById(id);
	}
}
