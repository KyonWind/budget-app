package com.budgetapp.services

import android.app.Activity
import android.app.Service
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.PixelFormat
import android.hardware.display.DisplayManager
import android.hardware.display.VirtualDisplay
import android.media.projection.MediaProjection
import android.media.projection.MediaProjectionManager
import android.os.Build
import android.os.Environment
import android.os.IBinder
import android.util.Log
import java.io.File
import java.io.FileOutputStream
import java.io.IOException

class ScreenshotService : Service() {

    private lateinit var mediaProjectionManager: MediaProjectionManager
    private var mediaProjection: MediaProjection? = null
    private var virtualDisplay: VirtualDisplay? = null

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d("ScreenShotService","START service")
        mediaProjectionManager = getSystemService(MEDIA_PROJECTION_SERVICE) as MediaProjectionManager
        Log.d("ScreenShotService","SystemService")
        Log.d("ScreenShotService", "Build.VERSION.SDK_INT" + Build.VERSION.SDK_INT.toString())
        val resultCode = intent?.getIntExtra("resultCode", -1) ?: -1
        val resultData: Intent? = if (Build.VERSION.SDK_INT >= 33) {
            intent?.getParcelableExtra("resultData", Intent::class.java)
        } else {
            @Suppress("DEPRECATION")
            intent?.getParcelableExtra("resultData")
        }

        if (resultCode != Activity.RESULT_OK || resultData == null) {
            Log.e("ScreenshotService", "Invalid resultCode or resultData")
            stopSelf()
            return START_NOT_STICKY
        }

        Log.d("ScreenShotService:resultCode", resultCode.toString())
        Log.d("ScreenShotService:resultData", resultData.toString())
        mediaProjection = mediaProjectionManager.getMediaProjection(resultCode, resultData!!)
        Log.d("ScreenShotService","starting function for screenshot")
        takeScreenshot()

        return START_NOT_STICKY
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
            stopSelf()
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
