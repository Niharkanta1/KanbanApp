package me.nihar.kanban.config;

import lombok.extern.slf4j.Slf4j;
import me.nihar.kanban.security.AuthoritiesConstants;
import me.nihar.kanban.security.DomainUserDetailsService;
import me.nihar.kanban.security.jwt.JWTFilter;
import me.nihar.kanban.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.servlet.http.HttpServletResponse;

import static java.lang.String.format;

/*
 * @created 09-02-2022
 * @project kanban-app
 * @author Nihar
 */

@Slf4j
@EnableWebSecurity
@EnableGlobalMethodSecurity(
		securedEnabled = true,
		jsr250Enabled = true,
		prePostEnabled = true
)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	String contentSecurityPolicy = "default-src 'self'; frame-src 'self' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://storage.googleapis.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:";

	private final DomainUserDetailsService userService;
	private final JWTFilter jwtFilter;

	public SecurityConfiguration(DomainUserDetailsService userService, JWTFilter jwtFilter) {
		this.userService = userService;
		this.jwtFilter = jwtFilter;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}


	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(username -> userService.loadUserByUsername(username));
	}

	@Override
	public void configure(HttpSecurity http) throws Exception {
		// Enable CORS and disable CSRF
		http = http.cors().and().csrf().disable();

		// Set session management to stateless
		http = http.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and();

		// Set unauthorized requests exception handler
		http = http.exceptionHandling().authenticationEntryPoint((request, response, ex) -> {
							log.error("Unauthorized request - {}", ex.getMessage());
							response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
						}
				).and();

		// Set permissions on endpoints
		http.authorizeRequests()
				// Swagger endpoints must be publicly accessible
				.antMatchers("/").permitAll()
				.antMatchers("/v3/**").permitAll()
				.antMatchers("/rest-api-docs/**").permitAll()
				.antMatchers("/swagger-ui/**").permitAll()
				// Our public endpoints
				.antMatchers("/api/public/**").permitAll()
				// Our private endpoints
				.antMatchers("/api/authenticate").permitAll()
				.antMatchers("/api/register").permitAll()
				.antMatchers("/api/activate").permitAll()
				.antMatchers("/api/account/reset-password/init").permitAll()
				.antMatchers("/api/account/reset-password/finish").permitAll()
				.antMatchers("/api/admin/**").hasAuthority(AuthoritiesConstants.ADMIN)
				.antMatchers("/api/**").authenticated()
				.antMatchers("/management/health").permitAll()
				.antMatchers("/management/health/**").permitAll()
				.antMatchers("/management/info").permitAll()
				.antMatchers("/management/prometheus").permitAll()
				.antMatchers("/management/**").hasAuthority(AuthoritiesConstants.ADMIN)
				.anyRequest().authenticated();

		// Add JWT token filter
		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
	}

	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		//config.setAllowCredentials(true);
		config.addAllowedOrigin("*");
		config.addAllowedHeader("*");
		config.addAllowedMethod("*");
		source.registerCorsConfiguration("/**", config);
		return new CorsFilter(source);
	}

	@Override @Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
}
