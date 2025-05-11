package com.hintsete.courselistapp.ui.theme


import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.runtime.staticCompositionLocalOf

class ThemeState(initialTheme: AppTheme = AppTheme.SYSTEM) {
    var theme by mutableStateOf(initialTheme)
        private set

    fun toggleTheme() {
        theme = when (theme) {
            AppTheme.SYSTEM -> AppTheme.LIGHT
            AppTheme.LIGHT -> AppTheme.DARK
            AppTheme.DARK -> AppTheme.SYSTEM
        }
    }
}

@Composable
fun rememberThemeState(): ThemeState {
    return rememberSaveable(saver = run {
        val appThemeSaver = androidx.compose.runtime.saveable.Saver<ThemeState, String>(
            save = { it.theme.name },
            restore = { ThemeState(AppTheme.valueOf(it)) }
        )
        appThemeSaver
    }) {
        ThemeState()
    }
}

@Composable
fun ThemeState.isDarkTheme(): Boolean {
    return when (theme) {
        AppTheme.SYSTEM -> isSystemInDarkTheme()
        AppTheme.LIGHT -> false
        AppTheme.DARK -> true
    }
}

val LocalThemeState = staticCompositionLocalOf { ThemeState() }