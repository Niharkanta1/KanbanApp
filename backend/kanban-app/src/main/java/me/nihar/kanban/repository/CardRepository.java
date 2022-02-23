package me.nihar.kanban.repository;

import me.nihar.kanban.entity.Card;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/*
 * @created 19-02-2022
 * @project kanban-app
 * @author Nihar
 */
@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
    @Query(
        value = "select distinct card from Card card left join fetch card.assignedUsers",
        countQuery = "select count(distinct card) from Card card"
    )
    Page<Card> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct card from Card card left join fetch card.assignedUsers")
    List<Card> findAllWithEagerRelationships();

    @Query("select card from Card card left join fetch card.assignedUsers where card.id =:id")
    Optional<Card> findOneWithEagerRelationships(@Param("id") Long id);

	Page<Card> findByStageListId(Pageable pageable, Long id);
}
