package com.sampson.fullstack.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.quarkus.hibernate.reactive.panache.PanacheEntity;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.ZonedDateTime;
import java.util.List;

@Entity
@Table(name = "users")
public class User  extends PanacheEntity {

    @JsonProperty("name")
    @Column(unique = true, nullable = false)
    public String name;

    @JsonProperty("password")
    @Column(nullable = false)
    String password;

    @JsonProperty("created")
    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    public ZonedDateTime created;

    @JsonProperty("version")
    @Version
    public int version;

    @JsonProperty("roles")
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "role")
    public List<String> roles;
}
