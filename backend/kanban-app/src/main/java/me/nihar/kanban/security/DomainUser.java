package me.nihar.kanban.security;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

/*
 * @created 20-02-2022
 * @project kanban-app
 * @author Nihar
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DomainUser implements UserDetails {

	private Long id;
	private String firstName;
	private String lastName;
	private String fullName;
	private String email;
	private String username;
	private String password;
	private Boolean enabled;
	private Boolean accountNonExpired = true;
	private Boolean accountNonLocked  = true;
	private Boolean credentialsNonExpired = true;
	private Collection<? extends GrantedAuthority> authorities;

	public DomainUser(String userName, String password, List<GrantedAuthority> grantedAuthorities,
	                  Long id, String firstName, String lastName, String email, Boolean enabled) {
		this.username = userName;
		this.password = password;
		this.authorities = grantedAuthorities;
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.fullName = firstName + ' ' + lastName;
		this.email = email;
		this.enabled = enabled;
	}

	public DomainUser(String username, String password, Collection<? extends GrantedAuthority> authorities,
	                  Long id, String fullName, String email) {
		this.username = username;
		this.password = password;
		this.authorities = authorities;
		this.id = id;
		this.fullName = fullName;
		this.email = email;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.authorities;
	}

	@Override
	public String getPassword() {
		return this.password;
	}

	@Override
	public String getUsername() {
		return this.username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return this.accountNonExpired;
	}

	@Override
	public boolean isAccountNonLocked() {
		return this.accountNonLocked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return this.credentialsNonExpired;
	}

	@Override
	public boolean isEnabled() {
		return this.enabled;
	}

	@Override
	public String toString() {
		return "DomainUser{" +
				"id=" + id +
				", firstName='" + firstName + '\'' +
				", lastName='" + lastName + '\'' +
				", fullName='" + fullName + '\'' +
				", email='" + email + '\'' +
				", username='" + username + '\'' +
				", enabled=" + enabled +
				", authorities=" + authorities +
				'}';
	}
}
