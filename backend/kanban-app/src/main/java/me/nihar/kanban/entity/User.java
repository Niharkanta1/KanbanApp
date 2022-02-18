package me.nihar.kanban.entity;

/*
 * @created 09-02-2022
 * @project kanban-app
 * @author Nihar
 */

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import me.nihar.kanban.utils.Constants;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.Instant;
import java.util.Date;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "kb_user")
public class User implements Serializable {

	private static final long serialVersionUID = 8282960297009620822L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
	@SequenceGenerator(name = "sequenceGenerator")
	@Column(name = "id")
	private Long id;

	@NotNull
	@Size(min = 1, max = 50)
	@Pattern(regexp = Constants.LOGIN_REGEX)
	@Column(name = "user_name", nullable = false, unique = true)
	private String userName;

	@NotNull
	@Column(name = "password_hash", nullable = false)
	private String password;

	@NotNull
	@Column(name = "first_name", nullable = false)
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	@NotNull
	@Size(min = 5, max = 254)
	@Column(name = "email", nullable = false, unique = true)
	private String email;

	@Column(name = "phone_number")
	private String phoneNumber;

	@NotNull
	@Column(name = "join_date", nullable = false)
	private Instant joinDate;

	@Column(name = "title")
	private String title;

	@NotNull
	@Column(name="active", nullable = false)
	private boolean activated = false;

	@Size(min = 2, max = 10)
	@Column(name = "lang_key", length = 10)
	private String langKey;

	@Size(max = 256)
	@Column(name = "image_url", length = 256)
	private String imageUrl;

	@Size(max = 20)
	@Column(name = "activation_key", length = 20)
	@JsonIgnore
	private String activationKey;

	@Size(max = 20)
	@Column(name = "reset_key", length = 20)
	@JsonIgnore
	private String resetKey;

	@Column(name = "reset_date")
	private Instant resetDate = null;

	@Column(name = "date_created")
	private Instant dateCreated = new Date().toInstant();

	@Column(name = "user_created")
	private String userCreated;

	@Column(name = "date_modified")
	private Instant dateModified;

	@Column(name = "user_modified")
	private String userModified;

	@JsonIgnore
	@ManyToMany
	@JoinTable(
			name = "kb_user_authority",
			joinColumns = { @JoinColumn(name = "user_id", referencedColumnName = "id") },
			inverseJoinColumns = { @JoinColumn(name = "authority_name", referencedColumnName = "name") }
	)
	@BatchSize(size = 20)
	private Set<Authority> authorities = new HashSet<>();

	public void setUserName(String login) {
		this.userName = StringUtils.lowerCase(login, Locale.ENGLISH);
	}
}
