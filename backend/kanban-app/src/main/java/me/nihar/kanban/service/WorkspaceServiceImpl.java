package me.nihar.kanban.service;

import lombok.extern.slf4j.Slf4j;
import me.nihar.kanban.entity.*;
import me.nihar.kanban.repository.WorkspaceRepository;
import me.nihar.kanban.utils.AuthUtils;
import me.nihar.kanban.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

/*
 * @created 19-02-2022
 * @project kanban-app
 * @author Nihar
 */
@Slf4j
@Service
@Transactional
public class WorkspaceServiceImpl implements WorkspaceService {

	@Autowired private WorkspaceRepository workspaceRepository;

	@Override
	public Workspace save(Workspace workspace) {
		log.info("Request to save Workspace : {}", workspace);
		var user = AuthUtils.getCurrentUser();
		workspace.setUser(new User(user.getId()));
		workspace.setDateCreated(new Date());
		workspace.setUserCreated(user.getUsername());
		return workspaceRepository.save(workspace);
	}

	@Override
	public Optional<Workspace> partialUpdate(Workspace workspace) {
		log.info("Request to partially update Workspace : {}", workspace);

		return workspaceRepository
				.findById(workspace.getId())
				.map(existingWorkspace -> {
					if (workspace.getName() != null) {
						existingWorkspace.setName(workspace.getName());
					}
					if (workspace.getDescription() != null) {
						existingWorkspace.setDescription(workspace.getDescription());
					}
					if (workspace.getShortName() != null) {
						existingWorkspace.setShortName(workspace.getShortName());
					}
					if (workspace.getWebsite() != null) {
						existingWorkspace.setWebsite(workspace.getWebsite());
					}
					if (workspace.getCategory() != null) {
						existingWorkspace.setCategory(workspace.getCategory());
					}
					if (workspace.getDateCreated() != null) {
						existingWorkspace.setDateCreated(workspace.getDateCreated());
					}
					if (workspace.getUserCreated() != null) {
						existingWorkspace.setUserCreated(workspace.getUserCreated());
					}
					if (workspace.getDateModified() != null) {
						existingWorkspace.setDateModified(workspace.getDateModified());
					}
					if (workspace.getUserModified() != null) {
						existingWorkspace.setUserModified(workspace.getUserModified());
					}
					existingWorkspace.setDateModified(new Date());
					existingWorkspace.setUserModified(AuthUtils.getCurrentUserName());
					return existingWorkspace;
				}).map(workspaceRepository::save);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Workspace> findAll() {
		log.info("Request to get all Workspaces");
		return workspaceRepository.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Optional<Workspace> findOne(Long id) {
		log.info("Request to get Workspace : {}", id);
		return workspaceRepository.findById(id);
	}

	@Override
	public List<Workspace> findAllForCurrentUser() {
		log.info("Request to get all Workspaces for user", AuthUtils.getCurrentUserName());
		return workspaceRepository.findByUserId(AuthUtils.getCurrentUserId());
	}

	@Override
	public Optional<Workspace>  findOneForCurrentUser(Long id) {
		log.info("Request to get all Workspaces for user", AuthUtils.getCurrentUserName());
		return workspaceRepository.findByIdAndUserId(id, AuthUtils.getCurrentUserId());
	}

	@Override
	public void delete(Long id) {
		log.info("Request to delete Workspace : {}", id);
		workspaceRepository.deleteById(id);
	}

	/* A default workspace will be created when a user registers */
	@Override
	public void createDefaultWorkspace(User user) {
		log.info("Creating default workspace for user::{}", user.getUserName());
		Workspace defaultWorkspace = new Workspace();
		defaultWorkspace.setUser(user);
		defaultWorkspace.setName(user.getUserName()+"'s Workspace");
		defaultWorkspace.setDescription("A default workspace generated by system");
		defaultWorkspace.setShortName("Default WS");
		defaultWorkspace.setDateCreated(new Date());
		defaultWorkspace.setUserCreated(Constants.SYSTEM);
		defaultWorkspace.setIsDefault(true);

		Board board = new Board();
		board.setDateCreated(new Date());
		board.setUserCreated(Constants.SYSTEM);
		board.setName("Default Board");
		board.setDescription("A sample board.");
		board.setWorkspace(defaultWorkspace);

		StageList list = new StageList();
		list.setName("List 1");
		list.setUserCreated(Constants.SYSTEM);
		list.setDateCreated(new Date());
		list.setBoard(board);

		Card card = new Card();
		card.setName("Card 1");
		card.setDescription("A sample card");
		card.setStageList(list);
		card.setDateCreated(new Date());
		card.setUserCreated(Constants.SYSTEM);
		list.addCard(card);
		board.addStageList(list);

		list = new StageList();
		list.setName("List 2");
		list.setUserCreated(Constants.SYSTEM);
		list.setDateCreated(new Date());
		list.setBoard(board);

		board.addStageList(list);
		defaultWorkspace.addBoard(board);
		var ws = workspaceRepository.save(defaultWorkspace);
		workspaceRepository.flush();
		log.info("Default Workspace created successfully.", ws);
	}

	@Override
	public Optional<Workspace> updateDefault(Long id) {
		workspaceRepository.findByUserId(AuthUtils.getCurrentUserId()).stream().map(workspace -> {
			if(workspace.getId().equals(id)) {
				workspace.setIsDefault(true);
			} else {
				workspace.setIsDefault(false);
			}
			return workspace;
		}).forEach(ws -> workspaceRepository.save(ws));
		workspaceRepository.flush();
		return workspaceRepository.findById(id);
	}
}
