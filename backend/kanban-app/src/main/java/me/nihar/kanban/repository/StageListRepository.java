package me.nihar.kanban.repository;

import me.nihar.kanban.entity.StageList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/*
 * @created 20-02-2022
 * @project kanban-app
 * @author Nihar
 */

@SuppressWarnings("unused")
@Repository
public interface StageListRepository extends JpaRepository<StageList, Long> {
	List<StageList> findByBoardId(Long id);
}
