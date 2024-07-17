package com.budgetapp.activities

import android.app.Activity
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.PixelFormat
import android.hardware.display.DisplayManager
import android.hardware.display.VirtualDisplay
import android.media.projection.MediaProjection
import android.media.projection.MediaProjectionManager
import android.os.Bundle
import android.os.Environment
import android.util.Log
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.budgetapp.R
import java.io.File
import java.io.FileOutputStream
import java.io.IOException

class ScreenShotActivity : AppCompatActivity() {

    private val REQUEST_CODE_SCREEN_CAPTURE = 101
    private lateinit var mediaProjectionManager: MediaProjectionManager
    private var mediaProjection: MediaProjection? = null
    private var virtualDisplay: VirtualDisplay? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_screen_shot2)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
    }
    fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, data: Intent?) {
        if (requestCode == REQUEST_CODE_SCREEN_CAPTURE && resultCode == Activity.RESULT_OK && activity != null) {
            Log.d("ScreenShotService:resultCode", resultCode.toString())
            Log.d("ScreenShotService:resultData", data.toString())
            mediaProjection = mediaProjectionManager.getMediaProjection(resultCode, data!!)
            Log.d("ScreenShotService","starting function for screenshot")
            takeScreenshot()
        }
    }

    private fun takeScreenshot() {
        Log.d("SS","taking screenshot")
        val metrics = resources.displayMetrics
        val width = metrics.widthPixels
        val height = metrics.heightPixels
        val density = metrics.densityDpi

        val imageReader = android.media.ImageReader.newInstance(width, height, PixelFormat.RGBA_8888, 1)
        virtualDisplay = mediaProjection?.createVirtualDisplay(
            "Screenshot",
            width, height, density,
            DisplayManager.VIRTUAL_DISPLAY_FLAG_AUTO_MIRROR,
            imageReader.surface, null, null
        )

        imageReader.setOnImageAvailableListener({ reader ->
            val image = reader.acquireLatestImage()
            val planes = image.planes
            val buffer = planes[0].buffer
            val pixelStride = planes[0].pixelStride
            val rowStride = planes[0].rowStride
            val rowPadding = rowStride - pixelStride * width

            val bitmap = Bitmap.createBitmap(width + rowPadding / pixelStride, height, Bitmap.Config.ARGB_8888)
            bitmap.copyPixelsFromBuffer(buffer)

            saveBitmapToFile(bitmap)
            image.close()
        }, null)
    }

    private fun saveBitmapToFile(bitmap: Bitmap) {
        val filePath = Environment.getExternalStorageDirectory().absolutePath + "/screenshot.png"
        val file = File(filePath)
        try {
            FileOutputStream(file).use { out ->
                bitmap.compress(Bitmap.CompressFormat.PNG, 100, out)
            }
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }
}