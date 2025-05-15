package com.atlantbh.internship.cinebh_app.services.auth;

import com.atlantbh.internship.cinebh_app.domain.Role;
import com.atlantbh.internship.cinebh_app.domain.User;
import com.atlantbh.internship.cinebh_app.domain.UserRole;
import com.atlantbh.internship.cinebh_app.dtos.AuthDTO;
import com.atlantbh.internship.cinebh_app.dtos.AuthResponse;
import com.atlantbh.internship.cinebh_app.dtos.AuthRequest;
import com.atlantbh.internship.cinebh_app.repositories.RoleRepository;
import com.atlantbh.internship.cinebh_app.repositories.UserRepository;
import com.atlantbh.internship.cinebh_app.services.user.DefaultUserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

@Service
public class DefaultAuthService implements AuthService{
    private final DefaultUserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenBlacklistService tokenBlacklistService;

    public DefaultAuthService(DefaultUserService userService, AuthenticationManager authenticationManager, JwtService jwtService, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, TokenBlacklistService tokenBlacklistService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenBlacklistService = tokenBlacklistService;
    }

    @Override
    public AuthDTO login(AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.email(), authRequest.password()));
        User user = userService.loadUserByUsername(authentication.getName());
        String token = jwtService.createToken(user, authRequest.rememberMe());
        Instant expiration = getTokenExpiration(authRequest.rememberMe());
        AuthResponse authResponse = new AuthResponse(user, expiration);

        return new AuthDTO(authResponse, token);
    }

    @Override
    public AuthDTO register(AuthRequest authRequest) {
        boolean exists = userRepository.existsByEmail(authRequest.email());

        if(exists) {
            throw new IllegalArgumentException("User with email " + authRequest.email() + " already exists");
        }

        Role role = roleRepository.findByName("USER");
        User newUser = new User(authRequest.email(), passwordEncoder.encode(authRequest.password()));
        UserRole newUserRole = new UserRole(newUser, role);
        newUser.setRoles(List.of(newUserRole));

        User user = userRepository.save(newUser);
        String token = jwtService.createToken(user, authRequest.rememberMe());
        Instant expiration = getTokenExpiration(authRequest.rememberMe());
        AuthResponse authResponse = new AuthResponse(user, expiration);

        return new AuthDTO(authResponse, token);
    }

    @Override
    public void logout(String credentials) {
        tokenBlacklistService.addBlacklistedToken(credentials);
    }

    @Override
    public void validate(String credentials) {
        jwtService.isTokenValid(credentials);
    }

    public Instant getTokenExpiration(boolean rememberMe) {
        if(rememberMe) {
            return Instant.now().plus(Duration.ofDays(7));
        }
        return Instant.now().plus(Duration.ofMinutes(30));
    }
}
