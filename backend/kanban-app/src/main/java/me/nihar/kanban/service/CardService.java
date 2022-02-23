package me.nihar.kanban.service;

import me.nihar.kanban.entity.Card;
import me.nihar.kanban.entity.StageList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/*
 * @created 20-02-2022
 * @project kanban-app
 * @author Nihar
 */
public interface CardService {
	Card saveCardForList(Card card, StageList list);
	Optional<Card> partialUpdate(Card card);
	Page<Card> findAllForStageList(Pageable pageable, StageList list);
	Optional<Card> findOne(Long id);
	void delete(Long id);
}
