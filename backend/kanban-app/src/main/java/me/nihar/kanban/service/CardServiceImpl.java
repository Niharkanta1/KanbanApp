package me.nihar.kanban.service;

import lombok.extern.slf4j.Slf4j;
import me.nihar.kanban.entity.Card;
import me.nihar.kanban.entity.StageList;
import me.nihar.kanban.repository.CardRepository;
import me.nihar.kanban.utils.AuthUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/*
 * @created 20-02-2022
 * @project kanban-app
 * @author Nihar
 */
@Slf4j
@Service
public class CardServiceImpl implements CardService {

	@Autowired private CardRepository cardRepository;

	@Override
	public Card saveCardForList(Card card, StageList list) {
		log.info("Request to save Card for the stageList::{}", list.getName());
		card.setStageList(new StageList(list.getId()));
		card.setUserCreated(AuthUtils.getCurrentUserName());
		return cardRepository.save(card);
	}

	@Override
	public Optional<Card> partialUpdate(Card card) {
		log.info("Request to partially update Card : {}", card);

		return cardRepository
				.findById(card.getId())
				.map(existingCard -> {
					if (card.getName() != null) {
						existingCard.setName(card.getName());
					}
					if (card.getDescription() != null) {
						existingCard.setDescription(card.getDescription());
					}
					if (card.getCategory() != null) {
						existingCard.setCategory(card.getCategory());
					}
					if (card.getStartDate() != null) {
						existingCard.setStartDate(card.getStartDate());
					}
					if (card.getEndDate() != null) {
						existingCard.setEndDate(card.getEndDate());
					}
					if (card.getReminderDate() != null) {
						existingCard.setReminderDate(card.getReminderDate());
					}
					if (card.getIsArchived() != null) {
						existingCard.setIsArchived(card.getIsArchived());
					}
					if (card.getIsWatching() != null) {
						existingCard.setIsWatching(card.getIsWatching());
					}

					return existingCard;
				})
				.map(cardRepository::save);
	}

	@Override
	public Page<Card> findAllForStageList(Pageable pageable, StageList list) {
		log.info("Request to get all Cards");
		return cardRepository.findByStageListId(pageable, list.getId());
	}

	@Override
	public Optional<Card> findOne(Long id) {
		log.info("Request to get Card : {}", id);
		return cardRepository.findOneWithEagerRelationships(id);
	}

	@Override
	public void delete(Long id) {
		log.info("Request to delete Card : {}", id);
		cardRepository.deleteById(id);
	}
}
