package com.hintsete.courselistapp



import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.Modifier
import com.hintsete.courselistapp.ui.theme.CourseListAppTheme
import com.hintsete.courselistapp.ui.theme.LocalThemeState
import com.hintsete.courselistapp.ui.theme.rememberThemeState

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            CourseListAppTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    CourseListScreen(courses = sampleCourses)
                }
            }
        }
    }
}
// Preview function to see your screen in Android Studio
//@Preview(showBackground = true)
//@Preview(showBackground = true, uiMode = Configuration.UI_MODE_NIGHT_YES)
//@Composable
//fun MainActivityPreview() {
//    CourseListAppTheme {
//        Surface(
//            modifier = Modifier.fillMaxSize(),
//            color = MaterialTheme.colorScheme.background
//        ) {
//            CourseListScreen(courses = sampleCourses)
//        }
//    }
//}
//@Composable
//fun Greeting(name: String, modifier: Modifier = Modifier) {
//    Text(
//        text = "Hello $name!",
//        modifier = modifier
//    )
//}
//
//@Preview(showBackground = true)
//@Composable
//fun GreetingPreview() {
//    CourseListAppTheme {
//        Greeting("Android")
//    }
//}