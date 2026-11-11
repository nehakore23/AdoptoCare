package com.petadoption.config;

import com.petadoption.security.CustomUserDetailsService;
import com.petadoption.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        System.out.println("[DEBUG] Configuring Security Filter Chain");
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf
                        .ignoringRequestMatchers(new AntPathRequestMatcher("/h2-console/**"))
                        .disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(new AntPathRequestMatcher("/api/auth/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/uploads/**")).permitAll()
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/pets/**").permitAll()
                        .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/pets/**").authenticated()
                        .requestMatchers(org.springframework.http.HttpMethod.PUT, "/api/pets/**").authenticated()
                        .requestMatchers(org.springframework.http.HttpMethod.DELETE, "/api/pets/**").authenticated()
                        .requestMatchers(new AntPathRequestMatcher("/api/users/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/announcements/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/contact/submit")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/contact/messages/**")).authenticated()
                        .requestMatchers(new AntPathRequestMatcher("/api/shelters/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/blogs/all")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/blogs/test")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/blogs/test-image")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/blogs/image/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/blogs/user/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/blogs/create/**")).authenticated()
                        .requestMatchers(new AntPathRequestMatcher("/api/blogs/**")).authenticated()
                        .requestMatchers(new AntPathRequestMatcher("/api/test/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/h2-console/**")).permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .headers(headers -> headers
                        .frameOptions(frame -> frame.sameOrigin()) // ✅ Allow H2 Console frame from same origin
                        .httpStrictTransportSecurity(hstsConfig -> hstsConfig.disable())); // ✅ Disable HSTS for H2

        System.out.println("[DEBUG] Security Filter Chain configured successfully");
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
