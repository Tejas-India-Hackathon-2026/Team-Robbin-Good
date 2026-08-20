package com.kshitij.common;

import com.kshitij.security.JwtAuthenticationFilter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Utility class to extract the currently authenticated user's details
 * from the SecurityContext. Works with the JWT filter's JwtUserPrincipal.
 */
public final class SecurityUtils {
    private SecurityUtils() {}

    public static Long getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof JwtAuthenticationFilter.JwtUserPrincipal principal) {
            return principal.getUserId();
        }
        throw new RuntimeException("No authenticated user found");
    }

    public static String getCurrentUserEmail() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof JwtAuthenticationFilter.JwtUserPrincipal principal) {
            return principal.getEmail();
        }
        throw new RuntimeException("No authenticated user found");
    }

    public static String getCurrentUserRole() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof JwtAuthenticationFilter.JwtUserPrincipal principal) {
            return principal.getRole();
        }
        throw new RuntimeException("No authenticated user found");
    }
}
