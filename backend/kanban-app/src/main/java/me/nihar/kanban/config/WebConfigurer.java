package me.nihar.kanban.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.server.WebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.ServletContextInitializer;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.util.CollectionUtils;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.util.Arrays;

import static java.net.URLDecoder.decode;

/*
 * @created 09-02-2022
 * @project kanban-app
 * @author Nihar
 */
@Slf4j
@Configuration
public class WebConfigurer implements ServletContextInitializer, WebServerFactoryCustomizer<WebServerFactory> {

	private final Environment env;

	public WebConfigurer(Environment env) {
		this.env = env;
	}

	@Override
	public void customize(WebServerFactory server) {
		setLocationForStaticAssets(server);
	}

	private void setLocationForStaticAssets(WebServerFactory server) {
		if (server instanceof ConfigurableServletWebServerFactory) {
			ConfigurableServletWebServerFactory servletWebServer = (ConfigurableServletWebServerFactory) server;
			File root;
			String prefixPath = resolvePathPrefix();
			root = new File(prefixPath + "build/resources/main/static/");
			if (root.exists() && root.isDirectory()) {
				servletWebServer.setDocumentRoot(root);
			}
		}
	}

	private String resolvePathPrefix() {
		String fullExecutablePath = decode(this.getClass().getResource("").getPath(), StandardCharsets.UTF_8);
		String rootPath = Paths.get(".").toUri().normalize().getPath();
		String extractedPath = fullExecutablePath.replace(rootPath, "");
		int extractionEndIndex = extractedPath.indexOf("build/");
		if (extractionEndIndex <= 0) {
			return "";
		}
		return extractedPath.substring(0, extractionEndIndex);
	}

	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {

	}

	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = getCorsConfiguration();;
		log.debug("Registering CORS filter");
		source.registerCorsConfiguration("/api/**", config);
		source.registerCorsConfiguration("/management/**", config);
		source.registerCorsConfiguration("/v3/api-docs", config);
		source.registerCorsConfiguration("/swagger-ui/**", config);
		return new CorsFilter(source);
	}

	private CorsConfiguration getCorsConfiguration() {
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOrigins(Arrays.asList("http://localhost:8100", "https://localhost:8100","http://localhost:9000","https://localhost:9000","http://localhost:4200","https://localhost:4200"));
		config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
		config.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
		config.setExposedHeaders(Arrays.asList("x-auth-token"));
		return config;
	}
}
