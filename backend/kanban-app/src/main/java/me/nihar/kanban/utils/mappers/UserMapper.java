package me.nihar.kanban.utils.mappers;

import me.nihar.kanban.dto.UserDto;
import me.nihar.kanban.entity.Authority;
import me.nihar.kanban.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.Set;
import java.util.stream.Collectors;

/*
 * @created 10-02-2022
 * @project kanban-app
 * @author Nihar
 */
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
	UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

	@Mapping(target = "login", source = "userName")
	@Mapping(target = "password", ignore = true)
	UserDto toDto(User source);

	default Set<String> map(Set<Authority> authorities) {
		return authorities.stream().map(Authority::getName).collect(Collectors.toSet());
	}
}
