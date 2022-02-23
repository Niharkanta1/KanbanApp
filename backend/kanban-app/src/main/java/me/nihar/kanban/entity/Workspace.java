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
@Entity
@Getter
@Setter
@Table(name = "workspace")
public class Workspace extends BaseEntity implements Serializable {

	private static final long serialVersionUID = -8382886138539179696L;
	@NotNull
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "workspace_sequence")
	@SequenceGenerator(name = "workspace_sequence")
	@Column(name = "id", nullable = false)
	private Long id;

	@NotNull
	@Size(min = 1, max = 50)
	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "description")
	private String description;

	@Column(name = "category")
	private String category;

	@Column(name = "short_name")
	private String shortName;

	@Column(name = "website")
	private String website;

	@OneToMany(mappedBy = "workspace", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnoreProperties(value = { "stageLists", "workspace" }, allowSetters = true)
	private Set<Board> boards = new HashSet<>();

	@ManyToOne
	@JsonIgnoreProperties(value = { "workspaces", "password", "cards" }, allowSetters = true)
	private User user;

	public void addBoard(Board board) {
		boards.add(board);
	}

	public Workspace() {}
	public Workspace(Long id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = StringUtils.capitalize(name);
	}

	@Override
	public String toString() {
		return "Workspace{" +
				"id=" + id +
				", name='" + name + '\'' +
				", description='" + description + '\'' +
				", category='" + category + '\'' +
				", shortName='" + shortName + '\'' +
				", website='" + website + '\'' +
				", user=" + user +
				'}';
	}
}
