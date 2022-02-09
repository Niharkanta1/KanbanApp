package me.nihar.kanban.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

/*
 * @created 09-02-2022
 * @project kanban-app
 * @author Nihar
 */

@Data
@Entity
@Table(name = "kb_authority")
public class Authority implements Serializable {
	private static final long serialVersionUID = 253841353059724278L;

	@NotNull
	@Size(max = 50)
	@Id
	@Column(length = 50)
	private String name;
}