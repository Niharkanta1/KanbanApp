package me.nihar.kanban.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/*
 * @created 20-02-2022
 * @project kanban-app
 * @author Nihar
 */
@Getter
@Setter
@Entity
@Table(name = "stage_list")
public class StageList extends BaseEntity implements Serializable {

	private static final long serialVersionUID = -2472075089893144516L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stage_sequence")
	@SequenceGenerator(name = "stage_sequence", initialValue = 1000)
	@Column(name = "id", nullable = false)
	private Long id;

	@NotNull
	@Size(min = 1, max = 50)
	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "description")
	private String description;

	@Column(name = "is_watching")
	private Boolean isWatching;

	@OneToMany(mappedBy = "stageList", cascade = {CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.MERGE}, orphanRemoval = true)
	@JsonIgnoreProperties(value = { "checkLists", "attachments", "labels", "members", "stageList" }, allowSetters = true)
	private Set<Card> cards = new HashSet<>();

	@ManyToOne
	@JsonIgnoreProperties(value = { "stageLists", "workspace" }, allowSetters = true)
	private Board board;

	public StageList(Long id) {
		this.id = id;
	}

	public StageList() { }

	public void addCard(Card card) {
		cards.add(card);
	}

	public void setName(String name) {
		this.name = StringUtils.capitalize(name);
	}

	@Override
	public String toString() {
		return "StageList{" +
				"id=" + id +
				", name='" + name + '\'' +
				", description='" + description + '\'' +
				'}';
	}
}
