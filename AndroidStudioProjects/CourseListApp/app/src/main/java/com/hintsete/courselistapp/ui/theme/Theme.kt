package com.hintsete.courselistapp.ui.theme



import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.SideEffect
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

enum class AppTheme {
    SYSTEM, LIGHT, DARK
}

private val DarkColorScheme = darkColorScheme(
    primary = Color(0xFFA8C7FF),
    secondary = Color(0xFFBDC6FF),
    tertiary = Color(0xFFDEBCDD),
    background = Color(0xFF1A1C1E),
    surface = Color(0xFF1A1C1E),
    onPrimary = Color(0xFF002E69),
    onSecondary = Color(0xFF002E69),
    onTertiary = Color(0xFF3A2A3A),
    onBackground = Color(0xFFE2E2E6),
    onSurface = Color(0xFFE2E2E6)
)

private val LightColorScheme = lightColorScheme(
    primary = Color(0xFF0061A4),
    secondary = Color(0xFF535EAB),
    tertiary = Color(0xFF984061),
    background = Color(0xFFFCFCFF),
    surface = Color(0xFFFCFCFF),
    onPrimary = Color.White,
    onSecondary = Color.White,
    onTertiary = Color.White,
    onBackground = Color(0xFF1A1C1E),
    onSurface = Color(0xFF1A1C1E)
)

@Composable
fun CourseListAppTheme(
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val themeState = rememberSaveable(
        saver = androidx.compose.runtime.saveable.Saver<ThemeState, String>(
            save = { it.theme.name },
            restore = { ThemeState(AppTheme.valueOf(it)) }
        )
    ) { ThemeState() }

    CompositionLocalProvider(LocalThemeState provides themeState) {
        val darkTheme = themeState.isDarkTheme()

        val colorScheme = when {
            dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
                val context = LocalContext.current
                if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
            }
            darkTheme -> DarkColorScheme
            else -> LightColorScheme
        }

        val view = LocalView.current
        if (!view.isInEditMode) {
            SideEffect {
                val window = (view.context as Activity).window
                window.statusBarColor = colorScheme.primary.toArgb()
                WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = !darkTheme
            }
        }

        MaterialTheme(
            colorScheme = colorScheme,
            typography = Typography,
            shapes = Shapes,
            content = content
        )
    }
}
