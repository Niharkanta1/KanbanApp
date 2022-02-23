package me.nihar.kanban.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import me.nihar.kanban.utils.AuthUtils;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.util.Date;

/*
 * @created 20-02-2022
 * @project kanban-app
 * @author Nihar
 */

@Getter
@Setter
@MappedSuperclass
public abstract class BaseEntity {

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
	@Column(name = "date_created")
	private Date dateCreated;

	@Column(name = "user_created")
	private String userCreated;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
	@Column(name = "date_modified")
	private Date dateModified;

	@Column(name = "user_modified")
	private String userModified;

	@PrePersist
	public void onCreate() {
		dateCreated = new Date();
		try {
			userCreated = AuthUtils.getCurrentUserName();
		} catch (Exception e) {
			userCreated = "system";
		}
	}

	@PreUpdate
	public void onUpdate() {
		dateModified = new Date();
		userModified = AuthUtils.getCurrentUserName();
	}

}
