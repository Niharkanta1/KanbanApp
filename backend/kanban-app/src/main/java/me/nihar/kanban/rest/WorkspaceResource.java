package me.nihar.kanban.rest;

import lombok.extern.slf4j.Slf4j;
import me.nihar.kanban.entity.Workspace;
import me.nihar.kanban.errors.BadRequestAlertException;
import me.nihar.kanban.repository.WorkspaceRepository;
import me.nihar.kanban.service.WorkspaceService;
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

import static me.nihar.kanban.utils.Constants.*;

/*
 * @created 19-02-2022
 * @project kanban-app
 * @author Nihar
 */
@Slf4j
@RestController
@RequestMapping("/api")
@SuppressWarnings("unchecked")
public class WorkspaceResource {
	private static final String ENTITY_NAME = "workspace";

	@Autowired private WorkspaceService workspaceService;
	@Autowired private WorkspaceRepository workspaceRepository;


	@PostMapping("/workspaces")
	public ResponseEntity<Workspace> createWorkspace(@Valid @RequestBody Workspace workspace) throws URISyntaxException {
		log.debug("REST request to save Workspace : {}", workspace);
		if (workspace.getId() != null) {
			throw new BadRequestAlertException("A new workspace cannot already have an ID", ENTITY_NAME, "idexists");
		}
		Workspace result = workspaceService.save(workspace);
		return ResponseEntity
				.created(new URI("/api/workspaces/" + result.getId()))
				.headers(HeaderUtils.createEntityCreationAlert(APP_NAME, false, ENTITY_NAME, result.getId().toString()))
				.body(result);

	}

	@PutMapping("/workspaces/{id}")
	public ResponseEntity<Workspace> updateWorkspace(
			@PathVariable(value = "id", required = false) final Long id,
			@Valid @RequestBody Workspace workspace) throws URISyntaxException {
		log.debug("REST request to update Workspace : {}, {}", id, workspace);
		if (workspace.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		if (!Objects.equals(id, workspace.getId())) {
			throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, IDINVALID);
		}

		if (!workspaceRepository.existsById(id)) {
			throw new BadRequestAlertException("Entity not found", ENTITY_NAME, IDNOTFOUND);
		}

		Workspace result = workspaceService.save(workspace);
		return ResponseEntity
				.ok()
				.headers(HeaderUtils.createEntityUpdateAlert(APP_NAME, false, ENTITY_NAME, workspace.getId().toString()))
				.body(result);
	}

	@PatchMapping(value = "/workspaces/{id}", consumes = { "application/json", "application/merge-patch+json" })
	public ResponseEntity<Workspace> partialUpdateWorkspace(
			@PathVariable(value = "id", required = false) final Long id,
			@NotNull @RequestBody Workspace workspace) throws Throwable {

		log.debug("REST request to partial update Workspace partially : {}, {}", id, workspace);
		if (workspace.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, IDNULL);
		}
		if (!Objects.equals(id, workspace.getId())) {
			throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, IDINVALID);
		}

		if (!workspaceRepository.existsById(id)) {
			throw new BadRequestAlertException("Entity not found", ENTITY_NAME, IDNOTFOUND);
		}

		Optional<Workspace> result = workspaceService.partialUpdate(workspace);

		return ResponseUtils.wrapOrNotFound(
				result,
				HeaderUtils.createEntityUpdateAlert(APP_NAME, false, ENTITY_NAME, workspace.getId().toString()),
				String.format("%s with Id %s is Not found!", ENTITY_NAME, id));
	}

	@GetMapping("/workspaces")
	public List<Workspace> getAllWorkspaces() {
		log.debug("REST request to get all Workspaces");
		return workspaceService.findAllForCurrentUser();
	}

	@GetMapping("/workspaces/{id}")
	public ResponseEntity<Workspace> getWorkspace(@PathVariable Long id) {
		log.debug("REST request to get Workspace : {}", id);
		Optional<Workspace> workspace = workspaceService.findOne(id);
		return ResponseUtils.wrapOrNotFound(workspace, String.format("%s with Id %s is Not found!", ENTITY_NAME, id));
	}

	@DeleteMapping("/workspaces/{id}")
	public ResponseEntity<Void> deleteWorkspace(@PathVariable Long id) {
		log.debug("REST request to delete Workspace : {}", id);
		workspaceService.delete(id);
		return ResponseEntity
				.noContent()
				.headers(HeaderUtils.createEntityDeletionAlert(APP_NAME, false, ENTITY_NAME, id.toString()))
				.build();
	}

}
