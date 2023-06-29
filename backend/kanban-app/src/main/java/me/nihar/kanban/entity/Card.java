package me.nihar.kanban.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;
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
@Table(name="card")
public class Card extends BaseEntity implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "card_sequence")
	@SequenceGenerator(name = "card_sequence", initialValue = 10000)
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

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
	@Column(name = "start_date")
	private Date startDate;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
	@Column(name = "end_date")
	private Date endDate;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
	@Column(name = "reminder_date")
	private Date reminderDate;

	@Column(name = "is_archived")
	private Boolean isArchived;

	@Column(name = "is_watching")
	private Boolean isWatching;

/*

	@OneToMany(mappedBy = "card")
	@JsonIgnoreProperties(value = { "checkListItems", "card" }, allowSetters = true)
	private Set<CheckList> checkLists = new HashSet<>();

	@OneToMany(mappedBy = "card")
	@JsonIgnoreProperties(value = { "card" }, allowSetters = true)
	private Set<Attachment> attachments = new HashSet<>();

	@OneToMany(mappedBy = "card")
	@JsonIgnoreProperties(value = { "color", "card" }, allowSetters = true)
	private Set<Label> labels = new HashSet<>();
*/

	@ManyToMany
	@JoinTable(name = "rel_card_user", joinColumns = @JoinColumn(name = "card_id"), inverseJoinColumns = @JoinColumn(name = "member_id"))
	@JsonIgnoreProperties(value = { "workspaces", "user", "cards" }, allowSetters = true)
	private Set<User> assignedUsers = new HashSet<>();

	@ManyToOne
	@JsonIgnoreProperties(value = { "cards", "board" }, allowSetters = true)
	private StageList stageList;

	public void setName(String name) {
		this.name = StringUtils.capitalize(name);
	}

	@Override
	public String toString() {
		return "Card{" +
				"id=" + id +
				", name='" + name + '\'' +
				", description='" + description + '\'' +
				", category='" + category + '\'' +
				'}';
	}
}
