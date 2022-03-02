package me.nihar.kanban.entity;

/*
 * @created 09-02-2022
 * @project kanban-app
 * @author Nihar
 */

import com.fasterxml.jackson.annotation.JsonFormat;
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
import java.util.*;
import java.util.stream.Collectors;

import static org.apache.commons.lang3.StringUtils.capitalize;

@Getter
@Setter
@Entity
@Table(name = "kb_user")
public class User implements Serializable {

	private static final long serialVersionUID = 8282960297009620822L;
	public static final String SPACE = " ";

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
	@SequenceGenerator(name = "user_sequence")
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
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
	private Date joinDate;

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
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
	private Date resetDate = null;

	@JsonIgnore
	@ManyToMany
	@JoinTable(
			name = "kb_user_authority",
			joinColumns = { @JoinColumn(name = "user_id", referencedColumnName = "id") },
			inverseJoinColumns = { @JoinColumn(name = "authority_name", referencedColumnName = "name") }
	)
	@BatchSize(size = 20)
	private Set<Authority> authorities = new HashSet<>();

	public User(Long id) {
		this.id = id;
	}

	public User() {}

	public void setUserName(String login) {
		this.userName = StringUtils.lowerCase(login, Locale.ENGLISH);
	}

	public void setFirstName(String firstName) {
		if(StringUtils.isNotBlank(firstName) && firstName.contains("")) {
			var names = Arrays.stream(firstName.split(SPACE)).map(value->capitalize(value)).collect(Collectors.toList());
			this.firstName = StringUtils.join(names, SPACE);
		} else {
			this.firstName = capitalize(firstName);
		}
		System.out.println(this.firstName);
	}

	public void setLastName(String lastName) {
		this.lastName = capitalize(lastName);
	}

	public void setTitle(String title) {
		this.title = capitalize(title);
	}

	@Override
	public String toString() {
		return "User{" +
				"id=" + id +
				", userName='" + userName + '\'' +
				", firstName='" + firstName + '\'' +
				", lastName='" + lastName + '\'' +
				", email='" + email + '\'' +
				", phoneNumber='" + phoneNumber + '\'' +
				", joinDate=" + joinDate +
				", authorities=" + authorities +
				'}';
	}
}
