package com.hintsete.courselistapp


import android.content.res.Configuration
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AutoMode
import androidx.compose.material.icons.filled.DarkMode
import androidx.compose.material.icons.filled.LightMode
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.listSaver
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.hintsete.courselistapp.ui.component.CourseCard
import com.hintsete.courselistapp.ui.theme.AppTheme
import com.hintsete.courselistapp.ui.theme.CourseListAppTheme
import com.hintsete.courselistapp.ui.theme.LocalThemeState
import com.hintsete.courselistapp.ui.theme.ThemeState

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CourseListScreen(
    courses: List<Course>,
    modifier: Modifier = Modifier
) {
    val themeState = LocalThemeState.current
    val expandedStates = rememberSaveable(
        saver = listSaver(
            save = { state -> state.map { (key, value) -> key to value } },
            restore = { list ->
                mutableStateMapOf<Int, Boolean>().apply {
                    list.forEach { (key, value) -> put(key as Int, value as Boolean) }
                }
            }
        )
    ) { mutableStateMapOf<Int, Boolean>() }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Academic Courses") },
                actions = {
                    IconButton(onClick = { themeState.toggleTheme() }) {
                        Icon(
                            imageVector = when (themeState.theme) {
                                AppTheme.SYSTEM -> Icons.Filled.AutoMode
                                AppTheme.LIGHT -> Icons.Filled.LightMode
                                AppTheme.DARK -> Icons.Filled.DarkMode
                            },
                            contentDescription = "Toggle theme"
                        )
                    }
                }
            )
        }
    ) { innerPadding ->
        Surface(modifier = modifier.padding(innerPadding)) {
            LazyColumn(modifier = Modifier.padding(horizontal = 8.dp)) {
                items(courses) { course ->
                    CourseCard(
                        course = course,
                        isExpanded = expandedStates[course.id] ?: false,
                        onExpandToggle = {
                            expandedStates[course.id] = !(expandedStates[course.id] ?: false)
                        },
                        modifier = Modifier
                    )
                }
            }
        }
    }
}

@Preview(showBackground = true)
@Preview(showBackground = true, uiMode = Configuration.UI_MODE_NIGHT_YES)
@Composable
fun CourseListScreenPreview() {
    CourseListAppTheme {
        Surface(modifier = Modifier.fillMaxSize()) {
            CourseListScreen(
                courses = sampleCourses,
                modifier = Modifier
            )
        }
    }
}