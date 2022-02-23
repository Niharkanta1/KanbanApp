package me.nihar.kanban.service;

import lombok.extern.slf4j.Slf4j;
import me.nihar.kanban.entity.Board;
import me.nihar.kanban.entity.StageList;
import me.nihar.kanban.repository.StageListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/*
 * @created 20-02-2022
 * @project kanban-app
 * @author Nihar
 */
@Slf4j
@Service
public class StageListServiceImpl implements StageListService {

	@Autowired private StageListRepository stageListRepository;

	@Override
	public StageList saveListForBoard(StageList stageList, Board board) {
		log.info("Request to save StageList ::{}, for board::{}", stageList, board.getName());
		stageList.setBoard(new Board(board.getId()));
		return stageListRepository.save(stageList);
	}

	@Override
	public Optional<StageList> partialUpdate(StageList stageList) {
		log.info("Request to partially update StageList : {}", stageList);

		return stageListRepository
				.findById(stageList.getId())
				.map(existingStageList -> {
					if (stageList.getName() != null) {
						existingStageList.setName(stageList.getName());
					}
					if (stageList.getDescription() != null) {
						existingStageList.setDescription(stageList.getDescription());
					}
					if (stageList.getDateCreated() != null) {
						existingStageList.setDateCreated(stageList.getDateCreated());
					}
					if (stageList.getUserCreated() != null) {
						existingStageList.setUserCreated(stageList.getUserCreated());
					}
					if (stageList.getDateModified() != null) {
						existingStageList.setDateModified(stageList.getDateModified());
					}
					if (stageList.getUserModified() != null) {
						existingStageList.setUserModified(stageList.getUserModified());
					}
					if (stageList.getIsWatching() != null) {
						existingStageList.setIsWatching(stageList.getIsWatching());
					}

					return existingStageList;
				})
				.map(stageListRepository::save);
	}

	@Override
	public List<StageList> findAllForBoard(Board board) {
		log.info("Request to get all StageLists");
		return stageListRepository.findByBoardId(board.getId());
	}

	@Override
	public Optional<StageList> findOne(Long id) {
		log.info("Request to get StageList : {}", id);
		return stageListRepository.findById(id);
	}

	@Override
	public void delete(Long id) {
		log.info("Request to delete StageList : {}", id);
		stageListRepository.deleteById(id);
	}
}
