package me.nihar.kanban.service;

import me.nihar.kanban.entity.User;
import me.nihar.kanban.entity.Workspace;

import java.util.List;
import java.util.Optional;

/*
 * @created 19-02-2022
 * @project kanban-app
 * @author Nihar
 */

public interface WorkspaceService {
	Workspace save(Workspace workspace);
	Optional<Workspace> partialUpdate(Workspace workspace);
	List<Workspace> findAll();
	List<Workspace> findAllForCurrentUser();
	Optional<Workspace> findOne(Long id);
	Optional<Workspace> findOneForCurrentUser(Long id);
	void delete(Long id);
	void createDefaultWorkspace(User user);

	Optional<Workspace> updateDefault(Long id);
}
