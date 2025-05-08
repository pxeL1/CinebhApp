package com.atlantbh.internship.cinebh_app.services.auth;

import com.atlantbh.internship.cinebh_app.domain.Role;
import com.atlantbh.internship.cinebh_app.domain.User;
import com.atlantbh.internship.cinebh_app.domain.UserRole;
import com.atlantbh.internship.cinebh_app.dtos.LoginRequest;
import com.atlantbh.internship.cinebh_app.dtos.LogoutRequest;
import com.atlantbh.internship.cinebh_app.dtos.RegisterRequest;
import com.atlantbh.internship.cinebh_app.repositories.RoleRepository;
import com.atlantbh.internship.cinebh_app.repositories.UserRepository;
import com.atlantbh.internship.cinebh_app.services.user.DefaultUserService;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.tomcat.util.http.SameSiteCookies;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DefaultAuthService implements  AuthService{
    private final DefaultUserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final BlacklistService blacklistService;

    public DefaultAuthService(DefaultUserService userService, AuthenticationManager authenticationManager, JwtService jwtService, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, BlacklistService blacklistService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.blacklistService = blacklistService;
    }

    @Override
    public User login(LoginRequest loginRequest, HttpServletResponse response) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password()));
        User user = userService.loadUserByUsername(authentication.getName());
        String token = jwtService.createToken(user, loginRequest.rememberMe());
        setCookie(response, token);

        return user;
    }

    @Override
    public User register(RegisterRequest registerRequest, HttpServletResponse response) {
        boolean exists = userRepository.existsByEmail(registerRequest.email());

        if(exists) {
            throw new IllegalArgumentException("User with email " + registerRequest.email() + " already exists");
        }

        Role role = roleRepository.findByName(registerRequest.role());
        User newUser = new User(registerRequest.email(), passwordEncoder.encode(registerRequest.password()));
        UserRole newUserRole = new UserRole(newUser, role);
        newUser.setRoles(List.of(newUserRole));

        User user = userRepository.save(newUser);
        String token = jwtService.createToken(user, registerRequest.rememberMe());
        setCookie(response, token);

        return user;
    }

    @Override
    public boolean logout(LogoutRequest logoutRequest) {
        blacklistService.addBlacklistedToken(logoutRequest.token());

        return true;
    }

    public void setCookie(HttpServletResponse response, String token) {
        ResponseCookie cookie = ResponseCookie.from("token", token)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .sameSite(SameSiteCookies.STRICT.toString())
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }
}
