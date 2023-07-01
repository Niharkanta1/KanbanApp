package me.nihar.kanban.rest;

import lombok.extern.slf4j.Slf4j;
import me.nihar.kanban.entity.Board;
import me.nihar.kanban.entity.Workspace;
import me.nihar.kanban.errors.BadRequestAlertException;
import me.nihar.kanban.repository.BoardRepository;
import me.nihar.kanban.repository.WorkspaceRepository;
import me.nihar.kanban.service.BoardService;
import me.nihar.kanban.utils.HeaderUtils;
import me.nihar.kanban.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static me.nihar.kanban.utils.Constants.APP_NAME;
import static me.nihar.kanban.utils.Constants.IDNOTFOUND;

/*
 * @created 25-02-2022
 * @project kanban-app
 * @author Nihar
 */
@Slf4j
@RestController
@RequestMapping("/api")
public class BoardResource {
	private static final String ENTITY_NAME = "board";

	@Autowired
	private BoardService boardService;
	@Autowired
	private BoardRepository boardRepository;
	@Autowired
	private WorkspaceRepository workspaceRepository;

	@PostMapping("/boards")
	public ResponseEntity<Board> createBoard(@Valid @RequestBody Board board, @NotNull @RequestParam Long workspaceId) throws URISyntaxException {
		log.debug("REST request to save Board : {}", board);
		if (board.getId() != null) {
			throw new BadRequestAlertException("A new board cannot already have an ID", ENTITY_NAME, "idexists");
		}
		if (!workspaceRepository.existsById(workspaceId)) {
			throw new BadRequestAlertException("Entity not found with ID" + workspaceId, "Workspace", "idnotfound");
		}
		Board result = boardService.saveBoardForWorkspace(board, new Workspace(workspaceId));
		return ResponseEntity
				.created(new URI("/api/boards/" + result.getId()))
				.headers(HeaderUtils.createEntityCreationAlert(APP_NAME, false, ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	@PutMapping("/boards/{id}")
	public ResponseEntity<Board> updateBoard(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Board board)
			throws URISyntaxException {
		log.debug("REST request to update Board : {}, {}", id, board);
		if (board.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		if (!Objects.equals(id, board.getId())) {
			throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
		}

		if (!boardRepository.existsById(id)) {
			throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
		}

		Board result = boardService.save(board);
		return ResponseEntity
				.ok()
				.headers(HeaderUtils.createEntityUpdateAlert(APP_NAME, false, ENTITY_NAME, board.getId().toString()))
				.body(result);
	}

	@PutMapping(value = "/boards/{id}/toggle-favorite")
	public ResponseEntity<Board> toggleFavorite(@PathVariable(value = "id") final Long id) throws Throwable  {
		log.debug("REST request to toggle favorite Board : {}", id);
		if (!boardRepository.existsById(id)) {
			throw new BadRequestAlertException("Entity not found", ENTITY_NAME, IDNOTFOUND);
		}
		Optional<Board> result = boardService.toggleFavorite(id);
		return ResponseUtils.wrapOrNotFound(
				result,
				HeaderUtils.createEntityUpdateAlert(APP_NAME, false, ENTITY_NAME, id.toString()),
				String.format("%s with Id %s is Not found!", ENTITY_NAME, id));
	}

	@PutMapping(value = "/boards/{id}/close")
	public ResponseEntity<Board> closeBoard(@PathVariable(value = "id") final Long id) throws Throwable  {
		log.debug("REST request to close Board : {}", id);
		if (!boardRepository.existsById(id)) {
			throw new BadRequestAlertException("Entity not found", ENTITY_NAME, IDNOTFOUND);
		}
		Optional<Board> result = boardService.closeBoard(id);
		return ResponseUtils.wrapOrNotFound(
				result,
				HeaderUtils.createEntityUpdateAlert(APP_NAME, false, ENTITY_NAME, id.toString()),
				String.format("%s with Id %s is Not found!", ENTITY_NAME, id));
	}

	@PatchMapping(value = "/boards/{id}", consumes = { "application/json", "application/merge-patch+json" })
	public ResponseEntity<Board> partialUpdateBoard(
			@PathVariable(value = "id", required = false) final Long id,
			@NotNull @RequestBody Board board
	) throws URISyntaxException {
		log.debug("REST request to partial update Board partially : {}, {}", id, board);
		if (board.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		if (!Objects.equals(id, board.getId())) {
			throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
		}

		if (!boardRepository.existsById(id)) {
			throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
		}

		Optional<Board> result = boardService.partialUpdate(board);

		return ResponseUtils.wrapOrNotFound(
				result,
				HeaderUtils.createEntityUpdateAlert(APP_NAME, false, ENTITY_NAME, board.getId().toString()),
				String.format("%s with Id %s is Not found!", ENTITY_NAME, id));
	}

	@GetMapping("/boards")
	public List<Board> getAllBoards(@RequestParam @NotNull Long workspaceId) {
		log.debug("REST request to get all Boards");
		return boardService.findAllForWorkspace(workspaceId);
	}

	@GetMapping("/boards/{id}")
	public ResponseEntity<Board> getBoard(@PathVariable Long id) {
		log.debug("REST request to get Board : {}", id);
		Optional<Board> board = boardService.findOne(id);
		return ResponseUtils.wrapOrNotFound(board, String.format("%s with Id %s is Not found!", ENTITY_NAME, id));
	}

	@DeleteMapping("/boards/{id}")
	public ResponseEntity<Void> deleteBoard(@PathVariable Long id) {
		log.debug("REST request to delete Board : {}", id);
		boardService.delete(id);
		return ResponseEntity
				.noContent()
				.headers(HeaderUtils.createEntityDeletionAlert(APP_NAME, false, ENTITY_NAME, id.toString()))
				.build();
	}
}
