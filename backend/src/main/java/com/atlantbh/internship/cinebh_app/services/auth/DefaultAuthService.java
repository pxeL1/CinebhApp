package com.atlantbh.internship.cinebh_app.services.auth;

import com.atlantbh.internship.cinebh_app.domain.Role;
import com.atlantbh.internship.cinebh_app.domain.User;
import com.atlantbh.internship.cinebh_app.domain.UserRole;
import com.atlantbh.internship.cinebh_app.dtos.AuthResponse;
import com.atlantbh.internship.cinebh_app.dtos.AuthRequest;
import com.atlantbh.internship.cinebh_app.repositories.RoleRepository;
import com.atlantbh.internship.cinebh_app.repositories.UserRepository;
import com.atlantbh.internship.cinebh_app.services.user.DefaultUserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
    public AuthResponse login(AuthRequest authRequest, HttpServletResponse response) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.email(), authRequest.password()));
        User user = userService.loadUserByUsername(authentication.getName());
        String token = jwtService.createToken(user, authRequest.rememberMe());
        response.addCookie(getCookie(token));
        Instant expiration = getTokenExpiration(authRequest.rememberMe());

        return new AuthResponse(user, expiration);
    }

    @Override
    public AuthResponse register(AuthRequest authRequest, HttpServletResponse response) {
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
        response.addCookie(getCookie(token));
        Instant expiration = getTokenExpiration(authRequest.rememberMe());

        return new AuthResponse(user, expiration);
    }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        String token = jwtService.extractToken(request);
        tokenBlacklistService.addBlacklistedToken(token);
        Cookie cookie = getCookie(token);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    public Cookie getCookie(String token) {
        Cookie cookie = new Cookie("token", token);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(false);

        return cookie;
    }

    public Instant getTokenExpiration(boolean rememberMe) {
        if(rememberMe) {
            return Instant.now().plus(Duration.ofDays(7));
        }
        return Instant.now().plus(Duration.ofMinutes(30));
    }
}
