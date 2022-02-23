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
 * @created 19-02-2022
 * @project kanban-app
 * @author Nihar
 */
@Getter
@Setter
@Entity
@Table(name = "board")
public class Board extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 4012106187518249905L;
	@NotNull
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "board_sequence")
	@SequenceGenerator(name = "board_sequence")
	@Column(name = "id", nullable = false)
	private Long id;

	@NotNull
	@Size(min = 1, max = 50)
	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "description")
	private String description;

	@Column(name = "is_favorite")
	private Boolean isFavorite;

	@OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnoreProperties(value = { "cards", "board" }, allowSetters = true)
	private Set<StageList> stageLists = new HashSet<>();

	@ManyToOne
	@JsonIgnoreProperties(value = { "boards", "user" }, allowSetters = true)
	private Workspace workspace;

	public Board(Long id) {
		this.id = id;
	}

	public Board() { }

	public void addStageList(StageList list) {
		stageLists.add(list);
	}

	public void setName(String name) {
		this.name = StringUtils.capitalize(name);
	}

	@Override
	public String toString() {
		return "Board{" +
				"id=" + id +
				", name='" + name + '\'' +
				", description='" + description + '\'' +
				'}';
	}
}
