package me.nihar.kanban.service;

import me.nihar.kanban.entity.Board;
import me.nihar.kanban.entity.StageList;

import java.util.List;
import java.util.Optional;

/*
 * @created 20-02-2022
 * @project kanban-app
 * @author Nihar
 */
public interface StageListService {
	StageList saveListForBoard(StageList stageList, Board board);
	Optional<StageList> partialUpdate(StageList stageList);
	List<StageList> findAllForBoard(Board board);
	Optional<StageList> findOne(Long id);
	void delete(Long id);
}
